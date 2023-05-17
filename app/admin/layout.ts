
"use client"
import AdminLayout from '@/layouts/AdminLayout'
import '../../styles/global.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  )
}
