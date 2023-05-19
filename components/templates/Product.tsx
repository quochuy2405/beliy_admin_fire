'use client'
import { ProductType } from '@/types/product'
import clsx from 'clsx'
import { xor } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MdAddCircle } from 'react-icons/md'
import { TextAreaField, TextField } from '../atoms'
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
const colors = [
  '#025464',
  '#E57C23',
  '#F8F1F1',
  '#9CA777',
  '#7C9070',
  '#263A29',
  '#000000',
  '#E96479',
  '#B99B6B',
  '#E4C988'
]
const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'OV']
const catDetails = {
  QD: 'Quần Dài',
  QN: 'Quần Short',
  AK: 'Áo Khoác',
  AT: 'Áo Thun'
}
interface ProductProps {
  stateStore: UseFormReturn<any, any>
  dataForm: UseFormReturn<ProductType, any>
  addProduct: (data: ProductType) => void
  editProduct: (data: ProductType) => void
  previewImageNew: (data: FileList, name: string) => void
}
const Product: React.FC<ProductProps> = ({
  dataForm,
  stateStore,
  addProduct,
  previewImageNew,
  editProduct
}) => {
  const tab = useSearchParams().get('tab')

  const handleSubmit = (data) => {
    if (stateStore.getValues('isEdit')) {
      editProduct(data)
    } else {
      addProduct(data)
    }
  }
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden p-2">
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((item) => (
              <li className="mr-2" key={item.key}>
                <Link
                  href={`/admin/products?tab=${item.key}`}
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
          <button
            type="button"
            className="w-fit inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            onClick={() => stateStore.setValue('isModal', true)}
          >
            <label className="hidden md:block"> Tạo sản phẩm</label>
            <label className="block md:hidden">
              <MdAddCircle size={20} />
            </label>
          </button>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        <div className="flex justify-center gap-5 items-start flex-wrap h-[440px]">
          <Controller
            name="products"
            control={stateStore.control}
            defaultValue={false}
            render={({ field }) => (
              <>
                {[...field.value].map((item) => (
                  <div
                    key={item?.imagesURL[0]}
                    className="w-[90%] min-w-[270px] md:max-w-[280px] md:w-[33.333%] lg:w-[25%] bg-white rounded-lg flex flex-col p-4 gap-2 shadow-lg h-full flex-1"
                  >
                    <div className="w-full h-[240px] relative overflow-hidden">
                      <Image
                        src={item.imagesURL[0] || 'https://www.freeiconspng.com/img/23494'}
                        unoptimized
                        width={10}
                        height={100}
                        alt=""
                        className="w-full max-h-[240px] object-contain md:object-cover"
                      />
                    </div>
                    <div className="flex items-start justify-between flex-1">
                      <p className="w-fit p-2 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                        {item.name}
                      </p>
                      <p className="w-fit p-2 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                        Thể loại: {catDetails[item.category]}
                      </p>
                    </div>

                    <div className="w-full text-white text-sm flex-1 flex items-start justify-between gap-2">
                      <p className="text-white bg-red-600 font-medium rounded-lg text-xs px-4 py-2">
                        Giá: {Number(item.price)?.toLocaleString()}
                      </p>
                      <div className="flex flex-1 flex-wrap justify-end gap-1">
                        <div className="flex flex-1 flex-wrap gap-1">
                          {colors.map(
                            (color) =>
                              item.colors?.includes(color) && (
                                <p
                                  key={color}
                                  className={clsx(`w-4 h-4 rounded-full border-2`, {
                                    'border-black': item.colors?.includes(color),
                                    'bg-[#025464]': color === '#025464',
                                    'bg-[#E57C23]': color === '#E57C23',
                                    'bg-[#F8F1F1]': color === '#F8F1F1',
                                    'bg-[#9CA777]': color === '#9CA777',
                                    'bg-[#7C9070]': color === '#7C9070',
                                    'bg-[#263A29]': color === '#263A29',
                                    'bg-[#000000]': color === '#000000',
                                    'bg-[#E96479]': color === '#E96479',
                                    'bg-[#B99B6B]': color === '#B99B6B',
                                    'bg-[#E4C988]': color === '#E4C988'
                                  })}
                                />
                              )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full text-white text-sm flex-1 flex items-start justify-between gap-2">
                      <div className="flex gap-1 flex-1 flex-wrap justify-start">
                        {[...item.sizes].map((item, index) => (
                          <p
                            key={item + index}
                            className={clsx(
                              'w-6 h-6 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-[9px]'
                            )}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
                      >
                        Xóa
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        onClick={() => {
                          const names: Array<keyof ProductType> = [
                            'id',
                            'name',
                            'imageName',
                            'sizes',
                            'price',
                            'colors',
                            'highlights',
                            'quantity',
                            'details',
                            'category'
                          ]
                          names.forEach((name) => {
                            dataForm.setValue(name, item[name])
                          })

                          item['imagesURL']?.map((url: string, index: number) => {
                            stateStore.setValue(`imagePreviews.${index + 1}`, url)
                          })

                          stateStore.setValue('isModal', true)
                          stateStore.setValue('isEdit', true)
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
      <Controller
        name="isModal"
        control={stateStore.control}
        defaultValue={false}
        render={({ field }) => (
          <Modal
            size="3xl"
            handleClose={() => {
              field.onChange(false)
              dataForm.reset()
              stateStore.resetField('fileImageNews')
              stateStore.resetField('imagePreviews.1')
              stateStore.resetField('imagePreviews.2')
              stateStore.resetField('imagePreviews.3')
              stateStore.resetField('imagePreviews.4')
              stateStore.resetField('isModal')
            }}
            isOpen={field.value}
            title="Tạo sản phẩm"
          >
            <form className="space-y-6 h-full" onSubmit={dataForm.handleSubmit(handleSubmit)}>
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 p-4 !min-h-[300px] relative ">
                  <label
                    htmlFor="dropzone-file-a"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                  >
                    <Controller
                      name="imagePreviews.1"
                      control={stateStore.control}
                      defaultValue={undefined}
                      render={({ field }) => {
                        return (
                          <div>
                            {field.value ? (
                              <Image
                                src={field.value || 'https://www.freeiconspng.com/img/23494'}
                                unoptimized
                                width={10}
                                height={100}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col p-4 items-center justify-center">
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
                                  <span className="font-semibold">Click to upload</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      }}
                    />

                    <input
                      id="dropzone-file-a"
                      type="file"
                      className="hidden"
                      onChange={(event) => previewImageNew(event.target.files, '1')}
                    />
                  </label>
                  <label
                    htmlFor="dropzone-file-b"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                  >
                    <Controller
                      name="imagePreviews.2"
                      control={stateStore.control}
                      defaultValue={undefined}
                      render={({ field }) => {
                        return (
                          <div>
                            {field.value ? (
                              <Image
                                src={field.value || 'https://www.freeiconspng.com/img/23494'}
                                unoptimized
                                width={10}
                                height={100}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col p-4 items-center justify-center">
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
                                  <span className="font-semibold">Click to upload</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      }}
                    />

                    <input
                      id="dropzone-file-b"
                      type="file"
                      className="hidden"
                      onChange={(event) => previewImageNew(event.target.files, '2')}
                    />
                  </label>
                  <label
                    htmlFor="dropzone-file-c"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                  >
                    <Controller
                      name="imagePreviews.3"
                      control={stateStore.control}
                      defaultValue={undefined}
                      render={({ field }) => {
                        return (
                          <div>
                            {field.value ? (
                              <Image
                                src={field.value || 'https://www.freeiconspng.com/img/23494'}
                                unoptimized
                                width={10}
                                height={100}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col p-4 items-center justify-center">
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
                                  <span className="font-semibold">Click to upload</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      }}
                    />

                    <input
                      id="dropzone-file-c"
                      type="file"
                      className="hidden"
                      onChange={(event) => previewImageNew(event.target.files, '3')}
                    />
                  </label>
                  <label
                    htmlFor="dropzone-file-d"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                  >
                    <Controller
                      name="imagePreviews.4"
                      control={stateStore.control}
                      defaultValue={undefined}
                      render={({ field }) => {
                        return (
                          <div>
                            {field.value ? (
                              <Image
                                src={field.value || 'https://www.freeiconspng.com/img/23494'}
                                unoptimized
                                width={10}
                                height={100}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col p-4 items-center justify-center">
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
                                  <span className="font-semibold">Click to upload</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      }}
                    />

                    <input
                      id="dropzone-file-d"
                      type="file"
                      className="hidden"
                      onChange={(event) => previewImageNew(event.target.files, '4')}
                    />
                  </label>
                </div>
                <div className="flex-[1.5] flex flex-col md:flex-row gap-2 items-start ">
                  <div className="flex flex-col flex-1  gap-2 w-full">
                    <div>
                      <Controller
                        name="name"
                        defaultValue=""
                        control={dataForm.control}
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
                        name="imageName"
                        defaultValue=""
                        control={dataForm.control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            title="Mã hình ảnh"
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

                      <Controller
                        name="sizes"
                        defaultValue={[]}
                        control={dataForm.control}
                        render={({ field: { value, onChange } }) => (
                          <div className="flex gap-1">
                            {sizes.map((item) => (
                              <p
                                key={item}
                                className={clsx(
                                  'w-7 h-7 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-xs',
                                  {
                                    'border-blue-500': value?.includes(item)
                                  }
                                )}
                                onClick={() => onChange(xor(value, [item]))}
                              >
                                {item}
                              </p>
                            ))}
                          </div>
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
                      <Controller
                        name="colors"
                        defaultValue={[]}
                        control={dataForm.control}
                        render={({ field: { value, onChange } }) => (
                          <div className="flex gap-1">
                            {colors.map((item) => (
                              <p
                                key={item}
                                className={clsx(`w-6 h-6 rounded-full border-2`, {
                                  'border-black': value?.includes(item),
                                  'bg-[#025464]': item === '#025464',
                                  'bg-[#E57C23]': item === '#E57C23',
                                  'bg-[#F8F1F1]': item === '#F8F1F1',
                                  'bg-[#9CA777]': item === '#9CA777',
                                  'bg-[#7C9070]': item === '#7C9070',
                                  'bg-[#263A29]': item === '#263A29',
                                  'bg-[#000000]': item === '#000000',
                                  'bg-[#E96479]': item === '#E96479',
                                  'bg-[#B99B6B]': item === '#B99B6B',
                                  'bg-[#E4C988]': item === '#E4C988'
                                })}
                                onClick={() => onChange(xor(value, [item]))}
                              />
                            ))}
                          </div>
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="price"
                        control={dataForm.control}
                        defaultValue={0}
                        render={({ field, fieldState }) => (
                          <TextField
                            title="Giá sản phẩm"
                            {...field}
                            type="number"
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="quantity"
                        defaultValue={0}
                        control={dataForm.control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="number"
                            title="Số lượng hàng"
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1 w-full">
                    <div>
                      <Controller
                        name="category"
                        control={dataForm.control}
                        defaultValue=""
                        render={({ field }) => (
                          <div>
                            <label
                              htmlFor="category"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Thuộc loại
                            </label>
                            <select
                              {...field}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="">Chọn loại</option>
                              <option value="AT">Áo Thun</option>
                              <option value="AC">Áo Croptop</option>
                              <option value="AK">Áo khoác</option>
                              <option value="QD">Quần Dài</option>
                              <option value="QN">Quần Short</option>
                            </select>
                          </div>
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="details"
                        control={dataForm.control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <TextAreaField
                            title="Chi tiết sản phẩm"
                            {...field}
                            rows={6}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="highlights"
                        control={dataForm.control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <TextAreaField
                            title="Nổi bật"
                            {...field}
                            rows={6}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-1">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                >
                  {!stateStore.getValues('isEdit') ? 'Tạo' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      />
    </div>
  )
}

export default Product
