import React from 'react'
import { Center, Show, Text, useColorModeValue } from '@chakra-ui/react'
import { useContactState } from '../../hooks/useContactState'
import { contact } from '../../app/features/Contacts/contactSlice'
import ChatListItem from '../ChatListItem'

export default function ChatList() {  
  const { contacts } = useContactState()
  return (
    <React.Fragment>
      <Center w={'full'} flexDir={'column'} >
      {contacts.map((contact: contact, index: number)=>(
        <ChatListItem {...contact} key={index}  />
        ))}
        </Center>
      </React.Fragment>
  )
}
