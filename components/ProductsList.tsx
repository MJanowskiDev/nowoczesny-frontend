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
            id: element.id,
            title: element.title,
            description: element.description,
            image: element.image,
          }}
          link={link}
        />
      ))}
    </div>
  );
};
