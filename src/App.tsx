import { FC } from 'react'
import { Grid } from "@mui/material";
import Invoice from "./features/invoice";

const App: FC = () => {
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} lg={6} xl={4}>
          Purchase Order UI
        </Grid>
        <Grid item xs={12} lg={6} xl={4}>
          <Invoice />
        </Grid>
        <Grid item xs={12} lg={12} xl={4}>
          Comparison UI
        </Grid>
      </Grid>
    </>
  );
}

export default App;
