import {
	Box,
	Button,
	Divider,
	Flex,
	Image,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Text,
	useNumberInput,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { BigNumber, ContractTransaction, ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import GradientButton from '../../components/button'
import LoadingModal from '../../components/modal/LoadingModal'
import { connectWallet, injected } from '../../components/wallet/connectors'
import { CONTRACT_ADDRESS_BUSD, CONTRACT_ADDRESS_ICO, ICO_ROUND_ID } from '../../constants'
import {
	ICO,
	ICO__factory,
	IERC20,
	IERC20__factory,
} from '../../official-sc/typechain-types'
import { decimalToWei, fromWei } from '../../utils'

export type ICORoundInfoData = {
	priceBNB: BigNumber
	priceBUSD: BigNumber
	amount: BigNumber
	startTime: BigNumber
	endTime: BigNumber
	deposited: BigNumber
}

const BuyWithCoin = ({
	type,
	minAmount,
	image,
}: {
	type: string,
	minAmount: number,
	image: string,
}) => {
	const toast = useToast()
	const router = useRouter()

	const { ref } = router.query
	const [addressReference, setAddressReference] = useState(ethers.constants.AddressZero)

	const { active, activate, account, library } = useWeb3React()

	// contract instances
	const [contractICO, setContractICO] = useState<ICO>(undefined)
	const [contractBUSD, setContractBUSD] = useState<IERC20>(undefined)
	const [nativeBalance, setNativeBalance] = useState(BigNumber.from(0))
	const [tokenBalance, setTokenBalance] = useState(BigNumber.from(0))

	// nft pools
	const [liquidityTokenAmount, setLiquidityTokenAmount] = useState(0.2)
	const [isConfirmingTransactionLoading, setIsConfirmingTransactionLoading] =
		useState(false)

	const [roundId, setRoundId] = useState(ICO_ROUND_ID)
	const [icoRoundInfo, setIcoRoundInfo] = useState<ICORoundInfoData>(undefined)
	const { getInputProps, valueAsNumber } = useNumberInput({
		step: 0.01,
		defaultValue: 0.2,
		min: 0.1,
		max: 6,
		precision: 2,
	})
	const [BNBValue, setBNBValue] = useState(minAmount)
	const [isValidValue, setIsValidValue] = useState(true)

	useEffect(() => {
		if (active && library) {
			setContractICO(
				ICO__factory.connect(CONTRACT_ADDRESS_ICO, library.getSigner())
			)

			setContractBUSD(
				IERC20__factory.connect(CONTRACT_ADDRESS_BUSD, library.getSigner())
			)

			library.getSigner().getBalance().then(setNativeBalance)
		}
	}, [active, account, library])

	useEffect(() => {
		if (ref && isAddress(ref.toString())) {
			setAddressReference(ref.toString())
			localStorage.setItem('addressReference', ref.toString())
		} else {
			const _addressReference = localStorage.getItem('addressReference')
			if (_addressReference) {
				setAddressReference(_addressReference)
			}
		}
	}, [ref])

	useEffect(() => {
		if (account && contractBUSD) {
			contractBUSD.balanceOf(account).then((v) => setTokenBalance(v))
		}
	}, [account, contractBUSD])

	useEffect(() => {
		if (account && contractICO) {
			contractICO._icoRound(roundId).then(setIcoRoundInfo)
		}
	}, [roundId, contractBUSD])

	const [minBUSDAmount, setMinBUSDAmount] = useState(minAmount)

	useEffect(() => {
		if (type === 'busd') {
			axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=BNBBUSD`)
				.then((resp) => {
					const bnbPriceUSD = resp.data.weightedAvgPrice
					const _minValue = parseFloat((0.02 * bnbPriceUSD).toFixed(2))
					setMinBUSDAmount(_minValue);
					setBNBValue(_minValue)
				})
		}
	}, [])

	useEffect(() => {
		if (type === 'busd') {
			setIsValidValue(BNBValue >= minBUSDAmount)
		} else {
			setIsValidValue(BNBValue >= minAmount)
		}
	}, [BNBValue])

	const addLiquidity = async () => {
		const amountInWei = decimalToWei(BNBValue)

		try {
			let tx: ContractTransaction

			if (type === 'bnb') {
				tx = await contractICO.deposit(
					roundId,
					amountInWei,
					addressReference,
					type.toUpperCase() === 'BNB',
					{ value: amountInWei }
				)
			} else {
				tx = await contractBUSD.approve(CONTRACT_ADDRESS_ICO, amountInWei)
				// wait until this tx is confirmed
				setIsConfirmingTransactionLoading(true)
				await tx.wait()
				setIsConfirmingTransactionLoading(false)
				// need to convert token amount to wei
				tx = await contractICO.deposit(roundId, amountInWei, addressReference, false)
			}

			if (tx) {
				// wait until this tx is confirmed
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
			flexDir={'column'}
			py={3}
			bg={'#222'}
			width={{ base: '100%', xl: '48%' }}
		>
			<Flex px={6} alignItems={'center'}>
				<Image src={image} />
				<Text fontSize={'md'} ml={2}>
					{type.toUpperCase()}
				</Text>
			</Flex>
			<Divider my={4} />

			<Flex px={6} flexDir={'column'}>
				<Flex flexDir={'column'} mb={3}>
					<Flex
						justifyContent={'space-between'}
						color={'whiteAlpha.700'}
						fontSize={'sm'}
						mb={2}
					>
						<Text>Currency</Text>{' '}
						<Text>
							Balance:{' '}
							{fromWei({
								amount: type === 'bnb' ? nativeBalance : tokenBalance,
								roundedDecimal: 4
							})}{' '}
							{type.toUpperCase()}
						</Text>
					</Flex>

					<InputGroup>
						<InputLeftAddon children={type.toUpperCase()} />
						<Input
							color={isValidValue ? 'white.900' : 'red.900'}
							border={'none'}
							variant="filled"
							{...getInputProps()}
							value={BNBValue}
							onChange={(e: any) =>
								setBNBValue(e.target.value)
							}
						/>
						<InputRightElement width="4.5rem">
							<Button
								h="1.75rem"
								size="sm"
								variant="ghost"
								textDecor={'underline'}
								color={'whiteAlpha.700'}
								onClick={() =>
									type === 'bnb'
										? setBNBValue(Number(fromWei({ amount: nativeBalance })))
										: setBNBValue(Number(fromWei({ amount: tokenBalance })))
								}
							>
								MAX
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>

				<Flex flexDir={'column'} mb={3}>
					<Flex
						justifyContent={'space-between'}
						color={'whiteAlpha.700'}
						fontSize={'sm'}
						mb={2}
					>
						<Text>Receive</Text>
					</Flex>

					<InputGroup mb={1}>
						<InputLeftAddon children={'VPR'} />
						<Input
							border={'none'}
							variant="filled"
							value={
								BNBValue *
								(type === 'bnb'
									? icoRoundInfo?.priceBNB?.toNumber()
									: icoRoundInfo?.priceBUSD?.toNumber())
							}
							readOnly
						/>
					</InputGroup>

					<Text fontSize={'xs'} color={'whiteAlpha.700'}>
						1 {type.toUpperCase()} ~={' '}
						{type === 'bnb'
							? icoRoundInfo?.priceBNB?.toNumber().toString()
							: icoRoundInfo?.priceBUSD?.toNumber().toString()}{' '}
						VPR
					</Text>
				</Flex>

				<Box py={3} textAlign={'center'}>
					{active ? (
						<GradientButton
							disabled={!isValidValue}
							text={'Buy VPR'}
							isClipPath
							onClick={addLiquidity}
						/>
					) : (
						<GradientButton
							isFullWidth
							size="lg"
							onClick={() => connectWallet(activate, injected)}
							text={'Connect wallet'}
						/>
					)}
				</Box>

				<LoadingModal
					isOpen={isConfirmingTransactionLoading}
					onClose={() => setIsConfirmingTransactionLoading(false)}
				/>
			</Flex>
		</Flex>
	)
}
const BuyWithCoins = () => {
	return (
		<Flex
			flexDirection={{ base: 'column', lg: 'row' }}
			gap={'8'}
			flexWrap={'wrap'}
			justifyContent={{ base: 'center', xl: 'space-between' }}
			width={'100%'}
		>
			<BuyWithCoin minAmount={0.02} type="bnb" image="/images/bnb-icon.svg" />
			<BuyWithCoin minAmount={8} type="busd" image="/images/busd.svg" />
		</Flex>
	)
}
export default BuyWithCoins
