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
