import React from "react";

import Pagination from "./Pagination_v2";

type PageProps = {
  products: any[];
  currentPage: number;
  totalProducts: number;
  perPage: number;
};

const ProductCard = ({ name, description, price }: any) => (
  <div className="my-10 border-2 border-sky-500 p-3">
    <div>{name}</div>
    <div className="my-3">${price}</div>
    <div className="my-8">{description}</div>
  </div>
);

const PaginationPage = ({
  currentPage,
  totalProducts,
  perPage,
  products,
}: PageProps): JSX.Element => {
  return (
    <div>
      <div>Page {currentPage}</div>
      <Pagination
        totalItems={totalProducts}
        currentPage={currentPage}
        itemsPerPage={perPage}
        renderPageLink={(page) => `/category/${page}`}
      />
      <div className="grid grid-cols-3 gap-8">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PaginationPage;
