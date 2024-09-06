import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBooking } from "@/Types";
import { PackageIcon } from "lucide-react";
import moment from "moment";

interface IBookingCardProps {
  bookingInfo: IBooking;
}

const BookingCard = ({ bookingInfo }: IBookingCardProps) => {
  return (
    <>
      <Card key={bookingInfo._id}>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Token # {bookingInfo._id}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(bookingInfo.createdAt).toLocaleDateString()}
          </span>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking Schedule</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex gap-2 flex-wrap">
                  {bookingInfo?.slots?.map((item) => (
                    <Badge variant="outline">{`${item.startTime} - ${item.endTime}`}</Badge>
                  ))}
                </TableCell>
                <TableCell>
                  {moment(bookingInfo.date).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>{bookingInfo.totalAmount}</TableCell>
                <TableCell className="flex justify-end">
                  {bookingInfo.isConfirmed === "confirmed" ? (
                    <Badge className="bg-green-500">Confirmed</Badge>
                  ) : (
                    <Badge variant="destructive">pending</Badge>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-12">
            <div className="space-y-1 px-4">
              <h4 className="text-sm font-medium leading-none">
                {bookingInfo.room.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {bookingInfo.room.amenities.map((amenity) => (
                  <span key={amenity}>{amenity}, </span>
                ))}
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm px-4">
              <div>Room No: {bookingInfo.room.roomNo}</div>
              <Separator orientation="vertical" />
              <div>Floor No: {bookingInfo.room.floorNo}</div>
              <Separator orientation="vertical" />
              <div>Capacity: {bookingInfo.room.capacity}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="text-muted-foreground">
            Total Pay: ${bookingInfo.totalAmount.toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BookingCard;
