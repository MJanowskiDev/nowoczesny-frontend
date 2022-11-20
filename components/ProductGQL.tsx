import Image from "next/image";
import { MDXResult } from "../utils";
import { NextMarkdown } from "./NextMarkdown";

import { defaultOGImageUrl } from "../next-seo.config";

import { NextSeo } from "next-seo";
import { GetProductBySlugQuery } from "../graphql/generated/gql-types";
import { AddToCartButton } from "./Cart/AddToCartButton";
import { CartItem } from "./Cart/CartUtils";

interface ProductProps {
  product: GetProductBySlugQuery["product"];
  longDescription: MDXResult;
}

export const ProductGQL = ({ product, longDescription }: ProductProps) => {
  const cartItem: CartItem = {
    id: product?.id || "error",
    price: product?.price || 0,
    title: product?.name || "error",
    count: 1,
    image: product?.images[0].url || "",
  };

  return (
    <div>
      <NextSeo
        title={product?.name}
        description={product?.description}
        canonical={`${process.env.NEXT_PUBLIC_CANONICAL}/${product?.slug}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_CANONICAL}/${product?.slug}`,
          title: product?.name,
          description: product?.description,
          images: [
            {
              url: product?.images ? product?.images[0].url : defaultOGImageUrl,
              alt: product?.name,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <article className="prose dark:prose-invert ">
        {product?.categories[0] && (
          <h2 className="text-gray-600">
            Category: {product?.categories[0]?.name}
          </h2>
        )}
        <div className="bg-white h-1/2 mt-4 mb-6">
          <div className="pt-3">
            {product?.images[0].url && (
              <Image
                className="mt-2"
                src={product?.images[0].url}
                alt={product?.name}
                layout="responsive"
                width={16}
                height={9}
                objectFit="contain"
              />
            )}
          </div>
        </div>
        <AddToCartButton item={cartItem} />
        <h1 className="text-teal-600 dark:text-teal-300">{product?.name}</h1>
        <NextMarkdown>{longDescription}</NextMarkdown>
        <p className="font-bold">Price: {product?.price}</p>
      </article>
    </div>
  );
};
