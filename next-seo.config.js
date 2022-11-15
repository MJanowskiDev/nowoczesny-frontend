const title = "MJanowskiDev E-Commerce App";
const description = "Ecommerce app made using Next.js.";
export const defaultOGImageUrl = process.env.DEFAULT_OG_IMAGE || "";

const nextSeoConfig = {
  title,
  description,
  canonical: process.env.CANONICAL,
  openGraph: {
    title,
    description,
    site_name: "E-Commerce App",
    images: [
      {
        url: defaultOGImageUrl,
        alt: title,
        type: "image/jpeg",
      },
    ],
  },
};

export default nextSeoConfig;
