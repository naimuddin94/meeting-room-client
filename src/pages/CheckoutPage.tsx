import Container from "@/components/shared/Container";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/DatePiker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiSelect from "@/components/ui/MultiSelect";
import { useFetchSingleRoomQuery } from "@/redux/api/roomApi";
import { slotApi, useFetchAvailableSlotsQuery } from "@/redux/api/slotApi";
import { currentUser } from "@/redux/features/auth/authSlice";
import { currentCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatDateString } from "@/utils";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function CheckoutPage() {
  const [slotIds, setSlotIds] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: roomData, isLoading } = useFetchSingleRoomQuery(id as string, {
    skip: !id,
  });

  const { data: slotsData, refetch } = useFetchAvailableSlotsQuery(
    { roomId: id as string, date: date ? formatDateString(date) : "" },
    { skip: !id || !date }
  );

  const cart = useAppSelector(currentCart);
  const user = useAppSelector(currentUser);

  const discount = 0 * cart.totalAmount;
  const tax = 0 * cart.totalAmount;
  const total = cart.totalAmount - discount + tax;

  const orders = cart.products.map((item) => ({
    product: item._id,
    quantity: item.quantity,
  }));

  const handlePayment = (price: number) => {
    navigate("/payment", { state: { price } });
  };

  const slotOptions = slotsData?.data?.map((slot) => ({
    label: `${slot.startTime}-${slot.endTime}`,
    value: slot._id,
  }));

  useEffect(() => {
    // Clear cache and refetch slots when the date changes
    if (date) {
      dispatch(slotApi.util.invalidateTags(["slot"]));
      refetch();
    }
  }, [date]);

  if (isLoading) {
    return <Loader size={200} />;
  }

  const onSubmit = async () => {
    console.log({ date, slotIds, id });

    // reset();
    // handlePayment(total);
  };

  return (
    <Container className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Room Details</h2>
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
              <span>Room Number</span>
              <span>{roomData?.data?.roomNo}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Floor Number</span>
              <span>{roomData?.data?.floorNo}th</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Price Per Slot</span>
              <span>${roomData?.data?.pricePerSlot}</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Label>Select Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
        </div>
        <div className="border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Booking Information</h2>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="address" className="block font-medium mb-1">
                  Available Slot
                </label>
                <MultiSelect
                  options={slotOptions ? slotOptions : []}
                  defaultValue={slotIds}
                  onValueChange={setSlotIds}
                  disabled={!slotOptions}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="zip" className="block font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="zip"
                  type="text"
                  placeholder="Enter phone number"
                  className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Review and Place Order</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Personal Information</h3>
              <p>{user?.name}</p>
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
            <Button size="lg" onClick={onSubmit} className="w-full">
              Make Payment
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CheckoutPage;
