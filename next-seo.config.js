const title = "MJanowskiDev E-Commerce App";
const description = "Ecommerce app made using Next.js.";
export const defaultOGImageUrl =
  "https://naszsklep.vercel.app/_next/image?url=https%3A%2F%2Fnaszsklep-api.vercel.app%2Fimages%2F61pHAEJ4NML._AC_UX679_.jpg&w=1920&q=75";

const nextSeoConfig = {
  title,
  description,
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
