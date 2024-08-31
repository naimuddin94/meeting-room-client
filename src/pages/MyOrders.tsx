import OrderCart from "@/components/custom/myOrder/OrderCart";
import Loader from "@/components/shared/Loader";
import NoDataFound from "@/components/shared/NoDataFound";
import { useFetchOrdersQuery } from "@/redux/api/ordersApi";
import { TFetchOrder } from "@/Types";

function MyOrders() {
  const { data, isLoading } = useFetchOrdersQuery(undefined);

  if (isLoading) {
    return <Loader size={200} />;
  }

  return (
    <div className="bg-muted/40 min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
        <div className="grid gap-6">
          {data?.data?.length ? (
            data?.data?.map((cart: TFetchOrder, index: number) => (
              <OrderCart key={cart._id} cart={cart} index={index} />
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
