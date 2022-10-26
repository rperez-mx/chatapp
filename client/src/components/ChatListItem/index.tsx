import { Avatar, Center, Flex, Show, useColorModeValue} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { contact } from '../../app/features/Contacts/contactSlice'
import { getUsername } from '../../helpers/User'
const MobileListItem = (props : any) => {
  // console.log("🚀 ~ file: index.tsx ~ line 7 ~ MobileListItem ~ props", props)
  let username = getUsername(props.uid)
  return(
    <React.Fragment>
      <Center
      as={Link}
      to={'/chat/'+props.username}
      w={'calc(100vw)'}
      h={'6em'}
      padding={3}
      gap={5}
      flexDir={'row'}
      key={props.uid}
      borderBottomWidth={'1px'}
      borderBottomColor={useColorModeValue('blackAlpha.300','whiteAlpha.300')}
      borderBottomRadius={'md'}
      >
      <Center 
      h={'full'}
      flex={1}
      >
       <Avatar size={"lg"} src={props.profilePicture} />
      </Center>
      <Flex flex={6} flexDir={'column'} justifyContent={'start'}>
        <Flex 
        fontSize={17}
        fontWeight={'medium'}
        >
        {props.displayName}
        </Flex>
        <Flex
        fontSize={14}
        fontStyle={'italic'}
        >
        {props.state}
        </Flex>
          </Flex>
      </Center>
    </React.Fragment>
  )
}
const DesktopListItem = (props: contact) => {
  return(
    <React.Fragment>
      <Center
      as={Link}
      to={props.username}
      w={'full'}
      h={'4em'}
      padding={3}
      flexDir={'row'}
      gap={5}
      key={props.uid}
      borderBottomWidth={'1px'}
      borderBottomColor={useColorModeValue('blackAlpha.300','whiteAlpha.300')}
      borderBottomRadius={'md'}
      >
        <Center flex={1} justifyContent={'start'}>
        <Avatar size={"md"} src={props.profilePicture} />
          </Center>
        <Flex flex={6} flexDir={'column'} justifyContent={'start'}>
        <Flex 
        fontSize={17}
        fontWeight={'medium'}
        >
        {props.displayName}
        </Flex>
        <Flex
        fontSize={14}
        fontStyle={'italic'}
        >
        {props.state}
        </Flex>
          </Flex>
      </Center>
      </React.Fragment>
  )
}
export default function ChatListItem(props : contact) {
  return (
    <React.Fragment>
      <Show below="sm">
        <MobileListItem {...props} />
      </Show>
      <Show above="lg">
        <DesktopListItem {...props}/>
      </Show>
    </React.Fragment>
  )
}
