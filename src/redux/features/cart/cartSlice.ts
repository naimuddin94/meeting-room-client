import { toast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store";
import { TCartProduct, TCartState, TConfirmOrders } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TCartState = {
  products: [],
  totalAmount: 0,
  confirmOrders: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartProduct>) => {
      const isExistsProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExistsProduct) {
        if (isExistsProduct.stock < isExistsProduct.quantity + 1) {
          toast({
            title: "Product stock insufficient",
          });
          return state;
        }
        isExistsProduct.quantity += 1;
        state.totalAmount += action.payload.price;
      } else {
        state.products.push(action.payload);
        state.totalAmount =
          state.totalAmount + action.payload.price * action.payload.quantity;
      }
    },
    decrementToCart: (
      state,
      action: PayloadAction<Pick<TCartProduct, "_id">>
    ) => {
      const isExistsProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExistsProduct) {
        if (isExistsProduct.quantity > 1) {
          state.products = state.products.map((product) => {
            if (product._id === action.payload._id) {
              product.quantity -= 1;
              return product;
            }
            return product;
          });

          state.totalAmount -= isExistsProduct.price;
        } else {
          state.products = state.products.filter(
            (product) => product._id !== action.payload._id
          );
          state.totalAmount -= isExistsProduct.price;
        }
      }
    },
    deleteProductFromCart: (
      state,
      action: PayloadAction<Pick<TCartProduct, "_id" | "price" | "quantity">>
    ) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.totalAmount -= action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.totalAmount = 0;
    },
    addConfirmOrders: (state, action: PayloadAction<TConfirmOrders>) => {
      state.confirmOrders = action.payload;
    },
    removeConfirmOrders: (state) => {
      state.confirmOrders = null;
    },
  },
});

export const {
  addToCart,
  decrementToCart,
  deleteProductFromCart,
  clearCart,
  addConfirmOrders,
  removeConfirmOrders,
} = cartSlice.actions;

export const currentCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
