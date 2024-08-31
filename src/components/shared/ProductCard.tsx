import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { currentToken } from "@/redux/features/auth/authSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/Types";
import { truncate } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import Rating from "./Rating";

function ProductCard({ product }: { product: TProduct }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(currentToken);
  const navigate = useNavigate();

  const { _id, name, image, description, brand, price, rating, stock } =
    product;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!token) {
      return navigate("/login");
    }
    dispatch(addToCart({ _id, image, name, price, stock, quantity: 1 }));
    toast({
      title: "Add to cart successfully",
    });
  };

  return (
    <Link to={`/product/${_id}`} className="flex flex-col h-full">
      <Card className="w-full flex flex-col justify-between max-w-md hover:shadow hover:shadow-theme/50 duration-500 flex-grow">
        <div className="p-4 flex-1">
          <img
            src={image}
            alt="Mechanical Keyboard"
            className="rounded-t-lg object-cover w-full aspect-[4/3]"
          />
        </div>
        <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-3">
              <Rating rating={rating} />
            </div>
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <CardDescription className="text-muted-foreground text-justify">
              {truncate(description, 7)}
            </CardDescription>
            <CardTitle className="text-md font-semibold">
              {brand.name}
            </CardTitle>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${price}</span>
            <Button type="submit" onClick={handleAddToCart} variant="outline">
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
