import { NextSeo } from "next-seo";
import { GetProductBySlugQuery } from "../../graphql/generated/gql-types";
import { defaultOGImageUrl } from "../../next-seo.config";

interface ProductDetailsSeoProps {
  product: GetProductBySlugQuery["product"];
}

const ProductDetailsSeo = ({ product }: ProductDetailsSeoProps) => {
  return (
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
  );
};

export default ProductDetailsSeo;
