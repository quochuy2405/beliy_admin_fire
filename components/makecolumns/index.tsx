import { ColumnDef } from '@tanstack/react-table'
import { MdOutlineMode } from 'react-icons/md'

export const columnTableAccountManagers = (openModel): ColumnDef<any, any>[] => {
  return [
    {
      header: 'TÊN USER',
      accessorKey: 'username',
      size: 120
    },
    {
      header: 'TÊN ĐẦY ĐỦ',
      accessorKey: 'fullName',
      size: 120
    },
    {
      header: 'KHU VỰC',
      accessorKey: 'region',
      size: 90
    },
    {
      header: 'TỈNH THÀNH',
      accessorKey: 'addressCityProvince',
      size: 120
    },
    {
      header: 'SỐ ĐIỆN THOẠI',
      accessorKey: 'phoneNumber',
      size: 120
    },
    {
      header: 'TUỲ CHỌN',
      accessorKey: 'actions',
      size: 124,
      cell: () => (
        <button
          type="button"
          className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          onClick={() => openModel(1)}
        >
          <MdOutlineMode size={18} />
        </button>
      )
    }
  ]
}

export const columnTableInvoiceManagers = (): ColumnDef<any, any>[] => {
  return [
    {
      header: 'TÊN USER',
      accessorKey: 'username',
      size: 120
    },
    {
      header: 'TÊN ĐẦY ĐỦ',
      accessorKey: 'fullName',
      size: 120
    },
    {
      header: 'KHU VỰC',
      accessorKey: 'region',
      size: 90
    },
    {
      header: 'TỈNH THÀNH',
      accessorKey: 'addressCityProvince',
      size: 120
    },
    {
      header: 'SỐ ĐIỆN THOẠI',
      accessorKey: 'phoneNumber',
      size: 120
    },
    {
      header: 'TRẠNG THÁI',
      accessorKey: 'status',
      size: 120,
      cell: (info) => (
        <p className="inline-flex items-center py-1.5 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
          {info?.getValue()}
        </p>
      )
    },
    {
      header: 'TUỲ CHỌN',
      accessorKey: 'actions',
      size: 124,
      cell: () => (
        <button
          type="button"
          className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        >
          <MdOutlineMode size={18} />
        </button>
      )
    }
  ]
}
