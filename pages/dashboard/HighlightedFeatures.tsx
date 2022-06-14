import { Box, Flex, Image, Text } from '@chakra-ui/react'

type ServiceType = {
	id: string
	title: string
	image: string
}
const SERVICE_TYPES: ServiceType[] = [
	{
		id: 'gamefi',
		title: 'Gamefi',
		image: '/images/dashboard-feature-gamefi.svg',
	},
	{
		id: 'airdrop',
		title: 'Airdrop',
		image: '/images/dashboard-feature-airdrop.svg',
	},
	{
		id: 'sale',
		title: 'Sale',
		image: '/images/dashboard-feature-sale.svg',
	},
	{
		id: 'mining',
		title: 'Mining',
		image: '/images/dashboard-feature-mining.svg',
	},
]
const HighlightedFeatures = () => {
	return (
		<Box width={'100%'}>
			<Flex
				flexWrap={'wrap'}
				justifyContent={{ base: 'center', md: 'space-between' }}
				gap={1}
				my={4}
			>
				{SERVICE_TYPES.map((service) => (
					<Flex
						key={service.id}
						p={2}
						flexDir={['column']}
						alignItems={'center'}
						backdropFilter={'blur(40px)'}
						borderRadius={'24px'}
						boxShadow={'0px 4px 16px rgba(255, 255, 255, 0.06)'}
						width={['164px', '300px']}
						height={['164px', '300px']}
					>
						<Image
							src={service.image}
							alt={service.title}
							width={service.id === 'trade' ? '100%' : ['107px', '203px']}
							height={service.id === 'trade' ? '100%' : ['80px', '150px']}
							my={service.id === 'trade' ? 0 : [4, 12]}
						/>
						<Flex
							flexDir={'column'}
							maxW={'280px'}
							textAlign={['left', 'center']}
						>
							<Text noOfLines={1} color={'white'} fontSize={'18px'} mb={1}>
								{service.title}
							</Text>
						</Flex>
					</Flex>
				))}
			</Flex>
		</Box>
	)
}
export default HighlightedFeatures
