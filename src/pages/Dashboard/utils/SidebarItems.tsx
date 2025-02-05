/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SidebarItems = ({ item, toggleSidebar }: any) => {
  const location = useLocation();
  const handleClick = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };
  return (
    <>
      <ListItem key={item.label} disablePadding>
        <ListItemButton
          component={Link}
          to={`/dashboard/${item.path}`}
          onClick={handleClick}>
          <ListItemIcon
            sx={{
              color:
                location.pathname.includes(item.path) ||
                (location.pathname === "/dashboard" &&
                  item.path === "products") ||
                (location.pathname === "/dashboard" &&
                  item.path === "customer-order")
                  ? "#ff6600"
                  : "white",
            }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            sx={{
              color:
                location.pathname.includes(item.path) ||
                (location.pathname === "/dashboard" &&
                  item.path === "products") ||
                (location.pathname === "/dashboard" &&
                  item.path === "customer-order")
                  ? "#ff6600"
                  : "white",
            }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SidebarItems;
