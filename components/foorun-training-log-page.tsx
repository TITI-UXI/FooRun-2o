'use client'

import { useState } from 'react'
import { ChevronDown, CircleHelp, Footprints, Waves, X } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import { useLanguageAndTheme } from '@/components/language-theme-context'

const orange = '#FC5200'
const sports = [
  ['Workout', 'bg-[#f3b400]'], ['Crossfit', 'bg-[#a92727]'], ['E-Bike Ride', 'bg-[#9a522b]'], ['Canoe', 'bg-[#2368a4]'], ['Ice Skate', 'bg-[#137979]']
] as const
const weeks = [['Sep 21 – 27', '۳۶٫۴ km'], ['Sep 14 – 20', '۰٫۰۰ km'], ['Sep 7 – 13', '۰٫۰۰ km']]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function AnalyzeModal({ fa, onClose }: { fa: boolean; onClose: () => void }) {
  const dots = [
    ['bg-[#42c49a]', '1h 16m'], ['bg-[#168bea]', '36m'], ['bg-[#fc5200]', '1h 57m'], ['bg-[#48bc91]', '42m'], ['bg-[#fc5200]', '1h 3m'], ['bg-[#168bea]', '55m']
  ]
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4" role="dialog" aria-modal="true" aria-labelledby="analyze-title">
    <div className="relative w-full max-w-[400px] overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-white/10 dark:bg-[#202126] dark:text-white">
      <button onClick={onClose} aria-label={fa ? 'بستن' : 'Close'} className="absolute right-3 top-3 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"><X size={18} /></button>
      <div className="bg-slate-50 px-6 pb-7 pt-6 dark:bg-[#f7f7f9]">
        <div className="mx-auto mb-4 flex max-w-[310px] items-end justify-between gap-2 opacity-30">{Array.from({ length: 7 }, (_, i) => <span key={i} className="h-7 w-7 rounded-full bg-slate-400" />)}</div>
        <div className="mx-auto flex max-w-[350px] items-end justify-center gap-3 bg-white px-4 py-5 shadow-[0_5px_14px_rgba(0,0,0,.12)]">{dots.map(([color, label], i) => <div key={label} className="flex flex-col items-center gap-2"><span className={`flex h-9 w-9 items-center justify-center rounded-full ${color} text-[10px] text-white`}>{i % 2 === 0 ? <Footprints size={15} /> : <Waves size={15} />}</span><small className="text-[8px] text-slate-500">{label}</small></div>)}</div>
        <div className="mx-auto mt-5 flex max-w-[310px] items-center justify-between opacity-25">{Array.from({ length: 6 }, (_, i) => <span key={i} className="h-7 w-7 rounded-full bg-slate-400" />)}</div>
      </div>
      <div className="p-6 md:p-7"><h2 id="analyze-title" className="text-2xl font-bold">{fa ? 'تمرینات خود را تحلیل کنید' : 'Analyze Your Training'}</h2><p className="mt-4 text-sm leading-6 text-slate-600 dark:text-white/65">{fa ? 'فعالیت‌های گذشته خود را سریع بررسی کنید تا الگوها و روندهای تمرینی را پیدا کنید.' : 'Quickly scan your past activities to spot training patterns and trends.'}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><button onClick={onClose} className="min-h-11 flex-1 border border-[#fc5200] px-4 text-sm font-medium text-[#fc5200] hover:bg-[#fc5200]/5">{fa ? 'بیشتر بدانید' : 'Learn More'}</button><button onClick={onClose} className="min-h-11 flex-1 bg-[#fc5200] px-4 text-sm font-semibold text-white hover:bg-[#e94b00]">{fa ? 'شروع دوره آزمایشی' : 'Start Your Free Trial'}</button></div></div>
    </div>
  </div>
}

export default function FooRunTrainingLogPage() {
  const { language } = useLanguageAndTheme(); const fa = language === 'fa'; const [sport, setSport] = useState('all'); const [metric, setMetric] = useState('distance'); const [showModal, setShowModal] = useState(true)
  return <div dir={fa ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-slate-900 dark:bg-[#080b10] dark:text-white"><Header /><main className="mx-auto max-w-[1220px] px-5 py-10 md:py-14"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#fc5200]">FooRun Training</p><h1 className="mt-3 text-3xl font-bold md:text-4xl">{fa ? 'لاگ تمرین' : 'Training Log'}</h1></div><button onClick={() => setShowModal(true)} className="inline-flex min-h-11 items-center gap-2 border border-slate-200 px-4 text-sm dark:border-white/10"><CircleHelp size={16} />{fa ? 'تحلیل تمرینات' : 'Analyze training'}</button></div>
    <div className="mt-9 flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-white/10 sm:flex-row"><label className="flex flex-col gap-2 text-xs font-semibold"><span>{fa ? 'ورزش' : 'Sport'}</span><span className="relative"><select value={sport} onChange={(e) => setSport(e.target.value)} className="min-h-11 min-w-[220px] appearance-none border border-slate-300 bg-white px-3 pe-10 text-sm font-normal dark:border-white/15 dark:bg-[#17181c]"><option value="all">{fa ? 'همه' : 'All'}</option><option value="run">{fa ? 'دویدن' : 'Run'}</option><option value="ride">{fa ? 'دوچرخه‌سواری' : 'Ride'}</option></select><ChevronDown className="pointer-events-none absolute end-3 top-3" size={16} /></span></label><label className="flex flex-col gap-2 text-xs font-semibold"><span>{fa ? 'معیار' : 'Metric'}</span><span className="relative"><select value={metric} onChange={(e) => setMetric(e.target.value)} className="min-h-11 min-w-[220px] appearance-none border border-slate-300 bg-white px-3 pe-10 text-sm font-normal dark:border-white/15 dark:bg-[#17181c]"><option value="distance">{fa ? 'مسافت' : 'Distance'}</option><option value="time">{fa ? 'زمان' : 'Time'}</option><option value="elevation">{fa ? 'ارتفاع' : 'Elevation'}</option></select><ChevronDown className="pointer-events-none absolute end-3 top-3" size={16} /></span></label></div>
    <div className="flex flex-wrap gap-x-5 gap-y-3 py-6 text-xs text-slate-600 dark:text-white/60">{sports.map(([label, color]) => <span key={label} className="inline-flex items-center gap-2"><i className={`h-2 w-2 rounded-full ${color}`} />{fa ? ({ Workout: 'تمرین', Crossfit: 'کراس‌فیت', 'E-Bike Ride': 'دوچرخه برقی', Canoe: 'کانو', 'Ice Skate': 'اسکیت روی یخ' }[label] ?? label) : label}</span>)}<span>+32 {fa ? 'مورد دیگر' : 'more'}</span></div>
    <section className="overflow-x-auto border-t border-slate-200 dark:border-white/10"><div className="min-w-[850px] grid grid-cols-[190px_repeat(7,minmax(80px,1fr))] border-b border-slate-200 py-4 text-xs text-slate-500 dark:border-white/10 dark:text-white/45"><span>{fa ? '۲۰۲۶' : '2026'}</span>{days.map((day) => <span key={day} className="text-center">{fa ? ({ Mon: 'دوشنبه', Tue: 'سه‌شنبه', Wed: 'چهارشنبه', Thu: 'پنجشنبه', Fri: 'جمعه', Sat: 'شنبه', Sun: 'یکشنبه' }[day] ?? day) : day}</span>)}</div>{weeks.map(([range, total]) => <div key={range} className="min-w-[850px] grid grid-cols-[190px_repeat(7,minmax(80px,1fr))] border-b border-slate-200 py-6 dark:border-white/10"><div><h2 className="font-semibold">{fa ? range.replace('Sep', 'سپتامبر') : range}</h2><p className="mt-5 text-xs text-slate-500 dark:text-white/45">{fa ? 'مسافت کل' : 'Total distance'}</p><strong className="mt-1 block text-lg font-medium">{fa ? '۰٫۰۰' : total} <small className="text-xs text-slate-500">km</small></strong></div>{days.map((day) => <div key={day} className="flex items-center justify-center text-xs text-slate-400 dark:text-white/25">{fa ? 'استراحت' : 'Rest'}</div>)}</div>)}</section></main>{showModal && <AnalyzeModal fa={fa} onClose={() => setShowModal(false)} />}</div>
}

