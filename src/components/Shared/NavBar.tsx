import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/Logo/logo2.png";
import { NavLink, useNavigate } from "react-router-dom";
import LoginDialog from "@/pages/Auth/LoginDialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, selectAuthUser } from "@/redux/features/auth/authSlice";
import { Button } from "@mui/material";
import { useGetSingleUserQuery } from "@/redux/features/user/userManagementApi";

const pages = [
  { label: "Home", path: "/" },
  { label: "All Products", path: "/allProducts" },
  { label: "About", path: "/about" },
];
const settings = ["Profile", "Account", "Dashboard"];

function Navbar() {
  const user = useAppSelector(selectAuthUser);
  const navigate = useNavigate();
  const email = user?.data?.email;
  const { data: userdata } = useGetSingleUserQuery(email);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#262626", padding: "10px 0 10px 0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* large device image */}
          <img src={logo} alt="" className="w-24 hidden lg:block" />
          {/* small device menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  onClick={handleCloseNavMenu}>
                  <MenuItem>{page?.label}</MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          {/* small & medium device image */}
          <div className="w-full  flex justify-center items-center lg:hidden">
            <img src={logo} alt="" className="w-24" />
          </div>
          {/* medium & large device nav item */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}>
            {pages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                  isActive ? "text-[#FF6600]" : ""
                }>
                <h1 className="mr-8 font-bold">{page?.label}</h1>
              </NavLink>
            ))}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Button onClick={handleLogout}>Logout</Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={userdata?.data?.userImage}
                    className="border-2 border-white"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <div className="flex flex-row gap-2">
              <LoginDialog />
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
