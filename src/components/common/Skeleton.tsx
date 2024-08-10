import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";

const SkeletonLoading = () => {
  return (
    <Stack>
      <Grid
        gap={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          marginTop: "0.1rem",
          height: 90,
        }}
      >
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="rounded" width="80%" height={50} />
      </Grid>
    </Stack>
  );
};

export default SkeletonLoading;
