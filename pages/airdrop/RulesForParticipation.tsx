import {
  Box,
  Divider,
  Flex,
  Input,
  Link,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { AtSignIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import GradientButton from "../../components/button";
import LoadingModal from "../../components/modal/LoadingModal";
import { API_ENDPOINT, CONTRACT_ADDRESS_AIRDROP } from "../../constants";
import { AirdropData } from "../../entities/airdrop";
import { Airdrop, Airdrop__factory } from "../../official-sc/typechain-types";
import { ethers } from "ethers";

const RulesForParticipation = () => {
  const { active, activate, account, library, error } = useWeb3React();
  const toast = useToast();
  const [contractAirdrop, setContractAirdrop] = useState<Airdrop>(undefined);

  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [airdropData, setAirdropData] = useState<AirdropData>(undefined);
  const [isAddAirdropDataModalOpen, setIsAddAirdropDataModalOpen] =
    useState(false);
  const [isAddRefOpen, setIsAddRefOpen] = useState(false);
  const [refAddress, setRefAddress] = useState("");

  const [telegramId, setTelegramId] = useState("");
  const [twitterId, setTwitterId] = useState("");

  const onTelegramIdChange = (event) => setTelegramId(event.target.value);
  const onTwitterIdChange = (event) => setTwitterId(event.target.value);
  const onRefAddressChange = (event) => setRefAddress(event.target.value);

  const [addAirdropDataLoading, setAddAirdropDataLoading] = useState(false);

  useEffect(() => {
    if (account && library) {
      setContractAirdrop(
        Airdrop__factory.connect(CONTRACT_ADDRESS_AIRDROP, library.getSigner())
      );
    }
  }, [active, account, library]);

  useEffect(() => {
    if (!account) return;
    const fetchAirdropData = async () => {
      try {
        try {
          await axios.get(`${API_ENDPOINT}/airdrop/validate/${account}`);
        } catch (ex) {
          if (ex.response.data.statusCode === 404) {
            toast({
              title: "Account info",
              description: ex.response.data.message,
              status: "info",
              duration: 2000,
              isClosable: true,
            });
            setIsAddAirdropDataModalOpen(true);
            return;
          } else {
            toast({
              title: "Error occurred",
              description: ex.data?.message || ex.message,
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            setIsAddAirdropDataModalOpen(true);
            return;
          }
        }
        const res = await axios.get(`${API_ENDPOINT}/airdrop/${account}`);
        setAirdropData(res.data.data);
      } catch (ex) {
        toast({
          title: "Error occurred",
          description: ex.data?.message || ex.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };
    fetchAirdropData();
  }, [account]);

  const claimAirdrop = useCallback(async () => {
    if (!airdropData) {
      setIsAddAirdropDataModalOpen(true);
      return;
    }
    const { amount, signature: respSig } = airdropData;
    const signature: Airdrop.EIP712SignatureStruct = {
      deadline: respSig.deadline,
      v: respSig.v,
      r: respSig.r.data,
      s: respSig.s.data,
    };

    try {
      setIsTransactionLoading(true);
      setIsAddRefOpen(false);
      let _refAddress;
      if (refAddress !== "") {
        const N = refAddress.length;
        const firstIndex = refAddress.indexOf("0x");
        _refAddress = refAddress.substring(firstIndex, N);
      } else {
        _refAddress = ethers.constants.AddressZero;
      }
      const tx2 = await contractAirdrop.claimAirDropWithSig(
        amount,
        signature,
        _refAddress
      );
      await tx2.wait();

      setIsTransactionLoading(false);
      toast({
        title: "Success",
        description: "Claim airdrop successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (ex) {
      setIsTransactionLoading(false);
      toast({
        title: "Error occurred",
        description: ex.data?.message || ex.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [toast, contractAirdrop, airdropData, refAddress]);

  const updateAirdropData = useCallback(async () => {
    try {
      setAddAirdropDataLoading(true);
      await axios.post(`${API_ENDPOINT}/airdrop`, {
        account,
        telegram: telegramId,
        twitter: twitterId,
      });
      const res = await axios.get(`${API_ENDPOINT}/airdrop/${account}`);
      setAirdropData(res.data.data);
      setIsAddAirdropDataModalOpen(false);
      setAddAirdropDataLoading(false);
    } catch (ex) {
      setAddAirdropDataLoading(false);
      setIsAddAirdropDataModalOpen(false);
      toast({
        title: "Error occurred",
        description: ex.data?.message || ex.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [account, telegramId, twitterId, toast]);
  return (
    <Flex
      flexDir={"column"}
      bg={"#222"}
      py={3}
      width={{ base: "100%", xl: "49%" }}
    >
      <Text fontSize={"xl"} px={3}>
        Get Airdrop
      </Text>
      <Divider my={3} color={"whiteAlpha.300"} />
      <Box px={3}>
        <Text fontSize={["lg"]} pt={3} mb={3}>
          Complete These Steps To Receive Airdrop
        </Text>
        <Flex flexDir={"column"} color="whiteAlpha.700">
          <Link href="https://t.me/VPRMetaChain" isExternal>
            <Text mb={3}>Step 1: Join Telegram Group Chat</Text>
          </Link>
          <Link href="https://twitter.com/VPRMetaChain" isExternal>
            <Text mb={3}>Step 2: Official Twitter Follow</Text>
          </Link>
          <Text mb={3}>Step 3: Retweet The Pinned Post</Text>
          <Text mb={3}>Step 4: Comment in the tweet and tag 3 friends</Text>
          <Text>
            Step 5: Connect Your Binance Smart Chain Wallet And Share your
            referral link to receive up to 30% commision
          </Text>
        </Flex>
      </Box>

      <Box px={3} mt={"auto"}>
        <Text textAlign={"center"} my={5} fontSize={["lg"]}>
          Completed Steps
        </Text>
        <Flex
          position="relative"
          px={{ base: 1, lg: 6 }}
          color={"black"}
          justifyContent={"center"}
        >
          <Divider
            maxWidth={"200px"}
            color={"whiteAlpha.300"}
            position="absolute"
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            zIndex={1}
          />
          <Flex position="relative" zIndex={2} gap={5}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"full"}
              width={"40px"}
              height={"40px"}
              bg={
                airdropData?.step >= 1
                  ? "linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)"
                  : "gray.600"
              }
              color={airdropData?.step >= 1 ? "inherit" : "white"}
              fontSize={"20px"}
            >
              1
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"full"}
              width={"40px"}
              height={"40px"}
              bg={
                airdropData?.step >= 2
                  ? "linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)"
                  : "gray.600"
              }
              color={airdropData?.step >= 2 ? "inherit" : "white"}
              fontSize={"20px"}
            >
              2
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"full"}
              width={"40px"}
              height={"40px"}
              bg={
                airdropData?.step >= 3
                  ? "linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)"
                  : "gray.600"
              }
              color={airdropData?.step >= 3 ? "inherit" : "white"}
              fontSize={"20px"}
            >
              3
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"full"}
              width={"40px"}
              height={"40px"}
              bg={
                airdropData?.step >= 4
                  ? "linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)"
                  : "gray.600"
              }
              color={airdropData?.step >= 4 ? "inherit" : "white"}
              fontSize={"20px"}
            >
              4
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"full"}
              width={"40px"}
              height={"40px"}
              bg={
                airdropData?.step >= 5
                  ? "linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)"
                  : "gray.600"
              }
              color={airdropData?.step >= 5 ? "inherit" : "white"}
              fontSize={"20px"}
            >
              5
            </Flex>
          </Flex>
        </Flex>

        <Box textAlign={"center"} mt={6} mb={3}>
          <GradientButton
            text="Claim Your Rewards"
            disabled={airdropData?.step < 5}
            onClick={() => setIsAddRefOpen(true)}
          />
        </Box>
      </Box>
      <LoadingModal
        isOpen={isTransactionLoading}
        onClose={() => setIsTransactionLoading(false)}
      />
      <Modal
        isOpen={isAddAirdropDataModalOpen}
        onClose={() => setIsAddAirdropDataModalOpen(false)}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bgImage={"url(/images/container-bg.svg)"}
          bgPos={"center"}
          bgSize={"cover"}
          color={"white"}
        >
          <ModalCloseButton />
          <ModalHeader mx="auto">Add Airdrop Info</ModalHeader>
          <ModalBody mx="auto">
            <Flex
              w={"500px"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              mb={3}
            >
              <Text flex={"0 0 20%"}>Telegram</Text>
              <InputGroup size="sm">
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input
                  value={telegramId}
                  onChange={onTelegramIdChange}
                  placeholder="username"
                  size="sm"
                  color={useColorModeValue("white", "whiteAlpha.800")}
                  variant={"filled"}
                  bg={"#222"}
                  _hover={{ bg: "#333" }}
                  _focus={{ borderColor: "gray.600" }}
                  maxWidth={"250px"}
                />
              </InputGroup>
            </Flex>
            <Flex
              w={"500px"}
              alignItems={"center"}
              gap={2}
              justifyContent={"center"}
            >
              <Text flex={"0 0 20%"}>Twitter</Text>
              <InputGroup size="sm">
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input
                  value={twitterId}
                  onChange={onTwitterIdChange}
                  placeholder="username"
                  size="sm"
                  color={useColorModeValue("white", "whiteAlpha.800")}
                  variant={"filled"}
                  bg={"#222"}
                  _hover={{ bg: "#333" }}
                  _focus={{ borderColor: "gray.600" }}
                  maxWidth={"250px"}
                />
              </InputGroup>
            </Flex>
          </ModalBody>

          <ModalFooter mx="auto">
            <GradientButton
              text={"Confirm"}
              isLoading={addAirdropDataLoading}
              onClick={updateAirdropData}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isAddRefOpen}
        onClose={() => setIsAddRefOpen(false)}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bgImage={"url(/images/container-bg.svg)"}
          bgPos={"center"}
          bgSize={"cover"}
          color={"white"}
        >
          <ModalCloseButton />
          <ModalHeader mx="auto">Add Referral</ModalHeader>
          <ModalBody mx="auto">
            <Flex
              w={"500px"}
              justifyContent={"center"}
              gap={2}
              mb={3}
              flexDir={"column"}
            >
              <Text flex={"0 0 30%"}>Referral address</Text>
              <InputGroup size="sm">
                <Input
                  value={refAddress}
                  onChange={onRefAddressChange}
                  placeholder="optional"
                  size="sm"
                  color={useColorModeValue("white", "whiteAlpha.800")}
                  variant={"filled"}
                  bg={"#222"}
                  _hover={{ bg: "#333" }}
                  _focus={{ borderColor: "gray.600" }}
                  maxWidth={"400px"}
                />
              </InputGroup>
            </Flex>
          </ModalBody>

          <ModalFooter mx="auto">
            <GradientButton text={"Confirm"} onClick={claimAirdrop} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
export default RulesForParticipation;
