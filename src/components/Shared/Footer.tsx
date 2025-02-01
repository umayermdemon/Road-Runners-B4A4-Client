import { Box, Container, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1A1A1A",
        color: "white",
        py: 3,
        mt: "auto",
      }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Column 1 */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              About Road Runners
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for premium bikes, expert advice, and top-tier
              accessories.
            </Typography>
          </Grid>

          {/* Column 2 */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <br />
            <Link href="/allProducts" color="inherit" underline="hover">
              All Products
            </Link>
            <br />
            <Link href="/about" color="inherit" underline="hover">
              About
            </Link>
          </Grid>

          {/* Column 3 */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              Contact
            </Typography>
            <Typography variant="body2">
              Email: support@roadrunners.com
            </Typography>
            <Typography variant="body2">Phone: +123 456 7890</Typography>
            <Typography variant="body2">
              Location: 123 Bike Street, City
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Road Runners. Built for Bikers,
            Powered by Passion.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
