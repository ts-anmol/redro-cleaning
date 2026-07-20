/**
 * Central site + business config used for SEO (metadata, structured data,
 * sitemap, robots). Override the domain in production by setting
 * NEXT_PUBLIC_SITE_URL — no code change needed.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://redrocleaning.com"
).replace(/\/$/, "");

export const BUSINESS = {
  name: "Redro Cleaning",
  description:
    "Professional end of lease, move-in and move-out cleaning across Sydney, plus carpet steam, driveway and balcony add-ons — spotless results backed by our 100% bond back guarantee.",
  phone: "+61 404 504 303",
  email: "redrocleaning@gmail.com",
  priceRange: "$$",
  // Service-area (mobile) business: ~60km around Parramatta, i.e. all of Sydney.
  locality: "Sydney",
  region: "NSW",
  country: "AU",
  areaCenter: { latitude: -33.8148, longitude: 151.0017 }, // Parramatta, NSW
  areaRadiusMeters: 60000,
  hours: { opens: "09:00", closes: "21:00" }, // 9am–9pm, 7 days
} as const;
