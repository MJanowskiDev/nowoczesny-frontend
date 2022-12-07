import { useRouter } from "next/router";
import { OrderDetails } from "../../components/Orders/OrderDetails";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  if (!orderId) return null;

  return (
    <div>
      <h1>Order details page</h1>
      <OrderDetails orderId={orderId.toString()} />
    </div>
  );
};

export default OrderDetailsPage;
