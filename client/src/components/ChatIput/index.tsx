import { Button, Center, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { Socket } from 'socket.io-client'
import { setChatId } from '../../app/features/Chat/chatSlice'
import { chat, message } from '../../helpers/Chat'
import { useChatState } from '../../hooks/useChatState'
import { useContactState } from '../../hooks/useContactState'
import { useUserState } from '../../hooks/useUserState'
interface ChatInputProps {
  chat : chat,
  socket : Socket,
  chatId: string
}
export default function ChatInput(props : ChatInputProps) {
  const { dispatch, chatId } = useChatState()
  // console.log("🚀 ~ file: index.tsx ~ line 7 ~ ChatInput ~ props", props)
  const socket : Socket = props.socket
  const [text, setText] = useState<string>('')
  const { user } = useUserState()
  const { currentContact } = useContactState()
 
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handleSend = () => {
    let m : message = {} as message
    dispatch(setChatId(props.chatId))
    m.from = user.displayName
    m.to = currentContact.displayName
    m.message = text
    m.seen = false
    m.date = ''
    m.time = ''
    props.socket.emit('message', {chatId: chatId, message: m})
  }
  return (
    <React.Fragment>
      <Center
      w={'full'}
      padding={'2'}
      >
      <InputGroup>
    <Input placeholder='Mensaje' onChange={handleTextChange} autoFocus/>
    <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleSend}>
    <IoMdSend color='green.500' />
        </Button>
      </InputRightElement>
  </InputGroup>
      </Center>
      </React.Fragment>
  )
}
