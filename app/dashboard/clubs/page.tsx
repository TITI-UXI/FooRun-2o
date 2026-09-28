import type { Metadata } from 'next'
import FooRunClubsPage from '@/components/foorun-clubs-page'

export const metadata: Metadata = {
  title: 'Clubs | FooRun',
  description: 'Find running and cycling clubs on FooRun, or create your own.',
}

export default function ClubsPage() {
  return <FooRunClubsPage />
}
