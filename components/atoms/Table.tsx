'use client'
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import TextField from './TextField'

interface TableProps {
  data: Array<object>
  columns: ColumnDef<any, any>[]
  className?: string
  powerplus?: boolean
}

const defaultColumn: Partial<any> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <TextField
        name={index.toLocaleString()}
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  }
}

const Table: React.FC<TableProps> = ({ data, columns, className, powerplus }) => {
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const table = useReactTable(
    powerplus
      ? {
          data,
          columns,
          defaultColumn,
          state: {
            expanded
          },
          getSubRows: (row) => row.subRows,
          onExpandedChange: setExpanded,
          getCoreRowModel: getCoreRowModel(),
          getExpandedRowModel: getExpandedRowModel(),
          getFilteredRowModel: getFilteredRowModel()
        }
      : {
          data,
          columns,
          state: {
            expanded
          },
          getSubRows: (row) => row.subRows,
          onExpandedChange: setExpanded,
          getCoreRowModel: getCoreRowModel(),
          getExpandedRowModel: getExpandedRowModel(),
          getFilteredRowModel: getFilteredRowModel()
        }
  )

  const classNames = clsx('w-full text-sm text-left text-gray-500 rounded-lg overflow-hidden', {
    'h-full': !table?.getRowModel().rows.length,
    [className]: !!className
  })

  return (
    <table cellPadding={0} cellSpacing={0} className={classNames}>
      <thead className="text-xs text-gray-400 uppercase bg-gray-100">
        {table?.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="mr-6">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : 'auto'
                }}
                colSpan={header.colSpan}
                className={clsx('first:pl-6 last:pr-6 h-12 pl-1', {
                  'text-center': (header.column.columnDef.meta as any)?.center
                })}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y-[1px]">
        {table?.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="hover:bg-gray-100 cursor-pointer">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    className="first:pl-6 last:pr-6 h-16 pl-1 font-medium text-sm text-black"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          )
        })}
        {!table?.getRowModel().rows?.length && (
          <tr>
            <td
              colSpan={table.getHeaderGroups()[0].headers.length}
              className="px-6 py-3 h-full text-center"
            >
              Chưa có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default memo(Table)
