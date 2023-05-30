'use client'
import { columnTableExpense } from '@/components/makecolumns'
import { ExpenseProfit } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { useSearchParams } from 'next/navigation'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

const ExpenseProfitPage = () => {
  const columns = columnTableExpense()
  const tab = useSearchParams().get('tab') as string
  const dataForm = useForm()
  const stateStore = useForm({
    defaultValues: {
      accounts: [
        {
          firstName: 'John',
          lastName: 'Doe',
          age: 27,
          visits: 587,
          progress: 72,
          status: 'single',
          subRows: [
            {
              firstName: 'Jane',
              lastName: 'Smith',
              age: 33,
              visits: 903,
              progress: 19,
              status: 'relationship',
              subRows: [
                {
                  firstName: 'Jane',
                  lastName: 'Smith',
                  age: 33,
                  visits: 903,
                  progress: 19,
                  status: 'relationship'
                },
                {
                  firstName: 'David',
                  lastName: 'Johnson',
                  age: 41,
                  visits: 235,
                  progress: 84,
                  status: 'complicated'
                }
              ]
            },
            {
              firstName: 'David',
              lastName: 'Johnson',
              age: 41,
              visits: 235,
              progress: 84,
              status: 'complicated'
            }
          ]
        },
        {
          firstName: 'John',
          lastName: 'Doe',
          age: 27,
          visits: 587,
          progress: 72,
          status: 'single',
          subRows: [
            {
              firstName: 'Jane',
              lastName: 'Smith',
              age: 33,
              visits: 903,
              progress: 19,
              status: 'relationship',
              subRows: [
                {
                  firstName: 'Jane',
                  lastName: 'Smith',
                  age: 33,
                  visits: 903,
                  progress: 19,
                  status: 'relationship'
                },
                {
                  firstName: 'David',
                  lastName: 'Johnson',
                  age: 41,
                  visits: 235,
                  progress: 84,
                  status: 'complicated'
                }
              ]
            },
            {
              firstName: 'David',
              lastName: 'Johnson',
              age: 41,
              visits: 235,
              progress: 84,
              status: 'complicated'
            }
          ]
        }
      ]
    }
  })

  const parseData = (data) => {
    const result = []

    const parseRow = (row) => {
      let rowData = {}
      let subRowData = []
      Object.entries(row).forEach(([key, value]) => {
        if (!Number.isInteger(Number(key))) {
          rowData = { ...rowData, [key]: value }
        } else {
          subRowData = [...subRowData, value]
        }
      })
      if (subRowData.length) {
        rowData['subRows'] = subRowData.map((subRow) => parseRow(subRow))
      }

      return rowData
    }

    Object.values(data).forEach((row) => {
      result.push(parseRow(row))
    })

    return result
  }

  const handleSubmit = (data: any) => {
    const parsedData = parseData(data)
    console.log(parsedData)
  }

  const props = {
    columns,
    stateStore,
    dataForm,
    tab,
    handleSubmit
  }
  return <ExpenseProfit {...props} />
}
ExpenseProfitPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default ExpenseProfitPage
