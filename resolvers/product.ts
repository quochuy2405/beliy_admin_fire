import * as yup from 'yup'
export const schema = yup.object().shape({
  name: yup.string().required('Không được để trống'),
  imageName: yup
    .string()
    .required('Không được để trống')
    .test('imageName', 'Không được có khoảng trắng', (value) => {
      if (/\s/.test(value)) return false
      return true
    }),
  sizes: yup.array().test('sizes', 'Hãy chọn size', (value) => {
    if (!value.length) return false
    return true
  }),
  price: yup.number().test('quantity', 'Nhập giá sản phẩm', (value) => {
    if (!value) return false
    return true
  }),
  quantity: yup.number().test('quantity', 'Nhập số lượng', (value) => {
    if (!value) return false
    return true
  }),
  descriptions: yup.string().required('Không được để trống'),
  category: yup.string().required('Không được để trống')
})