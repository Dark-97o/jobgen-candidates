import React, { useEffect, useRef } from 'react';

/**
 * FluidDownstreamBeam
 * Recreates the Hero section's fluid gradient shader physics channeled into
 * a downstream-flowing luminous blue streak with liquid ripples and wave crest.
 *
 * Features:
 * - Domain-folded trigonometric fluid ribbons matching InteractiveFluidGradient.
 * - Continuous downstream flow dynamics with Navier-Stokes-style liquid turbulence.
 * - Sapphire (#03091E), Royal Blue (#0C329B), Cobalt (#1D63ED), and Cyan (#38BDF8) palette.
 * - Interactive cursor ripple response that disturbs the flowing liquid when hovered.
 * - Pure white-hot laser core with feathering electric blue liquid plumes onto white background.
 */
export default function FluidDownstreamBeam() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true }) ||
           canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false });
    } catch {
      gl = null;
    }

    let animId;
    let isDestroyed = false;

    // Mouse tracking for fluid disturbance
    let mouseX = 0.68;
    let mouseY = 0.35;
    let targetMouseX = 0.68;
    let targetMouseY = 0.35;
    let mouseVel = 0.0;
    let lastMoveTime = 0;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetMouseX = Math.max(0, Math.min(1, x));
      targetMouseY = Math.max(0, Math.min(1, y));
      mouseVel = Math.min(2.5, mouseVel + 0.35);
      lastMoveTime = Date.now();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // WebGL Implementation
    if (gl) {
      const vertexShaderSource = `
        attribute vec2 aPosition;
        varying vec2 vUv;
        void main() {
          vUv = (aPosition + 1.0) * 0.5;
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = `
        precision highp float;
        varying vec2 vUv;

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uMouse; // x, y, velocity

        // Color palette matching hero section (InteractiveFluidGradient)
        const vec3 cSapphire = vec3(0.012, 0.035, 0.118); // #03091e
        const vec3 cRoyal    = vec3(0.047, 0.196, 0.608); // #0c329b
        const vec3 cCobalt   = vec3(0.114, 0.388, 0.929); // #1d63ed
        const vec3 cCyan     = vec3(0.220, 0.741, 0.973); // #38bdf8
        const vec3 cWhite    = vec3(1.0, 1.0, 1.0);

        // Compute minimal distance and coordinate along the downstream streak spine
        float getSpineDist(vec2 uv, out float flowProgress, out float spineXOut) {
          // Vertical stem from top (y=0) down to junction (y=0.42)
          float stemX = 0.68;
          float junctionY = 0.42;

          if (uv.y <= junctionY) {
            flowProgress = uv.y;
            spineXOut = stemX;
            return abs(uv.x - stemX);
          }

          // Below junction, streak flares into a curved crest wave
          float progY = (uv.y - junctionY) / 0.58;
          flowProgress = junctionY + progY * 0.45;

          if (uv.x <= stemX) {
            // Left crest arc curving horizontally over window top
            float t = clamp((stemX - uv.x) / 0.54, 0.0, 1.0);
            float curveY = junctionY + 0.12 * pow(t, 0.55);
            spineXOut = mix(stemX, 0.14, t);
            
            vec2 curvePt = vec2(uv.x, curveY);
            return length(uv - curvePt);
          } else {
            // Right flare curving downward and right
            float t = clamp((uv.x - stemX) / 0.28, 0.0, 1.0);
            float curveY = junctionY + 0.32 * pow(t, 0.85);
            spineXOut = mix(stemX, 0.96, t);
            
            vec2 curvePt = vec2(uv.x, curveY);
            return length(uv - curvePt);
          }
        }

        void main() {
          vec2 uv = vUv;
          // Invert Y so 0 is top, 1 is bottom
          uv.y = 1.0 - uv.y;

          float flowProg;
          float spineX;
          float dist = getSpineDist(uv, flowProg, spineX);

          // Interaction ripple from mouse
          vec2 mouseUV = vec2(uMouse.x, uMouse.y);
          float dMouse = length(uv - mouseUV);
          float mouseRipple = sin(dMouse * 35.0 - uTime * 6.0) * exp(-dMouse * 7.0) * uMouse.z * 0.04;

          // Downward liquid flow vector
          float flowSpeed = 2.2;
          float flowY = flowProg * 6.0 - uTime * flowSpeed + mouseRipple;
          float lateral = (uv.x - spineX) * 28.0;

          // Domain-folded trigonometric wave blending (Hero section mathematics)
          vec2 fUv = vec2(lateral, flowY);
          float t = uTime * 1.35;
          float d = -t * 0.5;
          float a = 0.0;

          for (float i = 0.0; i < 6.0; ++i) {
            a += cos(i - d - a * fUv.x * 0.35);
            d += sin(fUv.y * (i + 1.0) * 0.45 + a);
          }
          d += t * 0.5;

          float m1 = cos(fUv.x * d * 0.4) * 0.5 + 0.5;
          float m2 = cos(fUv.y * a * 0.35) * 0.5 + 0.5;
          float m3 = sin(d + a * 0.8) * 0.5 + 0.5;

          // Layered fluid color blending
          vec3 fluidColor = mix(cSapphire, cRoyal, m1);
          fluidColor = mix(fluidColor, cCobalt, m2);
          fluidColor = mix(fluidColor, cCyan, m3 * 0.9);

          // Central white-hot laser filament running down the center
          float coreWidth = 0.0045;
          float coreIntensity = exp(-pow(dist / coreWidth, 2.0));
          fluidColor = mix(fluidColor, cWhite, coreIntensity * 0.96);

          // Electric cyan inner glow
          float cyanGlow = exp(-pow(dist / 0.022, 1.8));
          fluidColor = mix(fluidColor, cCyan, cyanGlow * 0.45);

          // Ambient outer fluid falloff
          float plumeWidth = 0.16;
          float beamAlpha = exp(-pow(dist / plumeWidth, 1.75));

          // Downward flowing energy droplets & filaments
          float filament = sin(flowY * 8.0 + sin(lateral * 3.0)) * 0.5 + 0.5;
          beamAlpha *= (0.8 + 0.28 * filament);

          // Soften edges at very top and very bottom
          float edgeFade = smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.85, uv.y);
          beamAlpha *= edgeFade;

          // Focal flare burst at junction point (0.68, 0.42)
          vec2 junctionPos = vec2(0.68, 0.42);
          float dJunction = length(uv - junctionPos);
          float junctionFlare = exp(-pow(dJunction / 0.065, 1.5)) * 0.75;
          fluidColor = mix(fluidColor, cWhite, junctionFlare);
          beamAlpha = max(beamAlpha, junctionFlare * 0.9);

          // Premultiplied alpha output for clean blending onto white canvas
          gl_FragColor = vec4(fluidColor * beamAlpha, beamAlpha);
        }
      `;

      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };

      const program = gl.createProgram();
      const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const aPos = gl.getAttribLocation(program, 'aPosition');
      const uTime = gl.getUniformLocation(program, 'uTime');
      const uResolution = gl.getUniformLocation(program, 'uResolution');
      const uMouse = gl.getUniformLocation(program, 'uMouse');

      const resize = () => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
        const rect = canvas.getBoundingClientRect();
        const w = Math.floor(rect.width * dpr);
        const h = Math.floor(rect.height * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      };

      resize();
      window.addEventListener('resize', resize);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      let startTime = performance.now();

      const render = () => {
        if (isDestroyed) return;
        resize();

        const elapsed = (performance.now() - startTime) * 0.001;

        // Smooth mouse decay
        mouseX += (targetMouseX - mouseX) * 0.12;
        mouseY += (targetMouseY - mouseY) * 0.12;
        if (Date.now() - lastMoveTime > 120) {
          mouseVel *= 0.92;
        }

        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform3f(uMouse, mouseX, mouseY, mouseVel);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);

      return () => {
        isDestroyed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', resize);
      };
    } else {
      // High-Fidelity Canvas2D Fallback
      const ctx = canvas.getContext('2d');
      let startTime = performance.now();

      const render2D = () => {
        if (isDestroyed || !ctx) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const t = (performance.now() - startTime) * 0.0015;
        const stemX = canvas.width * 0.68;
        const junctionY = canvas.height * 0.42;

        ctx.save();
        ctx.lineCap = 'round';

        // Downward flowing fluid ribbons
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(stemX + Math.sin(t * 3.0 + i) * 6, 0);
          ctx.lineTo(stemX + Math.sin(t * 3.5 + i * 2) * 5, junctionY);
          ctx.bezierCurveTo(
            stemX - 60, junctionY + 40,
            stemX - 220, junctionY + 60,
            canvas.width * 0.15, junctionY + 65
          );

          ctx.strokeStyle = i === 0 ? '#1D63ED' : i === 1 ? '#38BDF8' : i === 2 ? '#60A5FA' : '#FFFFFF';
          ctx.lineWidth = i === 0 ? 32 : i === 1 ? 16 : i === 2 ? 6 : 2;
          ctx.globalAlpha = i === 3 ? 0.95 : 0.6 - i * 0.12;
          ctx.stroke();
        }

        ctx.restore();
        animId = requestAnimationFrame(render2D);
      };

      animId = requestAnimationFrame(render2D);

      return () => {
        isDestroyed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener('pointermove', onPointerMove);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 6
      }}
    />
  );
}
