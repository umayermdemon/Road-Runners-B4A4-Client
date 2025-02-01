import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";

export default function ProductDetails() {
  const { id } = useParams();
  console.log(id);
  const { data: product } = useGetSingleProductQuery(id as string);
  console.log(product);
  return (
    <div className=" flex justify-center items-center py-2 mx-2">
      <Card
        sx={{
          width: 700,
          maxWidth: "100%",
          boxShadow: "lg",
        }}>
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 200 }}>
            <img
              src={product?.productImage}
              srcSet={product?.productImage}
              loading={product?.name}
              alt={product?.name}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">Brand: {product?.brand}</Typography>
          <Link
            href="#product-card"
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
          ) : (
            <Typography level="body-sm"></Typography>
          )}
          <Typography level="body-sm">{product?.description}</Typography>
        </CardContent>
        <CardOverflow>
          <Button variant="solid" color="danger" size="lg">
            Add to cart
          </Button>
        </CardOverflow>
      </Card>
    </div>
  );
}
