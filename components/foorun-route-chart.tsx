'use client'

import { useState } from 'react'

const points = [{ distance: 0, elevation: 1320, pace: '۶:۱۰' }, { distance: 2.4, elevation: 1410, pace: '۶:۲۵' }, { distance: 5.1, elevation: 1580, pace: '۶:۴۰' }, { distance: 7.8, elevation: 1760, pace: '۷:۰۵' }, { distance: 10.2, elevation: 1840, pace: '۶:۵۵' }, { distance: 12.6, elevation: 1980, pace: '۷:۲۰' }]
const path = 'M0 88 C55 76 84 74 126 63 S202 71 248 44 S330 56 375 27 S448 36 500 12'

export default function FooRunRouteChart() {
  const [active, setActive] = useState(3)
  const point = points[active]
  const x = (active / (points.length - 1)) * 500
  return <div className="relative rounded-2xl border border-white/10 bg-[#080b10]/70 p-4" dir="ltr"><svg viewBox="0 0 500 110" className="h-44 w-full overflow-visible" role="img" aria-label="نمودار تعاملی ارتفاع GPS" onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)); setActive(Math.round(ratio * (points.length - 1))) }}><defs><linearGradient id="elevation-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#00D2FF" stopOpacity=".28" /><stop offset="1" stopColor="#00D2FF" stopOpacity="0" /></linearGradient></defs><path d={`${path} L500 110 L0 110 Z`} fill="url(#elevation-fill)" /><path d={path} fill="none" stroke="#00D2FF" strokeWidth="3" strokeLinecap="round" /><line x1={x} x2={x} y1="6" y2="100" stroke="#FF6B00" strokeDasharray="4 5" /><circle cx={x} cy={12 + active * 10} r="6" fill="#FF4D00" stroke="#fff" strokeWidth="2" /></svg><div className="mt-2 flex justify-between text-xs text-white/45"><span>۰ km</span><span>مسیر GPS · توچال</span><span>۱۲.۶ km</span></div><div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-[#111923]/95 px-3 py-2 text-right text-xs shadow-xl" dir="rtl"><p className="font-bold text-white">{point.distance.toLocaleString('fa-IR')} km</p><p className="mt-1 text-[#00D2FF]">ارتفاع {point.elevation.toLocaleString('fa-IR')} m</p><p className="mt-1 text-[#00F59B]">pace {point.pace} /km</p></div></div>
}
