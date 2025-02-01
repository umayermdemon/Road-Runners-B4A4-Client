import Button from "@/components/Shared/Button";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <div className="h-36 w-full object-fill relative">
        <img
          src="https://res.cloudinary.com/duagqnvpw/image/upload/v1737998530/Hybrid%20Explorer.webp"
          alt="https://res.cloudinary.com/duagqnvpw/image/upload/v1737998530/Hybrid%20Explorer.webp"
          className="h-56 w-full object-fill"
        />
        <div>
          <Typography
            variant="h3"
            className="absolute top-20 left-1/4 text-white bg-black/40 px-4">
            Welcome to Road Runners
          </Typography>
        </div>
      </div>

      <Grid2 container spacing={4} sx={{ pt: 12 }}>
        <Grid2 component="div" className="mx-auto">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            className=" text-center">
            About Us
          </Typography>
          <Typography variant="body1" className="w-[700px]">
            At **Road Runners**, we are passionate about providing top-quality
            bikes and accessories for riders of all levels. Whether you’re a
            city commuter, a mountain adventurer, or a speed racer, we’ve got
            the perfect ride for you. Our mission is to help you **ride faster,
            farther, and better** with premium products and expert service.
          </Typography>
        </Grid2>
      </Grid2>

      <Typography
        variant="h4"
        fontWeight={"bold"}
        className="text-center"
        sx={{ mt: 5, mb: 2 }}>
        Why Choose Road Runners?
      </Typography>
      <Grid2
        container
        spacing={3}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}>
        {[
          "Top-Quality Bikes",
          "Expert Advice",
          "Affordable Prices",
          "Reliable Service",
          "Fast Delivery",
        ].map((feature, index) => (
          <Grid2 key={index} component="div">
            <Card
              sx={{ textAlign: "center", p: 2, backgroundColor: "#e9eae9" }}>
              <CardContent>
                <Typography variant="h6">{feature}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Typography
        variant="h4"
        sx={{ mt: 5, mb: 2 }}
        fontWeight={"bold"}
        className="text-center">
        Meet Our Team
      </Typography>
      <Grid2
        container
        spacing={3}
        sx={{ alignItems: "center", justifyContent: "center" }}>
        {[
          { name: "John Doe", role: "Founder" },
          { name: "Emma Smith", role: "Bike Specialist" },
          { name: "Mike Brown", role: "Service Expert" },
          { name: "Emma Smith", role: "Bike Specialist" },
          { name: "Mike Brown", role: "Service Expert" },
        ].map((member, index) => (
          <Grid2 component="div" key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                width: 200,
                backgroundColor: "#e9eae9",
              }}>
              <Avatar sx={{ width: 80, height: 80, margin: "auto", mb: 2 }} />
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {member.role}
              </Typography>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Typography
        variant="h4"
        sx={{ mt: 5, mb: 2 }}
        fontWeight={"bold"}
        className="text-center">
        What Our Customers Say
      </Typography>
      <Grid2 container spacing={3}>
        {[
          { name: "Alice", review: "Amazing bikes! Super smooth ride." },
          {
            name: "David",
            review: "Best bike shop in town, highly recommended!",
          },
          {
            name: "Sophia",
            review: "Fantastic customer service and fast delivery.",
          },
        ].map((testimonial, index) => (
          <Grid2 key={index} component="div">
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1">"{testimonial.review}"</Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                - {testimonial.name}
              </Typography>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Grid2 container justifyContent="center" sx={{ mt: 5, pb: 5 }}>
        <Button text=" Explore Our Bikes" />
      </Grid2>
    </Container>
  );
};

export default About;
