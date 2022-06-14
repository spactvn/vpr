import {
	Box,
	Button,
	Flex,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import GradientButton from '../../components/button'
import LoadingModal from '../../components/modal/LoadingModal'
import {
	API_ENDPOINT,
	CONTRACT_ADDRESS_BOX,
	CONTRACT_ADDRESS_VPR,
} from '../../constants'
import {
	Box as BoxContract,
	Box__factory,
	VirtualPropertyRight,
	VirtualPropertyRight__factory,
} from '../../official-sc/typechain-types'
import { fromWei, toWei } from '../../utils'
import AddLiquidityModal from '../farming/AddLiquidityModal'

const BuyBox = () => {
	const { active, account, library } = useWeb3React()
	const toast = useToast()

	const [contractBoxEvent, setContractBoxEvent] =
		useState<BoxContract>(undefined)
	const [contractVPR, setContractVPR] =
		useState<VirtualPropertyRight>(undefined)

	const [landId, setLandId] = useState('')
	const [unboxFee, setUnboxFee] = useState(BigNumber.from(0))
	const [boxBought, setBoxBought] = useState(false)
	const [boxAmount, setBoxAmount] = useState(0)

	const [isTransactionLoading, setIsTransactionLoading] = useState(false)
	const [isAddLiquidModalOpen, setIsAddLiquidModalOpen] = useState(false)

	const onAmountChange = (event) => setBoxAmount(event.target.value)

	useEffect(() => {
		if (active && library) {
			setContractBoxEvent(
				Box__factory.connect(CONTRACT_ADDRESS_BOX, library.getSigner())
			)
			setContractVPR(
				VirtualPropertyRight__factory.connect(
					CONTRACT_ADDRESS_VPR,
					library.getSigner()
				)
			)
		}
	}, [active, account, library])

	useEffect(() => {
		if (contractBoxEvent) {
			contractBoxEvent.unboxFee().then(v => setUnboxFee(v))
		}
	}, [contractBoxEvent])

	const buyBox = async () => {
		const resp = await axios.get(`${API_ENDPOINT}/box/${account}`)

		try {
			const tx = await contractVPR.approve(
				CONTRACT_ADDRESS_BOX,
				unboxFee.mul(boxAmount)
			)
			setIsTransactionLoading(true)
			await tx.wait()
			const tx2 = await contractBoxEvent.openBox(boxAmount)
			await tx2.wait()
			setIsTransactionLoading(false)
			toast({
				title: 'Success',
				description: 'Boxes successfully purchased',
				status: 'success',
				duration: 2000,
				isClosable: true,
			})

			setBoxBought(true)
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
		<Flex flexDir={'column'} alignItems={'center'}>
			<Image
				src={'/images/loot-box.svg'}
				objectFit={'cover'}
				objectPosition={'center'}
			/>

			<Text
				bgGradient={'linear-gradient(180deg, #FFE500 0%, #FFFFFF 100%)'}
				backgroundClip={'text'}
				fontSize={'2xl'}
				fontWeight={'bold'}
				mb={3}
			>
				VPR Box
			</Text>
			<Text fontSize={'xl'} mb={3}>
				Remainning boxes: 0
			</Text>
			<Box textAlign={'center'}>
				<GradientButton text={`${fromWei({ amount: unboxFee, roundedDecimal: 4 })} VPR`} px={6} onClick={() => setIsAddLiquidModalOpen(true)} />
			</Box>
			<AddLiquidityModal
				title={"Buy box"}
				isOpen={isAddLiquidModalOpen}
				onClose={() => setIsAddLiquidModalOpen(false)}
				action={buyBox}
				liquidityTokenAmount={boxAmount}
				onAmountChange={onAmountChange} 
				loading={false} />
			<LoadingModal
				isOpen={isTransactionLoading}
				onClose={() => setIsTransactionLoading(false)}
			/>
			{boxBought && (
				<ConfirmBoxBought onClose={() => setBoxBought(false)} landId={landId} />
			)}
		</Flex>
	)
}
export default BuyBox

const ConfirmBoxBought = ({
	onClose,
	landId,
}: {
	onClose: () => void
	landId: string
}) => {
	return (
		<Modal
			isOpen={true}
			onClose={onClose}
			closeOnEsc={true}
			closeOnOverlayClick={true}
			isCentered
		>
			<ModalOverlay />
			<ModalContent bg="whiteAlpha.900">
				<ModalHeader color={'blackAlpha.800'}>
					Land Bought Successfully
				</ModalHeader>
				<ModalBody mx="auto">Successfully bought land #{landId}</ModalBody>
				<ModalFooter>
					<Button colorScheme="white" mr={3} onClick={() => onClose()}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
