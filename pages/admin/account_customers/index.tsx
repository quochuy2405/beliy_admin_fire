'use client'

import { columnTableAccountManagers } from '@/components/makecolumns'
import AccountCustomers from '@/components/templates/AccountCustomers'
import { create, deleteItem, readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { AccountType } from '@/types/account'
import { collection } from 'firebase/firestore'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateAccountCustomersType = {
  customers: Array<AccountType>
  isModal: boolean
}
const AccountCustomersPage = () => {
  const [refresh, setRefresh] = useState(false)

  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const onDelete = (id: string) => {
    deleteItem('customers', id)
    onRefresh()
  }
  const columns = columnTableAccountManagers({ onDelete })
  const dispatch = useDispatch()
  const stateStore = useForm<StateAccountCustomersType>({
    defaultValues: {
      isModal: false,
      customers: []
    }
  })
  const dataForm = useForm<AccountType>()
  const addAccount = (data: AccountType) => {
    dispatch(setLoading({ status: true, mode: 'default', title: 'Đang tạo nhân viên...' }))
    const accountRef = collection(db, 'customers')
    create(accountRef, data).then(() => {
      dataForm.reset()
      dispatch(
        setLoading({
          status: true,
          mode: 'success',
          title: (
            <div className="flex flex-col items-center justify-center">
              <p>Thành công...</p>
              <button
                type="button"
                onClick={() => {
                  dispatch(closeLoading())
                  stateStore.setValue('isModal', false)
                  onRefresh()
                }}
                className="w-fit h-8 mt-2 items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
              >
                Đóng
              </button>
            </div>
          )
        })
      )
    })
  }

  useEffect(() => {
    dispatch(setLoading({ status: true }))
    const accountRef = collection(db, 'customers')
    readAll(accountRef).then((data) => {
      stateStore.setValue('customers', data)
      dispatch(closeLoading())
    })
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    addAccount
  }

  return <AccountCustomers {...props} />
}
AccountCustomersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AccountCustomersPage
