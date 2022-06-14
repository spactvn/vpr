import {
	Container,
	Stack,
	Flex,
	Box,
	Heading,
	Text,
	Button,
	Image,
	Icon,
	IconButton,
	createIcon,
	IconProps,
	useColorModeValue,
	HStack,
	VStack,
} from '@chakra-ui/react'
import CoinChart from './CoinChart'
import GetAirdrop from './GetAirdrop'
import HighlightedFeatures from './HighlightedFeatures'
import IDOEvent from './IDOEvent'
import MiningLand from './MiningLand'
import Services from './Services'

export default function CallToActionWithVideo() {
	return (
		<Container
			maxW={'8xl'}
			py={3}
			mr={0}
			ml={0}
			px={2}
			bgImage={'url(/images/container-bg.svg)'}
			bgPos={'center'}
			bgSize={'cover'}
		>
			<VStack p={0} spacing={6}>
				<Services />
				<CoinChart />
				<Flex flexDir={{ base: 'column', xl: 'row' }} gap={6} maxW={'100%'}>
					<Flex w={{ base: '100%', xl: 'calc(50% - 12px)' }}>
						<IDOEvent />
					</Flex>
					<Flex
						flexDir={['column']}
						gap={6}
						height={'100%'}
						w={{ base: '100%', xl: 'calc(50% - 12px)' }}
					>
						<MiningLand />
						<GetAirdrop />
					</Flex>
				</Flex>
				<HighlightedFeatures />
			</VStack>
		</Container>
	)
}
