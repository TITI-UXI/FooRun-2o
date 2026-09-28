'use client'

import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import { useLanguageAndTheme } from '@/components/language-theme-context'

const copy = {
  fa: {
    title: 'آمادگی و شادابی',
    kicker: 'FooRun Training',
    heading: 'روند پیشرفت خود را ببینید',
    description: 'عملکرد همه‌چیز درباره قله‌ها و دره‌هاست. مطمئن شوید برای رویداد بزرگ بعدی آماده‌اید.',
    cta: 'شروع دوره آزمایشی رایگان',
    fitness: 'آمادگی',
    fatigue: 'خستگی',
  },
  en: {
    title: 'Fitness & Freshness',
    kicker: 'FooRun Training',
    heading: 'See Your Trend',
    description: 'Performance is all about peaks and valleys. Make sure you\'re ready for the next big event.',
    cta: 'Start Your Free Trial',
    fitness: 'Fitness',
    fatigue: 'Fatigue',
  },
} as const

function TrendChart({ fa }: { fa: boolean }) {
  return <div className="mx-auto w-full max-w-[560px]" aria-label={fa ? 'نمودار آمادگی و خستگی' : 'Fitness and fatigue trend chart'} role="img">
    <svg viewBox="0 0 560 250" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="fitness-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8d55aa" stopOpacity=".34" /><stop offset="1" stopColor="#8d55aa" stopOpacity=".04" /></linearGradient>
        <linearGradient id="fatigue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fc5200" stopOpacity=".2" /><stop offset="1" stopColor="#fc5200" stopOpacity=".02" /></linearGradient>
      </defs>
      <line x1="44" y1="128" x2="510" y2="128" stroke="currentColor" strokeOpacity=".18" strokeDasharray="4 6" />
      <path d="M44 170 L78 155 L106 158 L132 120 L158 134 L184 92 L212 112 L238 82 L265 101 L291 68 L316 92 L344 80 L370 110 L397 94 L423 119 L450 103 L478 126 L510 112 L510 205 L44 205 Z" fill="url(#fitness-fill)" />
      <path d="M44 170 L78 155 L106 158 L132 120 L158 134 L184 92 L212 112 L238 82 L265 101 L291 68 L316 92 L344 80 L370 110 L397 94 L423 119 L450 103 L478 126 L510 112" fill="none" stroke="#8d55aa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 184 C124 170 158 190 226 156 S350 168 410 145 S470 158 510 146 L510 205 L44 205 Z" fill="url(#fatigue-fill)" />
      <path d="M44 184 C124 170 158 190 226 156 S350 168 410 145 S470 158 510 146" fill="none" stroke="#fc5200" strokeWidth="2.5" strokeDasharray="7 7" opacity=".82" />
      <line x1="478" y1="100" x2="478" y2="205" stroke="#8d55aa" strokeOpacity=".35" strokeDasharray="3 5" />
      <circle cx="478" cy="126" r="7" fill="#8d55aa" stroke="white" strokeWidth="3" />
      <text x="486" y="111" fill="currentColor" fontSize="18" fontWeight="700">66</text>
      <text x="44" y="230" fill="currentColor" opacity=".45" fontSize="11">{fa ? 'امروز' : 'Today'}</text>
      <text x="450" y="230" fill="currentColor" opacity=".45" fontSize="11">{fa ? 'زمان' : 'Time'}</text>
    </svg>
    <div className="mt-1 flex justify-center gap-5 text-xs text-slate-500 dark:text-white/45"><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#8d55aa]" />{fa ? 'آمادگی' : 'Fitness'}</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#fc5200]" />{fa ? 'خستگی' : 'Fatigue'}</span></div>
  </div>
}

export default function FooRunFitnessPage() {
  const { language } = useLanguageAndTheme()
  const fa = language === 'fa'
  const t = copy[language]

  return <div dir={fa ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-slate-950 dark:bg-[#080b10] dark:text-white">
    <Header />
    <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1180px] flex-col px-5 py-10 md:py-12">
      <div className="border-b border-slate-200 pb-8 dark:border-white/10"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#fc5200]">{t.kicker}</p><h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h1></div>
      <section className="flex flex-1 items-center justify-center py-10 md:py-16"><div className="w-full max-w-[760px] rounded-3xl border border-slate-200 bg-white px-5 py-8 text-center shadow-[0_24px_80px_rgba(15,23,42,.07)] dark:border-white/10 dark:bg-[#11151d] dark:shadow-[0_24px_90px_rgba(0,0,0,.32)] md:px-14 md:py-12"><TrendChart fa={fa} /><h2 className="mt-9 text-2xl font-bold tracking-tight md:text-3xl">{t.heading}</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-white/55 md:text-base">{t.description}</p><button className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#fc5200] px-5 text-sm font-bold text-white shadow-[0_0_28px_rgba(252,82,0,.2)] transition hover:bg-[#ff6a24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#11151d]">{t.cta}<ArrowRight size={17} className={fa ? 'rotate-180' : ''} /></button></div></section>
    </main>
  </div>
}
