'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
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
const Stock = () => {
  const tab = useSearchParams().get('tab')
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Modal handleClose={handleClose} isOpen={isOpen} title="Sửa tồn kho" size="md">
        <form className="space-y-6" action="#">
          <div className="w-full h-64">
            <Image
              src="https://bizweb.dktcdn.net/100/287/440/products/ao-khoac-local-brand-dep-nhieu-mau-form-rong-dep-5.jpg?v=1662543061970"
              unoptimized
              width={10}
              height={100}
              objectFit="cover"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Số lượng tồn kho
            </label>
            <input
              type="number"
              name="number"
              id="number"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
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
      </div>
      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="w-full bg-white rounded-lg h-72 flex flex-col p-4 gap-2 m-auto">
              <div className="w-full h-[85%]">
                <Image
                  src="https://bizweb.dktcdn.net/100/287/440/products/ao-khoac-local-brand-dep-nhieu-mau-form-rong-dep-5.jpg?v=1662543061970"
                  unoptimized
                  width={10}
                  height={100}
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full text-white text-sm flex-1 flex items-center justify-between">
                <p class="text-white bg-red-600 font-medium rounded-lg text-xs px-4 py-2.5">Số lượng: 100</p>
                <button
                  type="button"
                  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
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
