import { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { selectLineItems as selectInvoiceLineItems } from "../invoice/slice.ts";
import { selectLineItems as selectPoLineItems } from "../purchaseOrder/slice.ts";
import { selectLoadingState, selectResults, chatgptCompare } from "./slice.ts";
import {
  Alert,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Comparison: FC = () => {
  const poLineItems = useAppSelector(selectPoLineItems);
  const invoiceLineItems = useAppSelector(selectInvoiceLineItems);
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(selectLoadingState);
  const results = useAppSelector(selectResults);

  const handleCompare: (poDescs: string[], invoiceDescs: string[]) => void = (
    poDescs,
    invoiceDescs
  ) => {
    dispatch(chatgptCompare({ poDescs, invoiceDescs }));
  };

  const getControls: () => ReactNode = () => {
    if (
      poLineItems.length === 0 ||
      !invoiceLineItems ||
      invoiceLineItems.length === 0
    ) {
      return (
        <Alert color="info">
          To run a comparison, both purchase order and invoice data must be
          present.
        </Alert>
      );
    }

    const poDescs = poLineItems.map(({ description }) => description);
    const invoiceDescs = invoiceLineItems.map(({ description }) => description);
    return (
      <>
        {loadingState === "failed" && (
          <Alert color="error">Error performing comparison.</Alert>
        )}
        <Button
          variant="contained"
          onClick={() => handleCompare(poDescs, invoiceDescs)}
          disabled={loadingState === "loading"}
        >
          {loadingState === "loading" ? "Loading..." : "Compare"}
        </Button>
      </>
    );
  };

  return (
    <Box>
      {results && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h3">Matched Descriptions</Typography>
            {results.matches.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Purchase Order Description</TableCell>
                      <TableCell>Invoice Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.matches.map(([poDesc, invoiceDesc], index) => (
                      <TableRow key={index}>
                        <TableCell>{poDesc}</TableCell>
                        <TableCell>{invoiceDesc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert color="warning">No matching items.</Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h3">Unmatched Descriptions</Typography>
            {results.unmatched.length > 0 ? (
              <List>
                {results.unmatched.map((desc, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={desc} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Alert color="success">No unmatched items.</Alert>
            )}
          </Grid>
        </Grid>
      )}
      {getControls()}
    </Box>
  );
};

export default Comparison;
