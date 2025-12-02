import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Hero() {
  // Preload hero image
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = '/hero-bg.jpg'
    document.head.appendChild(link)
  }, [])

  return (
    <section className="relative isolate min-h-svh w-full flex flex-col items-start justify-center overflow-hidden">

      {/* Motion Wrapper */}
      <motion.div
        className="container mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            },
          },
        }}
      >

        {/* Background Image - Optimized with loading="eager" for above-fold */}
        <motion.picture
          className="absolute inset-0 w-full h-full z-10"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <source srcSet="/hero-bg.jpg" type="image/jpeg" />
          <motion.img
            src="/hero-bg.jpg"
            alt="Sulmi EB-ONE Electric Motorbike UAE - Premium Performance Electric Bike"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
        </motion.picture>

        {/* EB One Heading */}
        <motion.div
          className="relative z-20 text-white mix-blend-difference mb-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        >
          <h1 className="2xl:text-[500px] xl:text-[380px] lg:text-[320px] md:text-[280px] sm:text-[240px] text-[160px] leading-[0.9] font-extrabold caret">
            EB-ONE
          </h1>
        </motion.div>
        {/* <motion.img
          src="/eb-one.svg"
          alt="Sulmi Performance Electric Bikes"
          className="relative z-20 h-auto max-w-[1000px] mix-blend-difference mb-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        /> */}

        {/* CTA Button */}
        <motion.a
          href="#waitlist"
          className="relative z-30 btn-primary btn-full mb-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        >
          JOIN WAITLIST
        </motion.a>

      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
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

