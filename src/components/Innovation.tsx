import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const INNOVATIONS = [
    {
        title: "Proprietary Motor",
        description: "Custom-engineered electric motor with optimized power-to-weight ratio for thrilling acceleration and exceptional efficiency across all riding conditions.",
        bgImage: "/dynamic-shot.webp"
    },
    {
        title: "Intelligent BMS",
        description: "Adaptive battery management system with predictive thermal control ensures maximum range repeatability, faster charging, and extended battery lifespan.",
        bgImage: "/battery.webp"
    },
    {
        title: "SIRA Safety Suite",
        description: "Advanced sensor fusion providing blind-spot detection, real-time collision alerts, and integrated navigation for confident, secure riding.",
        bgImage: "/sira.webp"
    },
    {
        title: "Mobile Integration",
        description: "Seamless app connectivity for vehicle control, charging management, ride analytics, climate settings, and real-time location tracking.",
        bgImage: "/mobile-integration.webp"
    },
    {
        title: "Thermal Management",
        description: "Advanced cooling systems maintain optimal motor and battery temperatures, ensuring consistent performance and longevity in demanding conditions.",
        bgImage: "/thermal.webp"
    },
    {
        title: "Sustainable Design",
        description: "Zero-emission electric powertrain paves the way to eco-friendly roads while maintaining premium performance and thrilling riding experience.",
        bgImage: "/sustainable.webp"
    }
];

export default function Innovation() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentInnovation = INNOVATIONS[currentIndex];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % INNOVATIONS.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + INNOVATIONS.length) % INNOVATIONS.length);
    };

    return (
        <section id='innovation' className='relative w-full bg-black border-t border-white/10'>
            <div className='flex flex-col md:flex-row min-h-screen md:h-screen'>
                {/* Image Section - Larger Area */}
                <div className='relative w-full md:w-[65%] h-[50vh] md:h-full overflow-hidden bg-black'>
                    {/* Subtle gradient overlay for depth */}
                    <div className='absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent z-10 pointer-events-none' />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="absolute inset-0 z-0"
                        >
                            <img
                                src={currentInnovation.bgImage}
                                alt={`${currentInnovation.title} - Sulmi Electric Motorbike Innovation UAE`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Content Section - Smaller Area */}
                <div className='relative w-full md:w-[35%] bg-black flex flex-col justify-center px-6 sm:px-8 md:px-8 py-8 sm:py-10 md:py-12'>
                    {/* Subtle accent line on desktop */}
                    <div className='hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent' />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-white"
                        >
                            <div className='flex items-center gap-3 mb-2'>
                                <div className='h-px w-8 bg-white/30' />
                                <span className='text-white/30 text-xs font-mono uppercase tracking-wider'>
                                    {String(currentIndex + 1).padStart(2, '0')} / {String(INNOVATIONS.length).padStart(2, '0')}
                                </span>
                            </div>
                            <h2 className='text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter'>
                                {currentInnovation.title}
                            </h2>
                            <p className='text-base sm:text-lg md:text-lg text-white/80 leading-relaxed'>
                                {currentInnovation.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <button
                            onClick={prevSlide}
                            className="p-2.5 sm:p-3 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors duration-150"
                            aria-label="Previous slide"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2.5 sm:p-3 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors duration-150"
                            aria-label="Next slide"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Slide Indicators */}
                        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                            {INNOVATIONS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-1.5 sm:h-2 transition-all duration-200 ${index === currentIndex
                                        ? 'w-6 sm:w-8 bg-white'
                                        : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

