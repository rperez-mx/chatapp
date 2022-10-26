import io , { Socket } from 'socket.io-client'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import { useUserState } from './hooks/useUserState'
import { useEffect } from 'react'
import ProfileSetup from './views/ProfileSetup'
import { setProfile, setUser } from './app/features/User/userSlice'
import { getUser } from './helpers/User'
import Test from './views/Test'
import Chat from './components/Chat'

function App(props : any) {
  const {user, dispatch} = useUserState()
  const fetchProfile = async(uid: string) => {
    dispatch(setUser(await getUser(uid)))
  }
 
  useEffect(()=>{
    if(Object.keys(user).length===0){
      if(localStorage.getItem('user')!=undefined){
        //@ts-ignore
        let u : typeof user = JSON.parse(localStorage.getItem('user'))
        
        dispatch(setUser(u))
        fetchProfile(u.uid)
        props.socket.emit('user-connection', {uid: u.uid, name: u.username})
      }
    } else {
      fetchProfile(user.uid)
    }
    return () => {
      
    }
  },[])
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path={'/:id'} element={Object.keys(user).length!=0 ? user.completed ? <Test socket={props.socket} /> : <ProfileSetup /> : <Login />} /> */}
      <Route path={'/'} element={Object.keys(user).length!=0 ? user.completed ? <Home /> : <ProfileSetup /> : <Login />} >
      <Route path={'/:chatID'} element={<Chat socket={props.socket} />}/>
        </Route>
  <Route path={'/chat/:chatID'} element={<Chat socket={props.socket} />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App