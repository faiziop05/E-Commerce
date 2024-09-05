import { configureStore } from '@reduxjs/toolkit'
import LoginStatusSlice from './LoginStatusSlice'
export default configureStore({
  reducer: {
   loginStatus: LoginStatusSlice
  },
})