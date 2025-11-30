import { z } from 'zod'
import { useAppForm } from '@/hooks/demo.form'
import { useStore } from '@tanstack/react-form'
import { fieldContext, useFieldContext } from '@/hooks/demo.form-context'
import { Effects } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Particles } from './gl/particles'
import { VignetteShader } from './gl/shaders/vignetteShader'

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
  const opacity = 0.4
  const planeScale = 10.0
  const useManualTime = false
  const manualTime = 0
  const vignetteDarkness = 1.5
  const vignetteOffset = 0.4

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
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
    </div>
  )
}

const waitlistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
})

// Custom styled TextField for waitlist form
function WaitlistTextField({
  label,
  placeholder,
}: {
  label: string
  placeholder?: string
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div>
      <label htmlFor={field.name} className="block text-white/90 mb-2 text-sm font-medium">
        {label}
      </label>
      <input
        id={field.name}
        value={field.state.value}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={`input ${field.state.meta.isTouched && errors.length > 0 ? 'input-error' : ''}`}
      />
      {field.state.meta.isTouched && errors.length > 0 && (
        <div className="mt-2">
          {errors.map((error) => (
            <div
              key={typeof error === 'string' ? error : error.message}
              className="text-[#D63C3A] text-sm"
            >
              {typeof error === 'string' ? error : error.message}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WaitlistForm() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
    },
    validators: {
      onBlur: waitlistSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: Replace with actual API call
      console.log('Waitlist submission:', value)
      alert('Thank you! You\'ve been added to the waitlist.')
      form.reset()
    },
  })

  // For "hovering" effect, you can improve this with section focus/hover logic if needed
  const hovering = false

  // New: track if form is pristine (untouched and unchanged from defaults)
  // (isPristine is no longer needed since we are removing disabled logic)

  return (
    <section id="waitlist" className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 sm:px-8 lg:px-12 bg-black text-white overflow-hidden">
      {/* GL background shader behind content */}
      <GLBackground hovering={hovering} />
      {/* Waitlist form content overlays the GLBackground */}
      <div className="max-w-2xl mx-auto w-full relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Join the Waitlist
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto">
            Be among the first to experience the future of electric mobility.
            Get notified when we launch.
          </p>
        </div>

        <div className="bg-[#262626]/50 backdrop-blur-sm border border-white/20 p-8 sm:p-12">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            <form.AppField name="name">
              {(field) => (
                <fieldContext.Provider value={field}>
                  <WaitlistTextField
                    label="Full Name"
                    placeholder="Enter your full name"
                  />
                </fieldContext.Provider>
              )}
            </form.AppField>

            <form.AppField
              name="email"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return 'Email is required'
                  }
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return 'Please enter a valid email address'
                  }
                  return undefined
                },
              }}
            >
              {(field) => (
                <fieldContext.Provider value={field}>
                  <WaitlistTextField
                    label="Email"
                    placeholder="your.email@example.com"
                  />
                </fieldContext.Provider>
              )}
            </form.AppField>

            <div className="pt-4">
              <form.AppForm>
                <form.Subscribe selector={state => ({
                  isSubmitting: state.isSubmitting,
                  isValid: state.isValid,
                })}>
                  {({ isSubmitting }) => (
                    <button
                      type="submit"
                      className="btn-secondary btn-full"
                    >
                      {isSubmitting ? 'JOINING...' : 'JOIN NOW'}
                    </button>
                  )}
                </form.Subscribe>
              </form.AppForm>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

