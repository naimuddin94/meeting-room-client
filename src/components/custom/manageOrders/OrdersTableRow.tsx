import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useChangeBookingStatusMutation } from "@/redux/api/bookingApi";
import { IBooking } from "@/Types";
import { FilePenIcon } from "lucide-react";

const OrdersTableRow = ({ bookingInfo }: { bookingInfo: IBooking }) => {
  const [changeStatusFn] = useChangeBookingStatusMutation();

  const handleChangeStatus = (newStatus: string) => {
    changeStatusFn({ bookingId: bookingInfo._id, status: newStatus })
      .unwrap()
      .then((res) => {
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

  return (
    <TableRow key={bookingInfo._id}>
      <TableCell className="font-medium">{bookingInfo.user.name}</TableCell>

      <TableCell>{bookingInfo?.room?.name}</TableCell>
      <TableCell>{bookingInfo?.room?.roomNo}</TableCell>
      <TableCell>${bookingInfo?.paymentInfo}</TableCell>
      <TableCell>
        <Badge
          variant={
            bookingInfo.isConfirmed === "confirmed" ? "default" : "destructive"
          }
        >
          {bookingInfo.isConfirmed}
        </Badge>
      </TableCell>
      <TableCell>
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            handleChangeStatus(
              bookingInfo?.isConfirmed === "confirmed"
                ? "unconfirmed"
                : "confirmed"
            )
          }
        >
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrdersTableRow;
