import { TBooking } from "@/Types";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  clearCart,
  removeConfirmOrders,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../shared/Container";
import Loader from "../shared/Loader";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type TCheckoutFormProps = {
  clientSecret: string;
  bookingData: TBooking;
};

const CheckoutForm = ({ clientSecret, bookingData }: TCheckoutFormProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(currentUser);

  const [createOrderFn] = useCreateBookingMutation();

  // Check for location state and navigate back if not present
  if (!location?.state) {
    navigate(-1);
    return;
  }

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(false);
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setLoading(false);
      toast({
        title: confirmError.message,
      });
    } else {
      console.log({ paymentIntent });
      if (paymentIntent.status === "succeeded") {
        const ordersData = {
          ...bookingData,
          paymentInfo: paymentIntent.id,
        };
        createOrderFn(ordersData)
          .unwrap()
          .then((res) => {
            if (res.statusCode === 201) {
              dispatch(removeConfirmOrders());
              dispatch(clearCart());
              toast({
                title: res?.message,
                duration: 2000,
              });
              navigate("/");
            }
          })
          .catch((error) => {
            toast({
              title: error?.data?.message,
              duration: 2000,
            });
          });
      }
    }

    setLoading(false);
  };

  return (
    <Container className="my-8 md:my-16">
      <div className="max-w-[30rem] mx-auto bg-muted dark:bg-white/90 border-2 border-theme p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col justify-end">
          <CardElement />
          <Button variant="outline" className="mt-8" disabled={loading}>
            {loading ? <Loader size={30} /> : "Pay"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CheckoutForm;
