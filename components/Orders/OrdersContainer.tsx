import { Order } from "./Order";
import { useGetOrdersByUserQuery } from "../../graphql/generated/gql-types";

interface OrdersContainerProps {
  userId: string;
}
export const OrdersContainer = ({ userId }: OrdersContainerProps) => {
  const { data, loading, error } = useGetOrdersByUserQuery({
    variables: { id: userId },
  });

  console.log(data);

  return (
    <div>
      <h1>This is order container</h1>

      {data?.orders.map((order) => (
        <Order
          key={order.id}
          status={order.orderStatus!}
          total={order.total / 100}
          id={order.id}
        />
      ))}
    </div>
  );
};
