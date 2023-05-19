'use client'
import { Stock } from '@/components/templates'
import { create, read, readAll, update } from '@/firebase/base'
import { db, storage } from '@/firebase/config'
import { StockCreateType, StockType } from '@/types/stocks'
import { collection } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const StockPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [refresh, setRefresh] = useState(false)
  const stateStore = useForm({
    defaultValues: {
      isEdit: false,
      isNew: false,
      stocks: [],
      stockOpt: [],
      initStock: [],
      stockCurrent: ''
    }
  })

  const editForm = useForm<StockType>()
  const createForm = useForm<StockCreateType>()

  const addStock = async (data: StockCreateType) => {
    const stocksRef = collection(db, 'stocks')
    const initStock = {
      ...data,
      products: []
    }
    await create(stocksRef, initStock)
      .then(() => {
        enqueueSnackbar('Tạo kho thành công', { variant: 'success' })
        stateStore.reset()
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        enqueueSnackbar('Tạo kho thất bại', { variant: 'error' })
      })
  }
  const editStock = async (data: StockType) => {
    const { quantity, imageName } = data
    const stockRef = collection(db, 'stocks')
    const id = stateStore.getValues('stockCurrent')
    read('stocks', id).then((stock) => {
      const products = [...(stock?.products || [])]
      const existProduct = products.findIndex((item) => item.imageName === imageName)
      if (existProduct !== -1) {
        products[existProduct]['quantity'] = quantity
      } else {
        const product = { imageName, quantity }
        products.push(product)
      }
      update(stockRef, id, { products })
        .then(() => {
          enqueueSnackbar('Cập nhật kho thành công', { variant: 'success' })
          getStockOpts()
          stateStore.resetField('isEdit')
          stateStore.resetField('stocks')
          setRefresh((cur) => !cur)
        })
        .catch(() => {
          enqueueSnackbar('Cập nhật kho thất bại', { variant: 'error' })
        })
    })
  }
  const getStockOpts = () => {
    const stockRef = collection(db, 'stocks')
    readAll(stockRef).then(async (res) => {
      const stockOpt = res?.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
      stateStore.setValue('stockOpt', stockOpt)
    })
  }
  useEffect(() => {
    getStockOpts()
  }, [])

  useEffect(() => {
    ;(async () => {
      const initStockRef = collection(db, 'initStock')
      await readAll(initStockRef).then(async (res) => {
        const stocks = res.map(async (item) => {
          let imageURL = ''
          try {
            const imageRef = ref(
              storage,
              'products/' +
                item.imageName
                  .trim()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toLocaleLowerCase()
                  .replace(/\s/g, '_') +
                '/1'
            )
            imageURL = await getDownloadURL(imageRef)
          } catch (error) {}

          return {
            id: item.id,
            quantity: item.quantity,
            imageURL,
            imageName: item.imageName
          }
        })
        stateStore.setValue('stocks', await Promise.all(stocks))
        stateStore.setValue('initStock', await Promise.all(stocks))
      })
      const id = stateStore.getValues('stockCurrent')
      if (id) await onChangeSelect(id)
    })()
  }, [refresh])

  const onChangeSelect = async (id: string) => {
    await read('stocks', id).then((stock) => {
      const products = [...(stock?.products || [])]
      const stocks = stateStore.getValues('initStock')
      if (stocks) {
        const updateStock = stocks.map((item) => {
          const product = products.find((pro) => pro.imageName === item.imageName)
          if (product) {
            return {
              ...item,
              quantity: Number(product.quantity)
            }
          }
          return item
        })

        stateStore.setValue('stocks', updateStock)
      }
    })
  }

  const props = {
    stateStore,
    editForm,
    createForm,
    editStock,
    addStock,
    onChangeSelect
  }

  return <Stock {...props} />
}

export default StockPage
