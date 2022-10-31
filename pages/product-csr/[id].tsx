import { useRouter } from "next/router";
import Link from "next/link";
import { Product } from "../../components/Product";
import { ProductsAPIResponse } from "../../utils";
import { useQuery } from "react-query";
import { Loading } from "../../components/Loading";

import { serialize } from "next-mdx-remote/serialize";

const getProduct = async (id: number) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`
  );
  const data: ProductsAPIResponse = await res.json();

  return { ...data, longDescription: await serialize(data.longDescription) };
};

const ProductIdPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useQuery(`product-${id}`, () =>
    getProduct(Number(id))
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!data || error) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <div>
      <Link href={"/products-csr"}>
        <a>Go back</a>
      </Link>
      <Product
        data={{
          ...data,
        }}
      />
    </div>
  );
};

export default ProductIdPage;
