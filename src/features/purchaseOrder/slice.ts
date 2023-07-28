import { LineItem } from "../../components/LineItemDataGrid.tsx";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux/store.ts";
import Papa from "papaparse";
import { nanoid } from "nanoid/non-secure";

export interface PurchaseOrderState {
  lineItems: LineItem[];
  status: "idle" | "loading" | "failed";
}

const initialState: PurchaseOrderState = {
  lineItems: [],
  status: "idle",
};

type LineItemCsvRow = [
  productCode: string,
  description: string,
  quantity: string,
  unitPrice: string,
  totalAmount: string
];

export const importCsv = createAsyncThunk<
  LineItem[],
  File,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: Papa.ParseError[];
  }
>("purchaseOrder/importCsv", async (csvFile: File) => {
  const results: LineItemCsvRow[] = await new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      complete: ({ data, errors }) => {
        if (errors.length > 0) {
          reject(errors);
        }
        resolve(data as LineItemCsvRow[]);
      },
    });
  });
  return results.map((result) => {
    const [productCode, description, quantity, unitPrice, totalAmount] = result;
    return {
      id: nanoid(),
      productCode,
      description,
      quantity: quantity ? Number(quantity) : null,
      totalAmount: totalAmount ? Number(totalAmount) : null,
      unitPrice: unitPrice ? Number(unitPrice) : null,
    };
  });
});

export const slice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    addRows: (state, action: PayloadAction<LineItem[]>) => {
      state.lineItems.push(...action.payload);
    },
    editRow: (state, action: PayloadAction<LineItem>) => {
      const foundIndex = state.lineItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.lineItems[foundIndex] = action.payload;
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      const foundIndex = state.lineItems.findIndex(
        (item) => item.id === action.payload
      );
      if (foundIndex >= 0) {
        state.lineItems.splice(foundIndex, 1);
      }
    },
    replaceRows: (state, action: PayloadAction<LineItem[]>) => {
      state.lineItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(importCsv.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(importCsv.fulfilled, (state, action) => {
      state.status = "idle";
      state.lineItems = action.payload;
    });
    builder.addCase(importCsv.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { addRows, editRow, deleteRow, replaceRows } = slice.actions;

export const selectLineItems = (state: RootState) =>
  state.purchaseOrder.lineItems;

export const selectLoadingState = (state: RootState) =>
  state.purchaseOrder.status;

export default slice.reducer;
