'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Activity, ArrowUpRight, Bike, CalendarDays, ChevronLeft, Clock3, Compass, Heart, Map, MapPin, Mountain, Search, Star, Target, Trophy, UsersRound } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import { useLanguageAndTheme } from '@/components/language-theme-context'

const orange = '#FC5200'

type Slug = 'activity-feed' | 'clubs' | 'segments' | 'routes' | 'goals'

const pageCopy = {
  fa: {
    'activity-feed': { title: 'فید فعالیت‌ها', eyebrow: 'جامعه FooRun', description: 'تمرین‌های دوستانت را دنبال کن و با هر کیلومتر، انگیزه بیشتری بگیر.' },
    clubs: { title: 'باشگاه‌ها', eyebrow: 'شبکه ورزشی تو', description: 'باشگاه‌های دویدن و دوچرخه‌سواری‌ات را پیدا کن، دنبال کن و رشد بده.' },
    segments: { title: 'سگمنت‌های من', eyebrow: 'رکوردهای شخصی', description: 'مسیرهای ستاره‌دار و بهترین رکوردهای سرعتت را یکجا ببین.' },
    routes: { title: 'مسیرهای من', eyebrow: 'کشف مسیر', description: 'مسیرهای ذخیره‌شده را مدیریت کن یا ماجراجویی بعدی‌ات را بساز.' },
    goals: { title: 'هدف‌های من', eyebrow: 'پیشرفت مستمر', description: 'هدف‌های هفتگی و ماهانه‌ات را با ریتمی روشن دنبال کن.' },
  },
  en: {
    'activity-feed': { title: 'Activity Feed', eyebrow: 'FooRun community', description: 'Follow your friends’ training and find a little more motivation in every kilometer.' },
    clubs: { title: 'Clubs', eyebrow: 'Your sports network', description: 'Find, follow, and grow with the running and cycling clubs you care about.' },
    segments: { title: 'My Segments', eyebrow: 'Personal records', description: 'Keep starred segments and your fastest pace records close at hand.' },
    routes: { title: 'My Routes', eyebrow: 'Explore your way', description: 'Manage saved GPS routes or build your next adventure.' },
    goals: { title: 'My Goals', eyebrow: 'Keep progressing', description: 'Track weekly and monthly targets with a clear, motivating rhythm.' },
  },
} as const

const activities = [
  { name: 'سارا محمدی', time: 'امروز، ۸:۴۲', title: 'دویدن صبحگاهی', meta: '۸.۶ km · ۴۸ دقیقه', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80', kudos: 24 },
  { name: 'آرمان رضایی', time: 'دیروز، ۱۸:۱۰', title: 'رکاب‌زنی عصرانه', meta: '۳۴.۲ km · ۱ ساعت و ۲۱ دقیقه', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80', kudos: 41 },
]

const clubs = [
  { name: 'تهران رانرز', type: 'دویدن · تهران', members: '۱۲.۴k عضو', distance: '۲۴۷ km این ماه', icon: FootprintIcon },
  { name: 'رکاب‌زنان شمال', type: 'دوچرخه‌سواری · ایران', members: '۳.۸k عضو', distance: '۸۹۶ km این ماه', icon: Bike },
  { name: 'Sunday Long Run', type: 'دویدن · جهانی', members: '۱۸.۲k عضو', distance: '۱۶۴ km این ماه', icon: UsersRound },
]

const segments = [
  { name: 'پارک ملت تا ونک', location: 'تهران · ۵.۲ km', pace: '۴:۳۸ /km', time: '۲۴:۰۹', rank: '#12' },
  { name: 'حلقه چیتگر', location: 'تهران · ۸.۱ km', pace: '۴:۵۶ /km', time: '۳۹:۴۵', rank: '#28' },
  { name: 'River Loop', location: 'London · ۳.۴ km', pace: '۴:۲۴ /km', time: '۱۴:۵۸', rank: '#7' },
]

const routes = [
  { name: 'مسیر درکه تا پلنگ‌چال', location: 'تهران', distance: '۱۲.۸ km', elevation: '۷۸۴ m', time: '۲ ساعت و ۱۰ دقیقه' },
  { name: 'دور دریاچه چیتگر', location: 'تهران', distance: '۱۴.۲ km', elevation: '۹۸ m', time: '۱ ساعت و ۱۵ دقیقه' },
  { name: 'پارک آب‌و‌آتش تا پل طبیعت', location: 'تهران', distance: '۶.۴ km', elevation: '۳۲ m', time: '۳۸ دقیقه' },
]

const goals = [
  { label: 'دویدن هفتگی', value: '۳۲.۴', target: '۴۰ km', progress: 81, color: 'from-[#fc5200] to-[#ff9a62]', icon: Activity },
  { label: 'مسافت ماهانه', value: '۱۲۸', target: '۲۰۰ km', progress: 64, color: 'from-[#00c889] to-[#8ef5d1]', icon: Target },
  { label: 'ارتفاع ماهانه', value: '۲٬۴۸۰', target: '۴٬۰۰۰ m', progress: 62, color: 'from-[#7c5cff] to-[#b5a5ff]', icon: Mountain },
]

function FootprintIcon({ size = 22 }: { size?: number }) { return <Activity size={size} strokeWidth={1.7} /> }

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <section className={`rounded-2xl border border-black/[.07] bg-white shadow-[0_12px_35px_rgba(16,24,40,.06)] dark:border-white/[.08] dark:bg-[#202126] dark:shadow-none ${className}`}>{children}</section> }

function SearchBar({ placeholder }: { placeholder: string }) { const [value, setValue] = useState(''); return <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl border border-black/10 bg-white px-4 dark:border-white/10 dark:bg-[#202126]"><Search size={18} className="text-[#92929a]" /><input value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} aria-label={placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9999a1]" /></label> }

function FeedPage({ fa }: { fa: boolean }) { return <div className="grid gap-6 lg:grid-cols-[minmax(0,680px)_280px]"><div className="space-y-5">{activities.map((activity) => <SectionCard key={activity.title} className="overflow-hidden"><div className="flex items-center gap-3 p-5"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f57413] text-lg text-white">{activity.name[0]}</div><div><p className="text-sm font-semibold">{activity.name}</p><p className="mt-0.5 text-xs text-[#888891]">{activity.time}</p></div><button aria-label={fa ? 'گزینه‌های بیشتر' : 'More options'} className="ms-auto text-xl text-[#898992]">···</button></div><div className="grid sm:grid-cols-[1fr_1.12fr]"><div className="p-5"><p className="text-lg font-semibold">{activity.title}</p><p className="mt-2 text-sm text-[#85858f]">{activity.meta}</p><div className="mt-7 flex items-center gap-5 text-sm text-[#777780]"><button className="flex items-center gap-2 hover:text-[#fc5200]"><Heart size={18} /> {fa ? 'کودوس' : 'Kudos'} {activity.kudos}</button><button className="flex items-center gap-2 hover:text-[#fc5200]"><MapPin size={18} /> {fa ? 'مشاهده مسیر' : 'View route'}</button></div></div><div className="min-h-48 bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} aria-label={fa ? 'پیش‌نمایش مسیر فعالیت' : 'Activity route preview'} /></div></SectionCard>)}</div><SectionCard className="h-fit p-5"><p className="text-sm font-semibold">{fa ? 'دوستان پیشنهادی' : 'Suggested friends'}</p><p className="mt-2 text-xs leading-5 text-[#888891]">{fa ? 'دوستانت را پیدا کن و با هم فعال بمانید.' : 'Find friends and stay active together.'}</p><button className="mt-5 w-full rounded-lg border border-[#fc5200] py-2.5 text-sm font-semibold text-[#fc5200]">{fa ? 'پیدا کردن دوستان' : 'Find friends'}</button></SectionCard></div> }

function ClubsPage({ fa }: { fa: boolean }) { const [query, setQuery] = useState(''); const filtered = useMemo(() => clubs.filter((club) => club.name.toLowerCase().includes(query.toLowerCase())), [query]); return <div className="space-y-6"><div className="flex flex-col gap-3 sm:flex-row"><label className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-black/10 bg-white px-4 dark:border-white/10 dark:bg-[#202126]"><Search size={18} className="text-[#92929a]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={fa ? 'جستجوی باشگاه‌ها' : 'Search clubs'} aria-label={fa ? 'جستجوی باشگاه‌ها' : 'Search clubs'} className="flex-1 bg-transparent text-sm outline-none" /></label><button className="rounded-xl bg-[#fc5200] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(252,82,0,.25)]">{fa ? 'ساخت باشگاه' : 'Create a club'}</button></div><div className="grid gap-5 md:grid-cols-2">{filtered.map((club) => { const Icon = club.icon; return <SectionCard key={club.name} className="p-5"><div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fc5200]/10 text-[#fc5200]"><Icon /></div><div><h2 className="font-semibold">{club.name}</h2><p className="mt-1 text-xs text-[#888891]">{club.type}</p></div><button className="ms-auto text-[#fc5200]" aria-label={fa ? 'باز کردن باشگاه' : 'Open club'}><ArrowUpRight size={18} /></button></div><div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/[.07] pt-4 text-sm dark:border-white/[.08]"><div><p className="text-xs text-[#888891]">{fa ? 'اعضا' : 'Members'}</p><p className="mt-1 font-semibold">{club.members}</p></div><div><p className="text-xs text-[#888891]">{fa ? 'فعالیت' : 'Activity'}</p><p className="mt-1 font-semibold">{club.distance}</p></div></div></SectionCard> })}</div></div> }

function SegmentsPage({ fa }: { fa: boolean }) { return <SectionCard className="overflow-hidden"><div className="hidden grid-cols-[1.4fr_1fr_1fr_90px] gap-4 border-b border-black/[.07] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#888891] dark:border-white/[.08] sm:grid"><span>{fa ? 'سگمنت' : 'Segment'}</span><span>{fa ? 'بهترین زمان' : 'Best time'}</span><span>{fa ? 'سرعت' : 'Pace'}</span><span>{fa ? 'رتبه' : 'Rank'}</span></div>{segments.map((segment, index) => <div key={segment.name} className="grid gap-3 border-b border-black/[.07] p-5 last:border-0 sm:grid-cols-[1.4fr_1fr_1fr_90px] sm:items-center sm:gap-4 dark:border-white/[.08]"><div className="flex items-center gap-3"><Star size={19} className="fill-[#fc5200] text-[#fc5200]" /><div><p className="font-semibold">{segment.name}</p><p className="mt-1 text-xs text-[#888891]">{segment.location}</p></div></div><div className="flex items-center gap-2 text-sm"><Clock3 size={16} className="text-[#888891]" />{segment.time}</div><p className="text-sm font-semibold text-[#fc5200]">{segment.pace}</p><p className="text-sm text-[#888891]">{segment.rank} <span className="text-xs">{index === 0 ? '↑' : '—'}</span></p></div>)}</SectionCard> }

function RoutesPage({ fa }: { fa: boolean }) { return <div className="space-y-5"><div className="flex justify-end"><button className="flex items-center gap-2 rounded-xl bg-[#fc5200] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(252,82,0,.25)]"><Compass size={18} />{fa ? 'ساخت مسیر جدید' : 'Create New Route'}</button></div><div className="grid gap-5 md:grid-cols-2">{routes.map((route) => <SectionCard key={route.name} className="p-5"><div className="flex h-32 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,137,.25),transparent_25%),linear-gradient(135deg,#17232b,#26333b)]"><Map size={42} className="text-[#8ef5d1]" strokeWidth={1.2} /></div><div className="mt-5 flex items-start gap-3"><div><h2 className="font-semibold">{route.name}</h2><p className="mt-1 text-xs text-[#888891]">{route.location}</p></div><button className="ms-auto text-[#888891]" aria-label={fa ? 'ذخیره مسیر' : 'Save route'}><Star size={18} /></button></div><div className="mt-5 grid grid-cols-3 gap-2 border-t border-black/[.07] pt-4 text-xs dark:border-white/[.08]"><span><b className="block text-sm">{route.distance}</b>{fa ? 'مسافت' : 'Distance'}</span><span><b className="block text-sm">{route.elevation}</b>{fa ? 'ارتفاع' : 'Elevation'}</span><span><b className="block text-sm">{route.time}</b>{fa ? 'زمان' : 'Moving time'}</span></div></SectionCard>)}</div></div> }

function GoalsPage({ fa }: { fa: boolean }) { return <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]"> <div className="space-y-5">{goals.map((goal) => { const Icon = goal.icon; return <SectionCard key={goal.label} className="p-6"><div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fc5200]/10 text-[#fc5200]"><Icon size={23} /></div><div><h2 className="font-semibold">{goal.label}</h2><p className="mt-1 text-xs text-[#888891]">{fa ? 'تا پایان این ماه' : 'Through the end of this month'}</p></div><div className="ms-auto text-end"><strong className="text-2xl">{goal.value}</strong><span className="text-sm text-[#888891]"> / {goal.target}</span></div></div><div className="mt-6 h-3 overflow-hidden rounded-full bg-black/[.07] dark:bg-white/[.09]"><div className={`h-full rounded-full bg-gradient-to-r ${goal.color} shadow-[0_0_14px_rgba(0,200,137,.55)]`} style={{ width: `${goal.progress}%` }} /></div><div className="mt-3 flex justify-between text-xs text-[#888891]"><span>{goal.progress}% {fa ? 'تکمیل شده' : 'complete'}</span><span>{fa ? 'هدف فعال' : 'Active goal'}</span></div></SectionCard> })}</div><SectionCard className="h-fit bg-gradient-to-br from-[#202126] to-[#111216] p-6 text-white"><Trophy className="text-[#ffad82]" size={28} /><p className="mt-6 text-lg font-semibold">{fa ? 'ثبات، کلید پیشرفت است' : 'Consistency compounds'}</p><p className="mt-2 text-sm leading-6 text-white/60">{fa ? 'این هفته ۳ روز فعال بوده‌ای. فقط یک جلسه دیگر تا رکورد هفتگی فاصله داری.' : 'You have been active three days this week. One more session keeps your weekly streak alive.'}</p><button className="mt-6 text-sm font-semibold text-[#ffad82]">{fa ? 'مشاهده تقویم تمرین' : 'View training calendar'} <ChevronLeft size={15} className="inline-block" /></button></SectionCard></div> }

export default function FooRunDashboardSubpage({ slug }: { slug: Slug }) {
  const { language } = useLanguageAndTheme()
  const fa = language === 'fa'
  const copy = pageCopy[language][slug]
  const page = slug === 'activity-feed' ? <FeedPage fa={fa} /> : slug === 'clubs' ? <ClubsPage fa={fa} /> : slug === 'segments' ? <SegmentsPage fa={fa} /> : slug === 'routes' ? <RoutesPage fa={fa} /> : <GoalsPage fa={fa} />
  return <div dir={fa ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f5f6f7] text-[#18191c] dark:bg-[#141518] dark:text-[#f3f3f5]"><Header /><main className="mx-auto max-w-[1180px] px-5 py-12 md:py-16"><div className="mb-9 flex flex-col gap-5 border-b border-black/[.08] pb-8 dark:border-white/[.09] sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#fc5200]">{copy.eyebrow}</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.03em] md:text-5xl">{copy.title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#7f8088]">{copy.description}</p></div><div className="flex items-center gap-2 text-xs text-[#888891]"><CalendarDays size={16} />{fa ? 'امروز، ۲۷ شهریور ۱۴۰۵' : 'Today, September 18, 2026'}</div></div>{page}</main></div>
}

export type { Slug }
