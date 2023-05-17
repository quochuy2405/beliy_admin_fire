'use client'
import { Table } from '../atoms'
const EmployeeManagers = ({ datasets, columns }) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden">
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 flex justify-between w-full p-2">
          <div className="flex-1 flex justify-start gap-3">
            <p className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 rounded-lg">
              Lọc
            </p>
            <button
              type="button"
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-black border border-black rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Shipper
            </button>
            <button
              type="button"
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-black border border-black rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Sale
            </button>
          </div>

          <button
            type="button"
            className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-500 hover:text-white"
          >
            Thêm nhân viên mới
          </button>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <Table columns={columns} data={datasets} />
      </div>
    </div>
  )
}

export default EmployeeManagers
