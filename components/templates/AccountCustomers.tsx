'use client'
import { AccountType } from '@/types/account'
import { ColumnDef } from '@tanstack/react-table'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table, TextField } from '../atoms'
import { Modal } from '../moleculers'
import { StateAccountCustomersType } from 'app/admin/account_customers/page'
interface AccountCustomersProps {
  stateStore: UseFormReturn<StateAccountCustomersType, any>
  dataForm: UseFormReturn<AccountType, any>
  columns: ColumnDef<any, any>[]
  addAccount: (data: AccountType) => void
}
const AccountCustomers = ({ columns, stateStore, dataForm, addAccount }: AccountCustomersProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Controller
        name="isModal"
        defaultValue={false}
        control={stateStore.control}
        render={({ field }) => {
          return (
            <Modal
              handleClose={() => {
                field.onChange(false)
                dataForm.reset()
              }}
              isOpen={field.value}
              title="Thêm nhân viên mới"
              size="md"
            >
              <form className="space-y-6" onSubmit={dataForm.handleSubmit(addAccount)}>
                <div className="flex flex-col gap-3">
                  <Controller
                    name="name"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Họ và tên" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="address"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Địa chỉ" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="phone"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Số điện thoại"
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="username"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Tên đăng nhập"
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Mật khẩu" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="username"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Tên đăng nhập"
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tạo
                </button>
              </form>
            </Modal>
          )
        }}
      />

      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <Controller
          name="customers"
          control={stateStore.control}
          render={({ field }) => <Table columns={columns} data={field.value} />}
        />
      </div>
    </div>
  )
}

export default AccountCustomers
