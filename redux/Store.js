import { configureStore } from '@reduxjs/toolkit'
import LoginStatusSlice from './LoginStatusSlice'
import CartSlice from './CartSlice'
export default configureStore({
  reducer: {
   loginStatus: LoginStatusSlice,
   cartSlice:CartSlice
  },
})