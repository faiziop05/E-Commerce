import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    IsLoggedIn: false,
  };
 const LoginStatusSlice = createSlice({
    name: 'boolean',
    initialState,
    reducers: {
      toggle: (state) => {
        state.IsLoggedIn = !state.IsLoggedIn;
      },
      setTrue: (state) => {
        state.IsLoggedIn = true;
      },
      setFalse: (state) => {
        state.IsLoggedIn = false;
      },
    },
})

// Action creators are generated for each case reducer function
export const { toggle, setTrue, setFalse }= LoginStatusSlice.actions

export default LoginStatusSlice.reducer