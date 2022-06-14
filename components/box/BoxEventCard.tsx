import {
	Button,
	Divider,
	Flex,
	HStack,
	IconButton,
	Input,
	Text,
	toast,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import {
	CONTRACT_ADDRESS_BOX,
	CONTRACT_ADDRESS_BOX_EVENT,
	CONTRACT_ADDRESS_TOKEN_B,
} from '../../constants'
import { BoxEventCardProps } from '../../entities/box'
import {
	Box,
	BoxEvent,
	BoxEvent__factory,
	Box__factory,
	TokenB,
	TokenB__factory,
} from '../../official-sc/typechain-types'
import { formatUnixDate, toWei } from '../../utils'
import LoadingModal from '../modal/LoadingModal'

const BoxEventCard = ({ roundId }: BoxEventCardProps) => {
	const { active, activate, account, library, error } = useWeb3React()
	const toast = useToast()

	const [contractBoxEvent, setContractBoxEvent] = useState<BoxEvent>(undefined)
	const [contractTokenB, setContractTokenB] = useState<TokenB>(undefined)

	const [amount, setAmount] = useState(1)

	const [isTransactionLoading, setIsTransactionLoading] = useState(false)

	const [roundInfo, setRoundInfo] =
		useState<BoxEvent.PurchaseRoundStructOutput>(undefined)

	useEffect(() => {
		if (error) {
		}
	}, [error])

	useEffect(() => {
		if (active && library) {
			setContractBoxEvent(
				BoxEvent__factory.connect(
					CONTRACT_ADDRESS_BOX_EVENT,
					library.getSigner()
				)
			)
			setContractTokenB(
				TokenB__factory.connect(CONTRACT_ADDRESS_TOKEN_B, library.getSigner())
			)
		}
	}, [active, account, library])

	useEffect(() => {
		if (contractBoxEvent) {
			getRoundInfo()
		}
	}, [account, contractBoxEvent])

	const getRoundInfo = async () => {
		const roundInfo = await contractBoxEvent.getRoundInfo(roundId)

		setRoundInfo(roundInfo)
	}

	const buyBox = async () => {
		// TODO: input to select amount of boxes
		try {
			const tx = await contractTokenB.approve(
				CONTRACT_ADDRESS_BOX_EVENT,
				toWei(roundInfo.price.toNumber()).mul(amount)
			) // TODO: price is in wei, Tuan

			setIsTransactionLoading(true)
			// wait until this tx is confirmed
			await tx.wait()

			// TODO: remove hardcoded amount ----------------------v
			const tx2 = await contractBoxEvent.buyBox(BigNumber.from(roundId), amount)
			await tx2.wait()

			setIsTransactionLoading(false)
			toast({
				title: 'Success',
				description: 'Boxes successfully purchased',
				status: 'success',
				duration: 2000,
				isClosable: true,
			})
		} catch (ex) {
			setIsTransactionLoading(false)
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
			borderRadius={'md'}
			flexDir="column"
			overflow="hidden"
			height="260px"
			width="300px"
			border="1px"
			borderColor="gray.200"
			bg={useColorModeValue('whiteAlpha.800', 'whiteAlpha.200')}
			// _hover={{ '&>img': { transform: 'scale(1.05)' } }} 
			cursor="pointer"
			p={3}
			gap={2}
		>
			<Flex justifyContent={'space-between'} fontSize="sm">
				<Text>Round Id: {roundId}</Text>
				<Text>Box Type: {roundInfo ? roundInfo.boxType : 'Unknown'}</Text>
			</Flex>
			<Flex fontSize="sm" justifyContent={'space-between'}>
				<Text>Supply: {roundInfo ? roundInfo.supply : 'Unknown'}</Text>
				<Text>Minted: {roundInfo ? roundInfo.minted : 'Unknown'}</Text>
			</Flex>
			<Flex fontSize="sm" flexDir={'column'} alignItems="flex-start">
				<Text>
					Start:{' '}
					{roundInfo
						? formatUnixDate(roundInfo.startTime.toString())
						: 'Unknown'}
				</Text>
				<Text>
					End:{' '}
					{roundInfo ? formatUnixDate(roundInfo.endTime.toString()) : 'Unknown'}
				</Text>
			</Flex>
			<Divider />
			<Flex justifyContent={'space-between'}>
				<Text>
					Price: {roundInfo ? roundInfo.price.toString() : 'Unknown'} AKC
				</Text>
			</Flex>
			<HStack>
				<IconButton
					onClick={() => amount > 1 && setAmount((a) => a - 1)}
					disabled={amount === 1}
					colorScheme={'red'}
					variant={'outline'}
					icon={<FaMinus />}
					aria-label="decrease box amount"
					size="sm"
				></IconButton>
				<Input
					type="number"
					inputMode="numeric"
					pattern="[0-9]*(.[0-9]+)?"
					min={1}
					value={amount}
					onChange={(e) =>
						parseInt(e.target.value) >= 1 && setAmount(parseInt(e.target.value))
					}
					textAlign="center"
					size="sm"
				/>
				<IconButton
					onClick={() => amount < 5 && setAmount((a) => a + 1)}
					disabled={amount === 5}
					colorScheme={'red'}
					icon={<FaPlus />}
					aria-label="increase box amount"
					size="sm"
				></IconButton>
			</HStack>
			<Button
				disabled={account === '' || contractBoxEvent === undefined}
				onClick={buyBox}
				colorScheme="red"
				mt="auto"
			>
				Buy Box
			</Button>
			<LoadingModal
				isOpen={isTransactionLoading}
				onClose={() => setIsTransactionLoading(false)}
			/>
		</Flex>
	)
}

export default BoxEventCard
