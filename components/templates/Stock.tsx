'use client'
import { StockCreateType, StockType } from '@/types/stocks'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MdAddCircle } from 'react-icons/md'
import { TextField } from '../atoms'
import { Modal } from '../moleculers'
const tabs = [
  {
    key: 'all',
    name: 'Tất cả sản phẩm'
  },
  {
    key: 'top',
    name: 'Áo Thun'
  },
  {
    key: 'jacket',
    name: 'Áo Khoác'
  },
  {
    key: 'bot',
    name: 'Quần'
  }
]
interface StockProps {
  stateStore: UseFormReturn<any, any>
  editForm: UseFormReturn<StockType, any>
  createForm: UseFormReturn<StockCreateType, any>
  editStock: (data: StockType) => void
  addStock: (data: StockCreateType) => void
  onChangeSelect: (id: string) => void
}

const Stock: React.FC<StockProps> = ({
  editForm,
  createForm,
  stateStore,
  addStock,
  editStock,
  onChangeSelect
}) => {
  const tab = useSearchParams().get('tab')

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Controller
        name="isEdit"
        defaultValue={false}
        control={stateStore.control}
        render={({ field }) => {
          return (
            <Modal
              handleClose={() => {
                field.onChange(false)
                editForm.reset()
              }}
              isOpen={field.value}
              title="Sửa tồn kho"
              size="md"
            >
              <form className="space-y-6" onSubmit={editForm.handleSubmit(editStock)}>
                <div className="w-full h-64">
                  <Controller
                    name="imageURL"
                    defaultValue=""
                    control={editForm.control}
                    render={({ field }) => (
                      <Image
                        src={field.value || 'https://www.freeiconspng.com/img/23494'}
                        unoptimized
                        width={10}
                        height={100}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="quantity"
                    defaultValue={0}
                    control={editForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Số lượng tồn kho"
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
                  Cập nhật
                </button>
              </form>
            </Modal>
          )
        }}
      />
      <Controller
        name="isNew"
        defaultValue={false}
        control={stateStore.control}
        render={({ field }) => {
          return (
            <Modal
              handleClose={() => {
                field.onChange(false)
                createForm.reset()
              }}
              isOpen={field.value}
              title="Tạo kho mới"
              size="md"
            >
              <form className="space-y-6" onSubmit={createForm.handleSubmit(addStock)}>
                <div>
                  <Controller
                    name="code"
                    defaultValue=""
                    control={createForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Mã kho" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="name"
                    defaultValue=""
                    control={createForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Tên kho" {...field} errors={fieldState.error} required />
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
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden">
        <div className="bg-white flex w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((item) => (
              <li className="mr-2" key={item.key}>
                <Link
                  href={`/admin/stock?tab=${item.key}`}
                  className={clsx('inline-block p-4  rounded-t-l', {
                    'active text-blue-600 border-b-2 border-blue-600':
                      tab === item.key || (!tab && item.key === 'all')
                  })}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex-1 pr-4 h-full flex justify-end items-center gap-2">
            <div>
              <Controller
                name="stockCurrent"
                control={stateStore.control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center gap-2 w-fit h-full">
                    <label
                      htmlFor="inventory"
                      className="block h-full whitespace-nowrap  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kho:
                    </label>

                    <select
                      value={value}
                      onChange={(e) => {
                        const value = e.target.value
                        onChange(value)
                        onChangeSelect(value)
                      }}
                      className="bg-gray-50 text-sm border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <Controller
                        name="stockOpt"
                        defaultValue={false}
                        control={stateStore.control}
                        render={({ field }) => (
                          <>
                            <option value="">Chọn kho</option>
                            {field.value.map((opt) => (
                              <option value={opt.value}>{opt.label}</option>
                            ))}
                          </>
                        )}
                      />
                    </select>
                  </div>
                )}
              />
            </div>
            <button
              type="button"
              className="w-fit inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
              onClick={() => stateStore.setValue('isNew', true)}
            >
              <label className="hidden md:block"> Tạo kho mới</label>
              <label className="block md:hidden">
                <MdAddCircle size={20} />
              </label>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Controller
            name="stocks"
            control={stateStore.control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                {field.value.map((item) => (
                  <div
                    key={item.imageURL}
                    className="w-full bg-white rounded-lg h-72 flex flex-col p-4 gap-2 m-auto"
                  >
                    <div className="w-full h-[85%]">
                      <Image
                        src={item.imageURL || 'https://www.freeiconspng.com/img/23494'}
                        unoptimized
                        width={10}
                        height={100}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full text-white text-sm flex-1 flex items-center justify-between">
                      <p className="text-white bg-red-600 font-medium rounded-lg text-xs px-4 py-2.5">
                        Số lượng: {item.quantity || 0}
                      </p>

                      <button
                        type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        onClick={() => {
                          stateStore.setValue('isEdit', true)
                          editForm.setValue('quantity', item.quantity)
                          editForm.setValue('id', item.id)
                          editForm.setValue('imageURL', item.imageURL)
                          editForm.setValue('imageName', item.imageName)
                        }}
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Stock
