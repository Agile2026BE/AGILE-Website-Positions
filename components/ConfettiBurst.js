"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#243b67", "#147eae", "#d9b16f", "#00c853", "#8fd6ef"];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pick(arr) {
  return arr[(Math.random() * arr.length) | 0];
}

// "Firework Sparkle" burst: a soft gold glow bloom, a radial pop of
// confetti pieces with gravity + drag, and twinkling sparkle bits.
// Pure canvas, no dependencies — used identically everywhere on the
// site a form shows a success message.
export default function ConfettiBurst({ className, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || 280;
    const h = canvas.clientHeight || 280;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = w / 2;
    const cy = h / 2;
    let raf;
    let cancelled = false;

    function drawParticle(p) {
      ctx.save();
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.82);
      }
      ctx.restore();
    }

    function drawGlow(alpha) {
      const radius = Math.min(w, h) * 0.62;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      g.addColorStop(0, `rgba(217,177,111,${alpha})`);
      g.addColorStop(1, "rgba(217,177,111,0)");
      ctx.save();
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const particles = [];
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + rand(-0.15, 0.15);
      const speed = rand(60, 150);
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 90,
        drag: 0.965,
        rot: rand(0, Math.PI * 2),
        vRot: rand(-5, 5),
        size: rand(5, 7.5),
        color: pick(COLORS),
        shape: Math.random() < 0.35 ? "circle" : "square",
        alpha: 1,
      });
    }

    const sparkles = [];
    const sparkleCount = 22;
    for (let j = 0; j < sparkleCount; j++) {
      const angle = rand(0, Math.PI * 2);
      const distance = rand(20, 90);
      sparkles.push({
        x: cx + Math.cos(angle) * distance,
        y: cy + Math.sin(angle) * distance,
        size: rand(2, 3.6),
        phase: rand(0, Math.PI * 2),
        freq: rand(4, 7),
        drift: rand(-14, -28),
      });
    }

    const start = performance.now();
    const duration = 1500;
    let last = start;

    function frame(t) {
      if (cancelled) return;
      const dt = Math.min((t - last) / 1000, 0.032);
      last = t;
      const elapsed = t - start;
      ctx.clearRect(0, 0, w, h);

      const glowAlpha =
        elapsed < 260
          ? (elapsed / 260) * 0.4
          : Math.max(0, 0.4 - ((elapsed - 260) / 900) * 0.4);
      drawGlow(glowAlpha.toFixed(3));

      particles.forEach((p) => {
        p.vy += p.gravity * dt;
        p.vx *= p.drag;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vRot * dt;
        p.alpha = Math.max(0, 1 - elapsed / duration);
        drawParticle(p);
      });

      sparkles.forEach((s) => {
        const sy = s.y + (s.drift * elapsed) / 1000;
        const twinkle = Math.abs(Math.sin((elapsed / 1000) * s.freq + s.phase));
        const fade = Math.max(0, 1 - elapsed / duration);
        ctx.save();
        ctx.globalAlpha = twinkle * fade;
        ctx.fillStyle = "#fff6e0";
        ctx.beginPath();
        ctx.arc(s.x, sy, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (elapsed < duration) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    />
  );
}
