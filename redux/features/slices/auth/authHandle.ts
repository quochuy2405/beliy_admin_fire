
import AxiosServices from '@/apis/AxiosServices'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    try {
      const response = await AxiosServices.post('/auth/login', user)
      const auth = response.data
      return auth
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const refresh = createAsyncThunk('auth/refresh', async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await AxiosServices.post('/auth/refresh', { refreshToken })
    const { token } = response.data
    return { token }
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await auth.signOut()
  deleteCookie('token')
  localStorage.removeItem('refreshToken')
})
