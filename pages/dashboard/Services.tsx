import { Box, Flex, Image, Text } from '@chakra-ui/react'

type ServiceType = {
	id: string
	title: string
	text: string
	image: string
}
const SERVICE_TYPES: ServiceType[] = [
	{
		id: 'referral',
		title: 'Referral System',
		text: 'Invite friends and earn with our platform, up to 30% airdrop, 10% per sale,3% per Mining Land.',
		image: '/images/dashboard-service-referral.svg',
	},
	{
		id: 'fee',
		title: 'The Lowest Exchange Fee',
		text: '90% of profits will be reshared to users via dividend payments.',
		image: '/images/dashboard-service-fee.svg',
	},
	{
		id: 'trade',
		title: 'Trade Fee Reimbursement',
		text: `Let's stake VPR and passively earn profit every second just by possessing VPR.`,
		image: '/images/dashboard-service-trade.svg',
	},
	{
		id: 'competition',
		title: 'Competitions',
		text: `Participate in the regular VPR trading competitions and win exclusive prizes.`,
		image: '/images/dashboard-service-competition.svg',
	},
]
const Services = () => {
	return (
		<Box width={'100%'}>
			<Flex flexWrap={'wrap'} justifyContent={'space-between'}>
				{SERVICE_TYPES.map((service) => (
					<Flex
						key={service.id}
						p={2}
						flexDir={['row', 'column']}
						alignItems={'center'}
					>
						<Image
							src={service.image}
							alt={service.title}
							maxWidth={['60px', '167px']}
							maxHeight={['60px', '163px']}
							mr={[6, 0]}
						/>
						<Flex
							flexDir={'column'}
							maxW={'280px'}
							textAlign={['left', 'center']}
						>
							<Text noOfLines={1} color={'white'} fontSize={'18px'} mb={1}>
								{service.title}
							</Text>
							<Text noOfLines={3} fontSize={'14px'} color={'whiteAlpha.700'}>
								{service.text}
							</Text>
						</Flex>
					</Flex>
				))}
			</Flex>
		</Box>
	)
}
export default Services
