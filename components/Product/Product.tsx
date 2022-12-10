import Image from "next/image";
import { MDXResult } from "../../utils";
import { NextMarkdown } from "../NextMarkdown";

import { GetProductBySlugQuery } from "../../graphql/generated/gql-types";
import { AddToCartButton } from "../Cart/AddToCartButton";
import { CartItem } from "../Cart/CartUtils";
import { ProductReviewContainer } from "../Comments/ProductReviewContainer";
import ProductDetailsSeo from "./ProductDetailsSeo";

interface ProductProps {
  data: GetProductBySlugQuery;
  longDescription: MDXResult;
}

export const Product = ({ data, longDescription }: ProductProps) => {
  const product = data?.product;

  if (!product) return <p>Error, failed to fetch product details!</p>;

  const cartItem: CartItem = {
    id: product.id,
    price: product.price,
    title: product.name,
    count: 1,
    image: product.images[0].url,
    slug: product.slug,
  };

  return (
    <div className="w-full  ">
      <ProductDetailsSeo product={product} />
      <div className="flex  flex-wrap sm:justify-center">
        <div className="pt-3 w-[90%] sm:w-[50%]">
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

        <div className="flex flex-col justify-between py-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-teal-600 dark:text-teal-300 text-3xl font-extrabold">
              {product?.name}
            </h1>
            {product.categories[0] && (
              <h2 className="text-gray-600">
                {product?.categories[0]?.name} category
              </h2>
            )}
            <NextMarkdown>{longDescription}</NextMarkdown>
            {product?.price && (
              <p className="font-bold">{product?.price / 100} PLN</p>
            )}
          </div>

          <AddToCartButton item={cartItem} />
        </div>
      </div>
      {data.product?.slug && (
        <ProductReviewContainer productSlug={data.product?.slug} />
      )}
    </div>
  );
};
