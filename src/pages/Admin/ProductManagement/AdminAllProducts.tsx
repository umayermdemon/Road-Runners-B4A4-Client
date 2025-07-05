/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

type TTitle = {
  id:
    | "name"
    | "brand"
    | "category"
    | "price"
    | "quantity"
    | "inStock"
    | "update"
    | "delete";
  label: string;
  minWidth?: number;
  align?: "right";
};

const titles: readonly TTitle[] = [
  { id: "name", label: "Bike Name", minWidth: 100 },
  { id: "brand", label: "Brand", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "price", label: "Price ($)", minWidth: 100, align: "right" },
  { id: "quantity", label: "Stock", minWidth: 100, align: "right" },
  { id: "inStock", label: "Available", minWidth: 100, align: "right" },
  { id: "update", label: "Update", minWidth: 100, align: "right" },
  { id: "delete", label: "Delete", minWidth: 100, align: "right" },
];

const AdminAllProducts = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [stockFilter, setStockFilter] = React.useState("all");

  const { data } = useGetAllProductsQuery(undefined);
  const products = data || [];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStockFilterChange = (event: SelectChangeEvent) => {
    setStockFilter(event.target.value as string);
    setPage(0);
  };

  const filteredProducts = products.filter((product: any) => {
    if (stockFilter === "inStock") return product.inStock;
    if (stockFilter === "outOfStock") return !product.inStock;
    return true;
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <FormControl sx={{ minWidth: 150, marginBottom: 2 }}>
        <InputLabel>Stock Status</InputLabel>
        <Select
          value={stockFilter}
          onChange={handleStockFilterChange}
          label="Stock Status">
          <MenuItem value="all">All Products</MenuItem>
          <MenuItem value="inStock">In Stock</MenuItem>
          <MenuItem value="outOfStock">Out of Stock</MenuItem>
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
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={product._id}>
                  {titles.map((column) => {
                    let value = product[column.id];

                    if (column.id === "price") {
                      value = `৳${product.price.toFixed(2)}`;
                    }

                    if (column.id === "inStock") {
                      value = product.inStock
                        ? "✅ In-Stock"
                        : "❌ Out of stock";
                    }

                    if (column.id === "update") {
                      value = (
                        <IconButton color="primary">
                          <Edit />
                        </IconButton>
                      );
                    }

                    if (column.id === "delete") {
                      value = (
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
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
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AdminAllProducts;
