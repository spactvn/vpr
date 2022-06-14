import React, { ReactNode, useEffect, useState } from 'react'
import {
	IconButton,
	Avatar,
	Box,
	Button,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	useColorMode,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Image,
	createIcon,
	ComponentWithAs,
	IconProps,
} from '@chakra-ui/react'
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiMenu,
	FiChevronDown,
	FiBox,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import NextLink from 'next/link'
import { useWeb3React } from '@web3-react/core'
import { CONNECTION_TYPES, injected, walletconnect } from './wallet/connectors'
import { shortenAddress } from '../utils'
import { APP_CHAIN_ID } from '../constants'
import { useRouter } from 'next/router'
import {
	AirdropIcon,
	BuyIDO,
	CharityIcon,
	FarmIcon,
	GameFiIcon,
	LaunchpadIcon,
	MartketplaceIcon,
	MiningLand,
	MyLandIcon,
	ReferralIcon,
} from './icons'
import GradientButton from './button'
import ConnectWalletModal from './wallet/ConnectWalletModal'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

interface LinkItemProps {
	name: string
	icon: IconType | ComponentWithAs<'svg', IconProps>
	link: string
	isSoon?: boolean
}

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Dashboard', icon: FiHome, link: '/dashboard' },
	{ name: 'Referral', icon: ReferralIcon, link: '/referral' },

	{
		name: 'Airdrop',
		icon: AirdropIcon,
		link: '/airdrop',
	},
	{
		name: 'Buy IDO',
		icon: BuyIDO,
		link: '/buy-ido',
	},
	{
		name: 'Mining Land',
		icon: MiningLand,
		link: '/mining-land',
	},
	{ name: 'Marketplace', icon: MartketplaceIcon, link: '/marketplace' },
	{ name: 'My Land', icon: MyLandIcon, link: '/my-land' },
	{ name: 'Farming', icon: FarmIcon, link: '/farming' },
	{
		name: 'GameFi',
		icon: GameFiIcon,
		link: '#',
		isSoon: true,
	},
	{
		name: 'Launchpad',
		icon: LaunchpadIcon,
		link: '#',
		isSoon: true,
	},
	{
		name: 'Charity Fund',
		icon: CharityIcon,
		link: '#',
		isSoon: true,
	},
]

export default function SidebarWithHeader({
	children,
}: {
	children: ReactNode
}) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }}>{children}</Box>
		</Box>
	)
}

interface SidebarProps extends BoxProps {
	onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			overflow={'auto'}
			{...rest}
		>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent={{ base: 'space-between', md: 'center' }}
				mb={4}
			>
				<Image src={'/logo.svg'} w={'80px'} h={'80px'} />
				<CloseButton
					color={'whiteAlpha.700'}
					display={{ base: 'flex', md: 'none' }}
					onClick={onClose}
				/>
			</Flex>
			{LinkItems.map((link) => (
				<NavItem
					route={link.link}
					key={link.name}
					icon={link.icon}
					isSoon={link.isSoon}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	)
}

interface NavItemProps extends FlexProps {
	icon: IconType | ComponentWithAs<'svg', IconProps>
	children: ReactText
	route: string
	isSoon?: boolean
}
const NavItem = ({ icon, children, route, isSoon, ...rest }: NavItemProps) => {
	const router = useRouter()
	return (
		<Link
			as={NextLink}
			href={route}
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
		>
			<Flex
				align="center"
				p="4"
				role="group"
				cursor="pointer"
				color={useColorModeValue(
					'white',
					router.asPath === route ? 'white' : 'gray.400'
				)}
				bg={router.asPath === route ? 'whiteAlpha.300' : 'transparent'}
				_hover={{
					bg: router.asPath !== route && 'whiteAlpha.200',
					color: router.asPath !== route && 'white',
				}}
				position="relative"
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}
				{children}
				{isSoon && (
					<Box
						top={'50%'}
						transform={'translateY(-50%)'}
						right={2}
						position={'absolute'}
						bgGradient={
							'linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)'
						}
						fontSize={'12px'}
						p={'4px'}
						borderRadius={'3px'}
						color={'black'}
					>
						Soon
					</Box>
				)}
			</Flex>
		</Link>
	)
}

interface MobileProps extends FlexProps {
	onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	const { active, account, connector, activate, chainId, deactivate } =
		useWeb3React()
	const { colorMode, toggleColorMode } = useColorMode()
	const [isWrongNetwork, setIsWrongNetwork] = useState(false)

	const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false)

	async function connect(type = CONNECTION_TYPES.METAMASK) {
		try {
			if (type === CONNECTION_TYPES.METAMASK) {
				await activate(injected)
			} else {
				await activate(walletconnect)
			}
			localStorage.setItem('isWalletConnected', 'true')
			setIsConnectWalletOpen(false)
		} catch (ex) {
			console.error(ex)
		}
	}

	async function disconnect() {
		try {
			deactivate()
			localStorage.setItem('isWalletConnected', 'false')
		} catch (ex) {
			console.error(ex)
		}
	}

	useEffect(() => {
		const connectWalletOnPageLoad = async () => {
			if (localStorage?.getItem('isWalletConnected') === 'true') {
				try {
					await activate(injected)
					setIsConnectWalletOpen(false)
				} catch (ex) {
					console.error(ex)
				}
			}
		}
		connectWalletOnPageLoad()
	}, [])

	useEffect(() => {
		const checkChainId = async () => {
			const chainId = await connector.getChainId()
			setIsWrongNetwork(chainId !== APP_CHAIN_ID)
		}

		if (chainId) {
			checkChainId()
		}
	}, [active, chainId])

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Image display={{ base: 'flex', md: 'none' }} src={'/logo.svg'} />

			<HStack spacing={{ base: '0', md: '6' }}>
				{active ? (
					<>
						<Flex alignItems={'center'}>
							<Menu>
								<MenuButton
									py={2}
									transition="all 0.3s"
									_focus={{ boxShadow: 'none' }}
								>
									<HStack>
										<Avatar
											size={'sm'}
											src={
												'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
											}
										/>
										<VStack
											display={{ base: 'none', md: 'flex' }}
											alignItems="flex-start"
											spacing="1px"
											ml="2"
										>
											<Text
												fontSize="sm"
												color={useColorModeValue('white', 'gray.400')}
											>
												Hi,
											</Text>
											<Text fontSize="xs" color="gray.500">
												{shortenAddress(account)}
											</Text>
										</VStack>
										<Box display={{ base: 'none', md: 'flex' }}>
											<FiChevronDown />
										</Box>
									</HStack>
								</MenuButton>
								<MenuList
									bg={useColorModeValue('white', 'gray.900')}
									borderColor={useColorModeValue('white.200', 'white.700')}
								>
									<MenuItem color="whiteAlpha.900" onClick={disconnect}>
										Disconnect
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</>
				) : (
					<GradientButton
						variant={'solid'}
						size={'sm'}
						mx={2}
						onClick={() => setIsConnectWalletOpen(true)}
						text={'Connect wallet'}
					/>
				)}
			</HStack>

			<ConnectWalletModal
				isOpen={isConnectWalletOpen}
				onClose={() => setIsConnectWalletOpen(false)}
				onConnect={connect}
			/>
		</Flex>
	)
}
