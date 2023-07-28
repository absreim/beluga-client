import { FC, ReactNode } from "react";
import {
  selectLineItems,
  selectLoadingState,
  uploadInvoice,
  addRows,
  deleteRow,
  editRow,
  replaceRows,
} from "./slice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { Stack } from "@mui/material";
import FileUpload from "../../components/FileUpload.tsx";
import LineItemDataGrid, {
  LineItem,
} from "../../components/LineItemDataGrid.tsx";
import SaveLoadLineItems from "../../components/SaveLoadLineItems.tsx";

const Invoice: FC = () => {
  const lineItems = useAppSelector(selectLineItems);
  const loadingState = useAppSelector(selectLoadingState);
  const dispatch = useAppDispatch();

  const dispatchAddRows = (rows: LineItem[]) => dispatch(addRows(rows));
  const dispatchEditRow = (row: LineItem) => dispatch(editRow(row));
  const dispatchDeleteRow = (id: string) => dispatch(deleteRow(id));
  const dispatchReplaceRows = (rows: LineItem[]) => dispatch(replaceRows(rows));

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

  return (
    <Stack spacing={2}>
      {getContent()}
      <SaveLoadLineItems
        localStorageKey={"invoice"}
        currentRows={lineItems}
        setCurrentRows={dispatchReplaceRows}
      />
    </Stack>
  );
};

export default Invoice;
