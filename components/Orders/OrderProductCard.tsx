import Image from "next/image";

import { OrderItem } from "../../graphql/generated/gql-types";

interface OrderProductCardProps {
  order: OrderItem;
}
export const OrderProductCard = ({ order }: OrderProductCardProps) => {
  return (
    <div className=" overflow-hidden rounded-lg border border-gray-100 shadow-sm w-[300px] h-[300px] m-4">
      <div className="bg-white h-[200px] ">
        <div className="pt-4">
          {order.imageUrl && (
            <Image
              className="mt-2"
              src={order.imageUrl}
              alt={order.name}
              layout="responsive"
              width={16}
              height={9}
              objectFit="contain"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col  justify-items-stretch p-2">
        <div className="h-[110px]">
          <h3 className="text-xl font-bold">{order.name}</h3>

          <p className="text-sm text-gray-500 text-right">
            <span>Price: </span>
            {order.total / 100} $
          </p>
          <p className="text-sm text-gray-500 text-right">
            <span>Quantity: </span>
            {order.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};
