'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => { const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max * 100 : 0) }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  return <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[100] h-1 bg-transparent"><div className="h-full bg-gradient-to-r from-[#FF4D00] via-[#FF6B00] to-[#00F59B] shadow-[0_0_14px_rgba(255,77,0,.8)] transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
}
