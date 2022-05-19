import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  OrderedList,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import { useContractRead, useContractWrite } from "wagmi";
import DrinkBoba from "../../artifacts/contracts/DrinkBoba.sol/DrinkBoba.json";
import DrinkBobaTea from "../components/DrinkBoba";


export default function Simple() {
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: "Insert Contract Address",
      contractInterface: DrinkBoba,
    },
    "enterTimeZone",
    {
      args: ["1"],
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Navbar />
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src="./boba-pool.jpg"
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                Boba Tea For The Win
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
              </Text>
            </Box>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                Deposit boba and drink boba tea. It's just that simple :)
              </Text>
              <Text fontSize={"lg"}>

              </Text>
            </VStack>
            <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  How It Works:
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <OrderedList spacing={2}>
                    <ListItem>Approve the Contract</ListItem>
                    <ListItem>Deposit (enter boba amount here)</ListItem>{" "}
                    <ListItem>Drink Boba Tea</ListItem>
                    <ListItem>Claim Reward</ListItem>
                  </OrderedList>
                </SimpleGrid>
              </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  How to Win:
                </Text>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"400"}
                >
                  The address who has drank the most boba tea at the end of the pool wins!
                  You better start drinking ;)
                </Text>
              </Box>
            </Stack>
            <Button onClick={onOpen}>Enter Boba Tea</Button>
            <>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <DrinkBobaTea />

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            <Button
              onClick={() => console.log("hi")}
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Approve Contract and Deposit
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
