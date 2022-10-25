import { ProductsAPIResponse } from "../utills";
import { ProductCard } from "./ProductCard";
interface ProductsListProps {
  data: ProductsAPIResponse[];
}

export const ProductsList = ({ data }: ProductsListProps) => {
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((element) => (
        <ProductCard
          key={element.id}
          id={element.id}
          title={element.title}
          description={element.description}
          image={element.image}
        />
      ))}
    </div>
  );
};
