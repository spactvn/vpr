import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'

const Tokenomics = () => {
	const [isLargerThan1920] = useMediaQuery('(min-width: 1920px)')
	return (
		<>
			<h2 id="tokenomics"></h2>
			<Box position="relative" zIndex="12" mt={32} overflow="hidden">
				<Image
					src={'/images/tokenomics-rocket.svg'}
					position="absolute"
					left="0"
					w={'20%'}
				/>
				<Image
					src={'/images/tokenomics-planet.svg'}
					position="absolute"
					right={isLargerThan1920 ? '0' : '-120px'}
					bottom={isLargerThan1920 ? '0' : '-100px'}
					w={'20%'}
				/>
				<Flex flexDir={'column'} alignItems={'center'} pb={{ base: 10, lg: 40 }}>
					<Text
						backgroundClip={'text'}
						fontSize={['2xl', '4xl']}
						mb={12}
						bgGradient={
							'linear-gradient(90deg, #DA9917 0.03%, #FFCF25 32%, #FFFF90 68.03%, #ECBF26 100%)'
						}
					>
						Tokenomics
					</Text>

					<Flex px={{ base: 6, lg: 0 }}>
						<Image src={'/images/tokenomics.svg'} />
					</Flex>
				</Flex>
			</Box>
		</>
	)
}
export default Tokenomics
