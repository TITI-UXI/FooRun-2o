import type { Metadata } from 'next'
import FooRunSegmentsPage from '@/components/foorun-segments-page'

export const metadata: Metadata = {
  title: 'My Segments | FooRun',
  description: 'Track your starred, created, and hidden segments on FooRun.',
}

export default function SegmentsPage() {
  return <FooRunSegmentsPage />
}
