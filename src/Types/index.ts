export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

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

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface IDataWithMeta<T> {
  meta: IMeta;
  result: T[];
}

export interface ISlot {
  _id: string;
  room: IRoom;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IBookingInputs {
  date: string;
  slots: string[];
  room: string;
  user: string;
}

export type ApiError = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  stack: string;
};

export interface IBooking {
  _id: string;
  date: string;
  slots: ISlot[];
  room: IRoom;
  user: IUser;
  totalAmount: number;
  isConfirmed: string;
  paymentInfo: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
