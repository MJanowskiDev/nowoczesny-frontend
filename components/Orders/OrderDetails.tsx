import { useGetOrderDetailsQuery } from "../../graphql/generated/gql-types";
import { ProductCard } from "../ProductCard";

interface OrderDetailsProps {
  orderId: string;
}
export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { data, loading, error } = useGetOrderDetailsQuery({
    variables: { id: orderId },
  });
  return (
    <div>
      <div>
        <span>E-mail: </span>
        <span>{data?.order?.email}</span>
      </div>

      <div>
        <span>Order status: </span>
        <span>{data?.order?.orderStatus}</span>
      </div>

      {data?.order?.total && (
        <div>
          <span>Total: </span>
          <span>{data?.order?.total / 100}</span>
        </div>
      )}

      <div className="flex">
        {data?.order?.orderItems.map((orderItem) => (
          <ProductCard
            key={orderItem.id}
            link="/products-ssg/product"
            data={{
              title: orderItem.name,
              description: "",
              image: orderItem.imageUrl!,
              id: orderItem.id,
              slug: orderItem.slug,
            }}
          />
        ))}
      </div>
    </div>
  );
};
