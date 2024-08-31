import MainLayout from "@/components/layout/MainLayout";
import PaymentElement from "@/components/payment/PaymentElement";
import About from "@/pages/About";
import AddBrand from "@/pages/AddBrand";
import AddProduct from "@/pages/AddProduct";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ManageOrders from "@/pages/ManageOrders";
import ManageProduct from "@/pages/MangeProduct";
import MyOrders from "@/pages/MyOrders";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/Productdetail";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <MyOrders />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/manage-product",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <ManageProduct />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <ManageOrders />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/edit-product/:id",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AddProduct />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/add-brand",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AddBrand />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/dashboard/carts",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <CartPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/checkout",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoute roles={["admin", "user"]}>
            <PaymentElement />,
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
