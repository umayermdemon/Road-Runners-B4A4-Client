/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  TextField,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  List,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import { useLocation } from "react-router-dom";
import Button from "@mui/joy/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  errorStyle,
  loadingStyle,
  successStyle,
  warningStyle,
} from "@/utils/toastColor";
import shurjoPay from "../../assets/payment logo/shurjoPay.png";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";

export default function CheckoutPage() {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("shurjoPay");
  const [deliveryMethod, setDeliveryMethod] = useState("Inside Dhaka");
  const [country, setCountry] = useState("Bangladesh");
  const userData = location?.state?.user || {};
  const productData = location?.state?.product || {};
  const { data: product } = useGetSingleProductQuery(productData?.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [quantity, setQuantity] = useState(productData?.quantity);
  const baseShippingCost = deliveryMethod === "Outside Dhaka" ? 2000 : 1000;

  const shippingCost =
    quantity === 1 ? baseShippingCost : baseShippingCost + 500 * (quantity - 1);
  const totalPrice = quantity * product?.price + shippingCost;
  const subTotalPrice = quantity * product?.price;

  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();
  console.log(data?.data);
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

  const onSubmit = async (data: any) => {
    const fullData = {
      shippingDetails: {
        customer_phone: data?.phone,
        customer_address: data?.address,
        customer_city: data?.city,
        customer_country: country,
      },
      email: userData?.email,
      totalPrice,
      quantity,
      productId: productData?.id,
    };
    await createOrder(fullData);
  };
  const toastId = "order";
  useEffect(() => {
    if (isLoading)
      toast.loading("Processing.....", { style: loadingStyle, id: toastId });
    if (isSuccess) {
      toast.success(data?.message, { id: toastId, style: successStyle });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data?.data;
        }, 1000);
      }
    }
    if (isError) {
      toast.error((error as any)?.data?.errorSources[0]?.message, {
        id: toastId,
        style: errorStyle,
      });
    }
  }, [
    isLoading,
    isSuccess,
    data?.message,
    isError,
    error,
    data?.errorSources,
    data?.data,
  ]);

  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-4">
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign={"center"}
            fontWeight={"bold"}>
            Checkout
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            flexDirection={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            }}
            gap={"40px"}>
            {/* Shipping Address */}
            <Box flex="2/3" maxWidth={"sm"}>
              <Typography
                variant="h6"
                textAlign={"center"}
                marginBottom={"15px"}>
                <AddLocationAltIcon color="warning" />
                Shipping Address
              </Typography>
              <TextField
                label="Name"
                size="small"
                value={userData?.name}
                fullWidth
                color="warning"
              />

              <TextField
                label="Phone Number"
                size="small"
                fullWidth
                color="warning"
                {...register("phone", {
                  required: "Phone number is required",
                  validate: (value) =>
                    /^\d{11}$/.test(value) ||
                    "Phone number must be exactly 11 digits",
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message?.toString() || ""}
                type="number"
                margin="normal"
              />
              <TextField
                label="Email"
                size="small"
                fullWidth
                color="warning"
                value={userData?.email}
                margin="normal"
              />
              <TextField
                label="Details Address"
                size="small"
                fullWidth
                color="warning"
                {...register("address", { required: true })}
                error={!!errors.address}
                helperText={errors.address ? "Address is required" : ""}
                margin="normal"
              />
              <TextField
                label="City"
                size="small"
                fullWidth
                color="warning"
                {...register("city")}
                margin="normal"
              />
              <FormControl
                fullWidth
                size="small"
                color="warning"
                margin="normal">
                <Select
                  value={country || "Bangladesh"}
                  {...register("country")}
                  onChange={(e) => setCountry(e.target.value)}>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Shipping Methods */}
            <Box flex="1/3" justifyContent={"end"}>
              <Box marginBottom={{ xs: "25px", sm: "25px", md: "80px" }}>
                <Typography variant="h6" marginBottom={"15px"}>
                  <LocalShippingIcon color="warning" /> Shipping/Delivery
                  Methods
                </Typography>
                <RadioGroup
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}>
                  <FormControlLabel
                    value="Inside Dhaka"
                    control={<Radio color="warning" />}
                    label="Inside Dhaka (৳1000)"
                  />
                  <FormControlLabel
                    value="Outside Dhaka"
                    control={<Radio color="warning" />}
                    label="Outside Dhaka (৳2000)"
                  />
                </RadioGroup>
              </Box>
              {/* Payment Methods */}
              <Box>
                <Typography variant="h6">
                  <PaymentIcon color="warning" /> Payment Method
                </Typography>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="space-y-2">
                  <FormControlLabel
                    value="shurjoPay"
                    control={<Radio color="warning" />}
                    label={
                      <img
                        src={shurjoPay}
                        alt="shurjoPay"
                        style={{
                          height: "35px",
                          marginRight: "8px",
                        }}
                      />
                    }
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {/* Order Summary */}
          <Typography variant="h6" textAlign={"center"}>
            Order Summary
          </Typography>
          <List className=" flex flex-row gap-4 items-center">
            <img
              src={product?.productImage}
              alt=""
              className="w-16 h-16 rounded-full"
            />
            <div className="w-full">
              <Typography>{product?.name}</Typography>
              <div className="flex flex-row items-center justify-between w-full">
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
                <Typography>{`$${subTotalPrice}`}</Typography>
              </div>
            </div>
          </List>
          <Typography>Shipping: ৳{shippingCost}</Typography>
          <Typography variant="h6">Order Total: ${totalPrice}</Typography>

          <Divider sx={{ my: 2 }} />

          <FormControlLabel
            control={
              <Checkbox
                color="warning"
                {...register("termsAccepted", { required: true })}
              />
            }
            label="I agree to the Terms & Conditions"
          />

          <Button variant="solid" color="warning" fullWidth type="submit">
            Place Order & Payment
          </Button>
          {errors.termsAccepted && (
            <Typography color="error">You must accept the terms</Typography>
          )}
        </Paper>
      </form>
    </Container>
  );
}
