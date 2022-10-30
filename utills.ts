export interface ProductsAPIResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: Rating;
  image: string;
  longDescription: string;
}

interface Rating {
  rate: number;
  count: number;
}

export const PRODUCT_PAGES_AMOUNT = 10;
export const PRODUCT_TAKE_AMOUNT = 10;
