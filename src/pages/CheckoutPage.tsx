import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  addConfirmOrders,
  addToCart,
  currentCart,
  decrementToCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TConfirmOrders } from "@/Types";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector(currentCart);
  const user = useAppSelector(currentUser);

  const discount = 0 * cart.totalAmount;
  const tax = 0 * cart.totalAmount;
  const total = cart.totalAmount - discount + tax;

  const { register, handleSubmit, watch, reset } = useForm();

  const orders = cart.products.map((item) => ({
    product: item._id,
    quantity: item.quantity,
  }));

  const handlePayment = (price: number) => {
    navigate("/payment", { state: { price } });
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data?.phone?.length || !data?.address?.length) {
      return toast({
        title: "Please add shipping information",
        description:
          "Shipping information is most important for proper rich orders correctly. We take care of our customers demands",
        duration: 8000,
      });
    }

    const confirmationOrderData = { ...data, orders } as TConfirmOrders;
    dispatch(addConfirmOrders(confirmationOrderData));
    reset();
    handlePayment(total);
  };

  return (
    <Container className="my-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="divide-y">
            {cart?.products?.map((product) => {
              const { _id, name, price, quantity, image, stock } = product;
              return (
                <div
                  key={_id}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-gray-500">
                      Material: Aluminum, Weight: 800g
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button className="text-gray-500 hover:text-gray-700 mr-2">
                      <MinusIcon
                        onClick={() =>
                          dispatch(
                            decrementToCart({
                              _id,
                            })
                          )
                        }
                        className="w-5 h-5"
                      />
                    </button>
                    <span>{quantity}</span>
                    <button className="text-gray-500 hover:text-gray-700 ml-2">
                      <PlusIcon
                        onClick={() =>
                          dispatch(
                            addToCart({
                              _id,
                              name,
                              image,
                              price,
                              stock,
                              quantity: 1,
                            })
                          )
                        }
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                  <div>${price}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label htmlFor="promo-code" className="font-medium">
                Promo Code
              </label>
              <div className="flex items-center">
                <Input
                  id="promo-code"
                  type="text"
                  placeholder="Enter promo code"
                  className="border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Button type="button" size="sm">
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>${cart.totalAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax</span>
              <span>${tax}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
        <div className="border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="address" className="block font-medium mb-1">
                  Address
                </label>
                <Input
                  {...register("address")}
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium mb-1">
                  Phone
                </label>
                <Input
                  {...register("phone")}
                  id="phone"
                  type="text"
                  placeholder="Enter your name"
                  className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block font-medium mb-1">
                  City
                </label>
                <Input
                  {...register("city")}
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block font-medium mb-1">
                  State
                </label>
                <Input
                  {...register("state")}
                  id="state"
                  type="text"
                  placeholder="Enter your state"
                  className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block font-medium mb-1">
                  Zip Code
                </label>
                <Input
                  {...register("zip")}
                  id="zip"
                  type="text"
                  placeholder="Enter your zip code"
                  className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <RadioGroup defaultValue="card">
                <div className="flex items-center">
                  <RadioGroupItem
                    id="card"
                    value="card"
                    className="mr-2 focus:ring-primary-500"
                  />
                  <Label htmlFor="card" className="font-medium">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Card number"
                    className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input
                      type="text"
                      placeholder="Expiration date"
                      className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <Input
                      type="text"
                      placeholder="CVV"
                      className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div>
              <RadioGroup defaultValue="paypal">
                <div className="flex items-center">
                  <RadioGroupItem
                    id="paypal"
                    value="paypal"
                    className="mr-2 focus:ring-primary-500"
                  />
                  <Label htmlFor="paypal" className="font-medium">
                    PayPal
                  </Label>
                </div>
                <div className="mt-2">
                  <Input
                    type="email"
                    placeholder="Enter your PayPal email"
                    className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </RadioGroup>
            </div>
            <div>
              <RadioGroup defaultValue="apple-pay">
                <div className="flex items-center">
                  <RadioGroupItem
                    id="apple-pay"
                    value="apple-pay"
                    className="mr-2 focus:ring-primary-500"
                  />
                  <Label htmlFor="apple-pay" className="font-medium">
                    Apple Pay
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div> */}
        <div className="border rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Review and Place Order</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <p>{user?.name}</p>
              <p>{watch("phone")}</p>
              <p>{watch("address")}</p>
              <p>{watch("city")}</p>
              <p>
                {watch("state")} {watch("zip")}
              </p>
              <p>{user?.email}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Payment Method</h3>
              <p className="text-green-500">Visa / Mastercard</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>${cart.totalAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax</span>
              <span>${tax}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <div className="mt-6">
            <Checkbox id="terms" className="mr-2 focus:ring-primary-500" />
            <Label htmlFor="terms" className="text-gray-500">
              I agree to the
              <Link to="#" className="text-primary-500 underline">
                terms and conditions
              </Link>
            </Label>
          </div>
          <div className="mt-6">
            <Button size="lg" type="submit" className="w-full">
              Make Payment
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default CheckoutPage;
