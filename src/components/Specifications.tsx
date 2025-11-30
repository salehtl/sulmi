import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPECIFICATIONS = [
    {
        model: "Base Model",
        specs: [
            { label: "Battery Capacity", value: "11 kWh" },
            { label: "Urban Range", value: "300+ km" },
            { label: "0-100 km/h", value: "<5.0s" },
            { label: "Top Speed", value: "155 km/h" },
            { label: "Motor Power", value: "35 kW" },
            { label: "Fast Charging", value: "AC 6-8 hrs" }
        ]
    },
    {
        model: "Long Range",
        specs: [
            { label: "Battery Capacity", value: "15.5 kWh" },
            { label: "Urban Range", value: "320+ km" },
            { label: "0-100 km/h", value: "<4.8s" },
            { label: "Top Speed", value: "155 km/h" },
            { label: "Motor Power", value: "35 kW" },
            { label: "Fast Charging", value: "DC <35 min" }
        ]
    },
    {
        model: "Premium",
        specs: [
            { label: "Battery Capacity", value: "11 kWh HD" },
            { label: "Urban Range", value: "260+ km" },
            { label: "0-100 km/h", value: "<4.0s" },
            { label: "Top Speed", value: "160+ km/h" },
            { label: "Motor Power", value: "52-70 kW" },
            { label: "Fast Charging", value: "AC Optimized" }
        ]
    }
];

// Helper function to determine best value
const getBestValue = (label: string, values: string[]): string => {
    const numericValues = values.map(v => {
        // Extract numeric value, handling ranges like "52-70"
        const match = v.match(/(\d+\.?\d*)/);
        if (match) {
            const num = parseFloat(match[1]);
            // For ranges, take the max value
            const rangeMatch = v.match(/(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/);
            if (rangeMatch) {
                return { original: v, numeric: Math.max(parseFloat(rangeMatch[1]), parseFloat(rangeMatch[2])) };
            }
            return { original: v, numeric: num };
        }
        return { original: v, numeric: 0 };
    });

    // Determine if higher or lower is better based on label
    const higherIsBetter = ['Battery Capacity', 'Urban Range', 'Top Speed', 'Motor Power'].some(
        l => label.includes(l)
    );
    const lowerIsBetter = ['0-100 km/h'].some(l => label.includes(l));

    // For Fast Charging, lower time is better (but we need to parse time strings)
    if (label.includes('Fast Charging')) {
        const timeValues = values.map(v => {
            const hoursMatch = v.match(/(\d+)\s*hrs?/);
            const minutesMatch = v.match(/(\d+)\s*min/);
            if (hoursMatch) return { original: v, numeric: parseFloat(hoursMatch[1]) * 60 };
            if (minutesMatch) return { original: v, numeric: parseFloat(minutesMatch[1]) };
            return { original: v, numeric: Infinity }; // "Optimized" or other text
        });
        const min = Math.min(...timeValues.map(v => v.numeric));
        return timeValues.find(v => v.numeric === min)?.original || values[0];
    }

    if (higherIsBetter) {
        const max = Math.max(...numericValues.map(v => v.numeric));
        return numericValues.find(v => v.numeric === max)?.original || values[0];
    } else if (lowerIsBetter) {
        const min = Math.min(...numericValues.map(v => v.numeric));
        return numericValues.find(v => v.numeric === min)?.original || values[0];
    }

    return values[0];
};

export default function Specifications() {
    const [selectedModel, setSelectedModel] = useState(0);
    const [compareMode, setCompareMode] = useState(false);
    const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
    const currentSpecs = SPECIFICATIONS[selectedModel].specs;

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            setSelectedModel(index - 1);
        } else if (e.key === 'ArrowRight' && index < SPECIFICATIONS.length - 1) {
            setSelectedModel(index + 1);
        } else if (e.key === 'Home') {
            setSelectedModel(0);
        } else if (e.key === 'End') {
            setSelectedModel(SPECIFICATIONS.length - 1);
        }
    };

    return (
        <section id="specs" className="container mx-auto px-4 py-12 md:py-24">
            {/* Model Selector */}
            <div className="mb-8 md:mb-16">
                {/* Mobile Header */}
                {!compareMode && (
                    <div className="flex items-center justify-center mb-6 md:hidden">
                        <span className="text-white/60 text-sm font-mono">
                            {SPECIFICATIONS[selectedModel].model} • {selectedModel + 1}/{SPECIFICATIONS.length}
                        </span>
                    </div>
                )}

                {/* Desktop Header */}
                <div className="hidden md:flex items-center justify-between mb-6">
                    <h2 className="text-white/40 text-xs font-mono uppercase tracking-wider">
                        {compareMode ? 'Compare Models' : 'Select Model'}
                    </h2>
                    <div className="flex items-center gap-4">
                        {!compareMode && (
                            <span className="text-white/40 text-xs font-mono">
                                {selectedModel + 1} / {SPECIFICATIONS.length}
                            </span>
                        )}
                        <motion.button
                            onClick={() => {
                                if (compareMode) {
                                    setCompareMode(false);
                                    setSelectedForCompare([]);
                                } else {
                                    setCompareMode(true);
                                }
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                px-4 py-2
                                font-mono text-xs
                                tracking-wider
                                border transition-all duration-300
                                focus:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-[#D63C3A]
                                ${compareMode
                                    ? 'border-[#D63C3A] bg-[#D63C3A]/10 text-white'
                                    : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                                }
                            `}
                        >
                            {compareMode ? 'Exit Compare' : 'Compare'}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Compare Toggle */}
                <div className="md:hidden mb-6 flex items-center justify-between">
                    {compareMode ? (
                        <h2 className="text-white/40 text-xs font-mono uppercase tracking-wider">
                            Compare Models
                        </h2>
                    ) : (
                        <div></div>
                    )}
                    <motion.button
                        onClick={() => {
                            if (compareMode) {
                                setCompareMode(false);
                                setSelectedForCompare([]);
                            } else {
                                setCompareMode(true);
                            }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                            px-4 py-2
                            font-mono text-xs
                            tracking-wider
                            border transition-all duration-300
                            touch-manipulation
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#D63C3A]
                            ${compareMode
                                ? 'border-[#D63C3A] bg-[#D63C3A]/10 text-white'
                                : 'border-white/20 text-white/60 active:border-white/40 active:text-white'
                            }
                        `}
                    >
                        {compareMode ? 'Exit' : 'Compare'}
                    </motion.button>
                </div>

                {/* Mobile: Horizontal Scrollable Tabs */}
                {!compareMode && (
                    <div
                        className="md:hidden relative overflow-x-auto overflow-y-hidden -mx-4 px-4 hide-scrollbar"
                        role="tablist"
                        aria-label="Model selection"
                    >
                        <div className="flex gap-3 border-b border-white/15 pb-1 min-w-max">
                            {SPECIFICATIONS.map((model, index) => (
                                <motion.button
                                    key={model.model}
                                    onClick={() => setSelectedModel(index)}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        relative px-5 py-3.5
                                        min-h-[48px]
                                        font-mono text-sm
                                        tracking-wider
                                        transition-all duration-300
                                        min-w-[100px]
                                        touch-manipulation
                                        focus:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-[#D63C3A]
                                        active:bg-white/10
                                        ${selectedModel === index
                                            ? 'text-white'
                                            : 'text-white/50 active:text-white/80'
                                        }
                                    `}
                                    aria-label={`Select ${model.model} model`}
                                    aria-pressed={selectedModel === index}
                                    role="tab"
                                    aria-selected={selectedModel === index}
                                    tabIndex={0}
                                >
                                    {model.model}
                                    {selectedModel === index && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D63C3A]"
                                            layoutId="activeTabMobile"
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Desktop: Tab-style Selector */}
                {!compareMode && (
                    <div
                        className="hidden md:flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start pb-1"
                        role="tablist"
                        aria-label="Model selection"
                    >
                        {SPECIFICATIONS.map((model, index) => (
                            <motion.button
                                key={model.model}
                                onClick={() => setSelectedModel(index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    relative px-6 py-3 md:px-8 md:py-4
                                    font-mono text-sm md:text-base
                                    tracking-wider
                                    transition-all duration-300
                                    focus:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-[#D63C3A]
                                    focus-visible:ring-offset-2
                                    focus-visible:ring-offset-black
                                    ${selectedModel === index
                                        ? 'text-white'
                                        : 'text-white/50 hover:text-white/80'
                                    }
                                `}
                                aria-label={`Select ${model.model} model`}
                                aria-pressed={selectedModel === index}
                                role="tab"
                                aria-selected={selectedModel === index}
                                tabIndex={0}
                            >
                                {model.model}
                                {selectedModel === index && (
                                    <>
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D63C3A]"
                                            layoutId="activeTab"
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 30
                                            }}
                                        />
                                        <motion.div
                                            className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#D63C3A] hidden md:block"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-[#D63C3A]/5 -z-10"
                                            layoutId="activeGlow"
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 30
                                            }}
                                        />
                                    </>
                                )}
                            </motion.button>
                        ))}
                    </div>
                )}

                {/* Compare Mode: Multi-select */}
                {compareMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                    >
                        <p className="text-white/50 text-sm font-mono mb-4 text-center">
                            Select up to 3 models to compare
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {SPECIFICATIONS.map((model, index) => {
                                const isSelected = selectedForCompare.includes(index);
                                const canSelect = selectedForCompare.length < 3 || isSelected;

                                return (
                                    <motion.button
                                        key={model.model}
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedForCompare(prev => prev.filter(i => i !== index));
                                            } else if (canSelect) {
                                                setSelectedForCompare(prev => [...prev, index]);
                                            }
                                        }}
                                        disabled={!canSelect && !isSelected}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
                                            relative px-6 py-3
                                            font-mono text-sm md:text-base
                                            border-2 transition-all duration-300
                                            min-w-[120px] md:min-w-[140px]
                                            touch-manipulation
                                            focus:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-[#D63C3A]
                                            ${isSelected
                                                ? 'border-[#D63C3A] bg-[#D63C3A]/10 text-white'
                                                : canSelect
                                                    ? 'border-white/20 bg-black/30 text-white/60 hover:border-white/40 hover:text-white active:border-white/40 active:text-white'
                                                    : 'border-white/10 bg-black/20 text-white/30 cursor-not-allowed'
                                            }
                                        `}
                                        aria-label={`${isSelected ? 'Deselect' : 'Select'} ${model.model} for comparison`}
                                    >
                                        <div className="flex items-center gap-2 justify-center">
                                            <div className={`
                                                w-4 h-4 border-2 flex items-center justify-center transition-all
                                                ${isSelected ? 'border-[#D63C3A] bg-[#D63C3A]' : 'border-white/40 bg-transparent'}
                                            `}>
                                                {isSelected && (
                                                    <motion.svg
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-3 h-3 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </motion.svg>
                                                )}
                                            </div>
                                            {model.model}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                        {selectedForCompare.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 text-center"
                            >
                                <span className="text-white/60 text-sm font-mono">
                                    {selectedForCompare.length} model{selectedForCompare.length > 1 ? 's' : ''} selected
                                    {selectedForCompare.length < 2 && ' • Select at least 2 to compare'}
                                </span>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Content: Single View or Compare View */}
            <AnimatePresence mode="wait">
                {compareMode && selectedForCompare.length >= 2 ? (
                    // Comparison View
                    <motion.div
                        key="compare"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    >
                        {/* Desktop: Comparison Table */}
                        <div className="hidden md:block overflow-x-auto hide-scrollbar">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="sticky left-0 z-10 bg-black/95 p-4 text-left border-b border-white/15 backdrop-blur-sm">
                                            <span className="text-white/60 text-xs font-mono uppercase tracking-wider">
                                                Specification
                                            </span>
                                        </th>
                                        {selectedForCompare.map((index) => (
                                            <th
                                                key={index}
                                                className="p-4 text-center border-b border-white/15 min-w-[180px] bg-black/50"
                                            >
                                                <span className="text-white text-lg font-semibold font-mono">
                                                    {SPECIFICATIONS[index].model}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {SPECIFICATIONS[0].specs.map((spec, specIndex) => {
                                        const values = selectedForCompare.map(idx =>
                                            SPECIFICATIONS[idx].specs[specIndex].value
                                        );
                                        const allSame = values.every(v => v === values[0]);
                                        const bestValue = getBestValue(spec.label, values);

                                        return (
                                            <tr key={spec.label} className="border-b border-white/10 hover:bg-black/20 transition-colors">
                                                <td className="sticky left-0 z-10 bg-black/95 p-4 border-r border-white/15 backdrop-blur-sm">
                                                    <span className="text-white/60 text-xs font-mono uppercase tracking-wider">
                                                        {spec.label}
                                                    </span>
                                                </td>
                                                {selectedForCompare.map((index) => {
                                                    const specValue = SPECIFICATIONS[index].specs[specIndex].value;
                                                    const isBest = !allSame && specValue === bestValue;

                                                    return (
                                                        <td
                                                            key={index}
                                                            className={`
                                                                p-4 text-center
                                                                transition-colors
                                                                ${isBest ? 'bg-[#D63C3A]/10' : ''}
                                                            `}
                                                        >
                                                            <div className="flex flex-col items-center gap-1">
                                                                <span className="text-white text-lg font-semibold">
                                                                    {specValue}
                                                                </span>
                                                                {isBest && (
                                                                    <motion.span
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        className="text-[#D63C3A] text-xs font-mono px-2 py-0.5 bg-[#D63C3A]/20"
                                                                    >
                                                                        Best
                                                                    </motion.span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile: Stacked Comparison Cards */}
                        <div className="md:hidden space-y-6">
                            {selectedForCompare.map((index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border border-white/15 bg-black/30 p-6"
                                >
                                    <h3 className="text-white text-xl font-semibold font-mono mb-4">
                                        {SPECIFICATIONS[index].model}
                                    </h3>
                                    <div className="space-y-4">
                                        {SPECIFICATIONS[index].specs.map((spec, specIndex) => {
                                            const allValues = selectedForCompare.map(idx =>
                                                SPECIFICATIONS[idx].specs[specIndex].value
                                            );
                                            const allSame = allValues.every(v => v === allValues[0]);
                                            const bestValue = getBestValue(spec.label, allValues);
                                            const isBest = !allSame && spec.value === bestValue;

                                            return (
                                                <div key={spec.label} className="flex justify-between items-center">
                                                    <span className="text-white/60 text-xs font-mono uppercase">
                                                        {spec.label}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white text-lg font-semibold">
                                                            {spec.value}
                                                        </span>
                                                        {isBest && (
                                                            <span className="text-[#D63C3A] text-xs font-mono px-2 py-0.5 bg-[#D63C3A]/20">
                                                                Best
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : !compareMode ? (
                    // Single Model View
                    <motion.div
                        key={selectedModel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                    >
                        {currentSpecs.map((spec) => (
                            <div
                                key={spec.label}
                                className="
                                    p-5 md:p-8
                                    border border-white/15
                                    bg-black/30
                                    backdrop-blur-sm
                                    active:border-white/25
                                    active:bg-black/40
                                    md:hover:border-white/25
                                    md:hover:bg-black/40
                                    transition-all duration-300
                                    touch-manipulation
                                    group
                                "
                            >
                                <div className="flex flex-col space-y-2">
                                    <span className="text-white/60 text-xs md:text-sm font-mono uppercase tracking-wider">
                                        {spec.label}
                                    </span>
                                    <span className="text-white text-xl md:text-2xl font-semibold tracking-tight md:group-hover:text-white/90 transition-colors">
                                        {spec.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    // Empty State: Waiting for selection
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-white/40 text-sm font-mono">
                            Select at least 2 models to compare
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
