import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import io , { Socket } from 'socket.io-client'
let socket : Socket
socket = io('https://stark-brushlands-89851.herokuapp.com')

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* @ts-ignore */}
    <ChakraProvider>
      <App socket={socket}/>
    </ChakraProvider>
  </Provider>
  //  </React.StrictMode>
);


