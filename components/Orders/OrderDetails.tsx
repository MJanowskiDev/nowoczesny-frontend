import Link from "next/link";
import {
  OrderItem,
  useGetOrderDetailsQuery,
} from "../../graphql/generated/gql-types";
import { OrderProductCard } from "./OrderProductCard";

interface OrderDetailsProps {
  orderId: string;
}
export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { data, loading, error } = useGetOrderDetailsQuery({
    variables: { id: orderId },
  });
  return (
    <div>
      <div className="flex flex-col gap-4">
        <p>{data?.order?.orderStatus}</p>

        <p>{data?.order?.id}</p>

        <p>{data?.order?.email}</p>

        {data?.order?.total && <p>{data?.order?.total / 100} $</p>}
        <h1 className="text-2xl py-4 font-medium">Products</h1>
      </div>
      <div className="flex flex-wrap">
        {data?.order?.orderItems.map((orderItem) => (
          <OrderProductCard key={orderItem.id} order={orderItem as OrderItem} />
        ))}
      </div>

      <div className="inline-block border-b dark:border-teal-300 border-teal-600 pb-1 font-medium text-teal-600 dark:text-teal-300">
        <Link href={"/orders"}>Go back to orders list</Link>
        <span aria-hidden="true">&rarr;</span>
      </div>
    </div>
  );
};
