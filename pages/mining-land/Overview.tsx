import { Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react'

const Overview = () => {
	return (
		<Flex
			flexDirection={{ base: 'column', lg: 'row' }}
			gap={8}
			flexWrap={'wrap'}
			justifyContent={{ base: 'center', xl: 'space-between' }}
			width={'100%'}
		>
			<VStack px={24} py={6} bg={'#222'}>
				<Text fontSize={'md'} color={'whiteAlpha.700'}>
					My Deposit
				</Text>
				<Text fontSize={'2xl'} fontWeight={'bold'}>
					0{' '}
					<Text fontSize={'md'} fontWeight={'normal'} as={'span'}>
						VPR
					</Text>
				</Text>
				{/* <Text bg={'blackAlpha.800'} p={2} borderRadius={'4px'}>
					= $ 0.00000000
				</Text> */}
			</VStack>
			<VStack px={24} py={6} bg={'#222'}>
				<Text fontSize={'md'}>Total Withdraw</Text>
				<Text fontSize={'2xl'} fontWeight={'bold'}>
					0{' '}
					<Text fontSize={'md'} fontWeight={'normal'} as={'span'}>
						VPR
					</Text>
				</Text>

			</VStack>
			<VStack px={24} py={6} bg={'#222'}>
				<Text fontSize={'md'}>Withdraw Profit</Text>
				<Text fontSize={'2xl'} fontWeight={'bold'}>
					0{' '}
					<Text fontSize={'md'} fontWeight={'normal'} as={'span'}>
						VPR
					</Text>
				</Text>

			</VStack>
		</Flex>
	)
}
export default Overview
