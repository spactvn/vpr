import {
	Box,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
} from '@chakra-ui/react'
import Image from 'next/image'
import { CONNECTION_TYPES } from './connectors'

const ConnectWalletModal = ({
	isOpen,
	onClose,
	onConnect,
}: {
	isOpen: boolean
	onClose: () => void
	onConnect: (type: any) => void
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
			<ModalContent bg="gray.800">
				<ModalCloseButton color={'whiteAlpha.700'} mt={2} />
				<ModalHeader color={'whiteAlpha.700'}>Connect to a wallet</ModalHeader>
				<ModalBody mx="auto">
					<Flex gap={8} pb={3}>
						<Flex p={2} alignItems="center" justifyContent="center">
							<Button
								width={'100%'}
								height={'100%'}
								onClick={() => onConnect(CONNECTION_TYPES.METAMASK)}
							>
								<Image src={'/images/metamask.svg'} width={100} height={100} />
							</Button>
						</Flex>

						<Flex p={2} alignItems="center" justifyContent="center">
							<Button
								width={'100%'}
								height={'100%'}
								onClick={() => onConnect(CONNECTION_TYPES.WALLETCONNECT)}
							>
								<Image
									src={'/images/trustwallet.svg'}
									width={100}
									height={100}
								/>
							</Button>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
export default ConnectWalletModal
