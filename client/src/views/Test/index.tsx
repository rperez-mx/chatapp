import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { IoMdSend } from "react-icons/io";
import { useUserState } from "../../hooks/useUserState";
import { socketSlice } from "../../app/features/Socket/socketSlice";
import { useParams } from "react-router-dom";
interface msg {
  from: string;
  message: string;
}
interface testResponse {
  chatID: string;
  m: {
    from: string;
    message: string;
  };
}
export default function Test(props: any) {
  let params = useParams();
  const { user } = useUserState();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<msg>>([]);
  const chatID = params.id;
  const lastMessageRef = useRef(null);
  useEffect(() => {
    props.socket.on("testResponse", (data: testResponse) => {
      console.log("Current chatID: " + chatID);
      if (chatID === data.chatID) {
        console.log("Correct chatroom");
        setMessages([...messages, data.m]);
      } else {
        console.log("Wrong chat xd");
      }
    });
  }, [props.socket, messages]);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    //@ts-ignore
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message == "") return alert("No puede estar vacio");
    let m: msg = {
      from: user.username,
      message: message,
    };
    props.socket.emit("testMessage", { chatID, m });
    setMessage("");
  };
  const saveChatId = () => {
    props.socket.emit("testConnect", { ChatId: chatID });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.code === "Enter"){
      handleSend()
    }
  }
  return (
    <React.Fragment>
      <Center w={"full"} h={"calc(90vh)"}>
        <Center
          bgColor={"gray.100"}
          w={"95%"}
          maxHeight={'calc(80vh)'}
          height={'calc(80vh)'}
          rounded={"xl"}
          padding={"5"}
          flexDir={"column"}
          justifyContent={"space-between"}
        >
          <Center
            flexDir={"column"}
            justifyContent={"space-between"}
            backgroundColor={"gray.200"}
            rounded={"xl"}
            w={"full"}
          >
            Current ID: {chatID}
          </Center>
          <Flex w={"full"} flexDir={"column"} gap={2}
          overflowY={'scroll'}>
            <Center gap={2} flexDir={"column"} overflowY={'scroll'}>
              {messages.map((m, index) => (
                <Center
                  w={"full"}
                  key={index}
                  justifyContent={user.username === m.from ? "right" : "left"}
                >
                  <Center
                    padding={"0.5em"}
                    justifyContent={user.username === m.from ? "right" : "left"}
                    minW={"5em"}
                    w={"fit-content"}
                    h={"fit-content"}
                    rounded={"md"}
                    bgColor={
                      user.username === m.from ? "facebook.200" : "dodgerblue"
                    }
                    // bgColor={'teal.200'}
                  >
                    <Flex flexDir={"column"}>
                      {user.username !== m.from ? <Flex fontSize={15} color={'messenger.100'}>{m.from}</Flex> : ""}
                      <Flex 
                       color={
                        user.username === m.from ? "facebook.400" : "messenger.800"
                      }>{m.message}</Flex>
                    </Flex>
                  </Center>
                </Center>
              ))}
              <div ref={lastMessageRef} />
            </Center>
            <InputGroup bgColor={"gray.200"} rounded={"xl"}>
              <Input
                placeholder="Message"
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleSend}>
                  <IoMdSend color="green.500" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Center>
      </Center>
    </React.Fragment>
  );
}
