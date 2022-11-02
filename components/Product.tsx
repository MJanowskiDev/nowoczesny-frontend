import Image from "next/image";
import { MDXResult, Rating } from "../utils";
import { NextMarkdown } from "./NextMarkdown";

import { NextSeo } from "next-seo";

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: MDXResult;
}

interface ProductProps {
  data: ProductDetails;
}

export const Product = ({ data }: ProductProps) => {
  return (
    <div>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://naszsklep.vercel.app/products/${data.id}`}
        openGraph={{
          url: `https://naszsklep.vercel.app/products/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.image,
              alt: data.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <article className="prose dark:prose-invert ">
        <h2 className="text-gray-600">Category: {data.category}</h2>
        <div className="bg-white h-1/2 mt-4 mb-6">
          <div className="pt-3">
            <Image
              className="mt-2"
              src={data.image}
              alt={data.title}
              layout="responsive"
              width={16}
              height={9}
              objectFit="contain"
            />
          </div>
        </div>
        <h1 className="text-teal-600 dark:text-teal-300">{data.title}</h1>
        <h6>{data.description}</h6>
        <NextMarkdown>{data.longDescription}</NextMarkdown>
        <p>
          Rating: {data.rating.rate} (based on {data.rating.count} reviews)
        </p>
        <p className="font-bold">Price: {data.price}</p>
      </article>
    </div>
  );
};
