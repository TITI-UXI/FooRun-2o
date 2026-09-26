'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

export function SpotlightCard({ children, className = '', as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'article' }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const Component = motion[as]
  function handleMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -4)
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 4)
  }
  return <Component onMouseMove={handleMove} onMouseLeave={() => { rotateX.set(0); rotateY.set(0) }} style={{ rotateX, rotateY, transformPerspective: 900 }} className={`group relative overflow-hidden ${className}`}>
    <motion.span aria-hidden="true" className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" style={{ x, y, background: 'radial-gradient(circle, rgba(255,77,0,.22), transparent 42%)' }} />
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,107,0,.12), transparent 38%)' }} />
    <span className="relative z-10 block">{children}</span>
  </Component>
}

export function MagneticButton({ children, className = '', ...props }: React.ComponentProps<typeof motion.button>) {
  const x = useSpring(0, { stiffness: 240, damping: 18 })
  const y = useSpring(0, { stiffness: 240, damping: 18 })
  return <motion.button {...props} style={{ x, y, ...props.style }} onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * .08); y.set((event.clientY - rect.top - rect.height / 2) * .08) }} onMouseLeave={() => { x.set(0); y.set(0) }} className={`transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(255,77,0,.28)] ${className}`}>{children}</motion.button>
}

export function CountUp({ value }: { value: string }) {
  return <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .7 }} transition={{ duration: .6 }}>{value}</motion.span>
}
