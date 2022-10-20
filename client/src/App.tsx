import './App.css'
import io , { Socket } from 'socket.io-client'
function App() {
let socket : Socket
socket = io(`http://${window.location.hostname}:4000`)
  return (
    <div className="App">
      ChatApp
    </div>
  )
}

export default App
