import { z } from 'zod'
import { useAppForm } from '@/hooks/demo.form'
import { useStore } from '@tanstack/react-form'
import { fieldContext, useFieldContext } from '@/hooks/demo.form-context'

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
        className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#A1CBFF] focus:ring-1 focus:ring-[#A1CBFF] transition-colors"
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

  return (
    <section id="waitlist" className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 sm:px-8 lg:px-12 bg-black text-white">
      <div className="max-w-2xl mx-auto w-full">
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
                <form.Subscribe selector={(state) => state.isSubmitting}>
                  {(isSubmitting) => (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-zinc-100 border-0 border-t-2 border-t-[#D63C3A] rounded-none text-black px-8 py-3 font-semibold shadow hover:bg-zinc-300 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
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

