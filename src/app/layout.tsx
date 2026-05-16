import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { defaultOgImage, indexableRobots, siteMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.baseUrl),
  applicationName: siteMetadata.name,
  title: {
    default: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
  authors: [{ name: "Julio Vela" }],
  creator: "Julio Vela",
  publisher: siteMetadata.name,
  category: "technology",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  robots: indexableRobots,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [defaultOgImage],
    url: "/",
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage.url],
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
