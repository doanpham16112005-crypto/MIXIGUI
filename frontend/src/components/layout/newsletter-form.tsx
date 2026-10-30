'use client'

export function NewsletterForm() {
  return (
    <form className="flex w-full max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Email của bạn..."
        className="flex-1 rounded-xl bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-noel-500"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-noel-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-noel-500"
      >
        Đăng ký
      </button>
    </form>
  )
}
