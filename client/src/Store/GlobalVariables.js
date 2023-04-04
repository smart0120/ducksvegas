import { createSlice } from "@reduxjs/toolkit";

const initialGlobalVariables = {
  walletSelected: false,
  walletAddress: "",
  role: "",
  userName: ""
}

const GlobalVariables = createSlice({
  name: 'GlobalVariables',
  initialState: initialGlobalVariables,
  reducers: {
    setWalletSelected(state, action) {
      state.walletSelected = action.payload
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setWalletAddress(state, action) {
      state.walletAddress = action.payload
    },
    setRole(state, action) {
      state.role = action.payload
    }
  }
});

export const GlobalVariablesAction = GlobalVariables.actions;

export default GlobalVariables.reducer;