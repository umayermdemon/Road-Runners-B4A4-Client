import VerifyOrderSkeleton from "@/components/skeleton/VerifyOrderSkeleton";
import { useVerifyOrderQuery } from "@/redux/features/order/orderApi";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
// import { CheckCircle, AlertCircle } from "lucide-react";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function VerifyOrder() {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(searchParams.get("order_id"));
  const orderData: OrderData = data?.data?.[0];
  return isLoading ? (
    <VerifyOrderSkeleton />
  ) : (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom className="text-center font-bold">
        Order Verification
      </Typography>
      <Grid container spacing={2}>
        {/* Order Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Order Details" />
            <CardContent>
              <Typography>
                <strong>Order ID:</strong> {orderData?.order_id}
              </Typography>
              <Typography>
                <strong>Amount:</strong> {orderData?.currency}{" "}
                {orderData?.amount.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    orderData?.bank_status === "Success"
                      ? "bg-green-500 p-1 rounded-md text-sm text-white"
                      : orderData?.bank_status === "Failed"
                        ? "bg-yellow-300 p-1 rounded-md text-sm"
                        : orderData?.bank_status === "Cancel"
                          ? "bg-red-500 p-1 rounded-md text-sm text-white"
                          : ""
                  }`}>
                  {orderData?.bank_status}
                </span>
              </Typography>
              <Typography>
                <strong>Date:</strong>{" "}
                {new Date(orderData?.date_time).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Payment Information" />
            <CardContent>
              <Typography>
                <strong>Method:</strong> {orderData?.method}
              </Typography>
              <Typography>
                <strong>Transaction ID:</strong> {orderData?.bank_trx_id}
              </Typography>
              <Typography>
                <strong>Invoice No:</strong> {orderData?.invoice_no}
              </Typography>
              <Typography>
                <strong>SP Code:</strong> {orderData?.sp_code}
              </Typography>
              <Typography>
                <strong>SP Message:</strong> {orderData?.sp_message}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Customer Information" />
            <CardContent>
              <Typography>
                <strong>Name:</strong> {orderData?.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {orderData?.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {orderData?.phone_no}
              </Typography>
              <Typography>
                <strong>Address:</strong> {orderData?.address}
              </Typography>
              <Typography>
                <strong>City:</strong> {orderData?.city}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <div className=" w-full text-center mt-2">
          <Button color="warning" variant="contained">
            View All Order
          </Button>
        </div>
      </Grid>
    </div>
  );
}
