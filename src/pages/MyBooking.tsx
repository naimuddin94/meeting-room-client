import BookingCard from "@/components/custom/manageOrders/BookingCard";
import Loader from "@/components/shared/Loader";
import NoDataFound from "@/components/shared/NoDataFound";
import { useFetchMyBookingQuery } from "@/redux/api/bookingApi";

function MyBooking() {
  const { data, isLoading } = useFetchMyBookingQuery({});

  if (isLoading) {
    return <Loader size={200} />;
  }

  return (
    <div className="bg-muted/40 min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Booking Information</h1>
        <div className="grid gap-6">
          {data?.data?.result?.length ? (
            data?.data?.result?.map((bookingInfo) => (
              <BookingCard key={bookingInfo._id} bookingInfo={bookingInfo} />
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBooking;
