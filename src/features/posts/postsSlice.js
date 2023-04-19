import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {id: '1', title: 'First Post!', content: 'Hello', userId: '0', date: "2023-04-19T19:21:05.383Z", reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}},
  {id: '2', title: 'Second Post', content: 'More text', userId: '1', date: "2023-04-19T19:20:50.738Z", reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0} }
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
            userId: userId,
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
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
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer