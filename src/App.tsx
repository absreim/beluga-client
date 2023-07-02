import { FC } from 'react'
import { Grid, Typography } from "@mui/material";
import Invoice from "./features/invoice";

const App: FC = () => {
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} p={2}>
          <Typography variant="h4">Project Beluga</Typography>
        </Grid>
        <Grid item xs={12} lg={6} xl={4} p={2}>
          <Typography variant="h5" gutterBottom>Purchase Order</Typography>
        </Grid>
        <Grid item xs={12} lg={6} xl={4} p={2}>
          <Typography variant="h5" gutterBottom>Invoice</Typography>
          <Invoice />
        </Grid>
        <Grid item xs={12} lg={12} xl={4} p={2}>
          <Typography variant="h5" gutterBottom>Comparison</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
