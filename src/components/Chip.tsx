import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  roundness?: string
  showDot?: boolean
  dotColor?: string
  className?: string
}

export default function Chip({
  children,
  roundness = '6px',
  showDot = true,
  dotColor = '#A1CBFF',
  className = '',
}: ChipProps) {
  const cornerLineHeight = '12px'
  const cornerLineOffset = '1.5px'

  // Generate the polygon clip-path
  const clipPath = `polygon(${roundness} 0, calc(100% - ${roundness}) 0, 100% ${roundness}, 100% calc(100% - ${roundness}), calc(100% - ${roundness}) 100%, ${roundness} 100%, 0 calc(100% - ${roundness}), 0 ${roundness})`

  return (
    <div
      style={{
        '--poly-roundness': roundness,
        clipPath: clipPath,
      } as React.CSSProperties}
      className={`relative bg-[#262626]/50 transform-gpu font-medium text-white/70 backdrop-blur-sm font-mono text-sm inline-flex items-center justify-center px-3 h-8 border border-white/20 ${className}`}
    >
      {/* Top-left corner line */}
      <span
        style={{
          '--h': cornerLineHeight,
          '--hh': cornerLineOffset,
        } as React.CSSProperties}
        className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[2px] -rotate-45 origin-top -translate-x-1/2 bg-white/40"
      />

      {/* Top-right corner line */}
      <span
        style={{
          '--h': cornerLineHeight,
          '--hh': cornerLineOffset,
        } as React.CSSProperties}
        className="absolute w-[var(--h)] top-[var(--hh)] right-[var(--hh)] h-[2px] bg-white/40 rotate-45 translate-x-1/2"
      />

      {/* Bottom-left corner line */}
      <span
        style={{
          '--h': cornerLineHeight,
          '--hh': cornerLineOffset,
        } as React.CSSProperties}
        className="absolute w-[var(--h)] bottom-[var(--hh)] left-[var(--hh)] h-[2px] bg-white/40 rotate-45 -translate-x-1/2"
      />

      {/* Bottom-right corner line */}
      <span
        style={{
          '--h': cornerLineHeight,
          '--hh': cornerLineOffset,
        } as React.CSSProperties}
        className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[2px] bg-white/40 -rotate-45 translate-x-1/2"
      />

      {/* Dot indicator with glow */}
      {showDot && (
        <span
          className="inline-block size-2.5 rounded-full mr-2"
          style={{
            backgroundColor: dotColor,
            boxShadow: `0 0 8px ${dotColor}80, 0 0 4px ${dotColor}60`,
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </div>
  )
}

