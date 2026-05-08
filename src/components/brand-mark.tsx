import React from "react";

import { brandIdentity } from "@/lib/brand";

export default function BrandMark() {
  return (
    <a href="#top" className="inline-flex flex-col leading-tight" aria-label="Julio Vela home">
      <span className="brand-mark font-black text-[1.35rem] tracking-[0.28em] text-[color:var(--brand-red)]">
        {brandIdentity.mark}
      </span>
      <span className="text-[1.25rem] font-semibold tracking-[0.2em] text-[color:var(--brand-soft)]">
        {brandIdentity.wordmark}
      </span>
      <span className="text-xs font-medium tracking-[0.16em] text-[color:var(--brand-interface)]">
        {brandIdentity.subtitle}
      </span>
    </a>
  );
}
