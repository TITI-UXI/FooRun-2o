'use client'

import { useState, type FormEvent } from 'react'
import { ChevronDown, Flag, MapPin, Plus, Search, UsersRound } from 'lucide-react'
import { Header } from '@/components/foorun-dashboard'
import { useAppContext } from '@/components/language-theme-context'

const sportTypes = ['running', 'cycling', 'swimming', 'triathlon', 'walking', 'hiking', 'other'] as const
type SportType = (typeof sportTypes)[number]

const copy = {
  fa: {
    title: 'باشگاه‌ها',
    create: 'ایجاد باشگاه',
    clubName: 'نام باشگاه',
    location: 'موقعیت مکانی',
    sportType: 'نوع ورزش',
    search: 'جستجو',
    formLabel: 'جستجوی باشگاه',
    emptyTitle: 'برای یافتن باشگاه، از کادر بالا جستجو کنید',
    emptyHint: 'نام باشگاه، شهر یا نوع ورزش را وارد کنید تا هم‌مسیرهای تازه پیدا کنید.',
    noResultsTitle: 'باشگاهی پیدا نشد',
    noResultsHint: 'عبارت دیگری را امتحان کنید یا باشگاه خودتان را بسازید.',
    sports: { running: 'دویدن', cycling: 'دوچرخه‌سواری', swimming: 'شنا', triathlon: 'سه‌گانه', walking: 'پیاده‌روی', hiking: 'کوهنوردی', other: 'سایر' },
  },
  en: {
    title: 'Clubs',
    create: 'Create a Club',
    clubName: 'Club Name',
    location: 'Location',
    sportType: 'Sport Type',
    search: 'Search',
    formLabel: 'Search clubs',
    emptyTitle: 'Search for a club above.',
    emptyHint: 'Enter a club name, city, or sport to find new people to train with.',
    noResultsTitle: 'No clubs found',
    noResultsHint: 'Try a different search, or create your own club.',
    sports: { running: 'Running', cycling: 'Cycling', swimming: 'Swimming', triathlon: 'Triathlon', walking: 'Walking', hiking: 'Hiking', other: 'Other' },
  },
} as const

const fieldClass =
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#fc5200] focus:outline-none focus:ring-2 focus:ring-[#fc5200]/25 dark:border-white/12 dark:bg-[#0d1118] dark:text-white dark:placeholder:text-white/35'

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-slate-600 dark:text-white/60">
        {label}
      </label>
      {children}
    </div>
  )
}

function ClubSearchForm({ t, onSearch }: { t: (typeof copy)['fa' | 'en']; onSearch: () => void }) {
  const [sport, setSport] = useState<SportType>('running')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch()
  }

  return (
    <form
      role="search"
      aria-label={t.formLabel}
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 md:p-5 lg:grid-cols-[1fr_1fr_200px_auto] lg:items-end dark:border-white/10 dark:bg-[#11151d]"
    >
      <Field id="club-name" label={t.clubName}>
        <input id="club-name" name="name" type="text" autoComplete="off" placeholder={t.clubName} className={fieldClass} />
      </Field>
      <Field id="club-location" label={t.location}>
        <div className="relative">
          <MapPin aria-hidden="true" size={16} className="pointer-events-none absolute inset-y-0 start-3 my-auto text-slate-400 dark:text-white/35" />
          <input id="club-location" name="location" type="text" autoComplete="address-level2" placeholder={t.location} className={`${fieldClass} ps-9`} />
        </div>
      </Field>
      <Field id="club-sport" label={t.sportType}>
        <div className="relative">
          <select
            id="club-sport"
            name="sport"
            value={sport}
            onChange={(event) => setSport(event.target.value as SportType)}
            className={`${fieldClass} appearance-none pe-9`}
          >
            {sportTypes.map((type) => (
              <option key={type} value={type}>
                {t.sports[type]}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute inset-y-0 end-3 my-auto text-slate-500 dark:text-white/50" />
        </div>
      </Field>
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-[#fc5200] hover:text-[#fc5200] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200] focus-visible:ring-offset-2 sm:col-span-2 lg:col-span-1 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-[#fc5200] dark:hover:text-[#ff7a3d] dark:focus-visible:ring-offset-[#11151d]"
      >
        <Search aria-hidden="true" size={16} />
        {t.search}
      </button>
    </form>
  )
}

function ClubsEmptyState({ title, hint, searched }: { title: string; hint: string; searched: boolean }) {
  const Icon = searched ? Flag : UsersRound
  return (
    <section aria-live="polite" className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/12">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fc5200]/10 text-[#fc5200]">
        <Icon aria-hidden="true" size={22} />
      </span>
      <h2 className="text-base font-semibold text-balance">{title}</h2>
      <p className="max-w-md text-sm leading-6 text-pretty text-slate-500 dark:text-white/50">{hint}</p>
    </section>
  )
}

export default function FooRunClubsPage() {
  const { language } = useAppContext()
  const t = copy[language]
  const [searched, setSearched] = useState(false)

  return (
    <div dir={language === 'fa' ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-slate-950 dark:bg-[#080b10] dark:text-white">
      <Header />
      <main className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h1>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5200] focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-white/85 dark:focus-visible:ring-offset-[#080b10]"
          >
            <Plus aria-hidden="true" size={16} />
            {t.create}
          </button>
        </div>
        <ClubSearchForm t={t} onSearch={() => setSearched(true)} />
        <ClubsEmptyState
          searched={searched}
          title={searched ? t.noResultsTitle : t.emptyTitle}
          hint={searched ? t.noResultsHint : t.emptyHint}
        />
      </main>
    </div>
  )
}
