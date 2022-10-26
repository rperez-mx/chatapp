import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/Chat/chatSlice";
import contactSlice from "./features/Contacts/contactSlice";
import userSlice from "./features/User/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    contacts: contactSlice,
    chats: chatSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch