import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import WaitlistForm from '../components/WaitlistForm'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full">
      <Hero />
      <WaitlistForm />
    </div>
  )
}
