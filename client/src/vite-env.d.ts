/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_Firebase_apiKey : string
  readonly VITE_Firebase_authDomain : string
  readonly VITE_Firebase_projectId : string
  readonly VITE_Firebase_storageBucket : string
  readonly VITE_Firebase_messagingSenderId : string
  readonly VITE_Firebase_appId : string
  readonly VITE_Firebase_measurementId : string
  readonly VITE_Socketio_Endpoint : string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}