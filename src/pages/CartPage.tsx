import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  addToCart,
  clearCart,
  currentCart,
  decrementToCart,
  deleteProductFromCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";

function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(currentCart);

  const discount = 0 * cart.totalAmount;
  const tax = 0 * cart.totalAmount;
  const total = cart.totalAmount - discount + tax;

  return (
    <Container>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8 flex justify-between">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <Button
            onClick={() => dispatch(clearCart())}
            variant="outline"
            className="gap-2 items-center"
          >
            <BsCartX size={16} />
            Clear
          </Button>
        </div>
        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="grid gap-6 self-start">
            {cart?.products?.map((item) => {
              const { _id, image, name, price, quantity, stock } = item;
              return (
                <div
                  key={_id}
                  className="grid grid-cols-[80px_1fr_auto] items-center gap-4"
                >
                  <img
                    src={image}
                    alt={name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover aspect-[4/3] hidden md:flex"
                  />
                  <div className="grid gap-1">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">
                        ${price.toFixed(2)} x {quantity}
                      </p>
                      <button className="p-1 hover:bg-muted rounded-md group">
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
                          size={18}
                          className="group-hover:text-green-500"
                        />
                      </button>
                      <button className="p-1 hover:bg-muted rounded-md group">
                        <MinusIcon
                          onClick={() =>
                            dispatch(
                              decrementToCart({
                                _id,
                              })
                            )
                          }
                          size={18}
                          className="group-hover:text-theme"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <h2 className="text-right font-semibold">
                      ${(price * quantity).toFixed(2)}
                    </h2>
                    <div className="flex gap-8 ">
                      <Button variant="ghost">
                        <Trash2
                          onClick={() =>
                            dispatch(
                              deleteProductFromCart({
                                _id,
                                price,
                                quantity,
                              })
                            )
                          }
                          size={20}
                          className="text-theme"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-muted/40 rounded-lg p-6 grid gap-4 max-h-80">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span className="text-green-500">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/dashboard/checkout">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CartPage;
