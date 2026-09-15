import { siteConfig } from "@/lib/site";

export function GET() {
  const content = `# ${siteConfig.name}

> ${siteConfig.description}

## About
Epic Bite is a homemade recipe website featuring vegetarian and non-vegetarian dishes, baking, and healthy millet-based meals. Recipes are designed for everyday cooking with simple ingredients.

## Primary pages
- Home: ${siteConfig.url}/
- Recipes: ${siteConfig.url}/recipes
- About: ${siteConfig.url}/about
- Recipe PDFs: ${siteConfig.url}/pdf-recipes
- Contact: ${siteConfig.url}/contact
- Privacy Policy: ${siteConfig.url}/privacy-policy
- Terms of Service: ${siteConfig.url}/terms

## Content focus
- Indian and homemade recipes
- Step-by-step cooking instructions
- Ingredients lists
- Optional YouTube video links for select recipes

## Contact
- Email: ${siteConfig.contact.email}
- WhatsApp: ${siteConfig.contact.whatsapp}
- Website: ${siteConfig.url}/contact

## Social
- Instagram: ${siteConfig.social.instagram.join(", ")}
- YouTube: ${siteConfig.social.youtube.join(", ")}

## Sitemap
${siteConfig.url}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
