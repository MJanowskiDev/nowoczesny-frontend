import { useRouter } from "next/router";
import { Pagination } from "../../components/Pagination";
import { ProductsList } from "../../components/ProductsList";
import { Loading } from "../../components/Loading";
import { useQuery } from "react-query";
import { NextSeo } from "next-seo";
import {
  ProductsAPIResponse,
  PRODUCT_PAGES_AMOUNT,
  PRODUCT_TAKE_AMOUNT,
} from "../../utils";

const getProducts = async (take: number, offset: number) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`
  );
  const data: ProductsAPIResponse[] = await res.json();

  return data;
};

const ProductsCsr = () => {
  const router = useRouter();
  const { page } = router.query;

  const take = PRODUCT_TAKE_AMOUNT;
  const offset = (Number(page) - 1) * take;

  const { data, isLoading, error } = useQuery(`products-${page}`, () =>
    getProducts(take, offset)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!data || error) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <div>
      <NextSeo
        title="Products CSR"
        description="About MJanowskiDev E-Commerce App products csr list"
      />
      <ProductsList data={data} link="/product-csr" />
      <Pagination
        baseLink="products-csr"
        pages={[...Array(PRODUCT_PAGES_AMOUNT)].map((_, i) => i + 1)}
      />
    </div>
  );
};

export default ProductsCsr;
