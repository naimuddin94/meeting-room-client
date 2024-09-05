import MainLayout from "@/components/layout/MainLayout";
import PaymentElement from "@/components/payment/PaymentElement";
import About from "@/pages/About";
import AddRoom from "@/pages/AddRoom";
import AddSlot from "@/pages/AddSlot";
import CheckoutPage from "@/pages/CheckoutPage";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ManageBookings from "@/pages/ManageBooking";
import ManageRoom from "@/pages/ManageRoom";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import RoomDetails from "@/pages/RoomDetails";
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
        path: "/dashboard/add-room",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AddRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/manage-rooms",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <ManageRoom />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/edit-room/:id",
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
        path: "/dashboard/bookings",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <ManageBookings />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/add-admin",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <Register />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
      },

      {
        path: "/dashboard/checkout/:id",
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
