import { useRouter } from "next/router";
import { OrderDetails } from "../../components/Orders/OrderDetails";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  if (!orderId) return null;

  return (
    <div>
      <h1 className="text-2xl py-4 font-medium">Order details</h1>
      <OrderDetails orderId={orderId.toString()} />
    </div>
  );
};

export default OrderDetailsPage;
