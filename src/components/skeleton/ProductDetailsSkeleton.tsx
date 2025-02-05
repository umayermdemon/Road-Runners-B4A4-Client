import {
  Box,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Typography,
} from "@mui/material";

const ProductDetailsSkeleton = () => {
  return (
    <Box className="flex justify-center items-center mx-2">
      <Card
        sx={{
          width: 668,
          maxWidth: "100%",
          boxShadow: 3,
        }}>
        {/* Image Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
        />

        <CardContent>
          {/* Text Skeletons */}
          <Typography variant="body2">
            <Skeleton width="40%" />
          </Typography>
          <Typography variant="h6">
            <Skeleton width="60%" />
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              <Skeleton width="50%" />
            </Typography>
            <Chip
              label={<Skeleton width={60} />}
              size="small" // Correct size
              variant="outlined" // Correct variant
              sx={{ ml: 1, height: 24, minWidth: 60 }}
            />
          </Box>

          <Typography variant="body2">
            <Skeleton width="30%" />
          </Typography>
          <Typography variant="body2">
            <Skeleton width="90%" />
          </Typography>

          {/* Quantity Selector Skeleton */}
          <Box className="flex items-center gap-3 mt-2">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton width={30} height={20} />
            <Skeleton variant="circular" width={30} height={30} />
          </Box>
        </CardContent>

        {/* Button Skeleton */}
        <Box sx={{ p: 2 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            animation="wave"
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetailsSkeleton;
