"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useFBO } from "@react-three/drei"
import { EffectComposer, Bloom, N8AO } from "@react-three/postprocessing"
import * as THREE from "three"

// Shader material otimizado com melhor qualidade visual
const simulationMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uCurrentPosition;
    uniform sampler2D uOriginalPosition;
    uniform float uTime;
    uniform float uCurl;
    uniform float uSpeed;

    // Noise mais suave e eficiente
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vec3 currentPos = texture2D(uCurrentPosition, vUv).xyz;
      vec3 originalPos = texture2D(uOriginalPosition, vUv).xyz;
      
      // Noise mais orgânico
      vec3 noise = vec3(
        snoise(currentPos * 0.8 + uTime * 0.3),
        snoise(currentPos * 0.7 + uTime * 0.2),
        snoise(currentPos * 0.9 + uTime * 0.25)
      );
      
      // Força de atração para posição original (efeito de "respiração")
      vec3 attraction = (originalPos - currentPos) * 0.001;
      
      currentPos += (noise * uCurl + attraction) * uSpeed;
      gl_FragColor = vec4(currentPos, 1.0);
    }
  `,
  uniforms: {
    uCurrentPosition: { value: null },
    uOriginalPosition: { value: null },
    uTime: { value: 0 },
    uCurl: { value: 0.8 }, // Reduzido para movimento mais sutil
    uSpeed: { value: 0.006 }, // Reduzido para movimento mais suave
  },
})

const renderMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    uniform sampler2D uPosition;
    uniform float uTime;
    varying vec3 vColor;
    varying float vDistance;

    void main() {
      vec3 pos = texture2D(uPosition, position.xy).xyz;
      
      // Posição na tela
      vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
      vec4 projectedPosition = projectionMatrix * modelViewPosition;
      gl_Position = projectedPosition;
      
      // Tamanho baseado na distância
      vDistance = -modelViewPosition.z;
      gl_PointSize = max(1.0, 3.0 / vDistance);
      
      // Cores mais vibrantes baseadas na posição
      float r = (pos.x + 1.0) * 0.5;
      float g = (pos.y + 1.0) * 0.5;
      float b = (pos.z + 1.0) * 0.5;
      
      // Cores mais saturadas
      vColor = vec3(
        0.3 + r * 0.7,
        0.2 + g * 0.6,
        0.5 + b * 0.5
      );
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vDistance;
    
    void main() {
      // Forma circular para os pontos
      vec2 coord = gl_PointCoord - vec2(0.5);
      float distance = length(coord);
      
      if (distance > 0.5) discard;
      
      // Gradiente radial suave
      float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
      alpha *= alpha; // Curva mais suave
      
      // Intensidade baseada na distância
      float intensity = min(1.0, 1.5 / vDistance);
      
      gl_FragColor = vec4(vColor * intensity, alpha);
    }
  `,
  uniforms: {
    uPosition: { value: null },
    uTime: { value: 0 },
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
})

export function Scene() {
  // Tamanho muito menor para melhor performance
  const size = 64 // Reduzido para 64x64 (64x menos partículas que o original)
  const pointsRef = useRef<THREE.Points>(null!)
  const { gl } = useThree()

  // Create FBOs
  const fbo1 = useFBO(size, size, {
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
  })
  const fbo2 = useFBO(size, size, {
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
  })

  // Initialize particle positions - geometria mais compacta
  const { particles, originalPositionTexture, particlePositions } = useMemo(() => {
    const particles = new Float32Array(size * size * 4)

    // Torus knot muito menor e mais simples
    const geometry = new THREE.TorusKnotGeometry(0.5, 0.15, 80, 8) // Muito menor e mais eficiente
    const positions = geometry.attributes.position.array

    for (let i = 0; i < size * size; i++) {
      const i4 = i * 4
      const p_i = (i * 3) % positions.length
      particles[i4 + 0] = positions[p_i + 0]
      particles[i4 + 1] = positions[p_i + 1]
      particles[i4 + 2] = positions[p_i + 2]
      particles[i4 + 3] = 1.0
    }

    const originalPositionTexture = new THREE.DataTexture(particles, size, size, THREE.RGBAFormat, THREE.FloatType)
    originalPositionTexture.needsUpdate = true

    // Initialize FBO1
    const tempScene = new THREE.Scene()
    const tempCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const tempMaterial = new THREE.MeshBasicMaterial({ map: originalPositionTexture })
    const tempMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), tempMaterial)
    tempScene.add(tempMesh)

    gl.setRenderTarget(fbo1)
    gl.render(tempScene, tempCamera)
    gl.setRenderTarget(null)

    // Create particle positions for rendering
    const particlePositions = new Float32Array(size * size * 3)
    for (let i = 0; i < size * size; i++) {
      const i3 = i * 3
      particlePositions[i3 + 0] = (i % size) / size
      particlePositions[i3 + 1] = Math.floor(i / size) / size
      particlePositions[i3 + 2] = 0
    }

    return { particles, originalPositionTexture, particlePositions }
  }, [size, gl, fbo1])

  // Simulation loop otimizado
  const frameCount = useRef(0)

  useFrame((state) => {
    const { gl, clock } = state

    // Executar simulação a cada 4 frames (15fps) para melhor performance
    frameCount.current++
    if (frameCount.current % 4 !== 0) {
      // Rotação mais lenta
      if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.002
        pointsRef.current.rotation.x += 0.0008
      }
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Update simulation
    simulationMaterial.uniforms.uCurrentPosition.value = fbo1.texture
    simulationMaterial.uniforms.uOriginalPosition.value = originalPositionTexture
    simulationMaterial.uniforms.uTime.value = clock.elapsedTime

    const simulationMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simulationMaterial)
    scene.add(simulationMesh)

    gl.setRenderTarget(fbo2)
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    // Swap FBOs
    const temp = fbo1.texture
    fbo1.texture = fbo2.texture
    fbo2.texture = temp

    // Update render material
    renderMaterial.uniforms.uPosition.value = fbo1.texture
    renderMaterial.uniforms.uTime.value = clock.elapsedTime

    // Rotação mais suave
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003
      pointsRef.current.rotation.x += 0.001
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={size * size} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <primitive object={renderMaterial} attach="material" />
      </points>
      <EffectComposer>
        <Bloom
          intensity={0.4} // Reduzido para efeito mais sutil
          luminanceThreshold={0.2} // Aumentado para menos partículas brilhantes
          luminanceSmoothing={0.8}
          height={256} // Reduzido para melhor performance
        />
        <N8AO
          quality="low" // Reduzido para melhor performance
          aoRadius={0.3} // Reduzido
          intensity={0.6} // Reduzido
          color="black"
        />
      </EffectComposer>
    </>
  )
}
