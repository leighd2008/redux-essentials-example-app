import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {id: '1', title: 'First Post!', content: 'Hello', userId: '0', date: "2023-04-19T19:21:05.383Z"},
  {id: '2', title: 'Second Post', content: 'More text', userId: '1', date: "2023-04-19T19:20:50.738Z" }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId: userId
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content, userId } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.userId = userId
      }
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer