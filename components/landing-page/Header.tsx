import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  useMediaQuery,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import GradientButton from "../button";

export default function Header() {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [backdropFilter, setBackdropFilter] = useState("none");

  const handleScroll = useCallback(() => {
    if (window.document.documentElement.scrollTop > 60) {
      setBackgroundColor("rgba(16, 10, 15, 0.7)");
      setBackdropFilter("saturate(180%) blur(20px)");
    } else {
      setBackgroundColor("transparent");
      setBackdropFilter("none");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <Box>
      <Flex
        bg={backgroundColor}
        backdropFilter={backdropFilter}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        px={{ base: 4 }}
        align={"center"}
        position={"fixed"}
        width={"100%"}
        top={0}
        zIndex={999}
        transition={"all 0.2s ease-in-out"}
        maxW={"1920px"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", lg: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Image
          src={"/logo.svg"}
          display={{ base: "block", lg: "none" }}
          ml={{ base: "auto", md: 0 }}
        />
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center" }}
          align={"center"}
          position="relative"
          display={{ base: "none", md: "flex" }}
        >
          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <GradientButton
            position="absolute"
            right={{ base: "10px" }}
            display={{ base: "none", md: "inline-flex" }}
            text={"Launch Dapp"}
            onClick={() => router.push("/dashboard")}
            isClipPath
          />
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={"rgba(16, 10, 15, 0.9)"}
          backdropFilter={"saturate(180%) blur(20px)"}
        >
          <DrawerCloseButton color={"white"} size={"lg"} />
          <MobileNav onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("white", "gray.200");
  const linkHoverColor = useColorModeValue("whiteAlpha.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const [isLargerThan1920] = useMediaQuery("(min-width: 1920px)");

  return (
    <Stack
      direction={"row"}
      spacing={{ base: 4, lg: 6 }}
      transform={isLargerThan1920 ? "translateX(-80px)" : "translateX(-40px)"}
    >
      {NAV_ITEMS.map((navItem, index) => (
        <Flex key={navItem.label} align={"center"}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
          {index === 2 && <Image ml={6} src={"/logo.svg"} />}
        </Flex>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  return (
    <Stack p={4} mt={12} display={{ lg: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} onClose={onClose} {...navItem} />
      ))}

      <GradientButton
        isClipPath
        key={"launch-dapp"}
        my={2}
        label="Launch Dapp"
        text={"Launch Dapp"}
        onClick={() => {
          onClose();
          router.push("/dashboard");
        }}
      />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, onClose }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        onClick={onClose}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  onClose: () => void;
}

const NAV_ITEMS: Array<Omit<NavItem, "onClose">> = [
  {
    label: "Airdrop Event",
    // children: [
    // 	{
    // 		label: 'Explore Design Work',
    // 		subLabel: 'Trending Design to inspire you',
    // 		href: '#',
    // 	},
    // 	{
    // 		label: 'New & Noteworthy',
    // 		subLabel: 'Up-and-coming Designers',
    // 		href: '#',
    // 	},
    // ],
    href: "/airdrop",
  },
  {
    label: "Start Investing",
    href: "/buy-ido",
  },
  {
    label: "Mining Land",
    href: "/mining-land",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Ecosystem",
    href: "/#ecosystem",
  },
  {
    label: "Whitepaper",
    href: "https://bit.ly/VIRTUALPROPERTYRIGHT",
  },
];
