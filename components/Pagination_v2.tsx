import { ActiveLink } from "./UI/nav/ActiveLink";
import React from "react";
import usePagination from "../hooks/usePagination";

export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  renderPageLink: (page: number) => string;
  itemsPerPage?: number;
};

export const dotts = "...";

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  renderPageLink,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage);

  return (
    <div className="flex items-center sm:justify-end justify-center my-8 px-2 ">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <ActiveLink
            classActive="border-teal-600 dark:border-teal-300 dark:text-teal-300 text-teal-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            className=" text-gray-500 hover:text-gray-700 hover:border-gray-300 border-gray-100/10 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            key={i}
            href={renderPageLink(pageNumber as number)}
          >
            <a key={`a--${pageNumber}`}>{pageNumber}</a>
          </ActiveLink>
        )
      )}
    </div>
  );
};

export default Pagination;
