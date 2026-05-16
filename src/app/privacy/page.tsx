import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: "Privacy notes for the Julio Vela Tech Solutions website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 py-16 md:px-8">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)]"
        >
          :// JULIO VELA
        </Link>

        <p className="mt-16 text-sm font-semibold uppercase text-[color:var(--brand-red)]">Privacy</p>
        <h1 className="mt-6 text-5xl font-semibold leading-none md:text-7xl">Privacy Policy</h1>
        <p className="mt-6 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-interface)]">
          Last updated: May 16, 2026
        </p>

        <div className="mt-12 space-y-8 text-lg leading-relaxed text-[color:var(--brand-graphite)]">
          <p>
            This site is a personal technology brand website for Julio Vela. It does not currently use accounts,
            contact forms, newsletter signup, advertising pixels, payment flows, or user login features.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[color:var(--brand-space)]">Information you send directly</h2>
            <p className="mt-3">
              If you email Julio Vela, the information you choose to send may be used to read, respond to, and manage
              that conversation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[color:var(--brand-space)]">Website analytics</h2>
            <p className="mt-3">
              This site may use Vercel Web Analytics to understand basic site performance, such as page views,
              referrers, device/browser trends, and which public pages are most useful to visitors.
            </p>
            <p className="mt-3">
              The analytics setup is intended to be lightweight and privacy-conscious. It is not intended to identify
              individual visitors, create advertising profiles, or track people across unrelated websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[color:var(--brand-space)]">What is not used</h2>
            <p className="mt-3">
              This site does not currently use Google Analytics, advertising pixels, retargeting scripts, affiliate
              tracking pixels, or behavioral advertising tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[color:var(--brand-space)]">Future updates</h2>
            <p className="mt-3">
              If forms, newsletters, accounts, cookies, advertising tools, payment flows, or other data collection are
              added later, this page should be updated before those features are launched.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
