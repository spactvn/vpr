import {
	Box,
	Divider,
	Flex,
	Table,
	TableContainer,
	Text,
	Thead,
	Th,
	Tbody,
	Tr,
	Td,
	Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import GradientButton from '../../components/button'

const GetAirdrop = () => {
	const router = useRouter()
	return (
		<Box flex="1 1 auto">
			<Flex flexDir={'column'} p={3} bg={'#222222'} color={'white'}>
				<Text fontSize={['2xl']} pt={3}>
					Get Airdrop
				</Text>
				<Divider my={3} />

				<Text fontSize={['lg']} pt={3} mb={3}>
					Complete These Steps To Receive Airdrop
				</Text>
				<Flex flexDir={'column'} color="whiteAlpha.700">
					<Text mb={3}>Step 1: Join Telegram Group Chat</Text>
					<Text mb={3}>Step 2: Official Twitter Follow</Text>
					<Text mb={3}>Step 3: Retweet The Pinned Post</Text>
					<Text mb={3}>Step 4: Comment in the tweet and tag 3 friends</Text>
					<Text>
						Step 5: Connect Your Binance Smart Chain Wallet And Share your
						referral link to receive up to 30% commision
					</Text>
				</Flex>

				<Box textAlign={'center'} mt={{ base: 12, xl: '77px' }}>
					<GradientButton
						text={'Get Airdrop'}
						maxW={'260px'}
						onClick={() => {
							router.push('/airdrop')
						}}
					/>
				</Box>
			</Flex>
		</Box>
	)
}
export default GetAirdrop
