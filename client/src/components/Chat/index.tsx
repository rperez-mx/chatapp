import {
  Avatar,
  Center,
  Flex,
  IconButton,
  Show,
  useColorModeValue,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useContactState } from "../../hooks/useContactState";
import {
  contact,
  setCurrentContact,
} from "../../app/features/Contacts/contactSlice";
import { IoArrowBack } from "react-icons/io5";
import { useUserState } from "../../hooks/useUserState";
import { addChat, chat, checkChat, getChatId, message } from "../../helpers/Chat/index";
import ChatInput from "../ChatIput";
import { Socket } from "socket.io-client";
import Message from "../Message";
import { useChatState } from "../../hooks/useChatState";
import { removeChatId, setChatId } from "../../app/features/Chat/chatSlice";
interface MobileChatProps {
  contact: contact;
  socket: Socket;
  chat: chat;
  chatId: string;
  messages: Array<message>;
}
const DesktopChat = (props: MobileChatProps) => {
  const { currentContact } = useContactState()
  const { chatId, dispatch } = useChatState()
  const [messages, setMessages] = useState<Array<message>>([])
  console.log('Init chatID: '+chatId)
  useEffect(()=>{
    props.socket.emit('chatConnect', chatId)
    return () => {
      dispatch(setChatId(''))
      setMessages([])
    }
  },[])
  useEffect(() => {
    props.socket.on('fetchMessages', (data : any) => {
      if (chatId == data.chatId) {
      setMessages(data.messages)
      }
    })
    props.socket.on("messageResponse", (data: any) => {
      if (props.chatId == data.chatId) {
        // console.log("received : " + JSON.stringify(data.message));
        let ms = [...messages, data.message]
        setMessages(ms)
      }
    });
  }, [props.socket, props.messages]);
  return (
    <React.Fragment>
      {props.messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
       <ChatInput chatId={props.chatId} chat={props.chat} socket={props.socket} />
      {/* <Show above={'sm'}>
       </Show> */}
    </React.Fragment>
  );
};
const MobileChat = (props: MobileChatProps) => {
  const { currentContact } = useContactState()
  const { chatId, dispatch } = useChatState()
  const [messages, setMessages] = useState<Array<message>>([])
  console.log('Init chatID: '+chatId)
  useEffect(()=>{
    props.socket.emit('chatConnect', chatId)
    return () => {
      dispatch(setChatId(''))
    }
  },[])
  useEffect(() => {
    props.socket.on('fetchMessages', (data : any) => {
      if (chatId == data.chatId) {
      setMessages(data.messages)
      }
    })
    props.socket.on("messageResponse", (data: any) => {
      if (props.chatId == data.chatId) {
        // console.log("received : " + JSON.stringify(data.message));
        let ms = [...messages, data.message]
        setMessages(ms)
      }
    });
     //@ts-ignore
     lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.socket, props.messages]);
  const lastMessageRef = useRef(null);
  return (
    <React.Fragment>
      <Center
        w={"calc(100vw)"}
        h={"calc(100vh)"}
        flexDir={"column"}
        justifyContent={"start"}
      >
        <Center
          // bgColor={'tomato'}
          position={'fixed'}
          backgroundColor={useColorModeValue("black", "gray.900")}
          w={"full"}
          paddingX={5}
          paddingY={2}
          gap={4}
          boxShadow={"lg"}
        >
          <Center h={"full"}flex={1}>
            <IconButton
              colorScheme="gray"
              aria-label="Search database"
              variant={"ghost"}
              rounded={"full"}
              icon={<IoArrowBack />}
              onClick={() => {
                history.back();
              }}
            />
            <Avatar size={"lg"} src={currentContact.profilePicture} />
          </Center>
          <Flex flex={6} flexDir={"column"} justifyContent={"start"}>
            <Flex fontSize={17} fontWeight={"medium"}>
              {currentContact.displayName}
            </Flex>
            <Flex fontSize={14} fontStyle={"italic"}>
              {currentContact.online ? "En linea" : currentContact.state}
              {/* {currentContact.state} */}
            </Flex>
          </Flex>
        </Center>
        <Center
          w={"full"}
          // bgColor={'tomato'}
          minH={'calc(93vh)'}
          gap={'2'}
          flexDir={"column"}
          justifyContent={"end"}
          overflowY={'visible'}
          overscrollY={'contain'}
        >
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </Center>
        <Center w={'full'}>
          <ChatInput chatId={props.chatId} chat={props.chat} socket={props.socket} />
        </Center>
      </Center>
    </React.Fragment>
  );
};
interface ChatContentProps {
  socket: Socket;
}
export default function Chat(props: ChatContentProps) {
  const socket = props.socket;
  let contact: contact = {} as contact;
  const { contacts, currentContact } = useContactState();
  const { chatId, dispatch } = useChatState()
  const { user } = useUserState();
  const [chat, setChat] = useState<chat>({} as chat);
  const [messages, setMessages] = useState<Array<message>>([]);
  let params = useParams();
  const id = params.chatID;
  let newChat : chat = {} as chat
  if(id!==undefined){
      newChat.members= [user.username, id],
      newChat.messages = []
    }
  const loadUp = async(chat : chat) => {
    await checkChatData(chat)
  }
  const checkChatData = async(chat : chat)=> {
    let { val , chatId } = await checkChat(chat)
   if(val){
    console.log('Nice')
    dispatch(setChatId(chatId))
   } else {
    dispatch(setChatId(await addChat(chat)))
   }
  }
  const fetchChatId = async(chat : chat) => {
    dispatch(setChatId( await getChatId(chat)))
  }
  useEffect(()=>{
    let contact : contact = {} as contact
    contacts.forEach((c)=>{
      if(c.username===id){
        contact = c
      }
    })
    console.log('Chat component mounted')
    
      fetchChatId(newChat)
    console.log("Let's check chat...")
    loadUp(newChat)
  
  dispatch(setCurrentContact(contact))
    return () => {
      console.log('Chat component unmounted')
    }
  },[])
  useEffect(() => {
    props.socket.on("messageResponse", (data: any) => {
      if (chatId == data.chatId) {
        setMessages([...messages, data.message]);
      }
    });
  }, [props.socket, messages]);

  // const connectToChat = async (id: string) => {
  //   console.log("Connect to chat");
  //   if (id !== undefined) {
  //     const chat: chat = {
  //       members: [user, currentContact],
  //       messages: [],
  //     };
  //     setChat(chat);
  //     const cID: string = await getChatID(chat);
  //     setCId(cID);
  //     connectToRoom(cID);
  //   }
  // };

  if(chatId==''){
    if(id!==undefined){
      let newChat : chat = {
        members: [user.username, id],
        messages : []
      }
      fetchChatId(newChat)
    }
  }
  if(chatId==='') return (<Text>Loading</Text>)
  return (
    <React.Fragment>
      <Show below="sm">
        <MobileChat
          messages={messages}
          chatId={chatId}
          chat={chat}
          socket={socket}
          contact={contact}
        />
      </Show>
      <Show above='lg'>
        <DesktopChat
          messages={messages}
          chatId={chatId}
          chat={chat}
          socket={props.socket}
          contact={contact}
        />
      </Show>
    </React.Fragment>
  );
}
