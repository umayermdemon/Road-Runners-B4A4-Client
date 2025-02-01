import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { TProduct } from "@/types/product.type";
import { NavLink } from "react-router-dom";

export default function ProductsCard({ product }: TProduct) {
  const { inStock, name, price, productImage, brand, _id } = product;
  return (
    <Card
      sx={{
        width: { xs: 410, sm: 370, md: 220, lg: 300 },
        borderColor: "#FF8533",
        backgroundColor: "#e9eae9",
      }}>
      <div>
        <Typography level="title-lg">{name}</Typography>
        <div className="flex  items-center gap-1">
          <Typography level="title-sm">Brand:</Typography>
          <h4 className="text-xs">{brand}</h4>
        </div>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}>
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="250px" maxHeight="200px">
        <img src={productImage} srcSet={productImage} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="vertical">
        <div className="flex flex-row justify-between items-center">
          <div>
            <Typography level="body-xs">Price:</Typography>
            <Typography sx={{ fontSize: "lg", fontWeight: "lg" }}>
              ${price}
            </Typography>
          </div>
          <div>
            <h1
              className={`text-xs font-semibold ${
                inStock ? "text-green-800" : "text-red-500"
              }`}>
              Status:
            </h1>
            <p className="text-xs font-semibold">
              {inStock ? "In-Stock" : "Stock-Out"}
            </p>
          </div>
        </div>
        <NavLink to={`/productDetails/${_id}`}>
          <button className="bg-[#FF6600] px-1 py-2 text-gray-50 rounded-md cursor-pointer">
            View Details
          </button>
        </NavLink>
      </CardContent>
    </Card>
  );
}
