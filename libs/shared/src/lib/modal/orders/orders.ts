export interface IOrderCreateRes {
  order: IOrder;
  clientSecret: string;
}

export interface IOrder {
  tax: number;
  shippingFee: number;
  subtotal: number;
  total: number;
  orderItems: IOrderItem[];
  status: string;
  user: string;
  clientSecret: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IOrderItem {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: string;
  _id: string;
}
