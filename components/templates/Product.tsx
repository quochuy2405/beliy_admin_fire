'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Modal } from '../moleculers'
import { useState } from 'react'
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
const Stock = () => {
  const tab = useSearchParams().get('tab')
  const [isOpen, setIsOpen] = useState(false)
  const [isAddNew, setIsAddNew] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleCloseAdd = () => {
    setIsAddNew(false)
  }
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Modal handleClose={handleClose} isOpen={isOpen} title="Sửa sản phẩm">
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
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden">
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((item) => (
              <li className="mr-2" key={item.key}>
                <Link
                  href={`/admin/stock?tab=${item.key}`}
                  className={clsx('inline-block p-4  rounded-t-l', {
                    'active text-blue-600 border-b-2 border-blue-600': tab === item.key || (!tab && item.key === 'all')
                  })}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 pr-4 h-full flex justify-end items-center">
          <Modal handleClose={handleCloseAdd} isOpen={isAddNew} title="Tạo sản phẩm">
            <form className="space-y-6" action="#">
              <div className="flex">
                <div className="w-1/2 h-64">
                  <Image
                    src="https://bizweb.dktcdn.net/100/287/440/products/ao-khoac-local-brand-dep-nhieu-mau-form-rong-dep-5.jpg?v=1662543061970"
                    unoptimized
                    width={10}
                    height={100}
                    objectFit="cover"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                >
                  Tạo
                </button>
              </div>
            </form>
          </Modal>

          <button
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            onClick={() => setIsAddNew(true)}
          >
            Tạo sản phẩm
          </button>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
            <div key={item} className="w-full bg-white rounded-lg h-82 flex flex-col p-4 gap-2 m-auto">
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
                <p className="text-white bg-red-600 font-medium rounded-lg text-xs px-4 py-2">Giá: 400.000</p>
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
                  onClick={() => setIsOpen(true)}
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

export default Stock
