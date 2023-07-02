import { InvoiceLineItem } from "../invoice/slice.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store.ts";

type PurchaseOrderLineItem = InvoiceLineItem;

export interface PurchaseOrderState {
  lineItems: PurchaseOrderLineItem[];
}

const initialState: PurchaseOrderState = {
  lineItems: [],
};

export const slice = createSlice({
  name: "purchaseOrder",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<PurchaseOrderLineItem>) => {
      state.lineItems.push(action.payload);
    },
    editRow: (
      state,
      action: PayloadAction<{ index: number; item: InvoiceLineItem }>
    ) => {
      state.lineItems[action.payload.index] = action.payload.item;
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.lineItems.splice(action.payload, 1);
    },
  },
});

export const { addRow, editRow, deleteRow } = slice.actions;

export const selectLineItems = (state: RootState) => state.purchaseOrder.lineItems

export default slice.reducer
