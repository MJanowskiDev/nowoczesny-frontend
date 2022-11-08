import Image from "next/image";
import Link from "next/link";
import { ProductsAPIResponse } from "../utils";
import { useCartState } from "./Cart/CartContext";
interface ProductCardProps {
  data: Pick<ProductsAPIResponse, "title" | "description" | "image" | "id">;
  link: string;
}
export const ProductCard = ({ data, link }: ProductCardProps) => {
  const { addItem } = useCartState();
  const onAddToCartClickHandle = () => {
    addItem({
      id: data.id.toString(),
      price: 5,
      title: data.title,
      count: 1,
      image: data.image,
    });
  };
  return (
    <div className=" overflow-hidden rounded-lg border border-gray-100 shadow-sm w-[300px] h-[445px] m-4">
      <div className="bg-white h-[200px] ">
        <div className="pt-4">
          <Image
            className="mt-2"
            src={data.image}
            alt={data.title}
            layout="responsive"
            width={16}
            height={9}
            objectFit="contain"
          />
        </div>
      </div>

      <div className="flex flex-col  justify-items-stretch p-2">
        <div className="h-[110px]">
          <h3 className="text-xl font-bold">{data.title}</h3>
          <p className="mt-2 text-sm text-gray-500">{data.description}</p>
        </div>

        <div className="inline-block border-b dark:border-teal-300 border-teal-600 pb-1 font-medium text-teal-600 dark:text-teal-300">
          <button
            onClick={onAddToCartClickHandle}
            className="mt-4 mb-4 w-full inline-block rounded border border-teal-600 px-12 py-3 text-sm font-medium text-teal-600 hover:bg-teal-600 hover:text-white focus:outline-none focus:ring active:bg-teal-500"
          >
            Add to Cart
          </button>
          <Link href={`${link}/${data.id}`}>Find out more</Link>
          <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </div>
  );
};
