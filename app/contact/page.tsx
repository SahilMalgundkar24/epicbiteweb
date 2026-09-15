import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Epic Bite for recipe questions, collaborations, or community support via WhatsApp, email, or social media.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us" lastUpdated="September 15, 2026">
      <section>
        <p>
          We&apos;d love to hear from you. Whether you have a question about a
          recipe, want to join our community, or are interested in collaborating
          with {siteConfig.name}, reach out using any of the options below.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h2>
        <p className="mb-4">
          The fastest way to reach us is through WhatsApp. Send us a message and
          we&apos;ll get back to you as soon as we can.
        </p>
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition"
        >
          Message on WhatsApp
        </a>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Email</h2>
        <p>
          For general inquiries, partnerships, or privacy-related requests, email
          us at{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-[#CE2425] hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Social Media
        </h2>
        <p className="mb-4">
          Follow us for new recipes, cooking tips, and video tutorials.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <BsInstagram size={20} />
            <a
              href={siteConfig.social.instagram[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CE2425] hover:underline"
            >
              @myepicbite on Instagram
            </a>
          </div>
          <div className="flex items-center gap-4">
            <BsInstagram size={20} />
            <a
              href={siteConfig.social.instagram[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CE2425] hover:underline"
            >
              @myepicbite.kitchen on Instagram
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaYoutube size={20} />
            <a
              href={siteConfig.social.youtube[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CE2425] hover:underline"
            >
              @myepicbite on YouTube
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaYoutube size={20} />
            <a
              href={siteConfig.social.youtube[1]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CE2425] hover:underline"
            >
              @myepicbitekitchen on YouTube
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">About Epic Bite</h2>
        <p>
          Learn more about our story, cooking classes, and community on the{" "}
          <Link href="/about" className="text-[#CE2425] hover:underline">
            About page
          </Link>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
