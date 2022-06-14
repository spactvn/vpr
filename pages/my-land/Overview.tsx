import { Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react'

const Overview = () => {
	return (
		<Flex
			mt={8}
			flexDirection={{ base: 'column', xl: 'row' }}
			gap={{ base: 4, lg: 6 }}
			justifyContent={{ base: 'center', xl: 'space-between' }}
			width={'100%'}
		>
			<HStack spacing={{ base: 4, lg: 6 }} width={{ base: '100%', xl: '50%' }}>
				<VStack
					px={{ base: 4, lg: 6 }}
					py={6}
					bg={'#222'}
					width={{ base: '48%' }}
				>
					<Text fontSize={{ base: 'sm', lg: 'md' }} color={'whiteAlpha.700'}>
						My Items
					</Text>
					<Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight={'bold'}>
						80
					</Text>
				</VStack>
				<VStack
					px={{ base: 4, lg: 6 }}
					py={6}
					bg={'#222'}
					width={{ base: '48%' }}
				>
					<Text fontSize={{ base: 'sm', lg: 'md' }} color={'whiteAlpha.700'}>
						Volume
					</Text>
					<Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight={'bold'}>
						$1,358,808.73
					</Text>
				</VStack>
			</HStack>
			<HStack spacing={{ base: 4, lg: 6 }} width={{ base: '100%', xl: '50%' }}>
				<VStack
					px={{ base: 4, lg: 6 }}
					py={6}
					bg={'#222'}
					width={{ base: '48%' }}
				>
					<Text fontSize={{ base: 'sm', lg: 'md' }} color={'whiteAlpha.700'}>
						Floor Price
					</Text>
					<Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight={'bold'}>
						$209.00
					</Text>
				</VStack>
				<VStack
					px={{ base: 4, lg: 6 }}
					py={6}
					bg={'#222'}
					width={{ base: '48%' }}
				>
					<Text fontSize={{ base: 'sm', lg: 'md' }} color={'whiteAlpha.700'}>
						Total Supply
					</Text>
					<Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight={'bold'}>
						047070
					</Text>
				</VStack>
			</HStack>
		</Flex>
	)
}
export default Overview
