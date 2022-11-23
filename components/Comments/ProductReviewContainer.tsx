import { ProductReviewForm } from "./ProductReviewForm";
import { ProductReviewList } from "./ProductReviewList";

interface ProductReviewContainer {
  productSlug: string;
}
export const ProductReviewContainer = ({
  productSlug,
}: ProductReviewContainer) => {
  return (
    <div>
      <ProductReviewForm productSlug={productSlug} />
      <ProductReviewList productSlug={productSlug} />
    </div>
  );
};
