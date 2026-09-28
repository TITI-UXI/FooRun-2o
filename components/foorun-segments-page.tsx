'use client'

import { useState } from 'react'
import { Bike, Crown, Footprints, Map, Mountain, Star } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import { useAppContext } from '@/components/language-theme-context'

const tabIds = ['starred', 'created', 'hidden', 'explore'] as const
type TabId = (typeof tabIds)[number]

type Segment = {
  id: string
  sport: 'ride' | 'run'
  name: { fa: string; en: string }
  category: string | null
  distance: string
  elevation: string
  grade: string
  men: string
  women: string
  pr: string
  goal: string | null
}

const segments: Segment[] = [
  {
    id: 'alpe-dhuez',
    sport: 'ride',
    name: { fa: 'آلپ دوئز', en: "Alpe D'Huez" },
    category: '1',
    distance: '14.1',
    elevation: '1,096',
    grade: '8',
    men: '44:00',
    women: '51:00',
    pr: '1:01:40',
    goal: null,
  },
  {
    id: 'marathon-de-paris',
    sport: 'run',
    name: { fa: 'ماراتن پاریس', en: 'Marathon de Paris' },
    category: null,
    distance: '42.1',
    elevation: '44',
    grade: '0',
    men: '2:30:00',
    women: '3:00:00',
    pr: '3:36:40',
    goal: null,
  },
]

const copy = {
  fa: {
    title: 'سگمنت‌های من',
    tabsLabel: 'دسته‌بندی سگمنت‌ها',
    tabs: { starred: 'سگمنت‌های ستاره‌دار', created: 'سگمنت‌های ساخته‌شده', hidden: 'سگمنت‌های پنهان', explore: 'کاوش سگمنت‌ها' },
    heroTitle: 'سگمنت‌های ستاره‌دار به شما امکان می‌دهند سگمنت‌های مورد علاقه‌تان را یک‌جا دنبال کنید',
    heroBody: 'می‌توانید در صفحه‌های فعالیت و سگمنت و همچنین در جستجوی سگمنت، سگمنت‌ها را ستاره‌دار کنید.',
    learnMore: 'درباره سگمنت‌ها بیشتر بدانید',
    viewOnMap: 'نمایش روی نقشه',
    tableCaption: 'فهرست سگمنت‌های ستاره‌دار',
    cols: {
      star: 'ستاره',
      sport: 'ورزش',
      name: 'نام',
      cat: 'رده',
      dist: 'مسافت',
      elev: 'اختلاف ارتفاع',
      grade: 'شیب میانگین',
      men: 'مردان',
      women: 'زنان',
      pr: 'رکورد من',
      goal: 'هدف من',
    },
    sports: { ride: 'دوچرخه', run: 'دویدن' },
    cat: 'رده',
    km: 'کیلومتر',
    m: 'متر',
    unstar: 'حذف ستاره',
    star: 'افزودن ستاره',
    setGoal: 'تعیین هدف',
    emptyTitle: 'هنوز سگمنتی اینجا نیست',
    emptyBody: 'سگمنت‌هایی که می‌سازید یا پنهان می‌کنید در این بخش نمایش داده می‌شوند.',
    exploreTitle: 'سگمنت‌های اطراف خود را کشف کنید',
    exploreBody: 'نقشه را باز کنید تا محبوب‌ترین مسیرهای دویدن و دوچرخه‌سواری نزدیک خود را ببینید.',
  },
  en: {
    title: 'My Segments',
    tabsLabel: 'Segment categories',
    tabs: { starred: 'Starred Segments', created: 'Created Segments', hidden: 'Hidden Segments', explore: 'Explore Segments' },
    heroTitle: 'Starred Segments allow you to keep track of your favorite segments in one place',
    heroBody: 'You can star segments on Activity and Segment pages, as well as Segment search.',
    learnMore: 'Learn more about Segments',
    viewOnMap: 'View On Map',
    tableCaption: 'Your starred segments',
    cols: {
      star: 'Star',
      sport: 'Sport',
      name: 'Name',
      cat: 'Cat.',
      dist: 'Dist.',
      elev: 'Elev. Diff.',
      grade: 'Avg. Grade',
      men: 'Men',
      women: 'Women',
      pr: 'My PR',
      goal: 'My Goal',
    },
    sports: { ride: 'Ride', run: 'Run' },
    cat: 'Cat',
    km: 'km',
    m: 'm',
    unstar: 'Unstar',
    star: 'Star',
    setGoal: 'Set goal',
    emptyTitle: 'No segments here yet',
    emptyBody: 'Segments you create or hide will show up in this section.',
    exploreTitle: 'Discover segments near you',
    exploreBody: 'Open the map to find the most popular running and riding segments around you.',
  },
} as const

type Copy = (typeof copy)['fa' | 'en']

const persianDigits = '۰۱۲۳۴۵۶۷۸۹'

function useNumber(language: 'fa' | 'en') {
  return (value: string) =>
    language === 'fa' ? value.replace(/\d/g, (d) => persianDigits[Number(d)]).replace(/,/g, '٬') : value
}

function SegmentTabs({ t, active, onChange }: { t: Copy; active: TabId; onChange: (tab: TabId) => void }) {
  return (
    <div role="tablist" aria-label={t.tabsLabel} className="-mx-5 flex overflow-x-auto border-b border-slate-200 px-5 dark:border-white/10">
      {tabIds.map((id) => {
        const selected = id === active
        return (
          <button
            key={id}
            id={`segments-tab-${id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`segments-panel-${id}`}
            onClick={() => onChange(id)}
            className={`relative shrink-0 whitespace-nowrap px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#fc5200] ${
              selected
                ? 'text-slate-950 dark:text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-white/50 dark:hover:text-white'
            }`}
          >
            {t.tabs[id]}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full transition ${selected ? 'bg-[#fc5200]' : 'bg-transparent'}`}
            />
          </button>
        )
      })}
    </div>
  )
}

function StarredHero({ t }: { t: Copy }) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between md:p-6 dark:border-white/10 dark:bg-[#11151d]">
      <div className="flex max-w-2xl gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fc5200]/10 text-[#fc5200]">
          <Star aria-hidden="true" size={20} className="fill-current" />
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold leading-7 text-balance">{t.heroTitle}</h2>
          <p className="text-sm leading-6 text-pretty text-slate-600 dark:text-white/60">{t.heroBody}</p>
          <a
            href="#"
            className="w-fit text-sm font-semibold text-[#fc5200] underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200]"
          >
            {t.learnMore}
          </a>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#fc5200] px-6 text-sm font-semibold text-white transition hover:bg-[#e04a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#11151d]"
      >
        <Map aria-hidden="true" size={16} />
        {t.viewOnMap}
      </button>
    </section>
  )
}

function CategoryBadge({ category, label, n }: { category: string | null; label: string; n: (v: string) => string }) {
  if (!category) return <span className="text-slate-400 dark:text-white/30">—</span>
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-[#fc5200]/10 px-2 py-0.5 text-xs font-semibold text-[#c23f00] dark:text-[#ff8a50]">
      <Mountain aria-hidden="true" size={12} />
      {label} {n(category)}
    </span>
  )
}

function SegmentsTable({ t, language }: { t: Copy; language: 'fa' | 'en' }) {
  const n = useNumber(language)
  const [starred, setStarred] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(segments.map((s) => [s.id, true])),
  )

  const th = 'whitespace-nowrap px-3 py-3 text-start text-xs font-semibold text-slate-500 dark:text-white/50'
  const td = 'whitespace-nowrap px-3 py-3.5 tabular-nums'

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
      <table className="w-full min-w-[920px] border-collapse text-sm">
        <caption className="sr-only">{t.tableCaption}</caption>
        <thead className="bg-slate-50 dark:bg-[#11151d]">
          <tr className="border-b border-slate-200 dark:border-white/10">
            <th scope="col" className={th}>
              <span className="sr-only">{t.cols.star}</span>
            </th>
            <th scope="col" className={th}>{t.cols.sport}</th>
            <th scope="col" className={th}>{t.cols.name}</th>
            <th scope="col" className={th}>{t.cols.cat}</th>
            <th scope="col" className={th}>{t.cols.dist}</th>
            <th scope="col" className={th}>{t.cols.elev}</th>
            <th scope="col" className={th}>{t.cols.grade}</th>
            <th scope="col" className={th}>
              <span className="inline-flex items-center gap-1">
                <Crown aria-hidden="true" size={14} className="text-amber-500" />
                {t.cols.men}
              </span>
            </th>
            <th scope="col" className={th}>
              <span className="inline-flex items-center gap-1">
                <Crown aria-hidden="true" size={14} className="text-amber-500" />
                {t.cols.women}
              </span>
            </th>
            <th scope="col" className={th}>{t.cols.pr}</th>
            <th scope="col" className={th}>{t.cols.goal}</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((segment) => {
            const isStarred = starred[segment.id]
            const SportIcon = segment.sport === 'ride' ? Bike : Footprints
            return (
              <tr
                key={segment.id}
                className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.03]"
              >
                <td className="px-2 py-2">
                  <button
                    type="button"
                    aria-pressed={isStarred}
                    aria-label={`${isStarred ? t.unstar : t.star}: ${segment.name[language]}`}
                    onClick={() => setStarred((prev) => ({ ...prev, [segment.id]: !prev[segment.id] }))}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#fc5200] transition hover:bg-[#fc5200]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200]"
                  >
                    <Star aria-hidden="true" size={18} className={isStarred ? 'fill-current' : ''} />
                  </button>
                </td>
                <td className={td}>
                  <span className="inline-flex items-center gap-2 text-slate-700 dark:text-white/75">
                    <SportIcon aria-hidden="true" size={16} className="text-slate-400 dark:text-white/40" />
                    {t.sports[segment.sport]}
                  </span>
                </td>
                <td className={td}>
                  <a
                    href="#"
                    className="font-semibold text-slate-950 underline-offset-4 hover:text-[#fc5200] hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200] dark:text-white dark:hover:text-[#ff7a3d]"
                  >
                    {segment.name[language]}
                  </a>
                </td>
                <td className={td}>
                  <CategoryBadge category={segment.category} label={t.cat} n={n} />
                </td>
                <td className={td}>
                  {n(segment.distance)} <span className="text-slate-500 dark:text-white/45">{t.km}</span>
                </td>
                <td className={td}>
                  {n(segment.elevation)} <span className="text-slate-500 dark:text-white/45">{t.m}</span>
                </td>
                <td className={td}>{language === 'fa' ? `٪${n(segment.grade)}` : `${segment.grade}%`}</td>
                <td className={td}>{n(segment.men)}</td>
                <td className={td}>{n(segment.women)}</td>
                <td className={`${td} font-semibold text-[#fc5200]`}>{n(segment.pr)}</td>
                <td className={td}>
                  {segment.goal ? (
                    n(segment.goal)
                  ) : (
                    <span aria-label={t.setGoal} className="text-slate-400 dark:text-white/30">
                      —
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SegmentsEmptyState({ title, body, action }: { title: string; body: string; action?: string }) {
  return (
    <section className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/12">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fc5200]/10 text-[#fc5200]">
        <Mountain aria-hidden="true" size={22} />
      </span>
      <h2 className="text-base font-semibold text-balance">{title}</h2>
      <p className="max-w-md text-sm leading-6 text-pretty text-slate-500 dark:text-white/50">{body}</p>
      {action && (
        <button
          type="button"
          className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#fc5200] px-5 text-sm font-semibold text-white transition hover:bg-[#e04a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#080b10]"
        >
          <Map aria-hidden="true" size={16} />
          {action}
        </button>
      )}
    </section>
  )
}

export default function FooRunSegmentsPage() {
  const { language } = useAppContext()
  const t = copy[language]
  const [activeTab, setActiveTab] = useState<TabId>('starred')

  return (
    <div dir={language === 'fa' ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-slate-950 dark:bg-[#080b10] dark:text-white">
      <Header />
      <main className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h1>
        <SegmentTabs t={t} active={activeTab} onChange={setActiveTab} />
        <div
          id={`segments-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`segments-tab-${activeTab}`}
          className="flex flex-col gap-6"
        >
          {activeTab === 'starred' && (
            <>
              <StarredHero t={t} />
              <SegmentsTable t={t} language={language} />
            </>
          )}
          {(activeTab === 'created' || activeTab === 'hidden') && (
            <SegmentsEmptyState title={t.emptyTitle} body={t.emptyBody} />
          )}
          {activeTab === 'explore' && (
            <SegmentsEmptyState title={t.exploreTitle} body={t.exploreBody} action={t.viewOnMap} />
          )}
        </div>
      </main>
    </div>
  )
}
