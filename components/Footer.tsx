import Link from "next/link";
import Image from "next/image";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { siteConfig } from "@/lib/site";

const footerSections = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/recipes", label: "Recipes" },
      { href: "/pdf-recipes", label: "Recipe PDFs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const socialLinks = [
  {
    href: siteConfig.social.instagram[0],
    label: "Instagram",
    icon: BsInstagram,
  },
  {
    href: siteConfig.social.youtube[0],
    label: "YouTube",
    icon: FaYoutube,
  },
];

const Footer = () => {
  return (
    <footer className="w-full mt-10 border-t border-gray-200">
      <div className="py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/epicbitelogo.svg"
                alt={siteConfig.name}
                width={180}
                height={42}
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-4 text-base text-gray-700 leading-relaxed max-w-md">
              Simple, flavorful homemade recipes for everyday cooking. Veg,
              non-veg, baking, and healthy meals made easy.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F7F7F7] text-gray-600 hover:bg-[#CE2425] hover:text-white transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 hover:text-[#CE2425] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-gray-200 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm md:text-base text-gray-600">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed and Developed by{" "}
            <a
              href="https://sahilmalgundkar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CE2425] font-semibold hover:underline"
            >
              Sahil Malgundkar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
