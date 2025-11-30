import { Effects } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Particles } from './gl/particles'
import { VignetteShader } from './gl/shaders/vignetteShader'

// GL Background Component (without leva controls)
// Note: This component is currently unused but kept for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GLBackground = ({ hovering }: { hovering: boolean }) => {
    // Default values from the original leva controls
    const speed = 1.0
    const focus = 3.8
    const aperture = 1.79
    const size = 512
    const noiseScale = 0.6
    const noiseIntensity = 0.52
    const timeScale = 1
    const pointSize = 10.0
    const opacity = 0.4
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
                    far: 100,
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
            <img src="/hero-bg.png" alt="Sulmi Performance Electric Bikes" className="absolute top-0 left-0 w-full h-full object-cover z-10" />
        </div>
    )
}