import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import AuthUser from "@/utils/authUser";
import RegisteredUser from "@/utils/registeredUser";
import { useState } from "react";
import { toast } from "sonner";
import { warningStyle } from "@/utils/toastColor";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";

export default function ProductDetails() {
  const navigate = useNavigate();
  const user = AuthUser();

  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery(id as string);
  const registeredUser = RegisteredUser();
  const { name, email } = registeredUser?.data || [];

  // Quantity State
  const [quantity, setQuantity] = useState(1);

  // Handle Quantity Increase
  const increaseQuantity = () => {
    if (product?.quantity && quantity < product?.quantity && quantity < 4) {
      setQuantity(quantity + 1);
    } else {
      toast.warning("You cannot select more than 4 products.", {
        style: warningStyle,
      });
    }
  };

  // Handle Quantity Decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCheckout = () => {
    const userDetails = {
      name: name || "",
      email: email || "",
    };
    const productDetails = {
      id: id,
      quantity: quantity,
    };
    navigate("/checkout", {
      state: { user: userDetails, product: productDetails },
    });
  };

  return isLoading ? (
    <ProductDetailsSkeleton />
  ) : (
    <div className="flex justify-center items-center  mx-2">
      <Card
        sx={{
          width: 668,
          maxWidth: "100%",
          boxShadow: "lg",
        }}>
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 200 }}>
            <img
              src={product?.productImage}
              alt={product?.name}
              loading="lazy"
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">Brand: {product?.brand}</Typography>
          <Link
            color="neutral"
            textColor="text.primary"
            sx={{ fontWeight: "lg" }}>
            {product?.name}
          </Link>

          <Typography
            level="title-lg"
            sx={{ mt: 1, fontWeight: "xl" }}
            endDecorator={
              <Chip
                component="span"
                size="sm"
                variant="soft"
                color={product?.inStock ? "success" : "danger"}>
                {product?.inStock ? "In-Stock" : "Stock-Out"}
              </Chip>
            }>
            ${product?.price}
          </Typography>
          {product?.inStock ? (
            <Typography level="body-sm">
              (Only <b>{product?.quantity}</b> left in stock!)
            </Typography>
          ) : null}
          <Typography level="body-sm">{product?.description}</Typography>

          {/* Quantity Selector */}
          {user?.role === "Customer" && (
            <div className="flex items-center gap-3 mt-2">
              <Button
                size="sm"
                color="neutral"
                variant="soft"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}>
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                size="sm"
                color="neutral"
                variant="soft"
                onClick={increaseQuantity}
                disabled={quantity >= product?.quantity}>
                +
              </Button>
            </div>
          )}
        </CardContent>
        <CardOverflow>
          <Button
            variant="solid"
            color="warning"
            size="lg"
            disabled={!product?.inStock || user?.role !== "Customer"}
            onClick={handleCheckout}>
            Buy now
          </Button>
        </CardOverflow>
      </Card>
    </div>
  );
}
