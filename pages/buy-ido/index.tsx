import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import GradientButton from '../../components/button'
import BuyTransaction from './BuyTransaction'
import BuyWithCoins from './BuyWithCoins'
import Countdown from './Countdown'

const BuyIDO = () => {
	return (
		<Container
			maxW={'8xl'}
			py={8}
			mr={0}
			ml={0}
			px={{ base: 4, lg: 8 }}
			bgImage={'url(/images/container-bg.svg)'}
			bgPos={'center'}
			bgSize={'cover'}
			color={'white'}
		>
			<VStack p={0} spacing={8}>
				<BuyWithCoins />

				<Countdown />

				<BuyTransaction />
			</VStack>
		</Container>
	)
}
export default BuyIDO
