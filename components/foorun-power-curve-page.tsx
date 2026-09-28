'use client'

import { ArrowRight, Bike, Check, LockKeyhole, Zap } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import { useLanguageAndTheme } from '@/components/language-theme-context'

const copy = {
  fa: {
    title: 'منحنی توان',
    kicker: 'FooRun Training',
    heading: 'نقاط قوت و ضعف خود را کشف کنید',
    description: 'بهترین تلاش‌های خود را در یک سواری اخیر ببینید و آن‌ها را با بهترین عملکردهای تمام دوران مقایسه کنید.',
    cta: 'شروع دوره آزمایشی رایگان',
    note: 'تحلیل عملکرد دوچرخه‌سواری',
  },
  en: {
    title: 'Power Curve',
    kicker: 'FooRun Training',
    heading: 'Discover your strengths and weaknesses',
    description: 'See your best efforts throughout a recent ride and compare them with your all-time best-efforts.',
    cta: 'Start Your Free Trial',
    note: 'Cycling performance analysis',
  },
} as const

function PowerGraphic() {
  return <div aria-hidden="true" className="relative mx-auto h-52 w-[290px] max-w-full">
    <div className="absolute inset-x-7 bottom-8 h-px bg-slate-300 dark:bg-white/15" />
    <div className="absolute inset-x-7 bottom-8 flex h-40 items-end justify-center gap-1.5">
      {[38, 64, 92, 126, 106, 76, 54].map((height, index) => <div key={height} className="relative w-8 rounded-t-[3px] bg-gradient-to-t from-[#6b3c8c] via-[#9d67ba] to-[#c38bd7]" style={{ height }}><span className="absolute inset-y-0 right-0 w-px bg-white/10" />{index === 3 && <div className="absolute -right-6 -top-12 flex h-11 w-11 items-center justify-center rounded-md bg-[#a266bf] text-white shadow-[0_8px_20px_rgba(162,102,191,.3)]"><Zap size={23} fill="currentColor" /></div>}</div>)}
    </div>
    <div className="absolute bottom-0 left-1/2 h-2 w-20 -translate-x-1/2 rounded-full bg-[#7e479b]/30 blur-sm" />
  </div>
}

export default function FooRunPowerCurvePage() {
  const { language } = useLanguageAndTheme()
  const fa = language === 'fa'
  const t = copy[language]
  return <div dir={fa ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-slate-950 dark:bg-[#080b10] dark:text-white">
    <Header />
    <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1180px] flex-col px-5 py-10 md:py-12">
      <div className="border-b border-slate-200 pb-8 dark:border-white/10"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#fc5200]">{t.kicker}</p><h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h1></div>
      <section className="flex flex-1 items-center justify-center py-12 md:py-20">
        <div className="w-full max-w-[760px] rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_24px_80px_rgba(15,23,42,.08)] dark:border-white/10 dark:bg-[#11151d] dark:shadow-[0_24px_90px_rgba(0,0,0,.35)] md:px-16 md:py-16">
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-[#a266bf]/25 bg-[#a266bf]/10 px-3 py-1.5 text-xs font-medium text-[#8d55aa]"><Bike size={14} />{t.note}</div>
          <PowerGraphic />
          <div className="mx-auto mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#a266bf]/35 bg-[#a266bf]/10 text-[#a266bf]"><LockKeyhole size={17} /></div>
          <h2 className="mx-auto mt-6 max-w-xl text-2xl font-bold tracking-tight md:text-3xl">{t.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/55 md:text-base">{t.description}</p>
          <button className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#fc5200] px-6 text-sm font-bold text-white shadow-[0_0_28px_rgba(252,82,0,.25)] transition hover:bg-[#ff6a24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#11151d]">{t.cta}<ArrowRight className={fa ? 'rotate-180' : ''} size={17} /></button>
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-400 dark:text-white/35"><span className="inline-flex items-center gap-1"><Check size={13} className="text-[#00b77b]" />{fa ? 'مقایسه تلاش‌ها' : 'Compare efforts'}</span><span className="inline-flex items-center gap-1"><Check size={13} className="text-[#00b77b]" />{fa ? 'روند پیشرفت' : 'Track progress'}</span></div>
        </div>
      </section>
    </main>
  </div>
}
