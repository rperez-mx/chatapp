import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  useBreakpointValue,
  IconProps,
  Icon,
  Center,
  FormControl,
  FormHelperText,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { setUser, user } from "../../app/features/User/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { LoginWithGoogle } from "../../helpers/Auth/index"
export default function Login() {
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    let u: user = {} as user;
    u = await LoginWithGoogle();
    dispatch(setUser(u))
  };
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Simple
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              
            Chatio
            </Text>{" "}
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}></Stack>
        </Stack>
        <Stack
          bg={useColorModeValue("gray.100", "gray.900")}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              color={useColorModeValue("gray.800", "gray.100")}
            >
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                ¡
              </Text>
              Inicia Sesi&oacute;n
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Inicia sesi&oacute;n con cualquiera de tus cuentas para comenzar a
              enviar y recibir mensajes,{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                es gratis y siempre lo ser&aacute;
              </Text>
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
              {/* Facebook */}
              {/* <Button
                w={"full"}
                colorScheme={"blackAlpha"}
                leftIcon={<FaPhone />}
              >
                <Center>
                  <Text>Continuar con tu n&uacute;mero telef&oacute;nico</Text>
                </Center>
              </Button> */}
              {/* <Button
                w={"full"}
                colorScheme={"facebook"}
                leftIcon={<FaFacebook />}
              >
                <Center>
                  <Text>Continue with Facebook</Text>
                </Center>
              </Button> */}

              {/* Google */}
              <FormControl>
                {/* <FormLabel textAlign={'center'}>&oacute;</FormLabel> */}
                <Button
                  w={"full"}
                  colorScheme={"blue"}
                  variant={"solid"}
                  leftIcon={<FcGoogle />}
                  onClick={handleLogin}
                >
                  <Center>
                    <Text>Continuar con Google</Text>
                  </Center>
                </Button>
                <FormHelperText padding={3}
                  color={useColorModeValue("teal.500", "gray.100")}
                >
                  Tus datos se encuentran protegidos en todo momento ;)
                </FormHelperText>
              </FormControl>
            </Stack>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
