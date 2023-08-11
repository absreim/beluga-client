import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { importCsv, selectLineItems, selectLoadingState } from "./slice.ts";
import { Stack } from "@mui/material";
import LineItemDataGrid, {
  LineItem,
} from "../../components/LineItemDataGrid.tsx";
import { addRows, editRow, deleteRow, replaceRows } from "./slice.ts";
import FileUpload from "../../components/FileUpload.tsx";
import SaveLoadLineItems from "../../components/SaveLoadLineItems.tsx";

const PurchaseOrder: FC = () => {
  const lineItems = useAppSelector(selectLineItems);
  const loadingState = useAppSelector(selectLoadingState);
  const dispatch = useAppDispatch();

  const dispatchAddRows = (rows: LineItem[]) => dispatch(addRows(rows));
  const dispatchEditRow = (row: LineItem) => dispatch(editRow(row));
  const dispatchDeleteRow = (id: string) => dispatch(deleteRow(id));
  const dispatchReplaceRows = (rows: LineItem[]) => dispatch(replaceRows(rows));

  const handleUpload = (files: File[]) => {
    dispatch(importCsv(files[0]));
  };

  return (
    <Stack spacing={2}>
      {lineItems.length === 0 && (
        <FileUpload
          accept={"text/csv"}
          handleUpload={handleUpload}
          loadingState={loadingState}
          idleText="Upload a CSV containing purchase order data or start adding rows manually. To upload a file, drag it here or click here to select from your computer. File must be a CSV."
          draggingText="Release purchase order file here."
        />
      )}
      <LineItemDataGrid
        rows={lineItems}
        mutations={{
          addRows: dispatchAddRows,
          editRow: dispatchEditRow,
          deleteRow: dispatchDeleteRow
        }}
      />
      <SaveLoadLineItems
        localStorageKey={"purchaseOrder"}
        currentRows={lineItems}
        setCurrentRows={dispatchReplaceRows}
      />
    </Stack>
  );
};

export default PurchaseOrder;
