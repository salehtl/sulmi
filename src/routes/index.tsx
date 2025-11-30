import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'

// Lazy load heavy components
const WaitlistForm = lazy(() => import('../components/WaitlistForm'))
const Specifications = lazy(() => import('../components/Specifications'))
const Innovation = lazy(() => import('../components/Innovation'))

// Loading fallback
const ComponentLoader = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center">
    <div className="text-white/60">Loading...</div>
  </div>
)

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full">
      <Hero />
      <Suspense fallback={<ComponentLoader />}>
        <Innovation />
        <Specifications />
        <WaitlistForm />
      </Suspense>
    </div>
  )
}
