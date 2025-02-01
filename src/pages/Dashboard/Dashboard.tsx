import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery, useTheme, Box } from "@mui/material";
import Sidebar from "@/pages/Dashboard/Sidebar";
import DashboardNavbar from "@/pages/Dashboard/DashboardNavbar";

const sidebarWidth = 250;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box display="flex">
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Box
        sx={{
          flexGrow: 1,
          width: isMobile ? "100%" : `calc(100% - ${sidebarWidth}px)`,
          ml: isMobile ? 0 : `${sidebarWidth}px`,
          minHeight: "100vh",
          p: 3,
        }}>
        <DashboardNavbar toggleSidebar={toggleSidebar} />

        <Box
          sx={{
            mt: 10,
            p: 2,
            minHeight: "calc(100vh - 128px)",
          }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
