import { columnTableExpense } from '@/components/makecolumns'
import { ExpenseProfit } from '@/components/templates'

const ExpenseProfitPage = () => {
  const columns = columnTableExpense()
  const props = {
    columns
  }
  return <ExpenseProfit {...props} />
}

export default ExpenseProfitPage
