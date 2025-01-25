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
import { NavLink } from "react-router-dom";
import LoginDialog from "@/pages/Auth/LoginDialog";

// const pages = ["Home", "Pricing", "Blog"];
const pages = [
  { label: "Home", path: "/" },
  { label: "All Products", path: "/allProducts" },
  { label: "About", path: "/about" },
];
// console.log(items.map((page) => console.log(page)));
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const user = false;
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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {/* {pages.map((page) => (
                <MenuItem key={page?.label} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {page?.label}
                  </Typography>
                </MenuItem>
              ))} */}
              {pages.map((page) => (
                <NavLink key={page.path} to={page.path}>
                  <Typography sx={{ textAlign: "center" }}>
                    {page?.label}
                  </Typography>
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
              // <Button
              //   key={page}
              //   onClick={handleCloseNavMenu}
              //   sx={{ my: 2, color: "white", display: "block" }}
              //   style={{ color: "#FF6600" }}>
              //   {page}
              // </Button>
            ))}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {/* <NavLink to="/login">
                <h1 className="font-bold">Login</h1>
              </NavLink>
              <span>/</span>
              <NavLink to="/register">
                <h1 className="font-bold">Register</h1>
              </NavLink> */}
              <LoginDialog />
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
