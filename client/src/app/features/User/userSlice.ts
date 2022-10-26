import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface user {
  uid: string,
  username: string,
  displayName: string,
  state: string,
  profilePicture: string,
  online: boolean,
  completed: boolean
}

export interface profile {
  uid: string,
  displayName: string,
  state: string,
  profilePicture: string,
}

interface UserState {
  user: user,
  online: boolean
  profile: profile
}
const initialState : UserState = {
  user: {} as user,
  online: false,
  profile: {} as profile
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state , action: PayloadAction<user>) => {
      state.user = action.payload
      localStorage.setItem('user',JSON.stringify(action.payload))
    },
    setProfile : (state, action: PayloadAction<profile>) => {
      state.profile = action.payload
      localStorage.setItem('profile', JSON.stringify(action.payload))
    },
    setCompletedUser : (state) => {
      state.user.completed = true
    }
  },
  extraReducers: ( builder ) => {

  }
})
export const { setUser, setProfile, setCompletedUser } = userSlice.actions
export default userSlice.reducer