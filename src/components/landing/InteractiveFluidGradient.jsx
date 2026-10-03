import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive Fluid Gradient Background
 * Built step-by-step directly from Codegrid's WebGL / Three.js master tutorial:
 * "The Interactive Fluid Gradient You’ll Keep Reusing on Every Website" (wdyJr-UeiZs)
 *
 * Exact Architecture:
 * 1. Ping-pong Framebuffer Simulation (HalfFloatType) with 8-iteration advection & divergence relaxation.
 * 2. Continuous line-distance brush impulse tracking cursor velocity & speed-scaling brush size.
 * 3. Inactivity settling (>120ms resets mouse uniform to zero for natural fluid decay).
 * 4. Trigonometric domain-folding display shader that warps dynamic color ribbons along fluid velocity.
 * 5. JobGen royal sapphire palette (#03091e, #0c329b, #1d63ed, #38bdf8) with linear colorspace conversion.
 */
export default function InteractiveFluidGradient() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ============== Helper: Hex to Linear RGB ==============
    const asColorLinear = (hexOrCss, fallbackHex = '#ffffff') => {
      let c;
      try {
        c = new THREE.Color(hexOrCss || fallbackHex);
      } catch {
        c = new THREE.Color(fallbackHex);
      }
      c.convertSRGBToLinear();
      return [c.r, c.g, c.b];
    };

    // ============== 1. Master Config Panel ==============
    const config = {
      brushSize: 28.0,
      brushStrength: 0.65,
      distortionAmount: 2.6,
      fluidDecay: 0.982,
      trailLength: 0.82,
      stopDecay: 0.85,
      flowSpeed: 1.0,
      idleSpeed: 0.85,
      color1: '#071a52', // Deep Sapphire Blue
      color2: '#0c329b', // Deep Royal Blue
      color3: '#1d63ed', // JobGen Electric Cobalt
      color4: '#38bdf8', // Luminous Cyan Highlight
      colorIntensity: 1.08,
      softness: 0.95,
      dprMax: 2.0,
      softResetFrames: 12,
      softResetStrength: 0.15
    };

    // ============== 2. Shaders ==============
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fluid simulation pass: Navier-Stokes advection, relaxation & mouse impulse injection
    const fluidShader = `
      precision highp float;

      uniform float uSoftReset;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec4 iMouse;
      uniform int iFrame;
      uniform sampler2D iPreviousFrame;
      uniform float uBrushSize;
      uniform float uBrushStrength;
      uniform float uFluidDecay;
      uniform float uTrailLength;
      uniform float uStopDecay;
      uniform float uFlowSpeed;

      varying vec2 vUv;

      vec2 ur, U;

      float ln(vec2 p, vec2 a, vec2 b) {
        return length(p - a - (b - a) * clamp(dot(p - a, b - a) / max(dot(b - a, b - a), 1e-4), 0.0, 1.0));
      }

      // Clamped sampling to prevent toroidal wrap-around artifacts at left and right boundaries
      vec4 t(vec2 v, int a, int b) {
        vec2 coord = clamp((v + vec2(float(a), float(b))) / ur, vec2(0.001), vec2(0.999));
        return texture2D(iPreviousFrame, coord);
      }

      vec4 t(vec2 v) {
        vec2 coord = clamp(v / ur, vec2(0.001), vec2(0.999));
        return texture2D(iPreviousFrame, coord);
      }

      float area(vec2 a, vec2 b, vec2 c) {
        float A = length(b - c), B = length(c - a), C = length(a - b), s = 0.5 * (A + B + C);
        return sqrt(max(0.0, s * (s - A) * (s - B) * (s - C)));
      }

      void main() {
        U = vUv * iResolution;
        ur = iResolution.xy;

        if (iFrame < 1) {
          float w = 0.5 + sin(0.2 * U.x) * 0.5;
          float q = length(U - 0.5 * ur);
          gl_FragColor = vec4(0.1 * exp(-0.001 * q * q), 0.0, 0.0, w);
        } else {
          vec2 v = U,
               A = v + vec2( 1.0,  1.0),
               B = v + vec2( 1.0, -1.0),
               C = v + vec2(-1.0,  1.0),
               D = v + vec2(-1.0, -1.0);

          for (int i = 0; i < 8; i++) {
              v -= uFlowSpeed * t(v).xy;
              A -= uFlowSpeed * t(A).xy;
              B -= uFlowSpeed * t(B).xy;
              C -= uFlowSpeed * t(C).xy;
              D -= uFlowSpeed * t(D).xy;
          }

          vec4 me = t(v);
          vec4 n = t(v, 0, 1),
               e = t(v, 1, 0),
               s = t(v, 0, -1),
               wv = t(v, -1, 0);
          vec4 ne = 0.25 * (n + e + s + wv);
          me = mix(t(v), ne, vec4(0.15, 0.15, 0.95, 0.0));
          me.z -= uFlowSpeed * 0.01 * ((area(A, B, C) + area(B, C, D)) - 4.0);

          vec4 pr = vec4(e.z, wv.z, n.z, s.z);
          me.xy = me.xy + (100.0 * uFlowSpeed) * vec2(pr.x - pr.y, pr.z - pr.w) / ur;

          float decay = pow(uFluidDecay, uFlowSpeed);
          me.xy *= decay;
          me.z  *= uTrailLength;

          // Boundary damping towards left, right, top and bottom edges
          float edgeDampX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
          float edgeDampY = smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
          me.xy *= edgeDampX * edgeDampY;

          if (iMouse.z > 0.0) {
            vec2 mousePos  = iMouse.xy;
            vec2 mousePrev = iMouse.zw;
            vec2 mouseVel  = mousePos - mousePrev;
            float velMagnitude = length(mouseVel);
            float q = ln(U, mousePos, mousePrev);
            vec2 m = mousePos - mousePrev;
            float l = length(m);
            if (l > 0.0) m = min(l, 10.0) * m / l;

            float brushSizeFactor = 1e-4 / uBrushSize;
            float strengthFactor  = 0.03 * uBrushStrength;

            float falloff = exp(-brushSizeFactor * q * q * q);
            falloff = pow(falloff, 0.5);

            me.xyw += (strengthFactor * uFlowSpeed) * falloff * vec3(m, 10.0);

            if (velMagnitude < 2.0) {
              float distToCursor = length(U - mousePos);
              float influence = exp(-distToCursor * 0.01);
              float cursorDecay = mix(1.0, uStopDecay, influence);
              me.xy *= cursorDecay;
              me.z  *= cursorDecay;
            }
          }

          me = mix(me, vec4(0.0), uSoftReset);

          gl_FragColor = clamp(me, -0.4, 0.4);
        }
      }
    `;

    // Display pass: Domain-folded trigonometric wave blending warped by fluid velocity field
    const displayShader = `
      precision highp float;
      precision highp int;

      uniform float iTime;
      uniform vec2 iResolution;
      uniform sampler2D iFluid;
      uniform float uDistortionAmount;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      uniform float uColorIntensity;
      uniform float uSoftness;
      uniform float uIdleSpeed;

      varying vec2 vUv;

      void main() {
        vec4 fluid = texture2D(iFluid, vUv);
        vec2 fluidVel = fluid.xy;

        // Aspect-ratio aware coordinate mapping that prevents edge frequency explosion
        float aspect = iResolution.x / max(iResolution.y, 1.0);
        vec2 uv = (vUv - 0.5) * 2.0;
        // Calibrate horizontal coordinate so waves remain smooth and continuous across the wide band
        uv.x *= clamp(aspect * 0.32, 1.0, 2.2);
        uv.y *= 1.1;

        uv += fluidVel * (0.5 * uDistortionAmount);

        float t = iTime * uIdleSpeed;

        float d = -t * 0.5;
        float a = 0.0;
        for (float i = 0.0; i < 8.0; ++i) {
          a += cos(i - d - a * uv.x);
          d += sin(uv.y * i + a);
        }
        d += t * 0.5;

        float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
        float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
        float mixer3 = sin(d + a) * 0.5 + 0.5;

        float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
        mixer1 = mix(mixer1, 0.5, smoothAmount);
        mixer2 = mix(mixer2, 0.5, smoothAmount);
        mixer3 = mix(mixer3, 0.5, smoothAmount);

        vec3 col = mix(uColor1, uColor2, mixer1);
        col = mix(col, uColor3, mixer2);
        col = mix(col, uColor4, mixer3 * 0.4);

        col *= uColorIntensity;

        // Smooth color transition towards the far left and right edges so it blends harmoniously
        float edgeFactor = smoothstep(0.0, 0.07, vUv.x) * smoothstep(1.0, 0.93, vUv.x);
        vec3 edgeBlendColor = mix(uColor2, uColor3, 0.7);
        col = mix(edgeBlendColor, col, 0.85 + 0.15 * edgeFactor);

        gl_FragColor = vec4(col, 1.0);
        
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `;

    // ============== 3. Renderer & Orthographic Camera ==============
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance'
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, config.dprMax));

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    function getCanvasSize() {
      const r = container.getBoundingClientRect();
      return {
        width: Math.max(1, Math.floor(r.width || window.innerWidth)),
        height: Math.max(1, Math.floor(r.height || window.innerHeight))
      };
    }

    // ============== 4. Render Targets (Frame Buffers) ==============
    const rtOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false
    };

    const initialSize = getCanvasSize();
    const fluidTarget1 = new THREE.WebGLRenderTarget(initialSize.width, initialSize.height, rtOptions);
    const fluidTarget2 = fluidTarget1.clone();
    let currentFluidTarget = fluidTarget1;
    let previousFluidTarget = fluidTarget2;

    // ============== 5. Materials & Scene Meshes ==============
    const color1Linear = asColorLinear(config.color1);
    const color2Linear = asColorLinear(config.color2);
    const color3Linear = asColorLinear(config.color3);
    const color4Linear = asColorLinear(config.color4);

    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(initialSize.width, initialSize.height) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: config.brushSize },
        uBrushStrength: { value: config.brushStrength },
        uFluidDecay: { value: config.fluidDecay },
        uTrailLength: { value: config.trailLength },
        uStopDecay: { value: config.stopDecay },
        uSoftReset: { value: 0.0 },
        uFlowSpeed: { value: config.flowSpeed }
      },
      vertexShader,
      fragmentShader: fluidShader,
      depthTest: false,
      depthWrite: false
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(initialSize.width, initialSize.height) },
        iFluid: { value: null },
        uDistortionAmount: { value: config.distortionAmount },
        uColor1: { value: new THREE.Vector3(...color1Linear) },
        uColor2: { value: new THREE.Vector3(...color2Linear) },
        uColor3: { value: new THREE.Vector3(...color3Linear) },
        uColor4: { value: new THREE.Vector3(...color4Linear) },
        uColorIntensity: { value: config.colorIntensity },
        uSoftness: { value: config.softness },
        uIdleSpeed: { value: config.idleSpeed }
      },
      vertexShader,
      fragmentShader: displayShader,
      depthTest: false,
      depthWrite: false,
      toneMapped: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
    const displayPlane = new THREE.Mesh(geometry, displayMaterial);

    const fluidScene = new THREE.Scene();
    fluidScene.add(fluidPlane);

    const displayScene = new THREE.Scene();
    displayScene.add(displayPlane);

    // ============== 6. Sizing & Soft Reset ==============
    let softResetFramesLeft = 0;
    function requestSoftReset(frames = 12, perFrameAttenuation = 0.15) {
      softResetFramesLeft = frames;
      fluidMaterial.uniforms.uSoftReset.value = perFrameAttenuation;
    }

    function setRendererSize({ resetFluid = false } = {}) {
      const { width, height } = getCanvasSize();
      renderer.setSize(width, height);
      fluidMaterial.uniforms.iResolution.value.set(width, height);
      displayMaterial.uniforms.iResolution.value.set(width, height);
      fluidTarget1.setSize(width, height);
      fluidTarget2.setSize(width, height);
      if (resetFluid) requestSoftReset(config.softResetFrames, config.softResetStrength);
    }

    setRendererSize();

    // ============== 7. Pointer Tracking (Fluid Interaction) ==============
    let mouseX = 0, mouseY = 0, prevMouseX = 0, prevMouseY = 0;
    let lastMoveTime = 0;

    function updateMouseUniform(x, y) {
      if (prevMouseX === 0 && prevMouseY === 0) {
        prevMouseX = x;
        prevMouseY = y;
      } else {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }
      mouseX = x;
      mouseY = y;
      lastMoveTime = performance.now();
      fluidMaterial.uniforms.iMouse.value.set(mouseX, mouseY, prevMouseX, prevMouseY);
    }

    const onPointerMove = (e) => {
      const r = container.getBoundingClientRect();
      // Check if mouse is hovering in the hero viewport
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        if (fluidMaterial.uniforms.iMouse.value.z > 0.0) {
          fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
          prevMouseX = 0;
          prevMouseY = 0;
        }
        return;
      }

      const x = e.clientX - r.left;
      const y = r.height - (e.clientY - r.top); // WebGL bottom-left origin

      const dx = x - mouseX;
      const dy = y - mouseY;
      const speed = Math.hypot(dx, dy);

      // Speed-dependent brush scale (Codegrid dynamic feel)
      const speedFactor = Math.min(1.35, Math.max(0.8, 0.8 + speed * 0.0035));
      fluidMaterial.uniforms.uBrushStrength.value = config.brushStrength;
      fluidMaterial.uniforms.uBrushSize.value = config.brushSize * speedFactor;

      updateMouseUniform(x, y);
    };

    const onPointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
      prevMouseX = 0;
      prevMouseY = 0;
      fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
      fluidMaterial.uniforms.uBrushStrength.value = config.brushStrength;
      fluidMaterial.uniforms.uBrushSize.value = config.brushSize;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    // ============== 8. Main Render Loop ==============
    let frameCount = 0;
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      fluidMaterial.uniforms.iTime.value = time;
      displayMaterial.uniforms.iTime.value = time;
      fluidMaterial.uniforms.iFrame.value = frameCount;

      // Inactivity Settling: If cursor hasn't moved in >120ms, reset mouse impulse so fluid relaxes naturally
      if (performance.now() - lastMoveTime > 120) {
        if (fluidMaterial.uniforms.iMouse.value.z > 0.0) {
          fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
          prevMouseX = mouseX;
          prevMouseY = mouseY;
        }
      }

      // Pass 1: Simulate Fluid into current offscreen render target
      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
      renderer.setRenderTarget(currentFluidTarget);
      renderer.render(fluidScene, camera);

      // Soft reset decay handler
      if (softResetFramesLeft > 0) {
        softResetFramesLeft--;
        if (softResetFramesLeft === 0) {
          fluidMaterial.uniforms.uSoftReset.value = 0.0;
        }
      }

      // Pass 2: Display Gradient to Canvas with Fluid Distortion
      displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      // Ping-pong buffer swap (output of this frame becomes input of next frame)
      const temp = currentFluidTarget;
      currentFluidTarget = previousFluidTarget;
      previousFluidTarget = temp;

      frameCount++;
    }

    animate();

    // ============== 9. Resize Handling ==============
    let resizeRaf = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => setRendererSize({ resetFluid: false }));
    };

    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      fluidMaterial.dispose();
      displayMaterial.dispose();
      fluidTarget1.dispose();
      fluidTarget2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
