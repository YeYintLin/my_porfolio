import { NextRequest, NextResponse } from "next/server";
import { getMessages, saveMessages, ContactMessage } from "@/lib/db";
import { getExpectedSessionToken } from "@/lib/auth";
import { sendNotificationEmail } from "@/lib/email";

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

// POST submit a message (Public)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    // Save inquiry to serverless-safe data store
    const messages = await getMessages();
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    messages.push(newMessage);
    await saveMessages(messages);

    // Attempt email forwarding to portfolio owner's Gmail
    let emailDelivered = false;
    try {
      const emailResult = await sendNotificationEmail({ name, email, message });
      emailDelivered = emailResult.sent;
    } catch (emailErr) {
      console.warn("[api/messages] Email dispatch warning:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      emailDelivered,
    });
  } catch (error: unknown) {
    console.error("[api/messages] Error handling contact submission:", error);
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
