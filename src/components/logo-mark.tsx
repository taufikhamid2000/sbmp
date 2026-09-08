// SBMP mark: a simple geometric storefront — a scalloped awning over a
// shop front with a door, in the app's single primary blue accent.
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="15" fill="#1e40af" />
      {/* Scalloped awning */}
      <path
        d="M8 13.5c0-.6.3-1.1.8-1.4L15 8.5c.6-.3 1.4-.3 2 0l6.2 3.6c.5.3.8.8.8 1.4v.5H8v-.5Z"
        fill="#f1f5f9"
      />
      <path
        d="M8 14h16v1.4c0 .3-.2.6-.5.6h-.2c-.9 0-1.6-.7-1.6-1.3 0 .6-.7 1.3-1.6 1.3s-1.6-.7-1.6-1.3c0 .6-.7 1.3-1.6 1.3s-1.6-.7-1.6-1.3c0 .6-.7 1.3-1.6 1.3s-1.6-.7-1.6-1.3c0 .6-.7 1.3-1.6 1.3h-.2c-.3 0-.5-.3-.5-.6V14Z"
        fill="#f1f5f9"
      />
      {/* Storefront body */}
      <rect x="9" y="16.4" width="14" height="7.6" rx="0.5" fill="#f1f5f9" />
      {/* Door */}
      <rect x="14.5" y="19" width="3" height="5" fill="#1e40af" />
    </svg>
  );
}
