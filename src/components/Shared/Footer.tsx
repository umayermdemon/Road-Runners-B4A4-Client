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
              About Us
            </Typography>
            <Typography variant="body2">
              We provide top-notch services to help your business grow.
            </Typography>
          </Grid>

          {/* Column 2 */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Link href="#" color="inherit" underline="hover">
              Home
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Services
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Contact
            </Link>
          </Grid>

          {/* Column 3 */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              Contact
            </Typography>
            <Typography variant="body2">Email: contact@example.com</Typography>
            <Typography variant="body2">Phone: +123 456 7890</Typography>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
