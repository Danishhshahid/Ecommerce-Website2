// productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from '@/app/utils/mock'
import { Product } from '@/app/utils/type'

interface ProductState {
  products: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null
}

export const getProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    try {
      const products = await fetchProducts()
      return products
    } catch (error) {
      throw error
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
        state.error = null
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch products'
      })
  },
})

export default productSlice.reducer