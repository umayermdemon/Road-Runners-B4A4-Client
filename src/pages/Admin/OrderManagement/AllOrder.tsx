/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi";
import { Delete } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";

type TTitle = {
  id:
    | "productId.name"
    | "productId.productImage"
    | "quantity"
    | "totalPrice"
    | "status"
    | "email"
    | "delete";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
};

const titles: readonly TTitle[] = [
  { id: "productId.name", label: "Bike Name", minWidth: 100, align: "left" },
  { id: "email", label: "Customer Email", minWidth: 100, align: "left" },
  {
    id: "productId.productImage",
    label: "Bike Image",
    minWidth: 100,
    align: "left",
  },
  { id: "quantity", label: "Quantity", minWidth: 100, align: "left" },
  { id: "totalPrice", label: "Price ($)", minWidth: 100, align: "left" },
  { id: "status", label: "Payment Status", minWidth: 100, align: "left" },
  { id: "delete", label: "Delete", minWidth: 100, align: "left" },
];

const AllOrder = () => {
  const { data } = useGetAllOrderQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const orderData = data?.data || [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [paymentStatusFilter, setPaymentStatusFilter] = React.useState("all");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePaymentStatusFilterChange = (event: SelectChangeEvent) => {
    setPaymentStatusFilter(event.target.value as string);
    setPage(0);
  };

  const filteredOrderData = orderData.filter((order: any) => {
    if (paymentStatusFilter === "paid") return order.status === "paid";
    if (paymentStatusFilter === "failed") return order.status === "failed";
    if (paymentStatusFilter === "canceled") return order.status === "canceled";
    return true;
  });
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <FormControl sx={{ minWidth: 150, marginBottom: 2 }}>
        <InputLabel>Stock Status</InputLabel>
        <Select
          value={paymentStatusFilter}
          onChange={handlePaymentStatusFilterChange}
          label="Stock Status">
          <MenuItem value="all">All Orders</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
      </FormControl>

      <TableContainer sx={{ maxHeight: 690 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {titles.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrderData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                  {titles.map((column) => {
                    let value;
                    let style = {};

                    // Handle productId.name for the Bike Name column
                    if (column.id === "productId.name") {
                      value = order.productId?.name || "N/A";
                    } else if (column.id === "totalPrice") {
                      value = `$${order.totalPrice.toFixed(2)}`;
                    } else if (column.id === "status") {
                      value =
                        order.status === "paid"
                          ? "Paid"
                          : order.status === "failed"
                            ? "Failed"
                            : order.status === "canceled"
                              ? "Canceled"
                              : "Pending";
                      style = {
                        color:
                          order.status === "paid"
                            ? "green"
                            : order.status === "failed"
                              ? "orange"
                              : order.status === "canceled"
                                ? "red"
                                : "blue",
                        fontWeight: "bold",
                      };
                    } else if (column.id === "productId.productImage") {
                      value = (
                        <img
                          src={order.productId?.productImage}
                          alt={order.productId?.name || "No Image"}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "5px",
                          }}
                        />
                      );
                    } else if (column.id === "delete") {
                      value = (
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      );
                    } else {
                      value = order[column.id];
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ textAlign: "left" }}>
                        <span style={style}>{value}</span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredOrderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AllOrder;
