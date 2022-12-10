import { useUser } from "@clerk/nextjs";
import { ProductReviewForm } from "./ProductReviewForm";
import { ProductReviewList } from "./ProductReviewList";

interface ProductReviewContainer {
  productSlug: string;
}
export const ProductReviewContainer = ({
  productSlug,
}: ProductReviewContainer) => {
  const { isLoaded, isSignedIn } = useUser();
  const authenticated = isLoaded && isSignedIn;
  return (
    <div>
      {authenticated && <ProductReviewForm productSlug={productSlug} />}
      <ProductReviewList productSlug={productSlug} />
    </div>
  );
};
