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
import { useState } from "react";

export default function CheckoutPage() {
  const location = useLocation();
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
  const shippingCost = deliveryMethod === "Outside Dhaka" ? 200 : 100;
  const [quantity, setQuantity] = useState(productData?.quantity);
  const totalPrice = quantity * product?.price + shippingCost;
  const subTotalPrice = quantity * product?.price;

  // Handle Quantity Increase
  const increaseQuantity = () => {
    if (product?.quantity && quantity < product?.quantity) {
      setQuantity(quantity + 1);
    }
  };

  // Handle Quantity Decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onSubmit = (data: any) => {
    if (!data.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    const fullData = {
      ...data,
      totalPrice,
      email: userData?.email,
      product: productData?.id,
    };
    console.log("Order Data:", fullData);
    alert("Order placed successfully!");
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign={"center"}
            fontWeight={"bold"}>
            Checkout
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box display="flex" gap={"40px"}>
            {/* Shipping Address */}
            <Box flex="2/3" maxWidth={"sm"}>
              <Typography variant="h6" textAlign={"center"}>
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
                {...register("phone", { required: true })}
                error={!!errors.phone}
                helperText={errors.phone ? "Phone number is required" : ""}
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
                  onChange={(e) => setCountry(e.target.value)}>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Shipping Methods */}
            <Box flex="1/3" justifyContent={"end"}>
              <Box marginBottom={"80px"}>
                <Typography variant="h6" pt={"10px"}>
                  <LocalShippingIcon color="warning" /> Shipping/Delivery
                  Methods
                </Typography>
                <RadioGroup
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}>
                  <FormControlLabel
                    value="Inside Dhaka"
                    control={<Radio color="warning" />}
                    label="Inside Dhaka ($100)"
                  />
                  <FormControlLabel
                    value="Outside Dhaka"
                    control={<Radio color="warning" />}
                    label="Outside Dhaka ($200)"
                  />
                </RadioGroup>
              </Box>
              {/* Payment Methods */}
              <Box>
                <Typography variant="h6">
                  <PaymentIcon color="warning" /> Payment Method
                </Typography>
                {/* <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel
                    value="bkash"
                    control={<Radio color="warning" />}
                    label="bKash Payment"
                  />
                  <FormControlLabel
                    value="nagad"
                    control={<Radio color="warning" />}
                    label="Nagad Payment"
                  />
                  <FormControlLabel
                    value="card"
                    control={<Radio color="warning" />}
                    label="Credit/Debit Card"
                  />
                </RadioGroup> */}
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
          <Typography>Shipping: ${shippingCost}</Typography>
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
            Place Order
          </Button>
          {errors.termsAccepted && (
            <Typography color="error">You must accept the terms</Typography>
          )}
        </Paper>
      </form>
    </Container>
  );
}
