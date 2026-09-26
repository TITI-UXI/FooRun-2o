'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

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
  return <footer className="border-t border-[#e5e7eb] bg-[#f7f7f8] px-5 py-14 text-left" dir="ltr">
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr] lg:gap-8">
      <div>
        <Link href="/" aria-label="FooRun home" className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.08em] transition-opacity hover:opacity-75">
          <span className="text-[#FC5200]" aria-hidden="true">✦</span><span><b className="text-[#FC5200]">Foo</b>Run</span>
        </Link>
        <p className="mt-3 text-sm text-[#6B7280]">© 2026 FooRun, Inc. All rights reserved.</p>
      </div>
      {columns.map((column) => <nav key={column.title} aria-label={column.title}><h2 className="mb-3 text-lg font-medium text-[#45454c]">{column.title}</h2>{column.links.map((link) => <FooterLink key={link}>{link}</FooterLink>)}</nav>)}
      <div>
        <nav aria-label="Help"><h2 className="mb-3 text-lg font-medium text-[#45454c]">Help</h2><FooterLink>FooRun Support</FooterLink><FooterLink>Community Standards</FooterLink></nav>
        <nav aria-label="More" className="mt-6"><h2 className="mb-3 text-lg font-medium text-[#45454c]">More</h2>{moreLinks.map((link) => <FooterLink key={link}>{link}</FooterLink>)}</nav>
        <label className="relative mt-5 block w-fit"><span className="sr-only">Language</span><select defaultValue="fa" className="min-h-11 appearance-none rounded border border-[#e5e7eb] bg-white py-2 pl-3 pr-9 text-sm text-[#45454c] outline-none transition-colors focus:border-[#FC5200]">
          <option value="fa">فارسی / Persian</option><option value="en">English</option>
        </select><ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-3.5 text-[#6B7280]" aria-hidden="true" /></label>
      </div>
    </div>
  </footer>
}
