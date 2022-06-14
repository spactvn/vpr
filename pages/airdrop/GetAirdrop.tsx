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
	Image,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { OutlineButton } from '../../components/button'
import Counter from '../../components/counter'
import { formatDate } from '../../utils'

const MyHistory = () => {
	return (
		<Flex
			flexDir={'column'}
			bg={'#222'}
			py={{ base: 3, lg: 0 }}
			maxWidth={'100%'}
			overflow={'auto'}
		>
			<Image
				src={'/images/airdrop-event-lg.svg'}
				display={{ base: 'none', lg: 'block' }}
				width="100%"
				height="100%"
			/>
			<Flex flexDir={'column'} display={{ base: 'flex', lg: 'none' }}>
				<Text fontSize={'xl'} px={3}>
					Get Airdrop
				</Text>
				<Divider my={3} color={'whiteAlpha.300'} />

				<Image
					src={'/images/airdrop-event-sm.svg'}
					width="100%"
					height="100%"
				/>
				<Box px={3}>
					<Text fontSize={['md']} pt={3} mb={3}>
						Complete These Steps To Receive Airdrop
					</Text>
					<Flex flexDir={'column'} fontSize={'sm'} color="whiteAlpha.700">
						<Text mb={3}>Step 1: Join Telegram Group Chat</Text>
						<Text mb={3}>Step 2: Official Twitter Follow</Text>
						<Text mb={3}>Step 3: Retweet The Pinned Post</Text>
						<Text mb={3}>Step 4: Comment in the tweet and tag 3 friends</Text>
						<Text>
							Step 5: Connect Your Binance Smart Chain Wallet And Share your
							referral link to receive up to 30% commision
						</Text>
					</Flex>
				</Box>
			</Flex>
		</Flex>
	)
}
export default MyHistory
