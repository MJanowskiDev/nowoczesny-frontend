import Link from "next/link";
import { Loading } from "../UI/Loading";
import {
  OrderItem,
  GetOrderDetailsQuery,
} from "../../graphql/generated/gql-types";
import { OrderProductCard } from "./OrderProductCard";
import ErrorMessage from "../UI/ErrorMessage";
import { useQuery } from "react-query";

interface OrderDetailsProps {
  orderId: string;
}
export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { isLoading, error, data } = useQuery<GetOrderDetailsQuery, Error>(
    `orderDetails-${orderId}`,
    () =>
      fetch("/api/order-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId }),
      }).then((res) => res.json()),
    { enabled: orderId.length !== 0 }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!error && !isLoading && !data?.order) {
    return <ErrorMessage message={"No order data"} />;
  }

  const shipment = data.order?.shipment;
  const order = data.order;
  return (
    <div>
      <div className="flex flex-col gap-4">
        <p>{order?.orderStatus}</p>

        <p>{order?.id}</p>

        <p>{order?.email}</p>

        {order?.total && <p>{order?.total / 100} PLN</p>}

        {shipment && (
          <div>
            <h1 className="text-2xl py-4 font-medium">Shipment informations</h1>
            <p>
              {shipment?.firstName} {shipment?.lastName}
            </p>
            <p>
              {shipment?.email}, {shipment?.phone}
            </p>
            <p>
              {shipment?.street}, {shipment?.postal}, {shipment?.city},{" "}
              {shipment?.country}
            </p>
          </div>
        )}
        <h1 className="text-2xl py-4 font-medium">Products</h1>
      </div>
      <div className="flex flex-wrap">
        {order?.orderItems.map((orderItem) => (
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
