import { ActiveLink } from "./ActiveLink";

interface PaginationProps {
  baseLink: string;
  pages: number[];
}
export const Pagination = ({ baseLink, pages }: PaginationProps) => {
  return (
    <nav className="border-t border-gray-200 px-4 mt-2 flex items-center justify-between sm:px-0">
      <div className="hidden md:-mt-px md:flex">
        {pages.map((pageNumber) => {
          return (
            <ActiveLink
              classActive="border-teal-600 dark:border-teal-300 dark:text-teal-300 text-teal-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              key={`nextlink--${pageNumber}`}
              href={`/${baseLink}/${pageNumber}`}
            >
              <a key={`a--${pageNumber}`}>{pageNumber}</a>
            </ActiveLink>
          );
        })}
      </div>
    </nav>
  );
};
