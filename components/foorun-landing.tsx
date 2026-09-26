'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowUpLeft, ChevronDown, Globe2, Heart, Map, Play, Radio, Route, Trophy, Users, Zap } from 'lucide-react'

const orange = '#FC5200'

function Logo() {
  return <div className="flex items-center gap-2 text-white"><span className="text-2xl font-black tracking-[-0.08em] text-[#FC5200]">Foo</span><span className="text-2xl font-black tracking-[-0.08em]">Run</span><span className="mr-1 text-[#FC5200]">✦</span></div>
}

function FloatingNav() {
  return <header className="fixed inset-x-0 top-4 z-50 px-4"><nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#0d131e]/75 px-4 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-xl" aria-label="ناوبری اصلی">
    <Logo />
    <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex" dir="rtl">
      {['کاوش مسیرها', 'چالش‌ها', 'کلاب‌ها', 'درباره FooRun'].map((link, i) => <a key={link} href={`#${['routes','challenges','clubs','about'][i]}`} className="transition hover:text-white">{link}</a>)}
    </div>
    <Link href="/dashboard" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0B0F17] transition hover:bg-[#FC5200] hover:text-white">ورود / ثبت‌نام</Link>
  </nav></header>
}

function GlobeVisual() {
  const [active, setActive] = useState(2)
  return <div className="relative mx-auto aspect-square w-full max-w-[540px]" aria-label="نمایش مسیرهای جهانی و ایران">
    <div className="absolute inset-[7%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_25%,#243a4e_0%,#101a29_46%,#090e16_76%)] shadow-[0_0_100px_rgba(252,82,0,0.16)]" />
    <div className="absolute inset-[13%] rounded-full border border-dashed border-white/10" />
    <div className="absolute inset-[22%] rounded-full border border-white/5" />
    <svg className="absolute inset-[11%] h-[78%] w-[78%] overflow-visible" viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <path d="M42 232 C100 125 135 312 218 196 C277 112 299 207 359 90" stroke={orange} strokeWidth="2.4" strokeDasharray="5 8" className="animate-[dash_8s_linear_infinite]" />
      <path d="M42 232 C100 125 135 312 218 196 C277 112 299 207 359 90" stroke={orange} strokeOpacity=".14" strokeWidth="14" />
      <path d="M52 115 C133 80 159 193 226 170 C276 152 312 264 354 260" stroke="#8bb7c9" strokeOpacity=".65" strokeWidth="1.2" strokeDasharray="3 9" />
      {[['42','232'],['100','125'],['135','312'],['218','196'],['277','112'],['359','90'],['226','170'],['354','260']].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={active === i ? '7' : '4'} fill={i < 6 ? orange : '#8bb7c9'} className="cursor-pointer transition-all" onClick={() => setActive(i)}><animate attributeName="opacity" values=".45;1;.45" dur={`${1.5 + i / 3}s`} repeatCount="indefinite" /></circle>)}
    </svg>
    <div className="absolute left-[16%] top-[20%] rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-slate-300 backdrop-blur-md">تهران · ۴۲.۳ km</div>
    <div className="absolute bottom-[18%] right-[5%] flex items-center gap-2 rounded-full border border-white/10 bg-[#121b28]/90 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-md"><Radio size={11} className="text-[#FC5200]" /> live route</div>
    <div className="absolute inset-0 flex items-center justify-center"><div className="rounded-full border border-[#FC5200]/30 bg-[#FC5200]/10 p-4 text-[#FC5200] shadow-[0_0_35px_rgba(252,82,0,.2)]"><Globe2 size={30} strokeWidth={1.4} /></div></div>
  </div>
}

function CountUp({ value }: { value: string }) { return <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>{value}</motion.span> }

function SpotlightCard({ icon: Icon, title, text }: { icon: typeof Route; title: string; text: string }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20 }), sy = useSpring(y, { stiffness: 150, damping: 20 })
  return <motion.article onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX-r.left); y.set(e.clientY-r.top) }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] p-7 transition [transform-style:preserve-3d] hover:-translate-y-1 hover:border-[#FF6B00]/50 hover:shadow-[0_0_32px_rgba(255,77,0,.16)]">
    <motion.div className="pointer-events-none absolute -inset-20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" style={{ x: sx, y: sy, background: `radial-gradient(circle, ${orange}28, transparent 42%)` }} />
    <div className="relative" dir="rtl"><div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FC5200]/30 bg-[#FC5200]/10 text-[#FC5200]"><Icon size={23} /></div><h3 className="mb-3 text-xl font-bold text-white">{title}</h3><p className="text-sm leading-7 text-slate-400">{text}</p><ArrowUpLeft className="mt-8 text-slate-600 transition group-hover:text-[#FC5200]" size={20} /></div>
  </motion.article>
}

export default function FooRunLanding() {
  return <main className="min-h-screen overflow-hidden bg-[#080B10] text-white" dir="rtl"><FloatingNav />
    <section className="relative mx-auto grid min-h-[780px] max-w-7xl items-center gap-10 px-6 pb-20 pt-36 lg:grid-cols-[.9fr_1.1fr] lg:pt-40" dir="ltr"><div className="pointer-events-none absolute left-1/4 top-24 h-72 w-72 rounded-full bg-[#FC5200]/10 blur-[120px]" />
      <div className="order-2 text-right lg:order-1" dir="rtl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FC5200]/25 bg-[#FC5200]/10 px-3 py-1.5 text-xs text-[#ff9b6e]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FC5200]" /> حرکت از همین‌جا شروع می‌شود</div><h1 className="max-w-2xl text-5xl font-black leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl"><span className="bg-gradient-to-l from-white via-white to-slate-400 bg-clip-text text-transparent">فراتر از مرزها بدو،</span><br /><span className="text-[#FC5200]">با جامعه دوندگان FooRun</span></h1><p className="mt-7 max-w-xl text-lg leading-9 text-slate-400">پلتفرم هوشمند ثبت فعالیت‌های دویدن، دوچرخه‌سواری و رقابت‌های ورزشی ایران.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/dashboard" className="group flex items-center gap-3 rounded-full bg-[#FC5200] px-6 py-3.5 font-bold shadow-[0_0_32px_rgba(252,82,0,.32)] transition hover:-translate-y-0.5 hover:bg-[#ff6a22]">شروع رایگان <ArrowLeft size={18} className="transition group-hover:-translate-x-1" /></Link><a href="#routes" className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition hover:bg-white/10"><Map size={17} /> مشاهده مسیرهای تهران و شمال</a></div><div className="mt-9 flex items-center gap-3 text-sm text-slate-500"><div className="flex -space-x-2 space-x-reverse">{['#e0b08a','#d6896e','#7ea4af','#bdc7d1'].map((c,i)=><div key={i} className="h-8 w-8 rounded-full border-2 border-[#0B0F17]" style={{backgroundColor:c}} />)}</div><span>به جمع ۵۰,۰۰۰ ورزشکار بپیوند</span></div></div><div className="order-1 lg:order-2"><GlobeVisual /></div>
    </section>
    <section className="relative border-y border-white/10 bg-[#101722]" id="routes"><div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,transparent_0_18%,#FC5200_18.2%_18.4%,transparent_18.6%_34%,#fff_34.2%_34.4%,transparent_34.6%_52%)] [background-size:640px_640px]" /><div className="relative mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-6 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse">{[['۵۰,۰۰۰+', 'ورزشکار فعال'],['۱,۴۰۰,۰۰۰', 'کیلومتر ثبت‌شده'],['۱,۲۰۰', 'کلاب و چالش ماهانه']].map(([n,l])=><div key={l} className="py-4 text-center"><div className="text-3xl font-black text-white"><CountUp value={n} /></div><div className="mt-2 text-sm text-slate-500">{l}</div></div>)}</div></section>
    <section className="mx-auto max-w-6xl px-6 py-28" id="clubs"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end" dir="rtl"><div><p className="mb-3 text-sm font-bold tracking-widest text-[#FC5200]">FOORUN FEATURES</p><h2 className="text-4xl font-black">هر قدم، یک داستان تازه</h2></div><p className="max-w-sm text-sm leading-7 text-slate-500">ابزارهایی که به تو کمک می‌کنند بهتر بدوی، مسیرهای تازه پیدا کنی و با آدم‌های هم‌مسیرت ارتباط بگیری.</p></div><div className="grid gap-4 md:grid-cols-3"><SpotlightCard icon={Zap} title="آنالیز هوشمند GPS" text="جزئیات دقیق سرعت، ارتفاع، ضربان قلب و پیشرفتت را در یک نگاه ببین." /><SpotlightCard icon={Trophy} title="سگمنت‌ها و رده‌بندی" text="رکوردت را در مسیرهای محبوب شهر با دوستانت مقایسه کن و قهرمان محله شو." /><SpotlightCard icon={Users} title="جامعه‌ای برای حرکت" text="فعالیت‌هایت را به اشتراک بگذار، استوری بساز و از همراهی جامعه انرژی بگیر." /></div></section>
    <section className="overflow-hidden border-y border-[#FC5200]/20 bg-[#FC5200] py-4"><motion.div animate={{ x: [0, -900] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} className="flex w-max gap-8 whitespace-nowrap text-sm font-black tracking-[.22em] text-[#0B0F17]">{Array.from({length: 3}).flatMap((_,i)=>['RUN','RIDE','REPEAT','DISCOVER','FOORUN','جامعه ورزشکاران'].map((x,j)=><span key={`${i}-${j}`} className="flex items-center gap-8">{x}<span>✦</span></span>))}</motion.div></section>
    <footer className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between"><Logo /><p className="text-sm text-slate-600">برای همه مسیرهایی که هنوز نرفته‌ای.</p><div className="flex gap-4 text-slate-500"><Heart size={17} /><Route size={17} /><Play size={17} /></div></footer>
  </main>
}
