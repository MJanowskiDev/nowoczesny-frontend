import { useSession } from "next-auth/react";
import { OrdersContainer } from "../../components/Orders/OrdersContainer";

const OrdersPage = () => {
  const session = useSession();
  const userId = session?.data?.user.id;
  return (
    <div>{userId ? <OrdersContainer userId={userId} /> : <p>No user</p>}</div>
  );
};

export default OrdersPage;
