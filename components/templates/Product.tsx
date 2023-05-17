'use client'
import { ProductType } from '@/types/product'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Controller, UseFormReturn } from 'react-hook-form'
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
interface ProductProps {
  stateStore: UseFormReturn<any, any>
  createFrom: UseFormReturn<ProductType, any>
  editForm: UseFormReturn<ProductType, any>
  addProduct: (data: ProductType) => void
  previewImageNew: (data: FileList) => void
}
const Product: React.FC<ProductProps> = ({
  createFrom,
  stateStore,
  addProduct,
  previewImageNew
}) => {
  const tab = useSearchParams().get('tab')

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Controller
        name="isEdit"
        control={stateStore.control}
        defaultValue={false}
        render={({ field }) => (
          <Modal
            handleClose={() => field.onChange(false)}
            isOpen={field.value}
            title="Sửa sản phẩm"
          >
            <form className="space-y-6" action="#">
              <div className="flex">
                <div className="w-1/2 h-64">
                  <Image
                    src="https://bizweb.dktcdn.net/100/287/440/products/ao-khoac-local-brand-dep-nhieu-mau-form-rong-dep-5.jpg?v=1662543061970"
                    unoptimized
                    width={10}
                    height={100}
                    objectFit="cover"
                    alt="1"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số lượng
                    </label>
                    <input
                      type="number"
                      name="number"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phân loại
                    </label>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        <p className="w-7 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                          S
                        </p>
                        <p className="w-7 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                          M
                        </p>
                        <p className="w-7 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                          L
                        </p>
                      </div>
                      <div className="flex">
                        <p className="w-6 h-6 rounded-full border-2 bg-red-500" />
                        <p className="w-6 h-6 rounded-full border-2 bg-black" />
                        <p className="w-6 h-6 rounded-full border-2 bg-blue-500" />
                        <p className="w-6 h-6 rounded-full border-2 bg-green-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Giá sản phẩm
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-1">
                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Xóa
                </button>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </Modal>
        )}
      />

      <div className="flex gap-4 bg-white rounded-lg overflow-hidden">
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((item) => (
              <li className="mr-2" key={item.key}>
                <Link
                  href={`/admin/Product?tab=${item.key}`}
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
        </div>
        <div className="flex-1 pr-4 h-full flex justify-end items-center">
          <Controller
            name="isNew"
            control={stateStore.control}
            defaultValue={false}
            render={({ field }) => (
              <Modal
                handleClose={() => field.onChange(false)}
                isOpen={field.value}
                title="Tạo sản phẩm"
              >
                <form className="space-y-6" onSubmit={createFrom.handleSubmit(addProduct)}>
                  <div className="flex">
                    <div className="w-1/2 p-4 h-16 relative">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                      >
                        <Controller
                          name="imageNewPreview"
                          control={stateStore.control}
                          defaultValue={undefined}
                          render={({ field }) => {
                            return (
                              <>
                                {field.value ? (
                                  <Image
                                    src={field.value}
                                    alt=""
                                    unoptimized
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-contain"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center">
                                    <svg
                                      aria-hidden="true"
                                      className="w-10 h-10 mb-3 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">Click to upload</span> or drag
                                      and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                  </div>
                                )}
                              </>
                            )
                          }}
                        />

                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(event) => previewImageNew(event.target.files)}
                        />
                      </label>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div>
                        <Controller
                          name="name"
                          defaultValue=""
                          control={createFrom.control}
                          render={({ field, fieldState }) => (
                            <TextField
                              title="Tên sản phẩm"
                              {...field}
                              errors={fieldState.error}
                              required
                            />
                          )}
                        />
                      </div>
                      <div>
                        <Controller
                          name="quantity"
                          defaultValue=""
                          control={createFrom.control}
                          render={({ field, fieldState }) => (
                            <TextField
                              title="Số lượng"
                              {...field}
                              errors={fieldState.error}
                              required
                            />
                          )}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="number"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phân loại
                        </label>
                        <div className="flex justify-between items-center">
                          <Controller
                            name="size"
                            defaultValue=""
                            control={createFrom.control}
                            render={({ field: { value, onChange } }) => (
                              <div className="flex gap-1">
                                <p
                                  className={clsx(
                                    'w-7 h-7 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-xs',
                                    {
                                      'border-blue-500': value === 'S'
                                    }
                                  )}
                                  onClick={() => onChange('S')}
                                >
                                  S
                                </p>
                                <p
                                  className={clsx(
                                    'w-7 h-7 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-xs',
                                    {
                                      'border-blue-500': value === 'M'
                                    }
                                  )}
                                  onClick={() => onChange('M')}
                                >
                                  M
                                </p>
                                <p
                                  className={clsx(
                                    'w-7 h-7 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-xs',
                                    {
                                      'border-blue-500': value === 'L'
                                    }
                                  )}
                                  onClick={() => onChange('L')}
                                >
                                  L
                                </p>
                              </div>
                            )}
                          />
                          <Controller
                            name="color"
                            defaultValue=""
                            control={createFrom.control}
                            render={({ field: { value, onChange } }) => (
                              <div className="flex gap-1">
                                <p
                                  className={clsx('w-6 h-6 rounded-full border-2 bg-red-500', {
                                    'border-black': value === 'red'
                                  })}
                                  onClick={() => onChange('red')}
                                />
                                <p
                                  className={clsx('w-6 h-6 rounded-full border-2 bg-blue-500', {
                                    'border-black': value === 'blue'
                                  })}
                                  onClick={() => onChange('blue')}
                                />
                                <p
                                  className={clsx('w-6 h-6 rounded-full border-2 bg-green-500', {
                                    'border-black': value === 'green'
                                  })}
                                  onClick={() => onChange('green')}
                                />
                                <p
                                  className={clsx('w-6 h-6 rounded-full border-2 bg-black-500', {
                                    'border-black': value === 'black'
                                  })}
                                  onClick={() => onChange('black')}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <Controller
                          name="price"
                          control={createFrom.control}
                          defaultValue={0}
                          render={({ field, fieldState }) => (
                            <TextField
                              title="Giá sản phẩm"
                              {...field}
                              errors={fieldState.error}
                              required
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-1">
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                    >
                      Tạo
                    </button>
                  </div>
                </form>
              </Modal>
            )}
          />

          <button
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            onClick={() => stateStore.setValue('isNew', true)}
          >
            Tạo sản phẩm
          </button>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
            <div
              key={item}
              className="w-full bg-white rounded-lg h-82 flex flex-col p-4 gap-2 m-auto"
            >
              <div className="w-full h-[55%]">
                <Image
                  src="https://bizweb.dktcdn.net/100/287/440/products/ao-khoac-local-brand-dep-nhieu-mau-form-rong-dep-5.jpg?v=1662543061970"
                  unoptimized
                  width={10}
                  height={100}
                  objectFit="cover"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="w-fit p-2 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                Áo khoác BELIY
              </p>

              <div className="w-full text-white text-sm flex-1 flex items-center justify-between">
                <p className="text-white bg-red-600 font-medium rounded-lg text-xs px-4 py-2">
                  Giá: 400.000
                </p>
                <div className="flex">
                  <p className="w-6 h-6 rounded-full border-2 bg-red-500" />
                  <p className="w-6 h-6 rounded-full border-2 bg-black" />
                  <p className="w-6 h-6 rounded-full border-2 bg-blue-500" />
                  <p className="w-6 h-6 rounded-full border-2 bg-green-500" />
                </div>
              </div>
              <div className="w-full text-white text-sm flex-1 flex items-center justify-between">
                <div className="flex gap-1">
                  <p className="w-7 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                    S
                  </p>
                  <p className="w-7 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                    M
                  </p>
                  <p className="w-7 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                    L
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                  onClick={() => stateStore.setValue('isEdit', true)}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product
