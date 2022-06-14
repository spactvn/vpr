import { Divider, Flex, Text, useToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ContractTransaction } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import GradientButton, { OutlineButton } from '../../components/button'
import LoadingModal from '../../components/modal/LoadingModal'
import {
	CONTRACT_ADDRESS_AKASHIC,
	CONTRACT_ADDRESS_ASSET_1155,
	CONTRACT_ADDRESS_FARMING,
} from '../../constants'
import { NFTPool } from '../../entities/farming-contract'
import {
	Akashic,
	Akashic__factory,
	Asset1155,
	Asset1155__factory,
	FarmingPool,
	FarmingPool__factory,
} from '../../official-sc/typechain-types'
import { decimalToWei } from '../../utils'
import AddLiquidityModal from './AddLiquidityModal'

const Badge = ({
	poolId,
	title,
	apy,
	credit,
}: {
	poolId: number
	title: string
	apy: string
	credit: string
}) => {
	const toast = useToast()
	const { active, account, library } = useWeb3React()
	const { promiseInProgress } = usePromiseTracker()

	// contract instances
	const [contractFarming, setContractFarming] = useState<FarmingPool>(undefined)
	const [contractAkashic, setContractAkashic] = useState<Akashic>(undefined)
	const [contractBadge, setContractBadge] = useState<Asset1155>(undefined)

	// nft pools
	const [totalBadges, setTotalBadges] = useState(BigNumber.from(0))
	const [addedBadgesAmount, setAddedBadgesAmount] = useState<BigNumber>(BigNumber.from(0))

	const [liquidityTokenAmount, setLiquidityTokenAmount] = useState(1)
	const [isAddLiquidModalOpen, setIsAddLiquidModalOpen] = useState(false)

	const [isConfirmingTransactionLoading, setIsConfirmingTransactionLoading] = useState(false)

	useEffect(() => {
		if (active && library) {
			setContractFarming(
				FarmingPool__factory.connect(
					CONTRACT_ADDRESS_FARMING,
					library.getSigner()
				)
			)
			setContractAkashic(
				Akashic__factory.connect(CONTRACT_ADDRESS_AKASHIC, library.getSigner())
			)
			setContractBadge(
				Asset1155__factory.connect(
					CONTRACT_ADDRESS_ASSET_1155,
					library.getSigner()
				)
			)
		}
	}, [active, account, library])

	const getPoolMetrics = useCallback(async () => {
		// const  = await contractFarming._NFTPool(poolId)
		// setNFTPool(_nftPool)

		const _totalBadges = await contractBadge.balanceOf(account, poolId)
		setTotalBadges(_totalBadges)

		const nftUser = await contractFarming._FTUser(account, poolId)
		setAddedBadgesAmount(nftUser.FTBalance)

		// const poolReward = await contractFarming.estimateMiningPoolReward(
		// 	account,
		// 	poolId
		// )
		// setPoolReward(poolReward)
	}, [contractFarming])

	useEffect(() => {
		if (contractFarming) {
			getPoolMetrics()
		}
	}, [account, contractFarming])

	const onAmountChange = (event) => setLiquidityTokenAmount(event.target.value)

	const addLiquidity = async () => {
		const liquidityTokenAmountWei = decimalToWei(liquidityTokenAmount)

		try {
			let tx: ContractTransaction;

			const isApprovedBadge = await contractBadge.isApprovedForAll(account, CONTRACT_ADDRESS_FARMING);
			console.log(isApprovedBadge);

			if (!isApprovedBadge) {
				tx = await contractBadge.setApprovalForAll(CONTRACT_ADDRESS_FARMING, true)
				setIsConfirmingTransactionLoading(true)
				await tx.wait()
				setIsConfirmingTransactionLoading(false)
			}

			tx = await contractAkashic.approve(
				CONTRACT_ADDRESS_FARMING,
				liquidityTokenAmountWei
			)

			// wait until this tx is confirmed
			setIsConfirmingTransactionLoading(true)
			await tx.wait()
			setIsConfirmingTransactionLoading(false)

			// need to convert token amount to wei
			tx = await contractFarming.addMiningPool(
				BigNumber.from(poolId),
				liquidityTokenAmountWei
			)

			if (tx) {
				// wait until this tx is confirmed
				setIsConfirmingTransactionLoading(true)
				await tx.wait()
				setIsConfirmingTransactionLoading(false)
				setIsAddLiquidModalOpen(false)
				toast({
					title: 'Success',
					description: 'Liquidity successfully added',
					status: 'success',
					duration: 2000,
					isClosable: true,
				})
			}
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

	const removeLiquidity = async () => {
		try {
			const tx = await contractFarming.removeMiningPool(
				poolId,
				addedBadgesAmount
			)
			setIsConfirmingTransactionLoading(true)
			await tx.wait()
			setIsConfirmingTransactionLoading(false)
			toast({
				title: 'Success',
				description: 'Liquidity successfully removed',
				status: 'success',
				duration: 2000,
				isClosable: true,
			})
		} catch (ex) {
			console.error(ex)
		}
	}

	return (
		<Flex
			flexDir={'column'}
			bg={'#222'}
			py={3}
			maxWidth={'100%'}
			overflow={'auto'}
			minWidth={{ base: '340px', lg: '380px', xl: '460px' }}
		>
			<Flex justifyContent={'space-between'} alignItems={'center'} px={3}>
				<Flex flexDir={'column'}>
					<Text fontSize={'xl'}>{title}</Text>
					<Text color={'whiteAlpha.700'}>AKC + {title} To Earn</Text>
				</Flex>
				<Text ml={[4, 8]} fontSize={'sm'}>
					{totalBadges.toString()} Badges
				</Text>
			</Flex>
			<Divider my={3} color={'whiteAlpha.300'} />

			<Flex flexDir={'column'} px={3}>
				<Flex
					justifyContent={'space-between'}
					alignItems={'center'}
					mb={[2, 4]}
				>
					<Text color={'whiteAlpha.700'}>APY:</Text>
					<Text ml={3} textAlign={'right'}>
						{apy}
					</Text>
				</Flex>
				<Flex
					justifyContent={'space-between'}
					alignItems={'center'}
					mb={[2, 4]}
				>
					<Text color={'whiteAlpha.700'}>Credit calculation starts:</Text>
					<Text ml={3} textAlign={'right'}>
						{credit}
					</Text>
				</Flex>
				<Flex justifyContent={'space-between'} alignItems={'center'}>
					<Text color={'whiteAlpha.700'}>Recent profit:</Text>
					<Text ml={3} textAlign={'right'}>
						90% UNMINING FEE IF EARLY WITHDRAWN
					</Text>
				</Flex>

				<Flex mt={8} mb={5} justifyContent={'center'} gap={[3, 6]}>
					<OutlineButton
						text={'Remove Liquid'}
						borderRadius={'none'}
						onClick={removeLiquidity}
					/>
					<GradientButton text={'Add Liquid'} onClick={() => setIsAddLiquidModalOpen(true)} />
				</Flex>
				<AddLiquidityModal
					isOpen={isAddLiquidModalOpen}
					onClose={() => setIsAddLiquidModalOpen(false)}
					addLiquidity={addLiquidity}
					loading={promiseInProgress}
					liquidityTokenAmount={liquidityTokenAmount}
					onAmountChange={onAmountChange}
				/>
				<LoadingModal
					isOpen={isConfirmingTransactionLoading}
					onClose={() => setIsConfirmingTransactionLoading(false)}
				/>
			</Flex>
		</Flex>
	)
}

export default Badge;