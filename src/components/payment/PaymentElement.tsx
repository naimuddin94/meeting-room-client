import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../shared/Loader";
import CheckoutForm from "./CheckoutForm";
import { useFetchPaymentKeyMutation } from "@/redux/api/bookingApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function App() {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const { price, bookingData } = location.state;

  const [fetchPaymentFn, { isLoading }] = useFetchPaymentKeyMutation(price);

  useEffect(() => {
    if (price > 0) {
      fetchPaymentFn(price)
        .unwrap()
        .then((res) => {
          if (res?.statusCode === 200) {
            setClientSecret(res.data);
          }
        });
    }
  }, []);

  const options = {
    clientSecret,
  };

  if (isLoading) {
    return <Loader size={150} />;
  }

  if (!clientSecret) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <h1 className="text-3xl">Your stripe key not fetched successfully</h1>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} bookingData={bookingData} />
    </Elements>
  );
}
