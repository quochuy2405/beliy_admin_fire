'use client'
import { Product } from '@/components/templates'
import { addImage, create, readAll } from '@/firebase/base'
import { db, storage } from '@/firebase/config'
import { ProductType } from '@/types/product'
import { collection } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ProductPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [refresh, setRefresh] = useState(false)
  const stateStore = useForm({
    defaultValues: {
      products: [],
      isEdit: false,
      isNew: false,
      imageNewPreview: null,
      fileImageNew: null
    }
  })
  const editForm = useForm<ProductType>()
  const createForm = useForm<ProductType>()

  const addProduct = async (data: ProductType) => {
    const newImage = stateStore.getValues('fileImageNew')
    // Create or update the product data
    if (!newImage) {
      enqueueSnackbar('Hãy chọn ảnh sản phẩm', { variant: 'error' })
      return
    }
    const imageRef = ref(
      storage,
      'products/' +
        data.imageName
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
          .replace(/\s/g, '_')
    )

    const image = await getDownloadURL(imageRef).catch((error) => console.log(error))
    if (image) {
      enqueueSnackbar('Mã hình ảnh đã tồn tại', { variant: 'error' })
      return
    }

    const productsRef = collection(db, 'products')

    await create(productsRef, data)
      .then(async () => {
        if (newImage) {
          // If a new image is selected, upload it to the storage
          await addImage(
            newImage,
            'products/' +
              data.imageName
                .trim()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLocaleLowerCase()
                .replace(/\s/g, '_')
          )
          enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' })
          createForm.reset()
          stateStore.resetField('imageNewPreview')

          const stocksRef = collection(db, 'stocks')
          await create(stocksRef, {
            category: data.category,
            quantity: 1,
            imageName: data.imageName
          })

          setRefresh((cur) => !cur)
        }
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar('Thêm sản phẩm lỗi', { variant: 'error' })
      })
  }

  const previewImageNew = (files: FileList) => {
    const file = files[0]
    if (file) {
      stateStore.setValue('fileImageNew', file)
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        stateStore.setValue('imageNewPreview', reader.result)
      })
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const productRef = collection(db, 'products')
    readAll(productRef).then(async (res) => {
      const products = res.map(async (item) => {
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
        console.log(imageURL, item.imageName)
        return {
          ...item,
          imageURL
        }
      })
      stateStore.setValue('products', await Promise.all(products))
    })
  }, [refresh])

  const props = {
    stateStore,
    createForm,
    editForm,
    addProduct,
    previewImageNew
  }
  return <Product {...props} />
}

export default ProductPage
