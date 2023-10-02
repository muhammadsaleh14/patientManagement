import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { error } from "console";
import axios from "axios";
import build from "next/dist/build";

export interface Detail {
  detailHeading: string;
  id: number;
}
export interface DetailsLayoutSlice {
  detailsInfo: Array<Detail> | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string;
}

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const initialiseDetailsLayout = createAsyncThunk(
  "detailsLayout/initialiseDetailsLayout",
  async () => {
    console.log("initialising layout");
    const response = await axios.get("/api/patients/detailsLayout");
    return response.data as string;
  }
);

const initialState: DetailsLayoutSlice = {
  detailsInfo: undefined,
  status: "idle",
  error: undefined,
};
const detailsLayoutSlice = createSlice({
  name: "detailsLayout",
  initialState,
  reducers: {
    addDetailInfoWithHeading: (state, action: PayloadAction<string>) => {
      // Find the biggest id or default to 0 if the array is empty
      if (
        state.detailsInfo?.find(
          (detail) => detail.detailHeading === action.payload
        )
      ) {
        state.status = "failed";
        state.error = "Heading must be unique";
        return;
      }
      const detailsInfo = state.detailsInfo;
      let id = 1;
      while (detailsInfo?.some((detail) => detail.id === id)) {
        id++; // Increment the ID until it is not found in the array
      }
      const uniqueId = id;

      // Create a new detail with an id one bigger than the biggest id
      const newDetail: Detail = {
        detailHeading: action.payload,
        id: uniqueId,
      };
      state?.detailsInfo?.unshift(newDetail);

      state.status = "succeeded";
    },
    setNewDetailsOrder: (
      state,
      action: PayloadAction<DetailsLayoutSlice["detailsInfo"]>
    ) => {
      state.status = "loading";
      if (!action.payload) {
        state.status = "failed";
        state.error = "details list is not defined";
        return;
      }
      state.detailsInfo = action.payload;
      state.status = "succeeded";
    },
    deleteDetail: (state, action: PayloadAction<number>) => {
      state.status = "loading";
      if (action.payload === undefined) {
        state.status = "failed";
        state.error = "details is not defined";
        throw new Error("Detail id is not defined");
      }
      if (!state || !state.detailsInfo) {
        throw new Error("state is not defined");
      }

      const updatedDetailsInfo = state.detailsInfo.filter(
        (detail) => detail.id !== action.payload
      );

      state.detailsInfo = updatedDetailsInfo;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseDetailsLayout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        initialiseDetailsLayout.fulfilled,
        (state, action: PayloadAction<string>) => {
          const parse = JSON.parse(action.payload);
          state.detailsInfo = parse ?? [];
        }
      )
      .addCase(initialiseDetailsLayout.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
        console.error(action.error.message);
      });
  },
});

export default detailsLayoutSlice.reducer;
export const { addDetailInfoWithHeading, setNewDetailsOrder, deleteDetail } =
  detailsLayoutSlice.actions;

export const getDetailsLayout = (state: RootState) => state.detailsLayout;
export const getDetailsLayoutArray = (state: RootState) =>
  state.detailsLayout.detailsInfo
    ? state.detailsLayout.detailsInfo.map(
        (detailInfo) => detailInfo.detailHeading
      )
    : [];

// function sortDetailsByPosition(details: DetailsLayout["detailsInfo"]) {
//   const detailsInfo = details?.slice().sort((a, b) => a.id - b.id);
//   return detailsInfo;
// }
