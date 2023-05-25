import { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
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
// addressNumber: string
// award: string
// checkoutId: string
// district: string
// email: string
// name: string
export const columnTableInvoiceManagers = (): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Mã đơn hàng',
      accessorKey: 'checkoutId',
      size: 120
    },
    {
      header: 'TÊN ĐẦY ĐỦ',
      accessorKey: 'name',
      size: 120
    },
    {
      header: 'Địa chỉ',
      accessorKey: 'address',
      size: 90,
      cell: ({ row: { original } }) => {
        const address = [
          original.addressNumber,
          original.award,
          original.district,
          original.province
        ]
        return <p>{address.join(',')}</p>
      }
    },
    {
      header: 'SỐ ĐIỆN THOẠI',
      accessorKey: 'phone',
      size: 120
    },
    {
      header: 'TRẠNG THÁI',
      accessorKey: 'status',
      size: 120,
      cell: (info) => (
        <p
          className={clsx(
            'inline-flex items-center py-1.5 px-3 text-xs font-medium text-center rounded-full text-white',
            {
              'bg-blue-700': !info?.getValue(),
              'bg-emerald-400': info?.getValue()
            }
          )}
        >
          {!info?.getValue() ? 'Đang chờ thanh toán' : 'Đã thanh toán'}
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
export const columnTableExpense = (): ColumnDef<any, any>[] => {
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
    }
  ]
}
interface ColumnTableCategoriesProps {
  deleteData: (id: string) => void
}
export const columnTableCategories = ({
  deleteData
}: ColumnTableCategoriesProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Mã phân loại',
      accessorKey: 'code',
      size: 120
    },
    {
      header: 'Tên phân loại',
      accessorKey: 'name',
      size: 120
    },

    {
      header: 'Xóa',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => (
        <button
          type="button"
          onClick={() => deleteData(original?.id)}
          className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
        >
          Xóa
        </button>
      )
    }
  ]
}
