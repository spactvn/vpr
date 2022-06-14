import { Box, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react'

const UpgradeConditions = () => {
	return (
		<Box my={6}>
			<Text
				fontSize={{ base: 'md', lg: '2xl' }}
				bgGradient={
					'linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)'
				}
				backgroundClip={'text'}
				fontWeight={'bold'}
				mb={4}
			>
				Upgrade Conditions
			</Text>
			<Flex
				flexDirection={{ base: 'column', md: 'row' }}
				gap={{ base: 4, md: 8 }}
				justifyContent={{ base: 'center', md: 'space-between' }}
				width={'100%'}
			>
				<VStack
					px={{ base: 4, lg: 8 }}
					py={6}
					bg={'#222'}
					width={{ base: '100%', md: 'calc(100% / 3 - 24px)' }}
				>
					<Text fontSize={{ base: 'sm', lg: 'md' }} color={'whiteAlpha.700'}>
						8 Bronze =
					</Text>
					<Text
						fontSize={{ base: 'md', lg: '2xl' }}
						bgGradient={
							'linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)'
						}
						backgroundClip={'text'}
						fontWeight={'bold'}
					>
						1 Silver
					</Text>
				</VStack>
				<VStack
					px={{ base: 4, lg: 8 }}
					py={6}
					bg={'#222'}
					width={{ base: '100%', md: 'calc(100% / 3 - 24px)' }}
				>
					<Text fontSize={{ base: 'sm', lg: 'md' }} color={'whiteAlpha.700'}>
						8 Silver =
					</Text>
					<Text
						fontSize={{ base: 'md', lg: '2xl' }}
						bgGradient={
							'linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)'
						}
						backgroundClip={'text'}
						fontWeight={'bold'}
					>
						1 Gold
					</Text>
				</VStack>
				<VStack
					px={{ base: 4, lg: 8 }}
					py={6}
					bg={'#222'}
					width={{ base: '100%', md: 'calc(100% / 3 - 24px)' }}
				>
					<Text fontSize={{ base: 'sm', lg: 'md' }} color={'whiteAlpha.700'}>
						15 Gold =
					</Text>
					<Text
						fontSize={{ base: 'md', lg: '2xl' }}
						bgGradient={
							'linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)'
						}
						backgroundClip={'text'}
						fontWeight={'bold'}
					>
						1 Diamond
					</Text>
				</VStack>
			</Flex>
		</Box>
	)
}
export default UpgradeConditions
