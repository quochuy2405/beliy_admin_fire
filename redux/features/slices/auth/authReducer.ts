import { createReducer } from '@reduxjs/toolkit'
import { login, logout, refresh } from './authHandle'
import { AuthType } from '@/types/user'

const initialState: AuthType = {
  isLoading: false,
  token: '',
  refreshToken: '',
  isAuthenticated: false
}
export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
    })
    .addCase(login.rejected, (state: AuthType) => {
      state.isLoading = false
    })
    .addCase(refresh.fulfilled, (state: AuthType, action) => {
      state.token = action.payload.token
    })
    .addCase(logout.fulfilled, (state: AuthType) => {
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
    })
})
