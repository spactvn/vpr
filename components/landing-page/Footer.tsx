import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  Flex,
  useColorModeValue,
  Image,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  FaCopy,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { EmailIcon } from "@chakra-ui/icons";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const CopyButton = ({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) => {
  const toast = useToast();
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"5px"}
      w={6}
      h={6}
      cursor={"pointer"}
      as={"a"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      onClick={() => {
        navigator.clipboard.writeText(text).then(
          function () {
            toast({
              title: "Copied!",
              description: "The contract link copied to clipboard",
              status: "success",
              duration: 5000,
            });
          },
          function () {
            toast({
              title: "Error!",
              description: "Unable to copy the contract link",
              status: "error",
              duration: 5000,
            });
          }
        );
      }}
    >
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      color={useColorModeValue("white", "white")}
      position="relative"
      zIndex="12"
    >
      <Container as={Stack} maxW={"1920px"} py={10} mx="auto">
        <SimpleGrid
          templateColumns={{
            base: "1fr",
            sm: "1fr",
            lg: "2fr 2fr 2fr",
          }}
          spacing={8}
          mb={6}
        >
          <Stack spacing={6} align={{ base: "center", lg: "flex-start" }}>
            <Box>
              <Image src={"/logo.svg"} />
            </Box>
            <Text fontSize={"lg"}>VIRTUAL PROPERTY RIGHT</Text>
            <Text fontSize={"sm"} color={"whiteAlpha.600"} mt={"0 !important"}>
              Metaverse Decentralized Finance
            </Text>
          </Stack>
          <HStack justifyContent={"space-between"} align={"baseline"}>
            <Stack align={"flex-start"}>
              <ListHeader>Products</ListHeader>
              <Link href={"/buy-ido"}>Start Investing</Link>
              <Link href={"/mining-land"}>Mining Land</Link>
              <Link href={"/my-land"}>My Land</Link>
              <Link href={"/airdrop"}>Airdrop Event</Link>
              <Link href={"/#ecosystem"}>Ecosystem</Link>
              <Link href={"/#tokenomics"}>Tokenomics</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Information</ListHeader>
              <Stack direction={"row"} spacing={1} color={"whiteAlpha.700"}>
                <SocialButton
                  label={"Telegram"}
                  href={"https://t.me/VPRMetaChain"}
                >
                  <FaTelegram />
                </SocialButton>
                <SocialButton
                  label={"Twitter"}
                  href={"https://twitter.com/VPRMetaChain"}
                >
                  <FaTwitter />
                </SocialButton>
                <SocialButton
                  label={"Youtube"}
                  href={"https://bit.ly/VPRMetaChain"}
                >
                  <FaYoutube />
                </SocialButton>
                <SocialButton
                  label={"Email"}
                  href={"mailto:support@vprchain.io"}
                >
                  <EmailIcon />
                </SocialButton>
              </Stack>
              <Stack direction={"row"} spacing={1} color={"whiteAlpha.700"}>
                <SocialButton label={"Poocoin"} href={"#"}>
                  <Image src={"/images/poocoin.svg"} />
                </SocialButton>
                <SocialButton label={"Pancakeswap"} href={"#"}>
                  <Image src={"/images/pancake-swap.svg"} />
                </SocialButton>
                <SocialButton label={"BSC"} href={"#"}>
                  <Image src={"/images/bsc.svg"} />
                </SocialButton>
                <SocialButton label={"Coinmarketcap"} href={"#"}>
                  <Image src={"/images/coinmarketcap.svg"} />
                </SocialButton>
              </Stack>
              <Stack direction={"row"} spacing={1} color={"whiteAlpha.700"}>
                <Text>VPR: 0x25f...AeE43</Text>
                <CopyButton text={"0x25fE7AE8e98049b355aa449F17a30A3231aAeE43"}>
                  <FaCopy />
                </CopyButton>
              </Stack>
              <Stack direction={"row"} spacing={1} color={"whiteAlpha.700"}>
                <Text>AKC: 0x0fa...c93Fb</Text>
                <CopyButton text={"0x0fa73D350E5e5bf63863f49Bb4bA3e87A20c93Fb"}>
                  <FaCopy />
                </CopyButton>
              </Stack>
            </Stack>
          </HStack>
          <Stack align={{ base: "center" }}>
            <Flex
              flexDir={"column"}
              alignItems={{ base: "center", lg: "flex-start" }}
              gap={2}
            >
              <ListHeader>Contact</ListHeader>
              <Link
                href={"mailto:support@vprchain.io"}
                color={"whiteAlpha.800"}
              >
                support@vprchain.io
              </Link>
              <Stack direction={"row"} spacing={6}>
                <SocialButton
                  label={"Twitter"}
                  href={"https://twitter.com/VPRMetaChain"}
                >
                  <Image src={"/images/twitter.svg"} />
                </SocialButton>
                <SocialButton
                  label={"Telegram"}
                  href={"https://t.me/VPRMetaChain"}
                >
                  <Image src={"/images/telegram.svg"} />
                </SocialButton>
              </Stack>
            </Flex>
          </Stack>
        </SimpleGrid>
        <Box borderTop={"1.5px solid #656565"} textAlign="center">
          <Text color="whiteAlpha.600" pt={6}>
            @2022 MADE WITH BY VIRTUAL PROPERTY RIGHT
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
