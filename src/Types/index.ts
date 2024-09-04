export type TBrand = {
  _id: string;
  name: string;
  origin: string;
};

export type TProduct = {
  _id: string;
  name: string;
  image: string;
  brand: {
    name: string;
    origin: string;
  };
  description: string;
  material: string;
  weight: string;
  rating: number;
  price: number;
  stock: number;
};

export type TRating = {
  _id: string;
  user: { _id: string; name: string; image: string };
  product: string;
  rating: number;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TCartProduct = {
  _id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type TOrder = {
  product: string;
  quantity: number;
};

export type TConfirmOrders = {
  address: string;
  phone: string;
  city: string;
  state: string;
  zip: string;
  orders: TOrder[];
};

export type TCartState = {
  products: TCartProduct[];
  totalAmount: number;
  confirmOrders: TConfirmOrders | null;
};

type TOrderProduct = {
  _id: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  rating: number;
};

export type TOrderDetail = {
  _id: string;
  user: string;
  product: TOrderProduct;
  quantity: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TFetchOrder = {
  _id: string;
  user: string;
  orders: TOrderDetail[];
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
};

export interface IRoom {
  _id: string;
  name: string;
  roomNo: number;
  image: string;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type TDataWithMeta<T> = {
  meta: TMeta;
  result: T[];
};

export type TSlot = {
  _id: string;
  room: IRoom;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type TBooking = {
  date: string;
  slots: string[];
  room: string;
  user: string;
};

export type ApiError = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  stack: string;
};
