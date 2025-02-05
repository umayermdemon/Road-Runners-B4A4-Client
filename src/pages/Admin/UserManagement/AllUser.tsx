/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/userManagementApi";
import { errorStyle, loadingStyle, successStyle } from "@/utils/toastColor";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

type TTitle = {
  id: "name" | "email" | "role" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
};

const titles: readonly TTitle[] = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100, align: "right" },
];

const AllUser = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, refetch } = useGetAllUserQuery(undefined);
  const [updateStatus] = useUpdateUserStatusMutation();
  const handleDeactivate = async (id: string, currentStatus: string) => {
    try {
      const toastId = toast.loading("updating......", { style: loadingStyle });
      const newStatus = currentStatus === "active" ? "deactivate" : "active";
      const res: any = await updateStatus({ id, data: { status: newStatus } });
      if (res?.error) {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          style: errorStyle,
        });
      } else {
        toast.success(res?.data?.message, { id: toastId, style: successStyle });
      }
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const userData = data || [];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
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
            {userData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                  {titles.map((column) => {
                    let value = user[column.id];

                    if (column.id === "status") {
                      value = (
                        <Button
                          size="small"
                          color={user.status === "active" ? "success" : "error"}
                          variant="outlined"
                          onClick={() =>
                            handleDeactivate(user._id, user.status)
                          }>
                          {user.status === "active" ? "Active" : "Deactivate"}
                        </Button>
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
        count={userData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AllUser;
