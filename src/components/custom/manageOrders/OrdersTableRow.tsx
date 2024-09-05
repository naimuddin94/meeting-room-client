import AlertModel from "@/components/shared/AlertModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import {
  useChangeBookingStatusMutation,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";
import { IBooking } from "@/Types";
import { FilePenIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

const OrdersTableRow = ({ bookingInfo }: { bookingInfo: IBooking }) => {
  const [changeStatusFn] = useChangeBookingStatusMutation();
  const [bookingStatus, setBookingStatus] = useState(bookingInfo?.isConfirmed);

  const handleChangeStatus = (newStatus: string) => {
    if (bookingStatus === "confirmed") return;
    changeStatusFn({ bookingId: bookingInfo._id, isConfirmed: newStatus })
      .unwrap()
      .then((res) => {
        setBookingStatus(res?.data?.isConfirmed);
        toast({
          title: res?.message,
          duration: 2000,
        });
      })
      .catch((error) => {
        toast({
          title: error?.data?.message,
          duration: 2000,
        });
      });
  };

  const [deleteBookingFn] = useDeleteBookingMutation();

  const handleBookingDelete = async (bookingId: string) => {
    await deleteBookingFn(bookingId)
      .unwrap()
      .then((res) => {
        if (res?.statusCode === 200) {
          toast({
            title: res?.message,
            duration: 2000,
          });
        }
      })
      .catch((error) => {
        toast({
          title: error?.data?.message,
          duration: 2000,
        });
      });
  };

  return (
    <TableRow key={bookingInfo._id}>
      <TableCell className="font-medium">{bookingInfo.user.name}</TableCell>

      <TableCell>{bookingInfo?.room?.name}</TableCell>
      <TableCell>{bookingInfo?.room?.roomNo}</TableCell>
      {/* <TableCell>{bookingInfo?.paymentInfo}</TableCell> */}
      <TableCell className="flex gap-2 flex-wrap">
        {bookingInfo?.slots?.map((item) => (
          <Badge variant="outline">{`${item.startTime}-${item.endTime}`}</Badge>
        ))}
      </TableCell>
      <TableCell>
        <Badge
          variant={
            bookingInfo.isConfirmed === "confirmed" ? "default" : "destructive"
          }
        >
          {bookingInfo.isConfirmed}
        </Badge>
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleChangeStatus("confirmed")}
        >
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <AlertModel onConfirm={() => handleBookingDelete(bookingInfo._id)}>
          <Button size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </AlertModel>
      </TableCell>
    </TableRow>
  );
};

export default OrdersTableRow;
