'use client'
import { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import Link from 'next/link'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table } from '../atoms'
const tabs = [
  {
    key: 'profit',
    name: 'Lợi nhuận'
  },
  {
    key: 'expense',
    name: 'Chi phí'
  }
]

interface ExpenseProfitProps {
  stateStore: UseFormReturn<any, any>
  dataForm: UseFormReturn<any, any>
  handleSubmit: (data: any) => void
  tab: string
  columns: ColumnDef<any, any>[]
}
const ExpenseProfit: React.FC<ExpenseProfitProps> = ({
  columns,
  stateStore,
  dataForm,
  tab,
  handleSubmit
}) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <form
        onSubmit={dataForm.handleSubmit(handleSubmit)}
        className="flex gap-4 bg-white rounded-lg overflow-hidden"
      >
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 flex justify-between w-full p-2">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((item) => (
              <li className="mr-2" key={item.key}>
                <Link
                  href={`/admin/expense_profit?tab=${item.key}`}
                  className={clsx('inline-block p-2  rounded-t-l', {
                    'active text-blue-600 border-b-2 border-blue-600':
                      tab === item.key || (!tab && item.key === 'profit')
                  })}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-500 hover:text-white"
          >
            Cập nhật bảng
          </button>
        </div>
      </form>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        {tab === 'expense' && (
          <Controller
            name="accounts"
            control={stateStore.control}
            render={({ field }) => (
              <Table columns={columns} data={field.value} control={dataForm.control} powerplus />
            )}
          />
        )}
      </div>
    </div>
  )
}

export default ExpenseProfit
