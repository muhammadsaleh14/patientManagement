import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { VisitDetailTitle } from "@/components/interfaces/databaseInterfaces";
import axios from "axios";

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const setVisitDetailTitles = createAsyncThunk(
  "patient/setVisitDetailTitles",
  async () => {
    const detailTitlesRequest = await axios.get(
      "/api/patients/visitDetailTitle"
    );
    return detailTitlesRequest.data as VisitDetailTitle[];
  }
);

export const addVisitDetailTitle = createAsyncThunk(
  "patient/addVisitDetailTitle",
  async (newVisitDetailTitle: string) => {
    const newDetailTitle = await axios.post("/api/patients/visitDetailTitle", {
      newVisitDetailTitle,
    });
    return newDetailTitle.data as VisitDetailTitle;
  }
);

export const deleteVisitDetailTitle = createAsyncThunk(
  "patient/deleteVisitDetailTitle",
  async (id: string) => {
    const isDeleted = (await axios.delete(
      "/api/patients/visitDetailTitle/" + id
    )) as boolean;
    if (isDeleted) {
      return id;
    }
    return;
  }
);
export interface VisitDetailTitlesSlice {
  visitDetailTitles: Array<VisitDetailTitle> | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string;
}
const initialState: VisitDetailTitlesSlice = {
  visitDetailTitles: undefined,
  status: "idle",
  error: undefined,
};
const visitDetailTitlesSlice = createSlice({
  name: "visitDetailTitles",
  initialState,
  reducers: {
    // addDetailInfoWithHeading: (state, action: PayloadAction<string>) => {
    //   // Find the biggest id or default to 0 if the array is empty
    //   if (
    //     state.detailsInfo?.find(
    //       (detail) => detail.detailHeading === action.payload
    //     )
    //   ) {
    //     state.status = "failed";
    //     state.error = "Heading must be unique";
    //     return;
    //   }
    //   const detailsInfo = state.detailsInfo;
    //   let id = 1;
    //   while (detailsInfo?.some((detail) => detail.id === id)) {
    //     id++; // Increment the ID until it is not found in the array
    //   }
    //   const uniqueId = id;
    //   // Create a new detail with an id one bigger than the biggest id
    //   const newDetail: Detail = {
    //     detailHeading: action.payload,
    //     id: uniqueId,
    //   };
    //   state?.detailsInfo?.unshift(newDetail);
    //   state.status = "succeeded";
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(setVisitDetailTitles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        setVisitDetailTitles.fulfilled,
        (state, action: PayloadAction<VisitDetailTitle[]>) => {
          console.log("setting visit details:", action.payload);
          state.visitDetailTitles = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(setVisitDetailTitles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error(action.error.message);
      })

      .addCase(addVisitDetailTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addVisitDetailTitle.fulfilled,
        (state, action: PayloadAction<VisitDetailTitle>) => {
          state.visitDetailTitles = state.visitDetailTitles?.concat(
            action.payload
          );
          state.status = "succeeded";
        }
      )
      .addCase(addVisitDetailTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error(action.error.message);
      })

      .addCase(deleteVisitDetailTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteVisitDetailTitle.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          if (action.payload) {
            state.visitDetailTitles = state.visitDetailTitles?.filter(
              (visitDetailTitle) =>
                visitDetailTitle.id !== action.payload
            );
          }
          state.status = "succeeded";
        }
      )
      .addCase(deleteVisitDetailTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error(action.error.message);
      });
  },
});

export default visitDetailTitlesSlice.reducer;
// export const {  } = visitDetailTitlesSlice.actions;

export const getVisitDetailTitlesState = (state: RootState) =>
  state.visitDetailTitles;
