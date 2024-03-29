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

const ConfirmModal = ({
	isOpen,
	onClose,
	loading,
	liquidityTokenAmount,
	onAmountChange,
	addLiquidity,
}: {
	isOpen: boolean
	onClose: () => void
	liquidityTokenAmount: number
	onAmountChange: (event: any) => void
	addLiquidity: () => void
	loading: boolean
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
				<ModalHeader mx="auto">Add Liquidity</ModalHeader>
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
						text={'Confirm'}
						isLoading={loading}
						onClick={addLiquidity}
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
export default ConfirmModal
