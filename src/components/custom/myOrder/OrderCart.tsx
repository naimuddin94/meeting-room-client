import Hover from "@/components/shared/Hover";
import RatingModal from "@/components/shared/RatingModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TFetchOrder } from "@/Types";
import { PackageIcon, StarIcon } from "lucide-react";
import { useState } from "react";

type TOderCardProps = {
  cart: TFetchOrder;
  index: number;
};

const OrderCart = ({ cart, index }: TOderCardProps) => {
  const [showModel, setShowModel] = useState(false);
  const [productId, setProductId] = useState("");
  return (
    <>
      <Card key={cart._id}>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Order # {index + 1}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(cart.createdAt).toLocaleDateString()}
          </span>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.orders?.map((order) => {
                const { _id, name } = order.product;
                return (
                  <TableRow key={_id}>
                    <TableCell>
                      <div className="font-medium flex items-center gap-2">
                        {name}
                        {cart.status === "received" && (
                          <>
                            <Hover
                              image={order.product.image}
                              heading="Provide your feedback !"
                              description="Your feedback is very helpful for us to improve our product and management system."
                            >
                              <Button
                                onClick={() => {
                                  setShowModel(true), setProductId(_id);
                                }}
                                disabled={cart.status !== "received"}
                                variant="outline"
                                size="sm"
                                className=""
                              >
                                <StarIcon
                                  size={18}
                                  className="text-green-500"
                                />
                              </Button>
                            </Hover>
                            <RatingModal
                              open={showModel}
                              setShowModel={setShowModel}
                              product={productId}
                            />
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div>{order.quantity}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={
                          cart.status === "received"
                            ? "secondary"
                            : cart.status === "processing"
                            ? "outline"
                            : "default"
                        }
                        className="text-xs"
                      >
                        {cart.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {(order.quantity * order.product.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            Total: ${cart.totalAmount.toFixed(2)}
          </div>
          <Button variant="outline" size="sm">
            View Order
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default OrderCart;
