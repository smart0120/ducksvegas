import { configureStore } from "@reduxjs/toolkit";
import GlobalVariables from "./GlobalVariables";

const store = configureStore({
  reducer: {
    GlobalVariables
  },
});

export default store;
