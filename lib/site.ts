export const siteConfig = {
  name: "Epic Bite",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://myepicbite.com",
  description:
    "Discover simple, flavorful homemade recipes from Epic Bite. Easy everyday cooking, vegetarian and non-vegetarian dishes, baking, and healthy millet-based meals.",
  contact: {
    whatsapp: "+919898161843",
    whatsappUrl:
      "https://wa.me/919898161843?text=Hey%2C%20I%20have%20a%20question%20about%20Epic%20Bite",
    email: "inamdarsadika@gmail.com",
  },
  social: {
    instagram: [
      "https://www.instagram.com/myepicbite",
      "https://www.instagram.com/myepicbite.kitchen",
    ],
    youtube: [
      "https://www.youtube.com/@myepicbite",
      "https://www.youtube.com/@myepicbitekitchen",
    ],
  },
} as const;
