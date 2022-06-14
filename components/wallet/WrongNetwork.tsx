import {
	Text,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Flex,
	Box,
	VStack,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import {
	APP_CHAIN_ID,
	BINANCE_MAINNET_CHAIN_ID,
	BINANCE_TESTNET_CHAIN_ID,
} from '../../constants'

function WrongNetwork() {
	const { active, connector, chainId } = useWeb3React()
	const [isWrongNetwork, setIsWrongNetwork] = useState(false)

	const switchNetwork = () => {
		let chainParam: object

		switch (APP_CHAIN_ID) {
			case BINANCE_MAINNET_CHAIN_ID:
				chainParam = {
					chainId: '0x38',
					rpcUrls: ['https://bsc-dataseed.binance.org/'],
					chainName: 'Smart Chain',
					nativeCurrency: {
						name: 'BNB',
						symbol: 'BNB',
						decimals: 18,
					},
					blockExplorerUrls: ['https://bscscan.com'],
				}
				break
			case BINANCE_TESTNET_CHAIN_ID:
				chainParam = {
					chainId: '0x61',
					rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
					chainName: 'Smart Chain - Testnet',
					nativeCurrency: {
						name: 'BNB',
						symbol: 'BNB',
						decimals: 18,
					},
					blockExplorerUrls: ['https://testnet.bscscan.com'],
				}
				break
			default:
				chainParam = {
					chainId: '0x61',
					rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
					chainName: 'Smart Chain - Testnet',
					nativeCurrency: {
						name: 'BNB',
						symbol: 'BNB',
						decimals: 18,
					},
					blockExplorerUrls: ['https://testnet.bscscan.com'],
				}
				break
		}

		;(window as any).ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [chainParam],
		})
	}

	useEffect(() => {
		const checkChainId = async () => {
			setIsWrongNetwork(chainId !== parseInt(APP_CHAIN_ID, 16))
		}

		if (chainId) {
			checkChainId()
		}
	}, [active, chainId])

	return (
		<Modal blockScrollOnMount={false} isOpen={isWrongNetwork} onClose={null}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color={'white'}>
					<Flex justify="center">
						<Text>Wrong network</Text>
					</Flex>
				</ModalHeader>
				<ModalBody>
					<VStack spacing={4} align="center" color={'white'}>
						<Box>
							<Spinner />
						</Box>
						<Box>
							<Text fontSize={'sm'}>Change network to</Text>
						</Box>
						<Box>
							<Button onClick={switchNetwork}>Binance Smart Chain</Button>
						</Box>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default WrongNetwork
