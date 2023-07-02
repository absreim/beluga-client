import { FC, ReactNode } from "react";
import { selectLineItems, selectLoadingState, uploadInvoice } from "./slice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FileUpload from "../../components/FileUpload.tsx";

const cols: GridColDef[] = [
  {
    field: "productCode",
    headerName: "Product Code",
  },
  {
    field: "description",
    headerName: "Description",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
  },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    type: "number",
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    type: "number",
  },
];

const Invoice: FC = () => {
  const lineItems = useAppSelector(selectLineItems);
  const loadingState = useAppSelector(selectLoadingState);
  const dispatch = useAppDispatch();

  const handleUpload = (files: File[]) => {
    dispatch(uploadInvoice(files[0]));
  };

  const getContent: () => ReactNode = () => {
    if (lineItems !== null) {
      return <DataGrid columns={cols} rows={lineItems} />;
    }
    return (
      <FileUpload
        accept={"application/pdf"}
        loadingState={loadingState}
        handleUpload={handleUpload}
      />
    );
  };

  return <Box>{getContent()}</Box>;
};

export default Invoice;
