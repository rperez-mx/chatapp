import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface contact {
  uid: string,
  username: string,
  displayName: string,
  state: string,
  profilePicture: string,
  online: boolean,
  completed: boolean
}

interface ContactState {
  contacts: Array<contact>,
  currentContact : contact
}
const initialState : ContactState = {
  contacts: [],
  currentContact : {} as contact
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Array<contact>>) => {
      state.contacts = action.payload
    },
    setCurrentContact: (state, action: PayloadAction<contact>) => {
      state.currentContact = action.payload
    }
  }, 
  extraReducers: (builder) => {

  }
})
export const { setContacts, setCurrentContact } = contactSlice.actions
export default contactSlice.reducer