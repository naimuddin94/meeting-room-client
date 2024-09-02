import MainLayout from "@/components/layout/MainLayout";
import PaymentElement from "@/components/payment/PaymentElement";
import About from "@/pages/About";
import AddRoom from "@/pages/AddRoom";
import AddSlot from "@/pages/AddSlot";
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
import Register from "@/pages/Register";
import Rooms from "@/pages/Rooms";
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
        path: "/meeting-room",
        element: <Rooms />,
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
        path: "/dashboard/add-room",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AddRoom />
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
            <AddRoom />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/slots",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AddSlot />,
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
