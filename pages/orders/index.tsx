import { useAuth } from "@clerk/nextjs";
import { OrdersContainer } from "../../components/Orders/OrdersContainer";

const OrdersPage = () => {
  const { userId } = useAuth();

  return (
    <div>{userId ? <OrdersContainer userId={userId} /> : <p>No user</p>}</div>
  );
};

export default OrdersPage;
