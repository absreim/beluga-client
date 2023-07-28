import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChatgptResults } from "./api.ts";
import { RootState } from "../../redux/store.ts";

type ChatgptResults = {
  choices: [
    {
      message: {
        content: string;
      };
    }
  ];
};

interface ComparisonResults {
  matches: [[poDesc: string, invoiceDesc: string]];
  unmatched: string[];
}

export interface ComparisonState {
  results: ComparisonResults | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ComparisonState = {
  results: null,
  status: "idle",
};

export const chatgptCompare = createAsyncThunk(
  "comparison/chatgptCompare",
  async ({
    poDescs,
    invoiceDescs,
  }: {
    poDescs: string[];
    invoiceDescs: string[];
  }) => {
    const response = await fetchChatgptResults(poDescs, invoiceDescs);
    const chatgptOutput: ChatgptResults = await response.json();
    return JSON.parse(
      chatgptOutput.choices[0].message.content
    ) as ComparisonResults;
  }
);

export const slice = createSlice({
  name: "comparison",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatgptCompare.pending, (state) => {
        state.status = "loading";
      })
      .addCase(chatgptCompare.fulfilled, (state, action) => {
        state.status = "idle";
        state.results = action.payload;
      })
      .addCase(chatgptCompare.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectResults = (state: RootState) => state.comparison.results;
export const selectLoadingState = (state: RootState) => state.comparison.status;

export default slice.reducer;
