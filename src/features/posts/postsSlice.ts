import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Post {
  id: number
  title: string
  body: string
  userId?: number
}

interface PostsState {
  items: Post[]
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
}

const BASE = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get<Post[]>(BASE + '?_limit=10')
  return res.data
})

export const addPost = createAsyncThunk('posts/addPost', async (payload: Omit<Post,'id'>) => {
  const res = await axios.post<Post>(BASE, payload)
  return res.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (payload: Post) => {
  const res = await axios.put<Post>(`${BASE}/${payload.id}`, payload)
  return res.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
  await axios.delete(`${BASE}/${id}`)
  return id
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true; state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false; state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message ?? 'Error'
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        // JSONPlaceholder returns id = 101 for new posts; push to list
        state.items.unshift(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.items.findIndex(p => p.id === action.payload.id)
        if (idx >= 0) state.items[idx] = action.payload
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})

export default postsSlice.reducer
