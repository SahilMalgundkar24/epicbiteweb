import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  images,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const imageList = images?.length ? images : [`${siteConfig.url}/images/image.png`];
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title: title ?? siteConfig.name,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: imageList.map((image) => ({
        url: image,
        alt: fullTitle,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: imageList,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
