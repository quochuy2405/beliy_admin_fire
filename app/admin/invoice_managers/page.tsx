'use client'

import { columnTableInvoiceManagers } from '@/components/makecolumns'
import { InvoiceManagers } from '@/components/templates'
import { readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import { ProductType } from '@/types/product'
import { collection } from 'firebase/firestore'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
type DataSetType = {
  addressNumber: string
  award: string
  checkoutId: string
  district: string
  email: string
  name: string
  products: Array<ProductType>
}
export type StateInvoiceManagersPageType = {
  datasets: Array<DataSetType>
}
const InvoiceManagersPage = () => {
  const columns = columnTableInvoiceManagers()
  const stateStore = useForm<StateInvoiceManagersPageType>({
    defaultValues: {
      datasets: []
    }
  })
  useEffect(() => {
    const ordersRef = collection(db, 'orders')
    readAll(ordersRef).then((data) => {
      stateStore.setValue('datasets', data)
    })
  }, [])
  const props = {
    columns,
    stateStore
  }

  return <InvoiceManagers {...props} />
}

export default InvoiceManagersPage
