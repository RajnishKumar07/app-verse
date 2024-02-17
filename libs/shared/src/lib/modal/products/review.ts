export interface IReview {
  _id: string;
  rating: number;
  title: string;
  comment: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
  product: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IAddReview {
  product?: string;
  rating: number|null;
  title: string;
  comment: string;
}
