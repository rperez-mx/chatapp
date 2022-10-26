import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { io, Socket } from 'socket.io-client'

export interface socket {
  socket : Socket
}

interface socketState {
  socket: socket 
}

const initialState : socket = {
  socket :  io(`http://${window.location.hostname}:4000`)
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

  }
})

export default socketSlice.reducer