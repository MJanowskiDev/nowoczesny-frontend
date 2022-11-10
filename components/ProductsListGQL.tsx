import { ProductsAPIResponse } from "../utils";
import { ProductCard } from "./ProductCard";
interface ProductsListProps {
  data: GetProductsListQuery;
  baseLink: string;
}

import { GetProductsListQuery } from "../graphql/generated/graphql";

export const ProductsListGQL = ({ data, baseLink }: ProductsListProps) => {
  return (
    <div className="flex flex-wrap justify-center">
      {data.products.map((element) => (
        <ProductCard
          key={element.id}
          data={{
            id: element.id,
            title: element.name,
            description: element.name,
            image: element.images[0].url,
          }}
          link={baseLink}
        />
      ))}
    </div>
  );
};
