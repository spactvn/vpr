import {
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
} from '@chakra-ui/react'
import GradientButton from '../../components/button'

const AddLiquidityModal = ({
	title = "Add liquidity",
	isOpen,
	onClose,
	loading,
	liquidityTokenAmount,
	onAmountChange,
	action: addLiquidity,
}: {
	isOpen: boolean
	onClose: () => void
	liquidityTokenAmount: number
	onAmountChange: (event: any) => void
	action: () => void
	loading: boolean
	title?: string,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={false}
			isCentered
		>
			<ModalOverlay />
			<ModalContent
				bgImage={'url(/images/container-bg.svg)'}
				bgPos={'center'}
				bgSize={'cover'}
				color={'white'}
			>
				<ModalCloseButton />
				<ModalHeader mx="auto">{title}</ModalHeader>
				<ModalBody mx="auto">
					<Input
						value={liquidityTokenAmount}
						onChange={onAmountChange}
						placeholder="0"
						size="sm"
						color={useColorModeValue('white', 'whiteAlpha.800')}
						variant={'filled'}
						bg={'#222'}
						_hover={{ bg: '#333' }}
						_focus={{ borderColor: 'gray.600' }}
					/>
				</ModalBody>

				<ModalFooter mx="auto">
					<GradientButton
						text={title}
						isLoading={loading}
						onClick={addLiquidity}
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
export default AddLiquidityModal
