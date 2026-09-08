import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/en";

export function AuthBrandingPanel({ brand, dict }: { brand: string; dict: Dictionary["auth"] }) {
  return (
    <div className="relative hidden w-[42%] shrink-0 flex-col justify-between overflow-hidden bg-primary px-10 py-12 text-primary-foreground md:flex lg:w-[38%]">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/5" />

      <Link href="/" className="relative flex items-center gap-2.5">
        <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="15" className="fill-white/15" />
          <path
            d="M8 13.5c0-.6.3-1.1.8-1.4L15 8.5c.6-.3 1.4-.3 2 0l6.2 3.6c.5.3.8.8.8 1.4v.5H8v-.5Z"
            fill="currentColor"
          />
          <path
            d="M8 14h16v1.4c0 .3-.2.6-.5.6h-.2c-.9 0-1.6-.7-1.6-1.3 0 .6-.7 1.3-1.6 1.3s-1.6-.7-1.6-1.3c0 .6-.7 1.3-1.6 1.3s-1.6-.7-1.6-1.3c0 .6-.7 1.3-1.6 1.3s-1.6-.7-1.6-1.3c0 .6-.7 1.3-1.6 1.3h-.2c-.3 0-.5-.3-.5-.6V14Z"
            fill="currentColor"
          />
          <rect x="9" y="16.4" width="14" height="7.6" rx="0.5" fill="currentColor" />
          <rect x="14.5" y="19" width="3" height="5" className="fill-primary" />
        </svg>
        <span className="text-lg font-semibold">{brand}</span>
      </Link>

      <div className="relative">
        <p className="text-2xl font-semibold leading-snug text-balance">{dict.tagline}</p>
        <ul className="mt-6 flex flex-col gap-3 text-sm text-primary-foreground/80">
          {dict.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                <path
                  d="M3 8.5 6.5 12 13 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-xs text-primary-foreground/50">{dict.footnote}</p>
    </div>
  );
}
