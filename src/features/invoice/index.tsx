import { FC, ReactNode } from "react";
import {
  selectLineItems,
  selectLoadingState,
  uploadInvoice,
  addRows,
  deleteRow,
  editRow,
} from "./slice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { Box } from "@mui/material";
import FileUpload from "../../components/FileUpload.tsx";
import LineItemDataGrid, {
  LineItem,
} from "../../components/LineItemDataGrid.tsx";

const Invoice: FC = () => {
  const lineItems = useAppSelector(selectLineItems);
  const loadingState = useAppSelector(selectLoadingState);
  const dispatch = useAppDispatch();

  const dispatchAddRows = (rows: LineItem[]) => dispatch(addRows(rows));
  const dispatchEditRow = (row: LineItem) => dispatch(editRow(row));
  const dispatchDeleteRow = (id: string) => dispatch(deleteRow(id));

  const handleUpload = (files: File[]) => {
    dispatch(uploadInvoice(files[0]));
  };

  const getContent: () => ReactNode = () => {
    if (lineItems !== null) {
      return (
        <LineItemDataGrid
          rows={lineItems}
          addRows={dispatchAddRows}
          editRow={dispatchEditRow}
          deleteRow={dispatchDeleteRow}
        />
      );
    }
    return (
      <FileUpload
        accept={"application/pdf"}
        loadingState={loadingState}
        handleUpload={handleUpload}
        idleText="Drag invoice here or click here to select. File must be a PDF."
        draggingText="Release invoice file here."
      />
    );
  };

  return <Box>{getContent()}</Box>;
};

export default Invoice;
