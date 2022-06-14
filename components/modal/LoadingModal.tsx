import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
} from '@chakra-ui/react'

const LoadingModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean
	onClose: () => void
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnEsc={false}
			closeOnOverlayClick={false}
			isCentered
		>
			<ModalOverlay />
			<ModalContent bg="blackAlpha.900">
				<ModalHeader color={'whiteAlpha.700'}>
					Confirming Transaction...
				</ModalHeader>
				<ModalBody mx="auto">
					<Spinner
						size="xl"
						thickness="4px"
						speed="0.8s"
						emptyColor="whiteAlpha.200"
						color="orange.500"
						my={8}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
export default LoadingModal
