export function QQIcon({ className }: { className?: string }) {
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
      <ellipse cx="12" cy="10" rx="5" ry="6" />
      <path d="M7 12c-1.5 1-2 2.5-2 4 0 1 0.5 2 1.5 2" />
      <path d="M17 12c1.5 1 2 2.5 2 4 0 1-0.5 2-1.5 2" />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
      <circle cx="14" cy="9" r="1" fill="currentColor" />
      <path d="M10 13c0.5 0.5 1 0.7 2 0.7s1.5-0.2 2-0.7" />
      <path d="M12 16v4" />
      <path d="M9 20h6" />
    </svg>
  )
}
