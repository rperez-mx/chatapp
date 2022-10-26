import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import { useUserState } from "../../hooks/useUserState";
import { message } from "../../helpers/Chat/index"

export default function Message(message: message) {
  const { user } = useUserState();
  const mine: boolean = user.displayName == message.from;
  return (
    <React.Fragment>
      <Flex w={'full'} alignContent={mine ? 'right' : 'left'} justifyContent={mine ? 'right' : 'left'} justifyItems={mine ? 'right' : 'left'} paddingX={'1em'}>
        <Center
        minW={'calc(25%)'}
        maxW={'calc(75%)'}
          w={'fit-content'}
          minH={'2.5em'}
          h={'fit-content'}
          backgroundColor={mine ? "tomato" : "teal"}
          rounded={"md"}
          justifyContent={'start'}
          padding={'0.5em'}
          
        >
          <Flex
          flexDir={'column'}
          >
            <Flex>
            {message.from}
            </Flex>
            <Flex textAlign={mine ? 'right' : 'left'}>
            {message.message}
            </Flex>
          </Flex>
        </Center>
      </Flex>
    </React.Fragment>
  );
}
