import { FC, ReactNode } from "react";
import { selectLineItems } from "./slice.ts";
import { useAppSelector } from "../../redux/hooks.ts";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FileUpload from "./FileUpload.tsx";

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

  const getContent: () => ReactNode = () => {
    if (lineItems !== null) {
      return <DataGrid columns={cols} rows={lineItems} />;
    }
    return <FileUpload />;
  };

  return <Box>{getContent()}</Box>;
};

export default Invoice;
