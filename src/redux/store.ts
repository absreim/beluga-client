import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import invoiceReducer from "../features/invoice/slice";
import purchaseOrderReducer from "../features/purchaseOrder/slice";
import comparisonReducer from "../features/comparison/slice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    purchaseOrder: purchaseOrderReducer,
    comparison: comparisonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
