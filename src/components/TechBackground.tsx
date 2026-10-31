"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Responsive node count: fewer on smaller screens
    const isMobile = width < 768;
    const nodeCount = isMobile ? 18 : 38;
    const maxDistance = isMobile ? 85 : 125;

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
      });
    }

    // Mouse coordinates (desktop only)
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const parent = canvas.parentElement;
    if (parent && !isMobile) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // IntersectionObserver to pause rendering when not visible
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Tab visibility handling
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Render loop
    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Check if dark theme
        const isDark = document.documentElement.classList.contains("dark");
        const nodeColor = isDark ? "rgba(56, 189, 248, 0.4)" : "rgba(37, 99, 235, 0.35)";
        const lineBase = isDark ? "56, 189, 248" : "37, 99, 235";

        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();

          // Connect nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * (isDark ? 0.15 : 0.1);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(${lineBase}, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Gentle connection to mouse on desktop
          if (mouseX > 0 && mouseY > 0) {
            const mdx = node.x - mouseX;
            const mdy = node.y - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 140) {
              const alpha = (1 - mdist / 140) * 0.28;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = isDark
                ? `rgba(245, 158, 11, ${alpha})`
                : `rgba(217, 119, 6, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      if (parent && !isMobile) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
