export type StockType = {
  quantity: number
  category: string
  imageName: string
  imageURL?: string
  id?: string
}

export type StockCreateType = { code: string; name: string }
