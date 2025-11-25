import { Effects } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Particles } from './gl/particles'
import { VignetteShader } from './gl/shaders/vignetteShader'
import Chip from './Chip'

// GL Background Component (without leva controls)
const GLBackground = ({ hovering }: { hovering: boolean }) => {
  // Default values from the original leva controls
  const speed = 1.0
  const focus = 3.8
  const aperture = 1.79
  const size = 512
  const noiseScale = 0.6
  const noiseIntensity = 0.52
  const timeScale = 1
  const pointSize = 10.0
  const opacity = 0.8
  const planeScale = 10.0
  const useManualTime = false
  const manualTime = 0
  const vignetteDarkness = 1.5
  const vignetteOffset = 0.4

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          position: [
            1.2629783123314589, 2.664606471394044, -1.8178993743288914,
          ],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000']} />
        <Particles
          speed={speed}
          aperture={aperture}
          focus={focus}
          size={size}
          noiseScale={noiseScale}
          noiseIntensity={noiseIntensity}
          timeScale={timeScale}
          pointSize={pointSize}
          opacity={opacity}
          planeScale={planeScale}
          useManualTime={useManualTime}
          manualTime={manualTime}
          introspect={hovering}
        />
        <Effects multisamping={0} disableGamma>
          {/* @ts-ignore */}
          <shaderPass
            args={[VignetteShader]}
            uniforms-darkness-value={vignetteDarkness}
            uniforms-offset-value={vignetteOffset}
          />
        </Effects>
      </Canvas>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* GL Background */}
      <GLBackground hovering={false} />
    
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center justify-center gap-4">
      <Chip dotColor="#D63C3A" className="mb-8">
          SULMI PERFORMANCE ELECTRIC BIKES
        </Chip>
        <img src="/eb-one.svg" alt="Sulmi Performance Electric Bikes" className=" w-full h-auto max-w-[600px] mx-auto" />
               
        <p className="text-lg sm:text-xl lg:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed max-w-[600px]">
          Experience the future of electric mobility with precision engineering
          and cutting-edge technology.
        </p>

        {/* CTA Button */}
        <a
          href="#waitlist"
          className="bg-zinc-100 border-0 border-t-2 border-t-[#D63C3A] rounded-none text-black px-8 py-3 font-semibold shadow hover:bg-zinc-300 transition-colors duration-150 cursor-pointer"
        >
          Join Waitlist
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-sm font-medium">Scroll</span>
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

