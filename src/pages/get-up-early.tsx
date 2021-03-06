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
  VisuallyHidden,
  List,
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
import { useContractRead, useContractWrite } from "wagmi";
import GUPAbi from "../abis/GUP.json";
import Navbar from "../components/Navbar";
import GUPPool from "../components/GUPPool";
export default function Simple() {
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: "0x468703f988F7D172c562eb0d5391f795f7bf1303",
      contractInterface: GUPAbi,
    },
    "enterTimeZone",
    {
      args: ["1"],
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(
    `Data ${data} isError ${isError} isLoading ${isLoading} write ${write}`
  );

  const enterPool = () => {
    console.log("calling write ");
    write();
  };

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
              src={
                "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
              }
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
                Let's Achieve Our Goals.
              </Heading>
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
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  In this pool, your goal is too wake up before 7AM everyday in
                  your respective timezone.
                </Text>
                <Text fontSize={"lg"}>
                  If you are successfully able to wake up before 7AM, you'll
                  receive GUP (get-up-early) tokens, which are redeemable for
                  Boba Mainnet Coins. In addition, those who keep streaks for 30
                  days will be eligible for colorful prizes!
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
                  Rules
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>
                      Must trigger button before 7AM (we'll use your browser to
                      get timezone)
                    </ListItem>
                    <ListItem>
                      Must be connected to Boba Mainnet Network
                    </ListItem>{" "}
                    <ListItem>
                      Those on the leaderboard can win big prizes!
                    </ListItem>
                  </List>
                </SimpleGrid>
              </Box>
            </Stack>
            <>
              <Button onClick={onOpen}>Open Modal</Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <GUPPool />

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
            <Button
              onClick={() => enterPool()}
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
              Enter Pool
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
