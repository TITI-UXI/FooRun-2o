'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Search, ArrowUpDown, Download } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import FooRunFooter from '@/components/Footer'
import { useLanguageAndTheme } from '@/components/language-theme-context'

const tags = ['Race', 'Workout', 'Long Run', 'Commute', 'For a Cause', 'Recovery', 'With Kid', 'With Pet', 'Competition']
const faTags = ['مسابقه', 'تمرین', 'دویدن طولانی', 'رفت‌وآمد', 'برای خیریه', 'ریکاوری', 'با کودک', 'با حیوان خانگی', 'رقابت']

export default function FooRunActivitiesPage() {
  const { language, theme } = useLanguageAndTheme()
  const fa = language === 'fa'
  const [keyword, setKeyword] = useState('')
  const [sport, setSport] = useState('all')
  const [privateOnly, setPrivateOnly] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [deleted, setDeleted] = useState(false)
  const copy = fa ? { active: 'فعالیت‌های من', deleted: 'اخیراً حذف‌شده', title: 'فعالیت‌های من', keywords: 'کلمات کلیدی', placeholder: 'تمرین صبحگاهی من', search: 'جستجو', sport: 'ورزش', all: 'همه ورزش‌ها', private: 'خصوصی', activityTags: 'برچسب‌های فعالیت', count: '۰ فعالیت', empty: 'فعالیتی برای نمایش وجود ندارد', headers: ['ورزش', 'تاریخ', 'عنوان', 'زمان', 'مسافت', 'ارتفاع'] } : { active: 'My Activities', deleted: 'Recently Deleted', title: 'My Activities', keywords: 'Keywords', placeholder: 'My Morning Workout', search: 'Search', sport: 'Sport', all: 'All Sport Types', private: 'Private', activityTags: 'Activity Tags', count: '0 Activities', empty: 'No activities to display', headers: ['Sport', 'Date', 'Title', 'Time', 'Distance', 'Elevation'] }
  const visibleTags = fa ? faTags : tags
  const toggleTag = (tag: string) => setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])
  const filteredCount = useMemo(() => keyword || sport !== 'all' || privateOnly || selectedTags.length ? 0 : 0, [keyword, sport, privateOnly, selectedTags])
  return <div dir={fa ? 'rtl' : 'ltr'} className={`min-h-screen ${theme === 'dark' ? 'bg-[#080b10] text-white' : 'bg-white text-[#17171a]'}`}>
    <Header />
    <main className="mx-auto max-w-[1220px] px-5 pb-20 pt-12">
      <div className="border-b border-slate-200 dark:border-white/10"><div className="flex gap-8"><button onClick={() => setDeleted(false)} className={`border-b-2 px-1 pb-4 text-sm ${!deleted ? 'border-[#fc5200] font-semibold' : 'border-transparent text-slate-500 dark:text-white/55'}`}>{copy.active}</button><button onClick={() => setDeleted(true)} className={`border-b-2 px-1 pb-4 text-sm ${deleted ? 'border-[#fc5200] font-semibold' : 'border-transparent text-slate-500 dark:text-white/55'}`}>{copy.deleted}</button></div></div>
      <h1 className="mt-7 text-3xl font-medium tracking-tight">{deleted ? copy.deleted : copy.title}</h1>
      {!deleted && <>
        <section className="mt-4 overflow-hidden rounded border border-slate-200 dark:border-white/15">
          <div className="grid gap-6 p-4 md:grid-cols-[1fr_1.2fr] md:p-5"><div><label className="text-xs font-semibold">{copy.keywords}</label><div className="mt-2 flex gap-3"><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={copy.placeholder} className="h-10 min-w-0 flex-1 rounded border border-slate-300 bg-transparent px-3 text-sm outline-none transition focus:border-[#fc5200]" /><button className="h-10 rounded border border-slate-300 px-5 text-sm font-semibold transition hover:border-[#fc5200]">{copy.search}</button></div><label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={privateOnly} onChange={(event) => setPrivateOnly(event.target.checked)} className="accent-[#fc5200]" />{copy.private}</label></div><div><label className="text-xs font-semibold">{copy.sport}</label><div className="relative mt-2"><select value={sport} onChange={(event) => setSport(event.target.value)} className="h-10 w-full appearance-none rounded border border-slate-300 bg-transparent px-3 text-sm outline-none focus:border-[#fc5200]"><option value="all">{copy.all}</option><option value="run">{fa ? 'دویدن' : 'Run'}</option><option value="ride">{fa ? 'دوچرخه‌سواری' : 'Ride'}</option><option value="swim">{fa ? 'شنا' : 'Swim'}</option></select><ChevronDown className="pointer-events-none absolute end-3 top-3" size={15} /></div></div></div>
          <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[.035] md:p-5"><p className="text-xs font-semibold">{copy.activityTags}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">{visibleTags.map((tag) => <label key={tag} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)} className="accent-[#fc5200]" />{tag}</label>)}</div></div>
        </section>
        <div className="mt-5 flex items-center justify-between"><h2 className="text-xl font-medium">{copy.count.replace('۰', String(filteredCount))}</h2><button className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-[#fc5200]"><Download size={16} />{fa ? 'خروجی' : 'Export'}</button></div>
        <div className="mt-3 overflow-x-auto rounded border border-slate-200 dark:border-white/10"><table className="w-full min-w-[720px] text-start text-sm"><thead className="bg-slate-100 text-xs dark:bg-white/[.06]"><tr>{copy.headers.map((header, index) => <th key={header} className="px-3 py-3 font-semibold">{header}{index > 0 && <ArrowUpDown size={13} className="ms-2 inline text-slate-400" />}</th>)}</tr></thead><tbody><tr><td colSpan={6} className="h-36 text-center text-sm text-slate-400 dark:text-white/40">{copy.empty}</td></tr></tbody></table></div>
      </>}
      {deleted && <div className="mt-5 rounded border border-slate-200 p-10 text-center text-sm text-slate-400 dark:border-white/10 dark:text-white/40">{copy.empty}</div>}
    </main><FooRunFooter />
  </div>
}
