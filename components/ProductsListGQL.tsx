import { ProductCard } from "./ProductCard";
import { ProductsWithPaginationQueryQuery } from "../graphql/generated/graphql";

interface ProductsListProps {
  data: ProductsWithPaginationQueryQuery;
  baseLink: string;
}

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
