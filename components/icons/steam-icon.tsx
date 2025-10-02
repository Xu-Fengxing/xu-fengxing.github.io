export function SteamIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M12 12l-5 5" />
      <circle cx="7" cy="17" r="2.5" />
      <path d="M16.5 8.5l-4.5 3.5" />
    </svg>
  )
}
