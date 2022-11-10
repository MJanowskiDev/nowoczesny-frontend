import { GetStaticProps } from "next";

import { getProducts } from "./[page]";
import { PER_PAGE } from "../category/[page]";
import PaginationPage from "../../components/PaginationPage";

function Category({ products, totalProducts, currentPage }: any) {
  return (
    <>
      <PaginationPage
        products={products}
        currentPage={currentPage}
        totalProducts={totalProducts}
        perPage={PER_PAGE}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { products, total } = await getProducts({ limit: PER_PAGE, page: 1 });

  return {
    props: {
      products,
      totalProducts: total,
      currentPage: 1,
    },
  };
};

export default Category;
