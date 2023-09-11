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
      // console.log(JSON.stringify(state.detailsInfo));
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
        console.log("state is not defined");
        throw new Error("state is not defined");
      }
      console.log("deleting detail");
      const updatedDetailsInfo = state.detailsInfo.filter(
        (detail) => detail.id !== action.payload
      );
      console.log(updatedDetailsInfo);
      state.detailsInfo = updatedDetailsInfo;
      state.status = "succeeded";
    },
    // updateDetail: (
    //   state,
    //   action: PayloadAction<DetailsLayoutSlice["detailsInfo"]>
    // ) => {
    //   state.status = "loading";
    //   if (!action.payload) {
    //     state.status = "failed";
    //     state.error = "details list is not defined";
    //   }
    //   state.detailsInfo = action.payload;
    //   state.status = "succeeded";
    // },
  },
});

export default detailsLayoutSlice.reducer;
export const { addDetailInfoWithHeading, setNewDetailsOrder, deleteDetail } =
  detailsLayoutSlice.actions;

export const getDetailsLayout = (state: RootState) => state.detailsLayout;

// function sortDetailsByPosition(details: DetailsLayout["detailsInfo"]) {
//   const detailsInfo = details?.slice().sort((a, b) => a.id - b.id);
//   return detailsInfo;
// }
