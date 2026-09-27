import FooRunTrainingSubpage, { type TrainingSlug } from '@/components/foorun-training-subpage'

const validSlugs = ['calendar', 'activities', 'log', 'plans', 'power-curve', 'fitness'] as const

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export default async function TrainingSubpage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const safeSlug = validSlugs.includes(slug as TrainingSlug) ? slug as TrainingSlug : 'calendar'
  return <FooRunTrainingSubpage slug={safeSlug} />
}
