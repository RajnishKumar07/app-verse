import { IReview } from './review';

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  company: string;
  colors: string[];
  inventry: number;
  averageRating: number;
  numOfReviews: number;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: IReview[];
  id: string;
}

export interface IAddProduct {
  name: string;
  price: number | null;
  description: string;
  image: string;
  category: string | null;
  company: string | null;
}
