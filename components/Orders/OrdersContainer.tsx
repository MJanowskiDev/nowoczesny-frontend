import { OrderCard } from "./OrderCard";
import {
  Order,
  useGetOrdersByUserQuery,
} from "../../graphql/generated/gql-types";
import { Loading } from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";

interface OrdersContainerProps {
  userId: string;
}
export const OrdersContainer = ({ userId }: OrdersContainerProps) => {
  const { data, loading, error } = useGetOrdersByUserQuery({
    variables: { id: userId },
  });

  if (loading || !userId) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <h1 className="text-2xl py-4 font-medium">Orders history</h1>
      <div className="flex  flex-wrap w-full ">
        {data?.orders.map((order) => (
          <OrderCard key={order.id} order={order as Order} />
        ))}
      </div>
    </div>
  );
};
