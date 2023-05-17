'use client'
import { Product } from '@/components/templates'
import { addImage, create } from '@/firebase/base'
import { db } from '@/firebase/config'
import { ProductType } from '@/types/product'
import { collection } from 'firebase/firestore'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

const ProductPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const stateStore = useForm({
    defaultValues: {
      isEdit: false,
      isNew: false,
      imageNewPreview: null,
      fileImageNew: null
    }
  })
  const createFrom = useForm<ProductType>()
  const editForm = useForm<ProductType>()

  const addProduct = async (data: ProductType) => {
    const newImage = stateStore.getValues('fileImageNew')
    // Create or update the product data
    if (!newImage) {
      enqueueSnackbar('Hãy chọn ảnh sản phẩm', { variant: 'error' })
      return
    }

    const productsRef = collection(db, 'products')
    await create(productsRef, data)
      .then(async () => {
        enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' })
        if (newImage) {
          // If a new image is selected, upload it to the storage
          await addImage(
            newImage,
            'products/' +
              data.name
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLocaleLowerCase()
                .replace(/\s/g, '_')
          )
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
  const props = {
    stateStore,
    createFrom,
    editForm,
    addProduct,
    previewImageNew
  }
  return <Product {...props} />
}

export default ProductPage
