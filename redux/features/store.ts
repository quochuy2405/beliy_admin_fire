import { configureStore } from '@reduxjs/toolkit'
import loading from './slices/loading'
const store = configureStore({
  reducer: { loading }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
