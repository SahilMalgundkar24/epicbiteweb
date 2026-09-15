import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read how Epic Bite collects, uses, and protects your information, including cookies, analytics, and advertising on myepicbite.com.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="September 15, 2026">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Introduction
        </h2>
        <p>
          Welcome to {siteConfig.name} ({siteConfig.url}). We are committed to
          protecting your privacy and being transparent about how we collect and
          use information when you visit our recipe website. This Privacy Policy
          explains what data we collect, how we use it, and your choices.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Information We Collect
        </h2>
        <p className="mb-3">
          When you use our website, we may collect the following types of
          information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Usage data:</strong> pages visited, time spent, browser
            type, device type, and general location (country/region level).
          </li>
          <li>
            <strong>Technical data:</strong> IP address, cookies, and similar
            identifiers used for analytics and advertising.
          </li>
          <li>
            <strong>Contact information:</strong> only if you voluntarily
            contact us via WhatsApp, email, or social media.
          </li>
        </ul>
        <p className="mt-3">
          We do not require you to create an account to browse recipes on{" "}
          {siteConfig.name}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            To provide and improve our recipe content and website experience.
          </li>
          <li>To understand how visitors use our site through analytics.</li>
          <li>To display relevant advertisements through Google AdSense.</li>
          <li>To respond to inquiries you send us directly.</li>
          <li>To maintain the security and performance of our website.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Cookies and Advertising
        </h2>
        <p className="mb-3">
          We use cookies and similar technologies to operate our website,
          measure traffic, and serve ads. Third parties, including Google, may
          use cookies to serve ads based on your prior visits to this website or
          other websites.
        </p>
        <p className="mb-3">
          Google&apos;s use of advertising cookies enables it and its partners
          to serve ads to you.
        </p>
        <p>
          For more information about how Google uses data when you use our
          partners&apos; sites or apps, visit{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#CE2425] hover:underline"
          >
            Google&apos;s partner sites policy
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Data Retention
        </h2>
        <p>
          We retain information only as long as necessary to operate the
          website, comply with legal obligations, resolve disputes, and enforce
          our agreements. Analytics and advertising data retention is governed
          by the respective third-party providers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated &quot;Last updated&quot; date.
          Continued use of the site after changes constitutes acceptance of the
          revised policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, visit our{" "}
          <Link href="/contact" className="text-[#CE2425] hover:underline">
            Contact page
          </Link>{" "}
          or email us at{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-[#CE2425] hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
