'use client'

import { columnTableAccountManagers } from '@/components/makecolumns'
import { AccountManagers } from '@/components/templates'
import { create, deleteItem, readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { AccountType } from '@/types/account'
import { collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateAccountManagersType = {
  accounts: Array<AccountType>
  isModal: boolean
}
const AccountManagersPage = () => {
  const [refresh, setRefresh] = useState(false)

  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const onDelete = (id: string) => {
    deleteItem('employees', id)
    onRefresh()
  }
  const columns = columnTableAccountManagers({ onDelete })
  const dispatch = useDispatch()
  const stateStore = useForm<StateAccountManagersType>({
    defaultValues: {
      isModal: false,
      accounts: []
    }
  })
  const dataForm = useForm<AccountType>()
  const addAccount = (data: AccountType) => {
    dispatch(setLoading({ status: true, mode: 'default', title: 'Đang tạo nhân viên...' }))
    const accountRef = collection(db, 'accounts')
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
    const accountRef = collection(db, 'accounts')
    readAll(accountRef).then((data) => {
      stateStore.setValue('accounts', data)
      dispatch(closeLoading())
    })
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    addAccount
  }

  return <AccountManagers {...props} />
}

export default AccountManagersPage
