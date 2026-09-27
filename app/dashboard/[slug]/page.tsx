import FooRunDashboardSubpage, { type Slug } from '@/components/foorun-dashboard-subpage'

const validSlugs = ['activity-feed', 'clubs', 'segments', 'routes', 'goals'] as const

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export default async function DashboardSubpage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const safeSlug = validSlugs.includes(slug as Slug) ? slug as Slug : 'activity-feed'
  return <FooRunDashboardSubpage slug={safeSlug} />
}
