import { FC, ReactNode } from "react";
import { selectLineItems, selectLoadingState, uploadInvoice } from "./slice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { Box } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import FileUpload from "./FileUpload.tsx";
import FileUpload from "../../components/FileUpload.tsx";

const cols: GridColDef[] = [
  {
    field: "productCode",
    headerName: "Product Code",
    editable: true
  },
  {
    field: "description",
    headerName: "Description",
    editable: true
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    editable: true
  },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    type: "number",
    editable: true
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    type: "number",
    editable: true
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
      return <DataGridPro columns={cols} rows={lineItems} />;
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
