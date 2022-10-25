import Image from "next/image";
import { ProductsAPIResponse } from "../utills";

type ProductCardProps = Pick<
  ProductsAPIResponse,
  "title" | "description" | "image" | "id"
>;

export const ProductCard = ({
  title,
  image,
  id,
  description,
}: ProductCardProps) => {
  return (
    <div className=" overflow-hidden rounded-lg border border-gray-100 shadow-sm w-[300px] h-[400px] m-4">
      <div className="bg-white h-1/2 ">
        <div className="pt-3">
          <Image
            className="mt-2"
            src={image}
            alt={title}
            layout="responsive"
            width={16}
            height={9}
            objectFit="contain"
          />
        </div>
      </div>

      <div className="flex flex-col h-1/2  justify-between p-6">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>

        <div className="inline-block border-b dark:border-teal-300 border-teal-600 pb-1 font-medium text-teal-600 dark:text-teal-300">
          Find out more
          <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </div>
  );
};
