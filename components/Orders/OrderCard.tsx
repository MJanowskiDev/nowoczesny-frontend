import Image from "next/image";
import Link from "next/link";
import { Order } from "../../graphql/generated/gql-types";

import { CheckCircle, XCircle } from "../UI/Icons";

interface OrderProps {
  order: Order;
}
export const OrderCard = ({ order }: OrderProps) => {
  return (
    <div className=" overflow-hidden rounded-lg border dark:border-gray-100/20 border-gray-200 shadow-sm w-[350px] h-[350px]  m-4 p-2">
      <div className="flex flex-col gap-3 justify-between p-2 h-full">
        <div className="py-2 flex w-full justify-between ">
          <div>
            {order.orderStatus === "paid" ? (
              <div className="flex gap-2">
                <span className="text-green-500">
                  <CheckCircle />
                </span>
                <h3 className="text-xl font-bold">Paid</h3>
              </div>
            ) : (
              <div className="flex gap-2 ">
                <span className="text-blue-400">
                  <XCircle />
                </span>
                <h3 className="text-xl font-bold">In progress</h3>
              </div>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500 text-right">
            {order.createdAt.toString().substring(0, 10)}
          </p>
        </div>

        <div className="h-[150px]  overflow-y-auto py-2">
          {order.orderItems.map((item) => (
            <div
              key={`order-div-${item.id}`}
              className="flex items-center gap-2 "
            >
              <div className="rounded-lg ">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={60}
                    height={60}
                    objectFit="contain"
                    layout="fixed"
                  />
                )}
              </div>

              <div>
                {item.name}{" "}
                <small className="text-teal-600 dark:text-teal-300">
                  x{item.quantity}
                </small>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 text-right">
          <span>Total: </span>
          {order.total} $
        </p>

        <div className="inline-block border-b dark:border-teal-300 border-teal-600 pb-1 font-medium text-teal-600 dark:text-teal-300 text-right">
          <Link href={`/orders/${order.id}`}>Details</Link>
          <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </div>
  );
};
