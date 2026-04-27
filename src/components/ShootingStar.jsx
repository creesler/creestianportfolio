import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ShootingStar — glowing astral comets that drift lazily when idle,
 * but get attracted to the mouse cursor like Tinkerbell when it moves.
 */

const STAR_COUNT = 3;
const MOUSE_IDLE_MS = 2000;        // after 2s of no movement → wander mode
const ATTRACT_STRENGTH = 0.012;    // how strongly stars pull toward cursor
const ATTRACT_DAMPING = 0.96;      // velocity damping near cursor
const WANDER_STRENGTH = 0.008;     // how fast they steer while wandering
const MAX_SPEED = 2.5;
const ORBIT_RADIUS = 80;           // stars orbit this far from cursor, not directly on it
const ORBIT_SPEED = 0.008;         // radians per frame for orbiting

const rand = (min, max) => Math.random() * (max - min) + min;

const createStar = (w, h) => ({
  x: rand(0, w),
  y: rand(0, h),
  vx: rand(-0.4, 0.4),
  vy: rand(-0.3, 0.3),
  // wander
  targetVx: rand(-0.6, 0.6),
  targetVy: rand(-0.4, 0.4),
  wanderTimer: rand(120, 300),
  // trail
  trail: [],
  trailMax: Math.floor(rand(30, 55)),
  // appearance
  size: rand(2, 4),
  hue: rand(170, 260),
  brightness: rand(0.6, 1),
  pulsePhase: rand(0, Math.PI * 2),
  // orbit angle (each star gets its own offset so they spread around cursor)
  orbitAngle: rand(0, Math.PI * 2),
  // excitement: ramps up when mouse is active, decays when idle
  excitement: 0,
});

const clampSpeed = (vx, vy) => {
  const speed = Math.sqrt(vx * vx + vy * vy);
  if (speed > MAX_SPEED) {
    const scale = MAX_SPEED / speed;
    return [vx * scale, vy * scale];
  }
  return [vx, vy];
};

const ShootingStar = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const scrollYRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, lastMove: 0 });
  const animFrameRef = useRef(null);
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

  // Track scroll
  useEffect(() => {
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track resize
  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Track mouse
  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      mouseRef.current.lastMove = performance.now();
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Init stars
  useEffect(() => {
    starsRef.current = Array.from({ length: STAR_COUNT }, () =>
      createStar(dims.w, dims.h)
    );
  }, [dims.w, dims.h]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { w, h } = { w: canvas.width, h: canvas.height };

    ctx.clearRect(0, 0, w, h);

    const time = performance.now() * 0.001;
    const now = performance.now();
    const scrollInfluence = scrollYRef.current * 0.02;
    const mouse = mouseRef.current;

    // Is mouse considered active?
    const mouseActive = mouse.active && (now - mouse.lastMove < MOUSE_IDLE_MS);
    // Smooth fade: 1 = fully attracted, 0 = fully wandering
    const timeSinceMove = now - mouse.lastMove;
    const mouseInfluence = mouseActive
      ? 1
      : Math.max(0, 1 - (timeSinceMove - MOUSE_IDLE_MS) / 1500);

    starsRef.current.forEach((star, idx) => {
      // ── Update excitement ──
      star.excitement += (mouseInfluence - star.excitement) * 0.03;

      if (star.excitement > 0.05) {
        // ═══ ATTRACTED MODE: orbit around cursor ═══
        star.orbitAngle += ORBIT_SPEED * (1 + idx * 0.4); // each star orbits at different speed

        // Target position: orbit point near mouse
        const orbitDist = ORBIT_RADIUS * (0.6 + 0.4 * Math.sin(time * 0.7 + star.pulsePhase));
        const targetX = mouse.x + Math.cos(star.orbitAngle) * orbitDist;
        const targetY = mouse.y + Math.sin(star.orbitAngle) * orbitDist;

        const dx = targetX - star.x;
        const dy = targetY - star.y;

        // Attraction force (stronger when excitement is high)
        const attractForce = ATTRACT_STRENGTH * star.excitement;
        star.vx += dx * attractForce;
        star.vy += dy * attractForce;

        // Damping (slows down as they get closer → smooth orbit feel)
        star.vx *= ATTRACT_DAMPING;
        star.vy *= ATTRACT_DAMPING;
      }

      if (star.excitement < 0.95) {
        // ═══ WANDER MODE (blended when transitioning) ═══
        const wanderWeight = 1 - star.excitement;

        star.wanderTimer -= 1;
        if (star.wanderTimer <= 0) {
          star.targetVx = rand(-0.7, 0.7);
          star.targetVy = rand(-0.5, 0.5);
          star.wanderTimer = rand(150, 350);
        }

        star.vx += (star.targetVx - star.vx) * WANDER_STRENGTH * wanderWeight;
        star.vy += (star.targetVy - star.vy) * WANDER_STRENGTH * wanderWeight;

        // Scroll sway (only in wander mode)
        const scrollSway = Math.sin(scrollInfluence + star.pulsePhase) * 0.15 * wanderWeight;
        star.vx += scrollSway;
        star.vy += Math.cos(scrollInfluence * 0.5) * 0.1 * wanderWeight;
      }

      // Clamp speed
      [star.vx, star.vy] = clampSpeed(star.vx, star.vy);

      // Move
      star.x += star.vx;
      star.y += star.vy;

      // ── Wrap around viewport ──
      if (star.x < -80) star.x = w + 80;
      if (star.x > w + 80) star.x = -80;
      if (star.y < -80) star.y = h + 80;
      if (star.y > h + 80) star.y = -80;

      // ── Trail ──
      star.trail.push({ x: star.x, y: star.y });
      if (star.trail.length > star.trailMax) star.trail.shift();

      // ── Pulsing brightness — faster when excited ──
      const pulseSpeed = 1.5 + star.excitement * 2;
      const pulse = 0.5 + 0.5 * Math.sin(time * pulseSpeed + star.pulsePhase);
      const alpha = star.brightness * (0.4 + 0.6 * pulse);

      // ── Hue shift towards warmer when excited ──
      const hue = star.hue - star.excitement * 30; // shifts cyan → more teal/green

      // ── Draw trail ──
      if (star.trail.length > 2) {
        // Outer trail
        ctx.beginPath();
        ctx.moveTo(star.trail[0].x, star.trail[0].y);
        for (let i = 1; i < star.trail.length; i++) {
          ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }
        const trailAlpha = alpha * (0.15 + star.excitement * 0.15);
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${trailAlpha})`;
        ctx.lineWidth = star.size * (0.6 + star.excitement * 0.4);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Inner trail (last 40%)
        const innerStart = Math.floor(star.trail.length * 0.6);
        ctx.beginPath();
        ctx.moveTo(star.trail[innerStart].x, star.trail[innerStart].y);
        for (let i = innerStart + 1; i < star.trail.length; i++) {
          ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }
        ctx.strokeStyle = `hsla(${hue}, 90%, 80%, ${alpha * (0.35 + star.excitement * 0.2)})`;
        ctx.lineWidth = star.size * (0.4 + star.excitement * 0.3);
        ctx.stroke();
      }

      // ── Draw glow — bigger when excited ──
      const glowSize = 1 + star.excitement * 0.8;
      const glowRadius = star.size * 12 * (0.8 + 0.2 * pulse) * glowSize;
      const outerGlow = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, glowRadius
      );
      outerGlow.addColorStop(0, `hsla(${hue}, 100%, 85%, ${alpha * (0.3 + star.excitement * 0.2)})`);
      outerGlow.addColorStop(0.3, `hsla(${hue}, 80%, 60%, ${alpha * (0.1 + star.excitement * 0.1)})`);
      outerGlow.addColorStop(1, `hsla(${hue}, 80%, 50%, 0)`);
      ctx.beginPath();
      ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // ── Draw core ──
      const coreSize = star.size * (2 + star.excitement * 1);
      const coreGrad = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, coreSize
      );
      coreGrad.addColorStop(0, `hsla(${hue}, 100%, 95%, ${alpha * 0.9})`);
      coreGrad.addColorStop(0.5, `hsla(${hue}, 90%, 70%, ${alpha * 0.5})`);
      coreGrad.addColorStop(1, `hsla(${hue}, 80%, 50%, 0)`);
      ctx.beginPath();
      ctx.arc(star.x, star.y, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // ── Sparkle cross — more pronounced when excited ──
      const sparkleLen = star.size * (4 + star.excitement * 4) * pulse;
      ctx.strokeStyle = `hsla(${hue}, 100%, 90%, ${alpha * (0.4 + star.excitement * 0.3) * pulse})`;
      ctx.lineWidth = 0.5 + star.excitement * 0.5;
      ctx.beginPath();
      ctx.moveTo(star.x - sparkleLen, star.y);
      ctx.lineTo(star.x + sparkleLen, star.y);
      ctx.moveTo(star.x, star.y - sparkleLen);
      ctx.lineTo(star.x, star.y + sparkleLen);
      ctx.stroke();

      // ── Extra sparkle particles when excited ──
      if (star.excitement > 0.3) {
        const sparkleCount = Math.floor(star.excitement * 4);
        for (let s = 0; s < sparkleCount; s++) {
          const angle = (time * 3 + s * (Math.PI * 2 / sparkleCount) + star.pulsePhase);
          const dist = star.size * (5 + Math.sin(time * 4 + s) * 3) * star.excitement;
          const sx = star.x + Math.cos(angle) * dist;
          const sy = star.y + Math.sin(angle) * dist;
          const sparkleAlpha = alpha * star.excitement * 0.5 * (0.5 + 0.5 * Math.sin(time * 6 + s * 2));

          ctx.beginPath();
          ctx.arc(sx, sy, 1 + star.excitement, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue + 30}, 100%, 85%, ${sparkleAlpha})`;
          ctx.fill();
        }
      }
    });

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  // Start animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dims.w;
    canvas.height = dims.h;
    animFrameRef.current = requestAnimationFrame(draw);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [dims, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
};

export default ShootingStar;
