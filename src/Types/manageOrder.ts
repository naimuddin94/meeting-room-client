interface IProduct {
  _id: string;
  name: string;
}

export interface IOrder {
  _id: string;
  user: string;
  product: IProduct | null;
  quantity: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  _id: string;
  name: string;
}

export interface ICart {
  _id: string;
  user: IUser;
  orders: IOrder[];
  totalAmount: number;
  address: string;
  city: string;
  state: string;
  phone: string;
  paymentInfo: string;
  isConfirmed: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
