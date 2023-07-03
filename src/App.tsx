import { FC } from 'react'
import { Grid, Typography } from "@mui/material";
import Invoice from "./features/invoice";
import PurchaseOrder from "./features/purchaseOrder";

const App: FC = () => {
  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Project Beluga</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" gutterBottom>Purchase Order</Typography>
          <PurchaseOrder />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" gutterBottom>Invoice</Typography>
          <Invoice />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography variant="h5" gutterBottom>Comparison</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
