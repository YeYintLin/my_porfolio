import { NextRequest, NextResponse } from "next/server";
import { getMessages, saveMessages, ContactMessage } from "@/lib/db";
import { getExpectedSessionToken } from "@/lib/auth";
import { sendNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SESSION_COOKIE_NAME = "admin_session";

// Helper check authentication
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const expectedToken = await getExpectedSessionToken();
  return sessionToken === expectedToken;
}

// GET received messages (Admin only)
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await getMessages();
    // Sort by date descending (newest messages first)
    messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ message: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST submit a message (Public, Protected against Bot & Spam flooding)
export async function POST(request: NextRequest) {
  try {
    // 1. IP-Based Rate Limiting (Max 3 messages per 5 minutes per IP)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { allowed, retryAfterSeconds } = checkRateLimit(ip, 3, 5 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        {
          message: `Too many submissions from this connection. Please wait ${retryAfterSeconds} seconds before sending another message.`,
        },
        { status: 429 }
      );
    }

    const data = await request.json();
    const { name, email, message, _gotcha, loadedAt } = data;

    // 2. Honeypot check: Bots auto-fill hidden input fields
    if (_gotcha) {
      console.warn("[anti-spam] Honeypot triggered by bot");
      // Return fake success so bot does not retry
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
        emailDelivered: false,
      });
    }

    // 3. Human submission timing: Forms filled in < 1.5s are automated scripts
    if (loadedAt && Date.now() - Number(loadedAt) < 1500) {
      console.warn(`[anti-spam] Fast script submission detected (${Date.now() - Number(loadedAt)}ms)`);
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
        emailDelivered: false,
      });
    }

    // 4. Basic input validation & bounds check
    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (name.length > 100 || email.length > 150 || message.length > 3000) {
      return NextResponse.json(
        { message: "Input exceeds allowed character limits." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address format." }, { status: 400 });
    }

    // 5. Anti-phishing: Block spam with excessive links (> 4 URLs in message)
    const urlMatches = message.match(/https?:\/\/[^\s]+/gi) || [];
    if (urlMatches.length > 4) {
      return NextResponse.json(
        { message: "Too many links detected in your message." },
        { status: 400 }
      );
    }

    // Save inquiry to serverless-safe data store
    const messages = await getMessages();
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      date: new Date().toISOString(),
    };

    messages.push(newMessage);
    await saveMessages(messages);

    // Attempt email forwarding to portfolio owner's Gmail
    let emailDelivered = false;
    try {
      const emailResult = await sendNotificationEmail({
        name: newMessage.name,
        email: newMessage.email,
        message: newMessage.message,
      });
      emailDelivered = emailResult.sent;
    } catch (emailErr) {
      console.warn("[api/messages] Email dispatch warning:", emailErr instanceof Error ? emailErr.message : "Delivery failed");
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      emailDelivered,
    });
  } catch (error: unknown) {
    console.error("[api/messages] Contact submission error:", error instanceof Error ? error.name : "InternalError");
    return NextResponse.json(
      { message: "Failed to send message. Please try emailing directly." },
      { status: 500 }
    );
  }
}

// DELETE a message (Admin only)
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Message ID is required" }, { status: 400 });
    }

    const messages = await getMessages();
    const filteredMessages = messages.filter((m) => m.id !== id);

    if (messages.length === filteredMessages.length) {
      return NextResponse.json({ message: "Message not found" }, { status: 404 });
    }

    await saveMessages(filteredMessages);
    return NextResponse.json({ success: true, message: "Message deleted successfully" });
  } catch {
    return NextResponse.json({ message: "Failed to delete message" }, { status: 500 });
  }
}
