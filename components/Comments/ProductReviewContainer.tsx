import { useSession } from "next-auth/react";
import { ProductReviewForm } from "./ProductReviewForm";
import { ProductReviewList } from "./ProductReviewList";

interface ProductReviewContainer {
  productSlug: string;
}
export const ProductReviewContainer = ({
  productSlug,
}: ProductReviewContainer) => {
  const { status } = useSession();
  return (
    <div>
      {status === "authenticated" && (
        <ProductReviewForm productSlug={productSlug} />
      )}
      <ProductReviewList productSlug={productSlug} />
    </div>
  );
};
