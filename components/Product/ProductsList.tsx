import { ProductCard } from "./ProductCard";
import { ProductsWithPaginationQueryQuery } from "../../graphql/generated/gql-types";

interface ProductsListProps {
  data: ProductsWithPaginationQueryQuery;
  baseLink: string;
}

export const ProductsList = ({ data, baseLink }: ProductsListProps) => {
  return (
    <div className="flex flex-wrap   justify-center">
      {data.products.map((element) => (
        <ProductCard
          key={element.id}
          data={{
            id: element.id,
            slug: element.slug,
            title: element.name,
            description: "",
            image: element.images[0].url,
            price: element.price,
          }}
          link={baseLink}
        />
      ))}
    </div>
  );
};
