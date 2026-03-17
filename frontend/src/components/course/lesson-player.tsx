export function LessonPlayer({ videoUrl, title }: { videoUrl: string; title: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <video src={videoUrl} controls className="w-full rounded-lg" />
    </div>
  )
}
