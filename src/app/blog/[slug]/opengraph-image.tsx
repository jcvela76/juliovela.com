import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { findApprovedBlogPostByLanguage, readApprovedBlogPostsByLanguage } from "@/lib/content/blog";

type ArticleOpenGraphImageProps = {
  params: {
    slug: string;
  };
};

export const alt = "Julio Vela Tech Solutions article preview image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export const articleOpenGraphImageFile = "approved-og.png";

export function generateStaticParams() {
  return readApprovedBlogPostsByLanguage("en").map((post) => ({ slug: post.slug }));
}

function readArticleOpenGraphImage(slug: string) {
  const imageDirectory = path.join(process.cwd(), "content/assets/images", slug);
  const approvedImagePath = path.join(imageDirectory, articleOpenGraphImageFile);
  const fallbackImagePath = path.join(imageDirectory, "editorial-illustration-direction.png");
  const imagePath = existsSync(approvedImagePath) ? approvedImagePath : fallbackImagePath;

  if (!existsSync(imagePath)) {
    return null;
  }

  return readFileSync(imagePath);
}

export default function ArticleOpenGraphImage({ params }: ArticleOpenGraphImageProps) {
  const post = findApprovedBlogPostByLanguage(params.slug, "en");

  if (!post) {
    notFound();
  }

  const image = readArticleOpenGraphImage(post.slug);

  if (!image) {
    notFound();
  }

  return new Response(image, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": contentType,
    },
  });
}
