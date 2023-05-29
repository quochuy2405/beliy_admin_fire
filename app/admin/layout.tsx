'use client'
import AdminLayout from '@/layouts/AdminLayout'
import store from '@/redux/features/store'
import 'metadata'
import { Inter } from 'next/font/google'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import '../../styles/global.css'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          <SnackbarProvider autoHideDuration={4000}>
            <AdminLayout>{children}</AdminLayout>
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  )
}
