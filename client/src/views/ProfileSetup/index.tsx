import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  Tooltip,
  Tag,
  WrapItem,
  Avatar,
  Spinner,
  useToast,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { profile, setCompletedUser, setProfile, setUser } from '../../app/features/User/userSlice'
import { useUserState } from "../../hooks/useUserState";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiCheck, BiX } from "react-icons/bi";
import { app } from "../../app/firebase/config";
import { FileUpload, useFileUpload } from "use-file-upload";
import { addProfile, checkUsername, updateUser } from "../../helpers/Profile/index";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
export default function CompletePro() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast();
  const { user } = useUserState();
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [usernameOk, setUsernameOk] = useState<boolean | null >(null);
  //@ts-ignore
  const [profilePicture, setProfilePicture] = useState<string>(localStorage.getItem("profilePicture"))
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [files, selectFile] = useFileUpload();
  const profile: profile = {} as profile;
  // setProfilePicture(localStorage.getItem("profilePicture"))
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSaveClick = async() => {
    setUsernameOk(await checkUsername(username))
    if(await checkUsername(username)){
      
      if(await updateUser(user.uid, username, name, profilePicture)){
        // dispatch(setUser(profile))
        dispatch(setCompletedUser())
        toast({
          title: "Listooo!",
          description:
            "Haz creado tu perfil",
          status: 'success',
          position: "bottom-right",
          size: "sm",
          duration: 3000,
          isClosable: true,
        });
        navigate('/1')
      }
    } else {
      toast({
        title: "Oh no :c",
        description:
          "Éste username ya está en uso. Por favor elige otro",
        status: 'error',
        position: "bottom-right",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"sm"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}> ✌️ ¡Hola de nuevo!</Heading>
          <Text color={"gray.500"} fontSize={{ base: "sm", sm: "lg" }}>
            casi estamos listos,{" "}
            <Text as={"span"} color={"blue.400"}>
              una &uacute;ltima cosa 👉👈
            </Text>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} alignItems={"center"}>
            {profilePicture && (
              <WrapItem>
                <Avatar size="2xl" src={profilePicture} />{" "}
              </WrapItem>
            )}
            <FormControl id="email" alignItems={"left"}>
              <FormLabel>Username</FormLabel>
              <InputGroup>
              <Input type="text" onChange={handleUsernameChange} />
              {username===''? '' : <InputRightElement  children={usernameOk ? <BiCheck color='green' /> : ''} />}
              </InputGroup>
              <FormHelperText>
                Ser&aacute; tu identificador, no podr&aacute; cambiarse... elige
                sabiamente cx
              </FormHelperText>
            </FormControl>
            <FormControl id="email" alignItems={"left"}>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" onChange={handleNameChange} />
              <FormHelperText>
               Nombre que tus contactos ver&aacute;n
              </FormHelperText>
            </FormControl>
           
            <FormControl id="otp">
              <FormLabel>Foto de perfil</FormLabel>
              <Button
                onClick={() => {
                  setProfilePicture("");
                  // Single File Upload
                  selectFile(
                    { accept: "image/*", multiple: false },
                    // @ts-ignore
                    ({ source, name, file, size }) => {
                      setIsUploading(true);
                      // Todo: Upload to cloud.
                      const storage = getStorage(app);
                      const storageRef = ref(
                        storage,
                        `/profilePictures/${String(user.uid)}/profile.jpeg`
                      );
                      console.log(storage)
                      uploadBytes(storageRef, file).then((snapshot) => {
                        console.log("Upploaded foto");
                        setProfilePicture(
                          `https://firebasestorage.googleapis.com/v0/b/${import.meta.env.VITE_Firebase_storageBucket}/o/` +
                          storageRef.fullPath.replaceAll('/','%2F') +"?alt=media&token=44053a59-296d-4530-a445-7d7b10ef26a7"
                        );
                        setIsUploading(false);
                        toast({
                          title: "Listo",
                          description:
                            "Tu foto de perfil se ha subido con éxito",
                          status: "success",
                          position: "bottom-right",
                          size: "sm",
                          duration: 3000,
                          isClosable: true,
                        });
                      });
                    }
                  );
                }}
                w="full"
                colorScheme="facebook"
                leftIcon={<CgProfile />}
              >
                Subir foto de perfil
                {isUploading && <Spinner color="green.500" />}
              </Button>
              <FormHelperText>
                Tambi&eacute;n puedes mantener tu foto de Google :3 
              </FormHelperText>
            </FormControl>

            <Divider />
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                id="sign-in-button"
                onClick={handleSaveClick}
              >
                Guardar mi perfil
              </Button>
            </Stack>
            <Divider />
            <Text fontSize={{ base: "sm", sm: "lg" }} color={"gray.600"}>
              Tus datos{" "}
              <Text as={"span"} color={"blue.400"}>
                no se compartir&aacute;n con nadie ;)
              </Text>
            </Text>
            <Text>{/* Phone: {phoneNumber} */}</Text>
          </Stack>
        </Box>
      </Stack>
      <div id="recaptcha-container"></div>
    </Flex>
  );
}
