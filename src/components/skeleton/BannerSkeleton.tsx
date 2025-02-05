import { Box, Button, Skeleton, Typography } from "@mui/material";

const BannerSkeleton = () => {
  return (
    <Box className="relative w-full pb-8">
      <Box className="carousel-container">
        <Box className="carousel">
          <Box className="carousel-item relative">
            <Skeleton
              variant="rectangular"
              className="w-full h-[calc(100vh-350px)] rounded-b-xl"
              animation="wave"
            />
            <Box className="absolute inset-0 bg-black opacity-40 rounded-b-xl"></Box>
            <Box className="carousel-caption absolute z-10 bottom-1/3 left-1/2 transform -translate-x-1/2 space-y-4 sm:space-y-8 text-center">
              <Typography variant="h1" className="text-white">
                <Skeleton width={300} />
              </Typography>
              <Button
                variant="outlined"
                disabled
                className="text-white border-white">
                <Skeleton width={120} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4 sm:px-8">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          className="bg-gray-500 opacity-70"
        />
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          className="bg-gray-500 opacity-70"
        />
      </Box>
    </Box>
  );
};

export default BannerSkeleton;
