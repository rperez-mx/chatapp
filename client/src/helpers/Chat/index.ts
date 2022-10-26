import { app } from "../../app/firebase/config"
import {
  getFirestore,
  collection,
  getDocs,
  query,
  addDoc,
} from "firebase/firestore";
const db = getFirestore(app);
 export interface chat {
    members: Array<string>,
    messages: Array<message>
  }
  export interface message {
    from : string,
    to: string,
    message: string,
    date: string,
    time: string,
    seen: boolean
  }
  const checkChat = async (chat : chat) => {
    let chatId : string = ''
    let val : boolean  = false
    const q = query(collection(db,"chats"))
    const querySnapshot = await getDocs(q)
    if(querySnapshot.empty){
      await addChat(chat)
      val = true
    } else {
    querySnapshot.docs.forEach((doc)=>{
      let dbChat : chat = doc.data() as chat
      if(dbChat.members.includes(chat.members[0])){
        if(dbChat.members.includes(chat.members[1])){
          val = true
          chatId = doc.id
        } else {
        }
      }
    })
  }
  return {val: val, chatId: chatId}
  }

  const addChat = async(chat : chat) => {
    const docRef = await addDoc(collection(db, "chats"), chat);
    return docRef.id
  }
  const getChatId = async(chat : chat) => {
    let chatId : string = ''
    const q = query(collection(db,"chats"))
    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach((doc)=>{
      let dbMembers = doc.data().members
      if(dbMembers.includes(chat.members[0])){
        if(dbMembers.includes(chat.members[1])){
          chatId = doc.id
        }
      }
    }
    )
    
    return chatId
  }

export { checkChat, addChat, getChatId }