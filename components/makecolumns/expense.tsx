import { ColumnDef } from '@tanstack/react-table'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'

export const columnTableExpense = (): ColumnDef<any, any>[] => [
  {
    accessorKey: 'nameCol',
    header: ({ table }) => (
      <>
        <button
          className="mr-2"
          {...{
            onClick: table.getToggleAllRowsExpandedHandler()
          }}
        >
          {table.getIsAllRowsExpanded() ? (
            <AiFillPlusCircle size={15} color="black" />
          ) : (
            <AiFillMinusCircle size={15} color="black" />
          )}
        </button>
        Kế hoạch
      </>
    ),
    cell: ({ row, getValue }) => (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`
        }}
      >
        {row.getCanExpand() ? (
          <button
            className="mr-2"
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: 'pointer' }
            }}
          >
            {row.getIsExpanded() ? (
              <AiFillPlusCircle size={15} color="black" />
            ) : (
              <AiFillMinusCircle size={15} color="black" />
            )}
          </button>
        ) : (
          <></>
        )}
        {getValue()}
      </div>
    ),
    size: 340,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T1',
    id: 'T1',
    header: 'T1',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T2',
    header: 'T2',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T3',
    header: 'T3',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T4',
    header: 'T4',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T5',
    header: 'T5',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T6',
    header: 'T6',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T7',
    header: 'T7',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T8',
    header: 'T8',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T9',
    header: 'T9',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T10',
    header: 'T10',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T11',
    header: 'T11',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T12',
    header: 'T12',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'total',
    header: 'Tổng',
    footer: (props) => props.column.id
  }
]
