import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  Tooltip,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/user/userManagementApi";

const sidebarWidth = 250;

const DashboardNavbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useAppSelector(selectAuthUser);
  const { data: userData } = useGetSingleUserQuery(user?.email as string);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${sidebarWidth}px)`,
        bgcolor: "#1e293b",
        boxShadow: "none",
        ml: isMobile ? 0 : `${sidebarWidth}px`,
      }}>
      <Toolbar>
        {isMobile && (
          <IconButton color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        )}

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          width="98%">
          <NavLink to="/">
            <Button
              size="large"
              variant="outlined"
              sx={{ flexGrow: 1, color: "white" }}>
              Home
            </Button>
          </NavLink>
          <Avatar className="cursor-pointer">
            <Tooltip title={user?.email}>
              <img src={userData?.data?.userImage} alt="" />
            </Tooltip>
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
