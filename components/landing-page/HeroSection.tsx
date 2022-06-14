import { Box, Image } from '@chakra-ui/react'
const HeroSection = () => {
	return (
		<Box position="relative">
			<Image src="/images/hero-section-bg.svg" position="relative" />
			<Image
				src="/images/hero-section-banner.svg"
				position="absolute"
				bottom="44px"
				zIndex="10"
			/>
			<Image
				src="/images/hero-section-text.svg"
				position="absolute"
				bottom="0"
				left="50%"
				transform="translateX(-50%)"
				zIndex="11"
			/>
		</Box>
	)
}
export default HeroSection
