import { ProductsAPIResponse } from "../utils";
import { ProductCard } from "./ProductCard";
interface ProductsListProps {
  data: ProductsAPIResponse[];
  link: string;
}

export const ProductsList = ({ data, link }: ProductsListProps) => {
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((element) => (
        <ProductCard
          key={element.id}
          data={{
            slug: element.slug,
            id: element.id,
            title: element.title,
            price: element.price,
            description: element.description,
            image: element.image,
          }}
          link={link}
        />
      ))}
    </div>
  );
};
