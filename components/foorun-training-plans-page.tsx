'use client'

import { useState } from 'react'
import { Bike, Settings2 } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import FooRunFooter from '@/components/Footer'
import { useLanguageAndTheme } from '@/components/language-theme-context'

type Plan = { badge: string; title: string; description: string; color: string; icon: 'run' | 'custom' }

const plans: Plan[] = [
  { badge: '5K', title: '5K Plan', description: 'Whether you are aiming for a 5K PB or wanting to impress at your local road race, this plan is for you.', color: '#3976ff', icon: 'run' },
  { badge: '10K', title: '10K Plan', description: 'Train for your first 10K with our beginner plans, or get your new PB as an experienced runner.', color: '#d7ae29', icon: 'run' },
  { badge: '13.1', title: 'Half Marathon Plan', description: 'No matter if this is your first Half Marathon or your fifth, this plan will get you to that finish line faster.', color: '#35b985', icon: 'run' },
  { badge: '26.2', title: 'Marathon Plan', description: 'Over 16 weeks, build your fitness and endurance, and arrive at the start line ready to run your best marathon.', color: '#ef3d3d', icon: 'run' },
  { badge: '✦', title: 'Custom Plan', description: 'Build a custom plan ranging from 6–26 weeks long and for any distance from 5–50km.', color: '#ff755a', icon: 'custom' },
]

function Shield({ plan }: { plan: Plan }) {
  return <div className="relative flex h-[68px] w-[54px] shrink-0 items-center justify-center" aria-hidden="true"><svg viewBox="0 0 54 68" className="absolute inset-0 h-full w-full"><path d="M27 2 51 10v26c0 14-10 24-24 30C13 60 3 50 3 36V10z" fill="#111318" stroke={plan.color} strokeWidth="3" /><path d="M27 8 45 14v21c0 10-7 18-18 24C16 53 9 45 9 35V14z" fill="none" stroke="rgba(255,255,255,.12)" /></svg>{plan.icon === 'custom' ? <Settings2 size={19} className="relative text-white" /> : <span className="relative text-[15px] font-bold text-white">{plan.badge}</span>}<span className="absolute bottom-4 text-[8px] text-white/70">↯</span></div>
}

export default function FooRunTrainingPlansPage() {
  const { language } = useLanguageAndTheme()
  const fa = language === 'fa'
  const [category, setCategory] = useState<'running' | 'cycling'>('running')
  const copy = fa ? {
    title: 'برنامه‌های تمرینی برای دوندگان', promo: 'با کد STRAVA-TP به دوره آزمایشی رایگان ۲ هفته‌ای دسترسی بگیرید.', running: 'دویدن', cycling: 'دوچرخه‌سواری', start: 'شروع برنامه', next: 'دویدن خود را به سطح بعدی ببرید', support: 'با برنامه‌های شخصی‌سازی‌شده، حمایت لازم برای رسیدن به اهداف ورزشی خود را دریافت کنید.', unlock: 'با کد STRAVA-TP دوره آزمایشی رایگان خود را فعال کنید.', custom: 'برنامه سفارشی'
  } : {
    title: 'Training Plans for Runners', promo: 'Use code STRAVA-TP to get access to a free 2-week trial.', running: 'Running', cycling: 'Cycling', start: 'Start Plan', next: 'Take your running to the next level', support: 'Get the support you need as a runner with tailored running plans to achieve your goals.', unlock: 'Use code STRAVA-TP to unlock your extended free trial.', custom: 'Custom Plan'
  }
  return <div dir={fa ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-slate-900 dark:bg-[#080b10] dark:text-white"><Header /><main className="mx-auto max-w-[1220px] px-5 py-10 md:py-14"><header className="border-b border-slate-200 dark:border-white/10"><h1 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.title}</h1><p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-white/65">{copy.promo}</p><div className="mt-7 flex gap-1"><button onClick={() => setCategory('running')} className={`min-h-11 border-b-2 px-5 text-sm ${category === 'running' ? 'border-[#fc5200] text-[#fc5200]' : 'border-transparent text-slate-500 dark:text-white/50'}`}>{copy.running}</button><button onClick={() => setCategory('cycling')} className={`min-h-11 border-b-2 px-5 text-sm ${category === 'cycling' ? 'border-[#fc5200] text-[#fc5200]' : 'border-transparent text-slate-500 dark:text-white/50'}`}>{copy.cycling}</button></div></header><div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1fr)_282px]"><section className="space-y-4">{category === 'running' ? plans.map((plan) => <article key={plan.title} className="flex min-h-[125px] items-center gap-5 rounded-md border border-slate-200 bg-white p-4 transition hover:border-[#fc5200]/50 dark:border-white/10 dark:bg-white/[.025] md:p-5"><Shield plan={plan} /><div className="min-w-0 flex-1"><h2 className="text-xl font-medium">{fa && plan.title === 'Custom Plan' ? copy.custom : plan.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-white/65">{fa ? plan.description.replace('Whether you are aiming for a 5K PB or wanting to impress at your local road race, this plan is for you.', 'برای رکورد شخصی ۵ کیلومتر یا درخشش در مسابقه محلی خود تمرین کنید.').replace('Over 16 weeks, build your fitness and endurance, and arrive at the start line ready to run your best marathon.', 'در ۱۶ هفته، آمادگی و استقامت خود را بسازید و برای بهترین ماراتن آماده شوید.') : plan.description}</p></div><button className="min-h-11 shrink-0 border border-slate-300 px-4 text-sm font-medium transition hover:border-[#fc5200] hover:text-[#fc5200] dark:border-white/15">{copy.start}</button></article>) : <div className="rounded-md border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-white/15 dark:text-white/55"><Bike className="mx-auto mb-3 text-[#fc5200]" />{fa ? 'برنامه‌های دوچرخه‌سواری به‌زودی اضافه می‌شوند.' : 'Cycling plans are coming soon.'}</div>}</section><aside className="relative min-h-[430px] overflow-hidden bg-[#070707] p-7 text-white shadow-sm"><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(70deg, transparent 0 38px, rgba(255,255,255,.12) 40px 43px, transparent 45px 82px)' }} /><div className="relative flex h-full flex-col items-center justify-between text-center"><div className="text-2xl font-black tracking-[-.07em]"><span className="text-[#fc5200]">Foo</span>Run</div><div><h2 className="text-3xl font-bold leading-tight">{copy.next}</h2><p className="mt-8 text-sm leading-6 text-white/75">{copy.support}</p></div><p className="text-sm text-white/80">{copy.unlock}</p></div></aside></div></main><FooRunFooter /></div>
}
