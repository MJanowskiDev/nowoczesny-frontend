import Image from "next/image";
import { ProductsAPIResponse } from "../utills";
import ReactMarkdown from "react-markdown";

interface ProductProps {
  data: ProductsAPIResponse;
}

export const Product = ({ data }: ProductProps) => {
  return (
    <div>
      <article className="prose dark:prose-invert ">
        <h2 className="text-gray-600">Category: {data.category}</h2>
        <div className="bg-white h-1/2 mt-4 mb-6">
          <div className="pt-3">
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
        <h1 className="text-teal-600 dark:text-teal-300">{data.title}</h1>
        <h6>{data.description}</h6>
        <ReactMarkdown>{data.longDescription}</ReactMarkdown>
        <p>
          Rating: {data.rating.rate} (based on {data.rating.count} reviews)
        </p>
        <p className="font-bold">Price: {data.price}</p>
      </article>
    </div>
  );
};
