import { IReview } from './review';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  company: string;
  colors: string[];
  inventory: number;
  reservedProductCount: number;
  averageRating: number;
  numOfReviews: number;
  user: {
    id: number;
    email: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  reviews: IReview[];
  featured: boolean;
}

export interface IAddProduct {
  name: string;
  price: number | null;
  description: string;
  image: string;
  category: string | null;
  company: string | null;
}
