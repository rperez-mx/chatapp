import React from 'react'
import {
  Avatar,
  Button,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiMessageAltDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useUserState } from '../../hooks/useUserState';
export default function MobileHeader() {
  const { user } = useUserState()
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <React.Fragment>
      <Center
      w={'calc(100vw)'}
      h={'7em'}
      backgroundColor={useColorModeValue("gray.100",'gray.700')}
      flexDir={'row'}
      padding={5}
      gap={5}
      userSelect={'none'}
      >
       <Center flex={8} justifyContent={'start'} fontSize={20} as={'span'} >
       {import.meta.env.VITE_APP_TITLE}
        </Center>
       <Center flex={1} gap={2}>
       <Avatar size={"sm"} src={user.profilePicture} />
       {user.displayName}
        </Center>
        <Center>
          <Button onClick={toggleColorMode} variant={"ghost"}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
          </Center>
       <Center flex={1}>
       <Menu placement={'bottom-end'}>
              <MenuButton as={IconButton} variant={"ghost"} rounded={'full'} icon={<BiDotsVerticalRounded />}>
                
              </MenuButton>
              <MenuList  >
                <MenuItem>Nuevo chat</MenuItem>
                <MenuItem>Configuraci&oacute;n</MenuItem>
                <MenuDivider />
                <MenuItem>Cerrar Sesi&oacute;n</MenuItem>
              </MenuList>
            </Menu>
        </Center>
      </Center>
      </React.Fragment>
  )
}
