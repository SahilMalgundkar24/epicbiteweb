import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Epic Bite. Read the rules for using our recipe website, content, and services at myepicbite.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="September 15, 2026">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Agreement to Terms
        </h2>
        <p>
          By accessing or using {siteConfig.name} ({siteConfig.url}), you agree
          to be bound by these Terms of Service. If you do not agree, please do
          not use our website.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Use of Our Website
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You may browse recipes and content for personal, non-commercial use.
          </li>
          <li>
            You may not copy, scrape, republish, or redistribute our content
            without written permission.
          </li>
          <li>
            You may not attempt to disrupt, damage, or gain unauthorized access
            to our website or systems.
          </li>
          <li>You agree not to use the site for any unlawful purpose.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Recipe Content Disclaimer
        </h2>
        <p>
          Recipes on {siteConfig.name} are provided for informational and
          educational purposes. Cooking involves heat, sharp tools, and
          allergens. You are responsible for checking ingredients, following
          food safety practices, and adapting recipes to your dietary needs.{" "}
          {siteConfig.name} is not liable for outcomes resulting from following
          our recipes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Intellectual Property
        </h2>
        <p>
          All recipes, images, text, branding, and other content on this site
          are owned by {siteConfig.name} or used with permission, unless
          otherwise stated. Unauthorized use of our content may violate
          copyright and other laws.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Third-Party Links
        </h2>
        <p>
          Our site may link to third-party websites such as YouTube, Instagram,
          WhatsApp, or PDF resources. We are not responsible for the content,
          policies, or practices of those external sites.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Advertising
        </h2>
        <p>
          We may display advertisements through Google AdSense and other
          partners. Ad content is provided by third parties and does not
          constitute an endorsement by {siteConfig.name}.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Limitation of Liability
        </h2>
        <p>
          {siteConfig.name} is provided on an &quot;as is&quot; basis. To the
          fullest extent permitted by law, we disclaim all warranties and shall
          not be liable for any indirect, incidental, or consequential damages
          arising from your use of the site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Changes to Terms
        </h2>
        <p>
          We may update these Terms at any time. Updated terms will be posted on
          this page. Your continued use of the site after changes constitutes
          acceptance of the new Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact</h2>
        <p>
          Questions about these Terms? Visit our{" "}
          <Link href="/contact" className="text-[#CE2425] hover:underline">
            Contact page
          </Link>{" "}
          or email{" "}
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
