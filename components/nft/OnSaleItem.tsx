import {
	Box,
	Button,
	Divider,
	Flex,
	Image,
	SkeletonText,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import {
	CONTRACT_ADDRESS_MARKETPLACE,
} from '../../constants'
import { OnSaleItemProps } from '../../entities/nft'
import {
	ERC20,
	ERC20__factory,
	Marketplace,
	Marketplace__factory,
} from '../../official-sc/typechain-types'
import { addressToTokenSymbol, fromWei, getLandImage } from '../../utils'
import LoadingModal from '../modal/LoadingModal'

const OnSaleItem = ({ item, fetcher }: OnSaleItemProps) => {
	const toast = useToast()
	const { active, account, library } = useWeb3React()

	const [contractMarketplace, setContractMarketplace] =
		useState<Marketplace>(undefined)
	const [contractERC20, setContractERC20] = useState<ERC20>(undefined)

	const [isConfirmingTransactionLoading, setIsConfirmingTransactionLoading] =
		useState(false)

	useEffect(() => {
		if (active && library) {
			setContractMarketplace(
				Marketplace__factory.connect(
					CONTRACT_ADDRESS_MARKETPLACE,
					library.getSigner()
				)
			)

			setContractERC20(
				ERC20__factory.connect(item.paymentToken, library.getSigner())
			)
		}
	}, [active, account, library])

	const delistItem = async () => {
		try {
			const tx = await contractMarketplace.delistItem(item.itemId)
			setIsConfirmingTransactionLoading(true)
			await tx.wait()
			setIsConfirmingTransactionLoading(false)
			fetcher()
		} catch (ex) { }
	}

	const buyItem = async () => {
		if (account === item.owner) {
			console.error("Owner can't buy owned item.")
			return
		}

		try {
			const tx = await contractERC20.approve(
				CONTRACT_ADDRESS_MARKETPLACE,
				item.price
			)
			// wait until this tx is confirmed
			setIsConfirmingTransactionLoading(true)
			await tx.wait()
			setIsConfirmingTransactionLoading(false)

			const tx2 = await contractMarketplace.buyItem(item.itemId)

			setIsConfirmingTransactionLoading(true)
			await tx2.wait()
			setIsConfirmingTransactionLoading(false)

			toast({
				title: 'Success',
				description: 'Item successfully purchased',
				status: 'success',
				duration: 2000,
				isClosable: true,
			})
			fetcher()
		} catch (ex) {
			console.error(ex)

			setIsConfirmingTransactionLoading(false)
			toast({
				title: 'Error occurred',
				description: ex.data?.message || ex.message,
				status: 'error',
				duration: 2000,
				isClosable: true,
			})
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
			<Text fontWeight={'medium'} px={3} mb={2}>
				<Text as={'span'} color={'whiteAlpha.700'} fontSize={'sm'}>
					No.
				</Text>{' '}
				{item.itemId.toString()}
			</Text>
			<Image
				src={getLandImage(item?.tokenId.toNumber() || 1)}
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
					</Text>{' '}
					{fromWei({ amount: item.price })} {addressToTokenSymbol(item.paymentToken)}
				</Text>
				{
					// if logged in user is the token owner
					// then he can list the item on the marketplace
					account === item.seller ? (
						<Button onClick={delistItem}>Delist</Button>
					) : (
						<Button onClick={buyItem} colorScheme="orange">
							Buy
						</Button>
					)
				}
			</Flex>
			<LoadingModal
				isOpen={isConfirmingTransactionLoading}
				onClose={() => setIsConfirmingTransactionLoading(false)}
			/>
		</Flex>
	)
}

export const OnSaleSkeletonLoading = () => (
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

export default OnSaleItem
