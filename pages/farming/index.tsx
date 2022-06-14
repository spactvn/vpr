import {
    Box,
	Button,
	ComponentWithAs,
	Container,
	Divider,
	Flex,
	Icon,
	IconProps,
	Image,
	Link,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import {
	CONTRACT_ADDRESS_FARMING,
	CONTRACT_ADDRESS_AKASHIC,
	CONTRACT_ADDRESS_BUSD,
} from '../../constants'
import { connectWallet, injected } from '../../components/wallet/connectors'
import {
	FarmingPool__factory,
	FarmingPool,
	Akashic,
	Akashic__factory,
	IERC20,
	IERC20__factory,
} from '../../official-sc/typechain-types/'
import { BigNumber, ContractTransaction } from 'ethers/lib/ethers'
import { decimalToWei, fromWei, toWei } from '../../utils'
import { TokenPool, TokenUser } from '../../entities/farming-contract'
import LoadingModal from '../../components/modal/LoadingModal'
import { BNBIcon, BUSDIcon, SwapIcon } from '../../components/icons'
import GradientButton from '../../components/button'
import AddLiquidityModal from './AddLiquidityModal'
import MyHistory from './MyHistory'

const PoolItem = ({
	coin,
	icon,
}: {
	coin: string
	icon: ComponentWithAs<'svg', IconProps>
}) => {
	const toast = useToast()
	const { active, activate, account, library } = useWeb3React()
	const { promiseInProgress } = usePromiseTracker()

	// contract instances
	const [contractFarming, setContractFarming] = useState<FarmingPool>(undefined)
	const [contractAkashic, setContractAkashic] = useState<Akashic>(undefined)
	const [contractBUSD, setContractBUSD] = useState<IERC20>(undefined)

	// nft pools
	const [tokenPool, setTokenPool] = useState<TokenPool>(undefined)
	const [tokenUser, setTokenUser] = useState<TokenUser>(undefined)
	const [coinBalance, setCoinBalance] = useState(BigNumber.from(0))
	const [poolReward, setPoolReward] = useState(BigNumber.from(0))
	const [liquidityTokenAmount, setLiquidityTokenAmount] = useState(0)
	const [isConfirmingTransactionLoading, setIsConfirmingTransactionLoading] =
		useState(false)

	const [isAddLiquidModalOpen, setIsAddLiquidModalOpen] = useState(false)

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
			setContractBUSD(
				IERC20__factory.connect(CONTRACT_ADDRESS_BUSD, library.getSigner())
			)
		}
	}, [active, account, library])

	const getPoolMetrics = useCallback(async () => {
		let _tokenPool: TokenPool
		let _tokenUser: TokenUser
		let _poolReward: BigNumber

		switch (coin) {
			case 'BNB':
				_tokenPool = await contractFarming.tokenBNBPool()
				setTokenPool(_tokenPool)
				console.log('BNB rate', _tokenPool.rate.toString())
				_tokenUser = await contractFarming._TokenBNBUser(account)
				setTokenUser(_tokenUser)
				setCoinBalance(_tokenUser.bnbBalance)
				_poolReward = await contractFarming.estimateFarmingBNBPoolReward()
				setPoolReward(_poolReward)
				break
			case 'BUSD':
				_tokenPool = await contractFarming.tokenBUSDPool()
				setTokenPool(_tokenPool)
				console.log('BUSD rate', _tokenPool.rate.toString())
				_tokenUser = await contractFarming._TokenBUSDUser(account)
				setTokenUser(_tokenUser)
				setCoinBalance(_tokenUser.busdBalance)
				_poolReward = await contractFarming.estimateFarmingBUSDPoolReward()
				setPoolReward(_poolReward)
				break
			default:
				console.error('Unknown coin')
		}
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
			let tx = await contractAkashic.approve(
				CONTRACT_ADDRESS_FARMING,
				liquidityTokenAmountWei
			)

			// wait until this tx is confirmed
			setIsConfirmingTransactionLoading(true)
			await tx.wait()
			setIsConfirmingTransactionLoading(false)

			switch (coin) {
				case 'BNB':
					// need to convert token amount to wei
					console.log('liquidityTokenAmountWei', liquidityTokenAmountWei)
					tx = await contractFarming.addFarmingBNBPool(
						liquidityTokenAmountWei,
						{
							//  _BNB = _tokenAmount * tokenPool.rate / (10 ** tokenPool.decimal)
							value: BigNumber.from(liquidityTokenAmountWei)
								.mul(tokenPool.rate)
								.div(BigNumber.from(10).pow(tokenPool.decimal)),
						}
					)
					break
				case 'BUSD':
					// BUSD allowance
					tx = await contractBUSD.approve(
						CONTRACT_ADDRESS_FARMING,
						liquidityTokenAmountWei
					)
					await tx.wait()

					// need to convert token amount to wei
					tx = await contractFarming.addFarmingBUSDPool(liquidityTokenAmountWei)
					break
				default:
					console.error('Unknown coin')
			}

			if (tx) {
				// wait until this tx is confirmed
				setIsConfirmingTransactionLoading(true)
				await tx.wait()
				setIsConfirmingTransactionLoading(false)
				toast({
					title: 'Success',
					description: 'Your transaction has been confirmed',
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
				setIsAddLiquidModalOpen(false)
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
			let tx: ContractTransaction
			switch (coin) {
				case 'BNB':
					tx = await contractFarming.removeFarmingBNBPool(
						tokenPool.tokenBalance
					)
					break
				case 'BUSD':
					tx = await contractFarming.removeFarmingBUSDPool(
						tokenPool.tokenBalance
					)
					break
				default:
					console.error('Unknown coin')
			}

			if (tx) {
				setIsConfirmingTransactionLoading(true)
				await tx.wait()
				setIsConfirmingTransactionLoading(false)
			}
		} catch (ex) {
			console.error(ex)
		}
	}

	const harvestPool = async () => {
		try {
			let tx: ContractTransaction
			switch (coin) {
				case 'BNB':
					tx = await contractFarming.harvestFarmingBNBPoolReward()
					break
				case 'BUSD':
					tx = await contractFarming.harvestFarmingBUSDPoolReward()
					break
				default:
					console.error('Unknown coin')
			}

			if (tx) {
				setIsConfirmingTransactionLoading(true)
				await tx.wait()
				setIsConfirmingTransactionLoading(false)
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

	return (
		<Flex
			width={{ base: '100%', lg: '49%' }}
			height="100%"
			bg={'#222'}
			borderRadius={'xl'}
			flexDir={'column'}
			alignItems="center"
			overflow={'hidden'}
		>
			<Flex
				justifyContent="space-between"
				width="100%"
				alignItems="center"
				py={4}
				px={5}
			>
				<Flex flexDir={'column'} mr={8}>
					<Text fontSize={['xl', '2xl']} fontWeight={'medium'}>
						AKC-{coin}
					</Text>
					<Text fontSize={['xs', 'sm']} color="whiteAlpha.700">
						APY:{' '}
						<Text as={'span'} color={'white'}>
							368.752%
						</Text>
					</Text>
				</Flex>
				<Flex gap={2} alignItems={'center'}>
					<Icon as={icon} w={'54px'} h={'54px'} />
					<Icon as={SwapIcon} w={'24px'} h={'24px'} />
					<Image src={'/logo.svg'} w={'54px'} h={'54px'} />
				</Flex>
			</Flex>
			<Divider my={3} />
			<Flex flexDir={'column'} width="100%" py={4} px={5}>
                <Flex justifyContent="space-between" alignItems="center" mb={5}>
                    <Text><Text as={'span'} color={'whiteAlpha.700'}>Staked:</Text>{' '}123</Text>
                    <Button variant={'link'} size={'xs'} fontWeight={'thin'} color={'whiteAlpha.700'} isLoading={promiseInProgress} onClick={removeLiquidity}>
                       CLEAR ALL
                    </Button>
                </Flex>
				<Flex flexDir={'column'} p={3} bg={'blackAlpha.600'}>
					<Flex justifyContent="space-between" alignItems="center" mb={2}>
						<Text
							fontSize={{ base: 'sm', xl: 'md' }}
							fontWeight={'medium'}
							color="whiteAlpha.800"
						>
							ROI:
						</Text>
						<Text fontSize={{ base: 'sm', xl: 'md' }}>
							{tokenPool ? `${tokenPool.ROI.toNumber()}%` : 'Unknown'}
						</Text>
					</Flex>
					<Flex justifyContent="space-between" alignItems="center" mb={2}>
						<Text
							fontSize={{ base: 'sm', xl: 'md' }}
							fontWeight={'medium'}
							color="whiteAlpha.800"
						>
							Estimated reward:
						</Text>
						<Text fontSize={{ base: 'sm', xl: 'md' }}>
							{`${fromWei({ amount: poolReward, roundedDecimal: 5 })} VPR`}
						</Text>
					</Flex>
					<Flex justifyContent="space-between" alignItems="flex-start" mb={4}>
						<Text
							fontSize={{ base: 'sm', xl: 'md' }}
							fontWeight={'medium'}
							color="whiteAlpha.800"
						>
							Total liquidity:
						</Text>
						<Text fontSize={{ base: 'sm', xl: 'md' }}>
							{`
							${
								tokenPool?.tokenBalance
									? fromWei({ amount: tokenPool.tokenBalance })
									: 0
							} AKC /
							${fromWei({ amount: coinBalance })} ${coin}
							`}
						</Text>
					</Flex>
					<Flex justifyContent="space-between" alignItems="flex-start" mb={4}>
						<Text
							fontSize={{ base: 'sm', xl: 'md' }}
							fontWeight={'medium'}
							color="whiteAlpha.800"
						>
							Your added liquidity:
						</Text>
						<Text fontSize={{ base: 'sm', xl: 'md' }}>
							{`
							${
								tokenUser?.tokenBalance
									? fromWei({ amount: tokenUser.tokenBalance })
									: 0
							} AKC /
							${tokenUser?.bnbBalance ? fromWei({ amount: tokenUser.bnbBalance }) : 0} BNB
							`}
						</Text>
					</Flex>
				</Flex>
                    <Flex justifyContent="flex-end" alignItems="flex-end" mt={2}>
                        <Link fontSize={'xs'} color={'whiteAlpha.700'} fontWeight={'thin'} href={'#'}>
                            View on BSCScan
                        </Link>
                    </Flex>
				<Flex flexDir={'column'} alignItems="flex-start" mt={4}>
					{active ? (
						<Flex flexDir={'column'} gap={3} w={'full'}>
							<Flex
								gap={3}
								justifyContent={'center'}
								flexDir={{ base: 'column', xl: 'row' }}
							>
									<Button
										isLoading={promiseInProgress}
										onClick={harvestPool}
										variant={'outline'}
                                        borderRadius={'none'}
									>
										Harvest
									</Button>
                                    <GradientButton
                                        text={'Add liquidity'}
                                        onClick={() => setIsAddLiquidModalOpen(true)}
                                    />
							</Flex>
							<AddLiquidityModal
								isOpen={isAddLiquidModalOpen}
								onClose={() => setIsAddLiquidModalOpen(false)}
								action={addLiquidity}
								loading={promiseInProgress}
								liquidityTokenAmount={liquidityTokenAmount}
								onAmountChange={onAmountChange}
							/>
						</Flex>
					) : (
						<GradientButton
							isFullWidth
							size="lg"
							onClick={() => connectWallet(activate, injected)}
							text={'Connect wallet'}
						/>
					)}
				</Flex>
			</Flex>
			<LoadingModal
				isOpen={isConfirmingTransactionLoading}
				onClose={() => setIsConfirmingTransactionLoading(false)}
			/>
		</Flex>
	)
}

const Farming = () => {
	return (
		<Container
			maxW={'8xl'}
			py={8}
			mr={0}
			ml={0}
			px={8}
			h={{ base: '100%' }}
			bgImage={'url(/images/container-bg.svg)'}
			bgPos={'center'}
			bgSize={'cover'}
			color={'white'}
		>
			<Flex
				justifyContent={'space-between'}
				flexDir={{ base: 'column', lg: 'row' }}
				gap={{ base: 4, lg: 8 }}
			>
				<PoolItem coin={'BNB'} icon={BNBIcon} />
				<PoolItem coin={'BUSD'} icon={BUSDIcon} />
			</Flex>

            <Box my={12}>
                <MyHistory />
            </Box>
		</Container>
	)
}
export default Farming
