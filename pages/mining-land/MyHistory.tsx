import {
	Box,
	Divider,
	Table,
	TableContainer,
	Text,
	Thead,
	VStack,
	Tr,
	Th,
	Tbody,
	Td,
	Flex,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import { OutlineButton } from '../../components/button'
import Counter from '../../components/counter'
import LoadingModal from '../../components/modal/LoadingModal'
import { CONTRACT_ADDRESS_FARMING, CONTRACT_ADDRESS_ICO } from '../../constants'
import { TickerData } from '../../entities/ticker'
import {
	FarmingPool,
	FarmingPool__factory,
	ICO,
	ICO__factory,
} from '../../official-sc/typechain-types'
import { formatDate, fromWei } from '../../utils'
import { ICORoundInfoData } from '../buy-ido/BuyWithCoins'

const PACKAGE_TYPES = {
	4: 'Diamond',
	3: 'Gold',
	2: 'Silver',
	1: 'Bronze',
}
const HistoryPool = ({
	contractFarming,
	account,
	poolId,
	priceBNB,
	openPriceBNBUSDT,
	setIsLoading,
}: {
	contractFarming: FarmingPool
	account: string
	poolId: number
	priceBNB: number
	openPriceBNBUSDT: number
	setIsLoading: Dispatch<SetStateAction<boolean>>
}) => {
	const [nftUser, setNftUser] = useState<{
		FTBalance: BigNumber
		lastUpdate: BigNumber
	}>(undefined)
	const [poolReward, setPoolReward] = useState(BigNumber.from(0))
	const toast = useToast()

	const getPoolMetrics = useCallback(async () => {
		const _ftUser = await contractFarming._FTUser(account, poolId)
		setNftUser(_ftUser)
		const _poolReward = await contractFarming.estimateMiningPoolReward(account, poolId)
		setPoolReward(_poolReward)
	}, [contractFarming])

	useEffect(() => {
		if (contractFarming) {
			getPoolMetrics()
		}
	}, [account, contractFarming])

	const handleHarvestPool = useCallback(async () => {
		setIsLoading(true)
		try {
			await contractFarming.harvestMiningPoolReward(poolId)
			setIsLoading(false)
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
	}, [setIsLoading, contractFarming, poolId, toast])

	const handleRemovePool = useCallback(async () => {
		try {
			setIsLoading(true)
			const _nftUser = await contractFarming._FTUser(account, poolId)

			const tx = await contractFarming.removeMiningPool(
				poolId,
				_nftUser.FTBalance
			)
			setIsLoading(true)
			await tx.wait()
			setIsLoading(false)
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
	}, [setIsLoading, contractFarming, poolId, toast])

	const beautifyAmount = (amnt: BigNumber) => {
		const _roundedMiningAmount = fromWei({
			amount: amnt,
			roundedDecimal: 4
		});

		// if it's too small, show approx to zero
		if (_roundedMiningAmount === "0.0000") {
			return "≈ 0"
		} else {
			return `${_roundedMiningAmount}`
		}
	}

	return (
		<>
			<Tr>
				<Td>
					{nftUser?.lastUpdate?.toNumber() === 0
						? '----'
						: formatDate(
							dayjs.unix(nftUser?.lastUpdate?.toNumber()).toString(),
							'DD-MM-YYYY HH:mm'
						)}
				</Td>
				<Td>{PACKAGE_TYPES[poolId]}</Td>
				<Td isNumeric>
					<Text color={'white'} fontSize={'lg'} as={'span'}>
						{beautifyAmount(nftUser?.FTBalance ?? BigNumber.from(0))}
					</Text>
					{' AKC'}
				</Td>
				<Td isNumeric>
					<Text color={'white'} fontSize={'lg'} as={'span'}>
						{beautifyAmount(poolReward)}
					</Text>
					{' AKC'}
				</Td>
				<Td>
					<OutlineButton text={'Harvest'} onClick={handleHarvestPool} />
				</Td>
				<Td>
					{nftUser?.lastUpdate.eq(0) ? (
						'----'
					) : dayjs().isAfter(dayjs.unix(nftUser?.lastUpdate.toNumber())) ? (
						<Counter
							startTime={dayjs.unix(nftUser?.lastUpdate.toNumber()).toDate()}
							endTime={dayjs.unix(nftUser?.lastUpdate.toNumber()).add(poolId * 5, 'day').toDate()}
						/>
					) : (
						<OutlineButton
							text={'Remove Liquid'}
							onClick={handleRemovePool}
						/>
					)}
				</Td>
			</Tr>
		</>
	)
}
const MyHistory = () => {
	const { active, activate, account, library } = useWeb3React()
	const { promiseInProgress } = usePromiseTracker()
	const [isLoading, setIsLoading] = useState(false)

	// contract instances
	const [contractFarming, setContractFarming] = useState<FarmingPool>(undefined)

	const [contractICO, setContractICO] = useState<ICO>(undefined)

	const [roundId, setRoundId] = useState(1)
	const [icoRoundInfo, setIcoRoundInfo] = useState<ICORoundInfoData>(undefined)

	const [metric, setMetric] = useState<TickerData>(undefined)

	useEffect(() => {
		if (active && library) {
			setContractFarming(
				FarmingPool__factory.connect(
					CONTRACT_ADDRESS_FARMING,
					library.getSigner()
				)
			)
			setContractICO(
				ICO__factory.connect(CONTRACT_ADDRESS_ICO, library.getSigner())
			)
		}
	}, [active, account, library])

	useEffect(() => {
		if (account && contractICO) {
			contractICO._icoRound(roundId).then(setIcoRoundInfo)
		}
	}, [account, contractICO, roundId])

	useEffect(() => {
		const fetchMetrics = async () => {
			const resp = await axios.get(
				`https://api.binance.com/api/v3/ticker/24hr?symbol=BNBUSDT`
			)
			setMetric(resp.data)
		}
		fetchMetrics()
	}, [])

	return (
		<Flex
			flexDir={'column'}
			bg={'#222'}
			py={3}
			maxWidth={'100%'}
			overflow={'auto'}
			w={'100%'}
		>
			<Text fontSize={'xl'} px={3}>
				My History
			</Text>
			<Divider my={3} color={'whiteAlpha.300'} />

			<Box px={3} w={'100%'}>
				<TableContainer w={'100%'}>
					<Table variant="striped" colorScheme="blackAlpha">
						<Thead>
							<Tr>
								<Th>Date</Th>
								<Th>Package</Th>
								<Th isNumeric>Mining Amount</Th>
								<Th isNumeric>Earn</Th>
								<Th>Harvest</Th>
								<Th>Remove Liquid</Th>
							</Tr>
						</Thead>
						<Tbody color={'whiteAlpha.700'}>
							<HistoryPool
								poolId={1}
								contractFarming={contractFarming}
								account={account}
								priceBNB={icoRoundInfo?.priceBNB?.toNumber()}
								openPriceBNBUSDT={Number(metric?.openPrice)}
								setIsLoading={setIsLoading}
							/>
							<HistoryPool
								poolId={2}
								contractFarming={contractFarming}
								account={account}
								priceBNB={icoRoundInfo?.priceBNB?.toNumber()}
								openPriceBNBUSDT={Number(metric?.openPrice)}
								setIsLoading={setIsLoading}
							/>
							<HistoryPool
								poolId={3}
								contractFarming={contractFarming}
								account={account}
								priceBNB={icoRoundInfo?.priceBNB?.toNumber()}
								openPriceBNBUSDT={Number(metric?.openPrice)}
								setIsLoading={setIsLoading}
							/>
							<HistoryPool
								poolId={4}
								contractFarming={contractFarming}
								account={account}
								priceBNB={icoRoundInfo?.priceBNB?.toNumber()}
								openPriceBNBUSDT={Number(metric?.openPrice)}
								setIsLoading={setIsLoading}
							/>
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
			<LoadingModal isOpen={isLoading} onClose={() => setIsLoading(false)} />
		</Flex>
	)
}
export default MyHistory
