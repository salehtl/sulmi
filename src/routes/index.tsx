import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import WaitlistForm from '../components/WaitlistForm'
import Specifications from '../components/Specifications'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full">
      <Hero />
      <Specifications />
      <WaitlistForm />
    </div>
  )
}
