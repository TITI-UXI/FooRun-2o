'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Activity, Bell, Bike, ChevronDown, ChevronLeft, Flag, Footprints, LockKeyhole, Menu, Plus, Settings2, Smartphone, Waves, UsersRound, Watch } from 'lucide-react'

const orange = '#FC5200'

function FooRunMark() {
  return <Link href="/" aria-label="بازگشت به صفحه اصلی FooRun" className="flex items-center gap-2 text-xl font-black tracking-[-0.08em] transition-opacity hover:opacity-75"><span className="text-[#fc5200]">✦</span><span><b className="text-[#fc5200]">Foo</b>Run</span></Link>
}

function Header() {
  return <header className="sticky top-0 z-30 border-b border-[#e6e6e8] bg-white">
    <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-8 px-5">
      <FooRunMark />
      <div className="hidden h-full items-center gap-7 text-sm text-[#5d5d64] md:flex">
        <a className="flex h-full items-center gap-2 border-b-2 border-[#fc5200] font-semibold text-[#17171a]" href="/dashboard">Dashboard <ChevronDown size={15} /></a>
        <a href="#training" className="flex items-center gap-2">Training <ChevronDown size={15} /></a>
        <a href="#maps">Maps</a><a href="#challenges">Challenges</a>
      </div>
      <div className="mr-auto flex items-center gap-4">
        <button className="hidden rounded border border-[#d9d9dd] px-4 py-2 text-sm font-semibold md:block">🎁 Give a Gift</button>
        <button className="rounded bg-[#fc5200] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#e74b00]">Start Trial</button>
        <button aria-label="Notifications" className="hidden rounded-full p-2 text-[#666] hover:bg-[#f4f4f6] sm:block"><Bell size={21} /></button>
        <button aria-label="Account menu" className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f57413] text-lg text-white">Z</span><ChevronDown size={15} /></button>
        <button aria-label="Add activity" className="text-[#fc5200]"><Plus size={27} strokeWidth={1.8} /></button>
      </div>
    </div>
  </header>
}

function ProfileSidebar() {
  const [sport, setSport] = useState('run')
  return <aside className="space-y-6">
    <section className="overflow-hidden rounded bg-white shadow-[0_1px_2px_rgba(0,0,0,.03)]">
      <div className="p-7 text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f57413] text-4xl text-white">Z</div><h2 className="mt-4 text-xl font-medium">زهرا علیزاده</h2><p className="mt-1 text-sm text-[#77777e]">Zahra Alizadeh</p><div className="mt-5 grid grid-cols-3 divide-x divide-x-reverse divide-[#e7e7e9] text-xs text-[#77777e]"><div>Following<strong className="mt-1 block text-lg font-normal text-[#111]">0</strong></div><div>Followers<strong className="mt-1 block text-lg font-normal text-[#111]">0</strong></div><div>Activities<strong className="mt-1 block text-lg font-normal text-[#111]">0</strong></div></div></div>
      <a href="#add" className="flex items-center justify-between border-t border-[#ededee] px-4 py-4 text-xs leading-5"><span><b className="font-normal text-[#fc5200]">Add an Activity.</b> Learn how to record or<br /> upload an activity to FooRun.</span><ChevronLeft size={18} className="text-[#777]" /></a>
    </section>
    <section className="overflow-hidden rounded bg-white">
      <div className="grid grid-cols-3 border-b border-[#eee] text-[#111]">{[['run', Footprints], ['bike', Bike], ['swim', Waves]].map(([key, Icon]) => <button key={key as string} onClick={() => setSport(key as string)} className={`flex h-14 items-center justify-center ${sport === key ? 'bg-white' : 'bg-[#fafafa]'} ${sport === key ? 'border-b-2 border-[#fc5200]' : ''}`} aria-label={key as string}><Icon size={24} strokeWidth={1.8} /></button>)}</div>
      <div className="p-4"><div className="bg-[#f7f7f8] p-4 text-sm leading-5">Subscribe to stay motivated with custom progress, segment and power goals. <a href="#upgrade" className="text-[#fc5200]">Upgrade</a></div><div className="mt-8 text-center"><div className="text-[11px]">THIS WEEK</div><div className="mt-1 text-2xl">0 km</div><div className="mt-5 flex items-end justify-center gap-2 text-[10px]">{['M','T','W','T','F','S','S'].map((d,i) => <span key={`${d}-${i}`} className={`relative flex h-7 w-4 items-end justify-center ${i === 3 ? 'after:absolute after:bottom-0 after:h-0.5 after:w-4 after:bg-[#fc5200]' : ''}`}>{d}</span>)}</div><div className="mt-6 flex justify-center gap-7 text-xs"><span>0h0m</span><span>0 m</span></div></div><div className="mt-6 border-t border-[#eee] pt-5 text-center"><div className="text-[11px]">THIS YEAR</div><div className="relative mt-6 h-2 bg-[#ededf1]"><span className="absolute right-[25%] top-[-5px] h-4 w-px bg-[#555]" /></div><div className="mt-2 text-[10px]">TODAY</div></div></div>
      <a href="#goals" className="flex items-center justify-between border-t border-[#eee] px-4 py-4 text-sm">Manage Your Goals <ChevronLeft size={18} className="text-[#777]" /></a>
    </section>
  </aside>
}

const tasks = [
  { icon: Watch, title: 'Record your first activity', text: 'Set up your GPS device and seamlessly upload your workouts right to FooRun. No device? No problem – record and connect anytime, anywhere with our mobile app.', button: 'Connect Device' },
  { icon: UsersRound, title: 'See what your friends are doing', text: 'Find your friends on FooRun or invite them to join you. Cheer them on, discover new workouts and start training with the athletes you already know.', button: 'Find Friends' },
  { icon: LockKeyhole, title: 'Choose your privacy settings', text: 'Learn more about FooRun privacy controls and customize your profile settings.', button: 'Privacy Settings' },
]

function Checklist() {
  return <section className="overflow-hidden rounded bg-white shadow-[0_1px_2px_rgba(0,0,0,.03)]"><div className="h-[148px] bg-[linear-gradient(100deg,rgba(16,28,38,.05),rgba(16,28,38,.55)),url('https://images.unsplash.com/photo-1526401485004-2aa7a1c0a8a4?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center px-7 py-6 text-white"><div className="max-w-md"><h1 className="text-2xl font-medium">شروع مسیر ورزشی در FooRun</h1><p className="mt-2 text-sm leading-6 text-white/90">چند قدم ساده برای راه‌اندازی پروفایل و شروع تجربه ورزشی‌ات در FooRun.</p></div></div><div className="px-6">{tasks.map(({ icon: Icon, title, text, button }) => <article key={title} className="flex gap-7 border-b border-[#e7e7e9] py-7 last:border-b-0"><div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#111]"><Icon size={44} strokeWidth={1.6} /></div><div><h2 className="text-xl font-medium text-[#111]">{title}</h2><p className="mt-2 max-w-[600px] text-sm leading-5 text-[#686870]">{text}</p><button onClick={() => alert(`${button} selected`)} className="mt-4 rounded bg-[#fc5200] px-6 py-2 text-xs font-bold text-white transition hover:bg-[#e94a00]">{button}</button></div></article>)}</div></section>
}

function AppBanner() {
  return <section className="mt-6 flex items-center gap-8 rounded bg-white px-8 py-7"><div className="hidden h-28 w-32 items-end justify-center sm:flex"><div className="relative h-28 w-16 rounded-[13px] border-[3px] border-[#222] bg-[#bfe4ef] p-1 shadow-lg"><div className="h-full rounded-[9px] bg-[linear-gradient(#e9fbff,#8ac7de)] pt-8 text-center text-[9px]">9:30<br /><span className="text-xl font-bold">▦</span></div></div></div><div><h2 className="text-xl font-medium">Get our free app</h2><p className="mt-2 max-w-md text-sm leading-5 text-[#66666d]">Record, analyze and share activities right from your phone. Our free mobile app keeps you connected with friends and ready for the next workout.</p><div className="mt-4 flex gap-3"><button className="rounded bg-black px-3 py-1.5 text-[10px] text-white"> &nbsp; Download on the<br /><b className="text-sm">App Store</b></button><button className="rounded bg-black px-3 py-1.5 text-[10px] text-white">▶ &nbsp; GET IT ON<br /><b className="text-sm">Google Play</b></button></div></div></section>
}

function Community() {
  return <aside className="space-y-6 pt-1"><section className="flex gap-4 border-b border-[#e2e2e5] pb-6"><Flag size={34} strokeWidth={1.4} /><div><h2 className="text-base">Clubs on FooRun</h2><p className="mt-2 text-xs leading-5">Why do it alone? Get more out of your FooRun experience by joining or creating a Club.</p><a href="#clubs" className="mt-2 block text-xs text-[#fc5200]">Find or Create a Club on FooRun</a></div></section><section className="flex gap-4"><UsersRound size={34} strokeWidth={1.4} /><div><h2 className="text-base">Your Friends on FooRun</h2><p className="mt-2 text-xs leading-5">Find and invite friends to see their adventures and share some encouragement.</p><a href="#friends" className="mt-2 block text-xs text-[#fc5200]">Find and Invite Your Friends</a></div></section></aside>
}

export default function FooRunDashboard() {
  return <div dir="ltr" className="min-h-screen bg-[#f7f7f8] text-[#17171a]"><Header /><main className="mx-auto grid max-w-[1280px] grid-cols-1 gap-7 px-5 py-16 lg:grid-cols-[280px_minmax(0,592px)_280px] lg:items-start"><ProfileSidebar /><div><Checklist /><AppBanner /></div><Community /></main></div>
}

export { Activity }
