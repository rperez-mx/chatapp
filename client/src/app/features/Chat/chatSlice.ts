import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface chatState {
  chatId : string
}
const initialState : chatState = {
  chatId : ''
}
export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setChatId : (state, action: PayloadAction<string>) => {
      state.chatId = action.payload
    },
    removeChatId : (state) => {
      state.chatId = ''
    }
  },
  extraReducers: (builder) => {

  }
})
export const { setChatId, removeChatId } = chatSlice.actions
export default chatSlice.reducer