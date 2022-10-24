import { ProductsAPIResponse } from "../utills";
interface ProductsListProps {
  data: ProductsAPIResponse[];
}
export const ProductsList = ({ data }: ProductsListProps) => {
  console.log(data);
  return (
    <div>
      {data.map((element) => (
        <p key={element.id}>{element.title}</p>
      ))}
    </div>
  );
};
