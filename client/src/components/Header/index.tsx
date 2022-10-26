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
import React from "react";
import { useUserState } from "../../hooks/useUserState";
import { BiDotsVerticalRounded, BiMessageAltDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
export default function Header() {
  const { user } = useUserState();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <React.Fragment>
      <Center
        roundedTopLeft={"lg"}
        h={"14vh"}
        w={"full"}
        flexDir={"column"}
        // background={"gray.100"}
        // backgroundColor={useColorModeValue("gray.100",'gray.700')}
        // bgGradient='linear(to-r, green.200, pink.500)'
        bgGradient={useColorModeValue('linear(to-r, gray.100, gray.100)','linear(to-b, gray.700, gray.900)')}
        padding={"1.5"}
      >
        <Center flexDir={"row"} w={"full"} h={"6vh"}
        backgroundColor={useColorModeValue("gray.100",'gray.700')}>
          <Center flex={8} h={"sm"} justifyContent={"start"} padding={"5"}>
            <Avatar size={"md"} src={user.profilePicture} />
          </Center>
          <Center>
          <Button onClick={toggleColorMode} variant={"ghost"}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
          </Center>
          <Center flex={1}>
            <IconButton
              aria-label="Search database"
              variant={"ghost"}
              rounded={"full"}
              icon={<BiMessageAltDetail />}
            />
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
            {/* <IconButton
              colorScheme="gray"
              aria-label="Search database"
              variant={"ghost"}
              rounded={"full"}
              icon={<BiDotsVerticalRounded />}
            /> */}
          </Center>
        </Center>

        <Center flex={1} w={"full"} 
        // background={"gray.50"} 
        backgroundColor={useColorModeValue("gray.50",'gray.900')}
        padding={"2"}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch color="gray.300" />}
            />
            <Input border={'none'} type="text" placeholder="Busca un chat o inicia uno nuevo" paddingX={'3em'} backgroundColor={useColorModeValue("gray.100",'gray.800')} />
          </InputGroup>
        </Center>
      </Center>
    </React.Fragment>
  );
}
