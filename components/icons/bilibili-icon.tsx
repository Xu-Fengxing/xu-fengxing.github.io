export function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="M7 3l2 4M17 3l-2 4" />
      <circle cx="8" cy="13" r="1" fill="currentColor" />
      <circle cx="16" cy="13" r="1" fill="currentColor" />
      <path d="M9 17h6" />
    </svg>
  )
}
