import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface ProductsAPIResponse {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: string;
}

export interface Rating {
  rate: number;
  count: number;
}

export const PRODUCT_PAGES_AMOUNT = 10;
export const PRODUCT_TAKE_AMOUNT = 10;

export type MDXResult = MDXRemoteSerializeResult<Record<string, unknown>>;

export const externalLinkRegex = "@https|http|ftp|mailto|file";

/**
 *
 * @param value : string - card year month
 * @returns string if validation error, bool true if validation ok
 */
export const validateCardYearMonth = (value: string) => {
  if (value.length !== 5) {
    return "Wrong data format, enter MM/YY";
  }

  const [month] = value.split("/");

  if (Number(month) > 12) {
    return "Wrong month";
  }

  if (Number(month) < 1) {
    return "Wrong month";
  }

  return true;
};
