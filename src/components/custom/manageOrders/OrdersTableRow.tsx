import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useChangeCartStatusMutation } from "@/redux/api/ordersApi";
import { ICart } from "@/Types/manageOrder";
import { cartStatus } from "@/utils";
import { useState } from "react";

const OrdersTableRow = ({ cart }: { cart: ICart }) => {
  const [status, setStatus] = useState(cart?.status);
  const [changeStatusFn] = useChangeCartStatusMutation();

  const handleChangeStatus = (newStatus: string) => {
    setStatus(newStatus);
    changeStatusFn({ cartId: cart._id, status: newStatus })
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
    <TableRow key={cart._id}>
      <TableCell className="font-medium">{cart.user.name}</TableCell>

      <TableCell>{cart.address}</TableCell>
      <TableCell>{cart.phone}</TableCell>
      <TableCell>${cart.totalAmount}</TableCell>
      <TableCell>
        <Badge variant={status === "processing" ? "default" : "destructive"}>
          {status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => handleChangeStatus(value)}
            value={status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {cartStatus.map((status, index) => (
                <SelectItem key={index} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrdersTableRow;
