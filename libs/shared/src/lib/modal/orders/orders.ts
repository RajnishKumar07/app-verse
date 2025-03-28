export interface IOrderCreateRes {
  order: IOrder;
  clientSecret: string;
}

export interface IOrder {
  tax: number;
  shippingFee: number;
  subtotal: number;
  total: number;
  orderItem: IOrderItem[];
  status: string;
  user: {
    id: number;
    name: string;
  };
  clientSecret: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IOrderItem {
  name: string;
  image: string;
  price: number;
  amount: number;
  quantity: string;
  id: string;
}
