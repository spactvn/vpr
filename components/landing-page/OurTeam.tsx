import { Box, Flex, Image, Text } from '@chakra-ui/react'

const OurTeam = () => {
	return (
		<Box position="relative">
			<Image
				src={'/images/our-team-partnet-tokenomics-bg.svg'}
				position="absolute"
				top="170px"
				height={['2800px', '100%']}
				mixBlendMode={'normal'}
			/>
			<Flex
				flexDir={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				mb={12}
				position="relative"
				zIndex="12"
			>
				<Text color={'whiteAlpha.600'}>Virtual Space</Text>
				<Text color={'white'} fontSize={['2xl', '4xl']}>
					Our Team
				</Text>
			</Flex>
			<Flex
				flexDir={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				gap={6}
				position="relative"
				zIndex="12"
				px={{ base: 6, lg: 0 }}
			>
				<Flex flexDir={{ base: 'column', lg: 'row' }} gap={6}>
					<Image src={'/images/our-team-joe-liow.svg'} />
					<Image src={'/images/our-team-jimmy-rrian.svg'} />
					<Image src={'/images/our-team-karie-joine.svg'} />
				</Flex>
				<Flex flexDir={{ base: 'column', lg: 'row' }} gap={6}>
					<Image src={'/images/our-team-dyan-mesak.svg'} />
					<Image src={'/images/our-team-malisa-kueoi.svg'} />
					<Image src={'/images/our-team-keyly-joshephia.svg'} />
				</Flex>
			</Flex>
		</Box>
	)
}
export default OurTeam
