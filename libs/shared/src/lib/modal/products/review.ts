export interface IReview {
  id: string;
  rating: number;
  title: string;
  comment: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
  product: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddReview {
  product?: string;
  rating: number | null;
  title: string;
  comment: string;
}
