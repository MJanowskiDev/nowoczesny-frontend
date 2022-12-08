import React from "react";

import Pagination from "./Pagination_v2";

type PageProps = {
  currentPage: number;
  totalProducts: number;
  perPage: number;
  baseLink: string;
};

const PaginationPage = ({
  currentPage,
  totalProducts,
  perPage,
  baseLink,
}: PageProps): JSX.Element => {
  return (
    <Pagination
      totalItems={totalProducts}
      currentPage={currentPage}
      itemsPerPage={perPage}
      renderPageLink={(page) => `/${baseLink}/${page}`}
    />
  );
};

export default PaginationPage;
