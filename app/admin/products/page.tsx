'use client'
import { Product } from '@/components/templates'
import { addImage, create } from '@/firebase/base'
import { ProductType } from '@/types/product'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

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
    if (newImage) {
      // If a new image is selected, upload it to the storage
      const imageURL = await addImage(newImage, 'products/jacket')
      console.log(imageURL)
    }
    // Create or update the product data
    create('products', data)
      .then(() => {
        enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' })
      })
      .catch(() => {
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
