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
			<VStack
				px={{ base: 12 }}
				py={6}
				bg={'#222'}
				width={{ base: 'auto', lg: '30%' }}
			>
				<Text fontSize={'md'} color={'whiteAlpha.700'}>
					Your airdrop balance
				</Text>
				<Text fontSize={'2xl'} fontWeight={'bold'}>
					0{' '}
					<Text fontSize={'md'} fontWeight={'normal'} as={'span'}>
						VPR
					</Text>
				</Text>
			</VStack>
			<VStack
				px={{ base: 12 }}
				py={6}
				bg={'#222'}
				width={{ base: 'auto', lg: '30%' }}
			>
				<Text fontSize={'md'} color={'whiteAlpha.700'}>
					Estimated balance
				</Text>
				<Text fontSize={'2xl'} fontWeight={'bold'}>
					0{' '}
					<Text fontSize={'md'} fontWeight={'normal'} as={'span'}>
						VPR
					</Text>
				</Text>
			</VStack>
			<VStack
				px={{ base: 12 }}
				py={6}
				bg={'#222'}
				width={{ base: 'auto', lg: '30%' }}
			>
				<Text fontSize={'md'} color={'whiteAlpha.700'}>
					Your visitor
				</Text>
				<Text fontSize={'2xl'} fontWeight={'bold'}>
					0
				</Text>
			</VStack>
		</Flex>
	)
}
export default Overview
