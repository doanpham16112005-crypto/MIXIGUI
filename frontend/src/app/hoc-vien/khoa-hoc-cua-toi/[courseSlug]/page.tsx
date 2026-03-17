export default async function StudyPage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params
  return (
    <div>
      <h1 className="text-2xl font-bold">Học: {courseSlug}</h1>
    </div>
  )
}
