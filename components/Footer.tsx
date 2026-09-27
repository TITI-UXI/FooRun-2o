'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useLanguageAndTheme } from '@/components/language-theme-context'

const orange = '#FC5200'

const columns = [
  { title: 'About', links: ['About', 'Features', 'Mobile App', 'Subscription', 'Family Plan', 'Bulk Subscriptions', 'Student Discount', 'Privacy Policy', 'Cookie Policy', 'Terms'] },
  { title: 'Explore', links: ['Routes & Trails', 'Running Clubs', 'Cycling Segments', 'Monthly Challenges', 'Marathon Training Guides'] },
  { title: 'Follow & Community', links: ['Instagram', 'Telegram', 'Strava Club', 'YouTube', 'LinkedIn', 'Athlete Stories'] },
]

const moreLinks = ['Careers', 'Press & Media', 'Business Partners', 'Developers API', 'Labs']

function FooterLink({ children }: { children: string }) {
  return <Link href="#" className="block w-fit py-1 text-sm text-[#6B7280] transition-colors duration-200 hover:text-[#FC5200]">{children}</Link>
}

export default function FooRunFooter() {
  const { language, setLanguage } = useLanguageAndTheme()
  const isPersian = language === 'fa'
  const labels = isPersian ? {
    about: 'درباره ما', explore: 'کاوش', community: 'ارتباط با جامعه', help: 'راهنما', more: 'بیشتر', support: 'پشتیبانی FooRun', standards: 'استانداردهای جامعه', careers: 'فرصت‌های شغلی', press: 'رسانه و اخبار', business: 'همکاران تجاری', api: 'رابط برنامه‌نویسی', labs: 'آزمایشگاه‌ها', copyright: '© ۲۰۲۶ FooRun، تمامی حقوق محفوظ است.'
  } : {
    about: 'About', explore: 'Explore', community: 'Follow & Community', help: 'Help', more: 'More', support: 'FooRun Support', standards: 'Community Standards', careers: 'Careers', press: 'Press & Media', business: 'Business Partners', api: 'Developers API', labs: 'Labs', copyright: '© 2026 FooRun, Inc. All rights reserved.'
  }
  const translatedColumns = isPersian ? [
    { title: labels.about, links: ['درباره ما', 'ویژگی‌ها', 'اپلیکیشن موبایل', 'اشتراک', 'حریم خصوصی', 'قوانین'] },
    { title: labels.explore, links: ['مسیرها و جاده‌ها', 'باشگاه‌های دویدن', 'چالش‌های ماهانه', 'راهنمای تمرین ماراتن'] },
    { title: labels.community, links: ['اینستاگرام', 'تلگرام', 'باشگاه FooRun', 'یوتیوب', 'داستان ورزشکاران'] },
  ] : columns
  const translatedMore = isPersian ? [labels.careers, 'رسانه و اخبار', 'همکاران تجاری', 'رابط برنامه‌نویسی', 'آزمایشگاه‌ها'] : [labels.careers, labels.press, labels.business, labels.api, labels.labs]
  return <footer className="border-t border-[#e5e7eb] bg-[#f7f7f8] px-5 py-14 text-left dark:border-[#34353a] dark:bg-[#17181c]" dir={isPersian ? 'rtl' : 'ltr'}>
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr] lg:gap-8">
      <div><Link href="/" aria-label="FooRun home" className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.08em] transition-opacity hover:opacity-75"><span className="text-[#FC5200]" aria-hidden="true">✦</span><span><b className="text-[#FC5200]">Foo</b>Run</span></Link><p className="mt-3 text-sm text-[#6B7280]">{labels.copyright}</p></div>
      {translatedColumns.map((column) => <nav key={column.title} aria-label={column.title}><h2 className="mb-3 text-lg font-medium text-[#45454c] dark:text-[#eeeeef]">{column.title}</h2>{column.links.map((link) => <FooterLink key={link}>{link}</FooterLink>)}</nav>)}
      <div><nav aria-label={labels.help}><h2 className="mb-3 text-lg font-medium text-[#45454c] dark:text-[#eeeeef]">{labels.help}</h2><FooterLink>{labels.support}</FooterLink><FooterLink>{labels.standards}</FooterLink></nav><nav aria-label={labels.more} className="mt-6"><h2 className="mb-3 text-lg font-medium text-[#45454c] dark:text-[#eeeeef]">{labels.more}</h2>{translatedMore.map((link) => <FooterLink key={link}>{link}</FooterLink>)}</nav><div className="mt-5 flex items-center gap-2"><span className="sr-only">Language</span><button type="button" onClick={() => setLanguage('fa')} aria-pressed={isPersian} className={`min-h-11 rounded border px-3 text-sm transition-colors ${isPersian ? 'border-[#FC5200] text-[#FC5200]' : 'border-[#e5e7eb] text-[#6B7280]'}`}>FA</button><button type="button" onClick={() => setLanguage('en')} aria-pressed={!isPersian} className={`min-h-11 rounded border px-3 text-sm transition-colors ${!isPersian ? 'border-[#FC5200] text-[#FC5200]' : 'border-[#e5e7eb] text-[#6B7280]'}`}>EN</button><ChevronDown size={14} className="hidden" aria-hidden="true" /></div></div>
    </div>
  </footer>
}
