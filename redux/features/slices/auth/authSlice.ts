import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      state.isAuthenticated = true
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setToken, setRefreshToken, setLoading } = authSlice.actions

export default authSlice.reducer
