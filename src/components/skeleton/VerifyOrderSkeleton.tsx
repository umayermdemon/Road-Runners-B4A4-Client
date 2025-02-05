import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";

const VerifyOrderSkeleton = () => {
  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom className="text-center font-bold">
        <Skeleton width="50%" />
      </Typography>
      <Grid container spacing={2}>
        {/* Order Details Skeleton */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={<Skeleton width="30%" />} />
            <CardContent>
              <Skeleton width="80%" height={20} />
              <Skeleton width="70%" height={20} />
              <Skeleton width="90%" height={20} />
              <Skeleton width="60%" height={20} />
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Information Skeleton */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={<Skeleton width="40%" />} />
            <CardContent>
              <Skeleton width="70%" height={20} />
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" height={20} />
              <Skeleton width="90%" height={20} />
              <Skeleton width="50%" height={20} />
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Information Skeleton */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={<Skeleton width="50%" />} />
            <CardContent>
              <Skeleton width="70%" height={20} />
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" height={20} />
              <Skeleton width="90%" height={20} />
              <Skeleton width="50%" height={20} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default VerifyOrderSkeleton;
