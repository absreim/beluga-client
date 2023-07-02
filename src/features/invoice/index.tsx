import { FC, ReactNode } from "react";
import { selectLineItems } from "./slice.ts";
import { useAppSelector } from "../../redux/hooks.ts";
import { Box } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import FileUpload from "./FileUpload.tsx";

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

  const getContent: () => ReactNode = () => {
    if (lineItems !== null) {
      return <DataGridPro columns={cols} rows={lineItems} />;
    }
    return <FileUpload />;
  };

  return <Box>{getContent()}</Box>;
};

export default Invoice;
