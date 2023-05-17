'use client'
import AdminLayout from '@/layouts/AdminLayout'
import '../../styles/global.css'
import { Inter } from 'next/font/google'
import { SnackbarProvider } from 'notistack'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SnackbarProvider autoHideDuration={4000}>
          <AdminLayout>{children}</AdminLayout>
        </SnackbarProvider>
      </body>
    </html>
  )
}
