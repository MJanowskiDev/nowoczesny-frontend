/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query ProductsWithPaginationQuery($limit: Int!, $offset: Int!) {\n  products(first: $limit, skip: $offset) {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery getProductSlugs($amount: Int!) {\n  products(first: $amount, orderBy: updatedAt_DESC) {\n    slug\n  }\n}\n\nquery getProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    slug\n    price\n    description\n    categories {\n      name\n    }\n    reviews {\n      rating\n    }\n    images(first: 1) {\n      url\n    }\n  }\n}": types.ProductsWithPaginationQueryDocument,
};

export function graphql(source: "query ProductsWithPaginationQuery($limit: Int!, $offset: Int!) {\n  products(first: $limit, skip: $offset) {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery getProductSlugs($amount: Int!) {\n  products(first: $amount, orderBy: updatedAt_DESC) {\n    slug\n  }\n}\n\nquery getProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    slug\n    price\n    description\n    categories {\n      name\n    }\n    reviews {\n      rating\n    }\n    images(first: 1) {\n      url\n    }\n  }\n}"): (typeof documents)["query ProductsWithPaginationQuery($limit: Int!, $offset: Int!) {\n  products(first: $limit, skip: $offset) {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery getProductSlugs($amount: Int!) {\n  products(first: $amount, orderBy: updatedAt_DESC) {\n    slug\n  }\n}\n\nquery getProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    name\n    slug\n    price\n    description\n    categories {\n      name\n    }\n    reviews {\n      rating\n    }\n    images(first: 1) {\n      url\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;