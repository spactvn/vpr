import {
	Box,
	Button,
	Divider,
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	SkeletonText,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import {
	CONTRACT_ADDRESS_ASSET_1155,
	CONTRACT_ADDRESS_BUSD,
	CONTRACT_ADDRESS_MARKETPLACE,
	CONTRACT_ADDRESS_VPR,
} from '../../constants'
import { MyItemProps } from '../../entities/nft'
import { useAppDispatch } from '../../redux/hooks'
import { setSellSuccess } from '../../redux/slices/nftSlice'
import {
	Asset1155,
	Asset1155__factory,
	Marketplace,
	Marketplace__factory,
} from '../../official-sc/typechain-types'
import { decimalToWei, tokenSymbolToAddress } from '../../utils'
import LoadingModal from '../modal/LoadingModal'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { CURRENCY_TYPE } from '../../constants/data'

const MIN_PRICE = 1.0;

const MyItem = ({ loading = false, box, fetcher }: MyItemProps) => {
	const toast = useToast()
	const { active, account, library } = useWeb3React()
	const dispatch = useAppDispatch()

	const [contractMarketplace, setContractMarketplace] =
		useState<Marketplace>(undefined)
	const [contractBox, setContractBox] = useState<Asset1155>(undefined)
	const [sellCurrency, setSellCurrency] = useState<CURRENCY_TYPE>(CURRENCY_TYPE.VPR)
	// nice effect
	const [isConfirmingTransactionLoading, setIsConfirmingTransactionLoading] =
		useState(false)

	const [sellPrice, setSellPrice] = useState(MIN_PRICE)
	const [isValidSellPrice, setIsValidSellPrice] = useState(true)

	const onAmountChange = (e) => {
		setIsValidSellPrice(parseFloat(e.target.value) >= MIN_PRICE)
		setSellPrice(e.target.value)
	}

	useEffect(() => {
		if (active && library) {
			setContractMarketplace(
				Marketplace__factory.connect(
					CONTRACT_ADDRESS_MARKETPLACE,
					library.getSigner()
				)
			)
			setContractBox(
				Asset1155__factory.connect(
					CONTRACT_ADDRESS_ASSET_1155,
					library.getSigner()
				)
			)
		}
	}, [active, account, library])

	const placeItemOnSale = async () => {
		try {
			// approve marketplace contract to transfer
			const isApproved = await contractBox.isApprovedForAll(
				account,
				CONTRACT_ADDRESS_MARKETPLACE
			)
			if (!isApproved) {
				const tx = await contractBox.setApprovalForAll(
					CONTRACT_ADDRESS_MARKETPLACE,
					true
				)
				setIsConfirmingTransactionLoading(true)
				await tx.wait()
				setIsConfirmingTransactionLoading(false)
			}

			console.log(tokenSymbolToAddress(sellCurrency));
		
			// place item on sale
			const tx = await contractMarketplace.placeItemOnSale(
				true,
				CONTRACT_ADDRESS_ASSET_1155,
				box.boxType,
				decimalToWei(sellPrice),
				tokenSymbolToAddress(sellCurrency),
			)
			setIsConfirmingTransactionLoading(true)
			await tx.wait()
			setIsConfirmingTransactionLoading(false)
			toast({
				title: 'Success',
				description: 'Item successfully placed on marketplace',
				status: 'success',
				duration: 2000,
				isClosable: true,
			})
			dispatch(setSellSuccess(true))
			fetcher()
		} catch (ex) {
			console.error(ex)

			toast({
				title: 'Error occurred',
				description: ex.data?.message || ex.message,
				status: 'error',
				duration: 2000,
				isClosable: true,
			})
		}
	}

	const getLandImage = (landId) => {
		switch (landId) {
			case 1:
				return '/images/play-to-earn-bronze.svg'
			case 2:
				return '/images/play-to-earn-silver.svg'
			case 3:
				return '/images/play-to-earn-gold.svg'
			case 4:
			default:
				return '/images/play-to-earn-diamond.svg'
		}
	}

	return (
		<Flex
			flexDir="column"
			overflow="hidden"
			width={{
				base: '100%',
				sm: 'calc(50% - 8px)',
				lg: 'max(250px, calc(25% - 32px))',
			}}
			_hover={{ '& > img': { transform: 'scale(1.05)' } }}
			cursor="pointer"
			bgGradient={
				'linear-gradient(157.88deg, rgba(255, 255, 255, 0.2) 7.1%, rgba(255, 255, 255, 0.1) 95.53%)'
			}
			boxShadow={'0px 4px 16px rgba(255, 255, 255, 0.06)'}
			backdropFilter={'blur(40px)'}
			borderRadius={'md'}
			py={3}
		>
			{!loading ? (
				<>
					<Text fontWeight={'medium'} px={3} mb={2}>
						<Text as={'span'} color={'whiteAlpha.700'} fontSize={'sm'}>
							No.
						</Text>{' '}
						{box.boxPseudoId.toString()}
					</Text>
					<Image
						src={getLandImage(box.boxType)}
						alt="land"
						height="100%"
						maxHeight={'170px'}
						objectFit="contain"
						objectPosition="center"
						transition={'all .2s ease-in-out'}
					/>
					<Flex flexDir={'column'} p={3} flex="1 1 auto">
						<Divider mb={3} />
						<Text fontWeight={'medium'} mb={2}>
							<Text as={'span'} color={'whiteAlpha.700'} fontSize={'sm'}>
								Price:
							</Text>
						</Text>
						{
							// if logged in user is the token owner
							// then he can list the item on the marketplace
							account === box?.owner && (
								<>
									<InputGroup size="md">
										<Input
											value={sellPrice}
											onChange={onAmountChange}
											size="md"
											type="number"
											inputMode="decimal"
											step="0.01"
											pattern="^\d*(\.\d{0,2})?$"
											color={isValidSellPrice ? 'whiteAlpha.900' : 'red.500'}
										/>
										<InputRightElement width={'4rem'}>
											<Menu>
												<MenuButton
													as={Button}
													rightIcon={<ChevronDownIcon />}
													bg={'#222'}
													_hover={{ bg: '#333' }}
													_focus={{ bg: '#333' }}
													_active={{ bg: '#333' }}
													fontSize={'xs'}
													px={2}
													border={'none'}
													size={'sm'}
													mr={1}
												>
													{sellCurrency}
												</MenuButton>
												<MenuList
													bg={'#222'}
													_hover={{ bg: '#333' }}
													_focus={{ bg: '#333' }}
												>
													<MenuItem fontSize={'xs'} onClick={() => setSellCurrency(CURRENCY_TYPE.VPR)}>VPR</MenuItem>
													<MenuItem fontSize={'xs'} onClick={() => setSellCurrency(CURRENCY_TYPE.BUSD)}>BUSD</MenuItem>
												</MenuList>
											</Menu>
										</InputRightElement>
									</InputGroup>
									<Button
										onClick={placeItemOnSale}
										disabled={!isValidSellPrice}
										size="sm"
										mt={2}
										variant="outline"
									>
										Sell
									</Button>
								</>
							)
						}
						<LoadingModal
							isOpen={isConfirmingTransactionLoading}
							onClose={() => setIsConfirmingTransactionLoading(false)}
						/>
					</Flex>
				</>
			) : (
				<NFTCardSkeletonLoading />
			)}
			<LoadingModal
				isOpen={isConfirmingTransactionLoading}
				onClose={() => setIsConfirmingTransactionLoading(false)}
			/>
		</Flex>
	)
}

export const NFTCardSkeletonLoading = () => (
	<>
		<Box height="140px"></Box>
		<Flex flexDirection="column" p={3} flex="1 1 auto">
			<SkeletonText
				fadeDuration={0.5}
				speed={1}
				startColor="gray.500"
				endColor="gray.200"
				noOfLines={1}
				height={'18px'}
				mt={2}
				fontWeight="medium"
			/>
			<SkeletonText
				fadeDuration={0.5}
				speed={1}
				startColor="gray.500"
				endColor="gray.200"
				noOfLines={1}
				mt={2}
				height={'16px'}
			/>
			<SkeletonText
				fadeDuration={0.5}
				speed={1}
				startColor="gray.500"
				endColor="gray.200"
				noOfLines={1}
				mt={6}
				height={'18px'}
				fontWeight="medium"
			/>
		</Flex>
	</>
)

export default MyItem
