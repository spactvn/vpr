import {
	Box,
	Container,
	Flex,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import {
	CONTRACT_ADDRESS_ASSET_1155,
} from '../../constants'
import {
	Asset1155,
	Asset1155__factory,
} from '../../official-sc/typechain-types'
import OnSaleItemList from '../../components/nft/OnSaleItemList'
import Overview from './Overview'
import UpgradeConditions from './UpgradeConditions'
import LootBoxOverview from './LootBoxOverview'
import BuyBox from './BuyBox'
import MyItemList from '../../components/nft/MyItemList'
import GradientButton from '../../components/button'
import LoadingModal from '../../components/modal/LoadingModal'

const MyLand = () => {
	const { active, account, library } = useWeb3React()
	const toast = useToast()
	const [contractAsset1155, setContractAsset1155] =
		useState<Asset1155>(undefined)

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (active && library) {
			setContractAsset1155(
				Asset1155__factory.connect(
					CONTRACT_ADDRESS_ASSET_1155,
					library.getSigner()
				)
			)
		}
	}, [active, account, library])

	const upgradeLand = useCallback(async () => {
		if (contractAsset1155) {
			try {
				setIsLoading(true)
				const tx = await contractAsset1155.upgradeLand(1)
				tx.wait()
				const tx2 = await contractAsset1155.upgradeLand(2)
				tx2.wait()
				const tx3 = await contractAsset1155.upgradeLand(3)
				tx3.wait()
				setIsLoading(false)
				toast({
					title: 'Success',
					description: 'Upgraded successfully',
					status: 'success',
					duration: 2000,
					isClosable: true,
				})
			} catch (ex) {
				setIsLoading(false)
				toast({
					title: 'Error occurred',
					description: ex.data?.message || ex.message,
					status: 'error',
					duration: 2000,
					isClosable: true,
				})
			}
		}
	}, [contractAsset1155])

	return (
		<Container
			maxW={'8xl'}
			py={{ base: 4, lg: 8 }}
			mr={0}
			ml={0}
			px={{ base: 4, lg: 8 }}
			bgImage={'url(/images/container-bg.svg)'}
			bgPos={'center'}
			bgSize={'cover'}
			color={'white'}
		>
			<Flex flexDir={'column'} gap={8}>
				<Text fontSize={{ base: 'xl', lg: '3xl' }} textAlign={'center'}>
					TRUE OWNERSHIP FOR MEMBERS
				</Text>

				<LootBoxOverview />

				<BuyBox />

				{/* <Overview /> */}
			</Flex>

			<UpgradeConditions />


			<Box my={12}>
				<MyItemList/>
			</Box>

			<Box textAlign={'center'}>
				<GradientButton text={'Upgrade'} onClick={upgradeLand} isClipPath />
			</Box>

			<Box my={12}>
				<OnSaleItemList myItemsOnly={true}/>
			</Box>

			<LoadingModal isOpen={isLoading} onClose={() => setIsLoading(false)} />
		</Container>
	)
}
export default MyLand
