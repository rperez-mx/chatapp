import { Center, Flex, Show, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { contact, setContacts } from "../../app/features/Contacts/contactSlice";
import ChatList from "../../components/ChatList";
import Header from "../../components/Header";
import MobileHeader from "../../components/MobileHeader";
import Sidebar from "../../components/Sidebar";
import { getContacts } from "../../helpers/Contacts";
import { useUserState } from "../../hooks/useUserState";
const MobileHome = () => {
  return (
    <React.Fragment>
      <Center
      userSelect={'none'}
        w={"calc(100vw)"}
        h={"calc(100vh)"}
        paddingX={{base: '0', lg: "10em"}}
        paddingY={{base: '0', lg: "1em"}}
        rounded={"lg"}
        boxShadow={"lg"}
        // backgroundColor={"azure"}
        backgroundColor={useColorModeValue("azure",'gray.800')}
        zIndex={"1"}
        flexDir={'column'}
        justifyContent={'start'}
      >
      <Center>
        {/* Header */}
        <MobileHeader />
      </Center>
      <Center flexDir={'column'}>
        {/* Chat List */}
        <ChatList />
        {/* <Outlet /> */}
      </Center>
      </Center>
    </React.Fragment>
  )
};
const DesktopHome = () => {
  return (
    <React.Fragment>
      <Center
        w={"calc(100vw)"}
        h={"calc(15.75vh)"}
        paddingX={"10em"}
        paddingY={"1.25em"}
        boxShadow={"xl"}
        backgroundColor={useColorModeValue("cyan.700",'gray.900')}
        // bg: useColorModeValue('gray.200', 'gray.700')
        position={"absolute"}
        zIndex={"0"}
      ></Center>
      <Center
        w={"calc(100vw)"}
        h={"calc(100vh)"}
        paddingX={"10em"}
        paddingY={"1em"}
        rounded={"lg"}
        boxShadow={"lg"}
        // backgroundColor={"azure"}
        backgroundColor={useColorModeValue("azure",'gray.900')}
        zIndex={"5"}
      >
        <Center
          w={"full"}
          h={"full"}
          rounded={"lg"}
          backgroundColor={useColorModeValue("gray.100",'gray.700')}
          zIndex={"5"}
        >
          <Center w={"full"} h={"full"} rounded={"lg"}>
            <Center
              flex={"3"}
              h={"full"}
              background={"white"}
              roundedLeft={"lg"}
              boxShadow={"lg"}
              flexDir={'column'}
              backgroundColor={useColorModeValue("gray.100",'gray.900')}
              justifyContent={'start'}
            >
              {/* Sidebar */}
              <Sidebar  />
            </Center>
            <Center
              flex={"7"}
              h={"full"}
              backgroundColor={useColorModeValue("gray.100",'gray.800')}
              roundedRight={"lg"}
              boxShadow={"lg"}
            >
              {/* Chat goes here */}
              <Outlet />
            </Center>
          </Center>
        </Center>
      </Center>
    </React.Fragment>
  );
};
export default function Home() {
  const [contacts, setContactsHome] = useState<Array<contact>>([])
  const { user, dispatch } = useUserState()
  const fetchContacts = async() => {
    setContactsHome(await getContacts(user.uid))
  }
  useEffect(()=>{
    fetchContacts()
  },[])
  useEffect(()=>{
    dispatch(setContacts(contacts))
  },[contacts])
  return (
    <React.Fragment>
      <Show below="lg">
        <MobileHome />
      </Show>
      <Show above="lg">
        <DesktopHome />
      </Show>
      <Outlet />
    </React.Fragment>
  );
}
