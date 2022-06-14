import { Box, Flex, Image, Text } from '@chakra-ui/react'

const Mission = () => {
	return (
		<>
			<Box
				position="relative"
				pt={'50px'}
				height="100%"
				width="100%"
				overflow={'hidden'}
			>
				<Image
					src={'/images/mission-bg.svg'}
					position="absolute"
					height="100%"
					width="100%"
					zIndex="12"
					top="0"
					objectFit={'cover'}
				/>
				<Image
					src={'/images/mission-bg-2.svg'}
					position="absolute"
					height="100%"
					width="100%"
					zIndex="10"
					top="0px"
					mixBlendMode={'normal'}
					objectFit={'cover'}
					display={{ base: 'none', lg: 'block' }}
				/>
				<Image
					src={'/images/mission-land.svg'}
					position="relative"
					zIndex="13"
					mt={{ base: 32, lg: 0 }}
				/>

				<Flex
					flexDir={'column'}
					position="absolute"
					top="30px"
					left="50%"
					transform="translateX(-50%)"
					textAlign={'center'}
					zIndex="14"
					w={{ base: '100%', lg: 'auto' }}
				>
					<Text
						textTransform={'uppercase'}
						color={'white'}
						fontSize={{ base: 'lg', lg: '4xl' }}
					>
						interest rates of the future
					</Text>
					<Text color={'whiteAlpha.700'} fontSize={['xs', 'md']} mt={2}>
						VRP wants to provide a solid platform for location-based games and
						technologies, which supports powerful virtual communities and
						economies.
					</Text>
				</Flex>
				<Image
					src={'/images/mission-planet.svg'}
					position="absolute"
					right={{ base: '-30px', lg: '0' }}
					top={'0'}
					w={{ base: '30%' }}
					zIndex="13"
				/>
			</Box>
		</>
	)
}
export default Mission
