'use client'
import { Stock } from '@/components/templates'
import { readAll, update } from '@/firebase/base'
import { db, storage } from '@/firebase/config'
import { StockType } from '@/types/stocks'
import { collection } from 'firebase/firestore'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'

const StockPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [refresh, setRefresh] = useState(false)
  const stateStore = useForm({
    defaultValues: {
      stocks: [],
      isEdit: false
    }
  })
  const editForm = useForm<StockType>()
  const editStock = (data: StockType) => {
    const { quantity, id } = data
    const stockRef = collection(db, 'stocks')
    update(stockRef, id, { quantity })
      .then(() => {
        enqueueSnackbar('Cập nhật kho thành công', { variant: 'success' })
        stateStore.reset()
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        enqueueSnackbar('Cập nhật kho thất bại', { variant: 'error' })
      })
  }
  useEffect(() => {
    const stockRef = collection(db, 'stocks')
    readAll(stockRef).then(async (res) => {
      const stocks = res.map(async (item) => {
        const imageRef = ref(
          storage,
          'products/' +
            item.imageName
              .trim()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLocaleLowerCase()
              .replace(/\s/g, '_')
        )
        const imageURL = await getDownloadURL(imageRef)

        return {
          id: item.id,
          quantity: item.quantity,
          imageURL
        }
      })
      stateStore.setValue('stocks', await Promise.all(stocks))
    })
  }, [refresh])

  const props = {
    stateStore,
    editForm,
    editStock
  }

  return <Stock {...props} />
}

export default StockPage
