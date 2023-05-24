'use client'
import { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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
  // stateStore: UseFormReturn<any, any>
  // dataForm: UseFormReturn<ExpenseProfitType, any>
  columns: ColumnDef<any, any>[]
}
const ExpenseProfit: React.FC<ExpenseProfitProps> = ({ columns }) => {
  const tab = useSearchParams().get('tab')
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden p-2">
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((item) => (
              <li className="mr-2" key={item.key}>
                <Link
                  href={`/admin/expense_profit?tab=${item.key}`}
                  className={clsx('inline-block p-4  rounded-t-l', {
                    'active text-blue-600 border-b-2 border-blue-600':
                      tab === item.key || (!tab && item.key === 'profit')
                  })}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        <Table columns={columns} data={[]} />
      </div>
    </div>
  )
}

export default ExpenseProfit
