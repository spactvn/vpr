import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { BoxIcon, CountdownTimerIcon, StarIcon } from '../../components/icons'

const LootBoxOverview = () => {
	return (
		<Flex
			flexDirection={{ base: 'column', lg: 'row' }}
			gap={{ base: 4, xl: 8 }}
			flexWrap={'wrap'}
			justifyContent={{ base: 'center', lg: 'space-between' }}
			width={'100%'}
		>
			<HStack
				p={{ base: 2, xl: 4 }}
				justifyContent={'center'}
				spacing={4}
				bg={'#222'}
				width={{ base: '100%', lg: '30%' }}
			>
				<Flex
					w={{ base: 10, xl: 20 }}
					h={{ base: 10, xl: 20 }}
					justifyContent={'center'}
					alignItems={'center'}
					bg={'black'}
					borderRadius={'full'}
				>
					<Icon as={BoxIcon} w={{ base: 6, xl: 10 }} h={{ base: 6, xl: 10 }} />
				</Flex>
				<VStack align={'flex-start'} w={'50%'}>
					<Text fontSize={{ base: 'sm', xl: 'md' }}>AVAILABLE</Text>
					<Text fontSize={{ base: 'lg', xl: '2xl' }} fontWeight={'bold'}>
						<Text color={'orange'} as={'span'}>
							0
						</Text>
						/26K+
					</Text>
				</VStack>
			</HStack>
			<HStack
				p={{ base: 2, xl: 4 }}
				justifyContent={'center'}
				spacing={4}
				bg={'#222'}
				width={{ base: '100%', lg: '30%' }}
			>
				<Flex
					w={{ base: 10, xl: 20 }}
					h={{ base: 10, xl: 20 }}
					justifyContent={'center'}
					alignItems={'center'}
					bg={'black'}
					borderRadius={'full'}
				>
					<Icon
						as={CountdownTimerIcon}
						w={{ base: 6, xl: 10 }}
						h={{ base: 6, xl: 10 }}
					/>
				</Flex>
				<VStack align={'flex-start'} w={'50%'}>
					<Text fontSize={{ base: 'sm', xl: 'md' }}>TIME REMAINING</Text>
					<Text
						fontSize={{ base: 'lg', xl: '2xl' }}
						color={'orange'}
						fontWeight={'bold'}
					>
						0D 0H 0M
					</Text>
				</VStack>
			</HStack>
			<HStack
				p={{ base: 2, xl: 4 }}
				justifyContent={'center'}
				spacing={4}
				bg={'#222'}
				width={{ base: '100%', lg: '30%' }}
			>
				<Flex
					w={{ base: 10, xl: 20 }}
					h={{ base: 10, xl: 20 }}
					justifyContent={'center'}
					alignItems={'center'}
					bg={'black'}
					borderRadius={'full'}
				>
					<Icon as={StarIcon} w={{ base: 6, xl: 10 }} h={{ base: 6, xl: 10 }} />
				</Flex>
				<VStack align={'flex-start'} w={'50%'}>
					<Text fontSize={{ base: 'sm', xl: 'md' }}>PURCHASED</Text>
					<Text
						fontSize={{ base: 'lg', xl: '2xl' }}
						color={'orange'}
						fontWeight={'bold'}
					>
						-/1
					</Text>
				</VStack>
			</HStack>
		</Flex>
	)
}
export default LootBoxOverview
