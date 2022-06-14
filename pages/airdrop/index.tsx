import { Container, HStack, Stack, VStack } from '@chakra-ui/react'
import DailyMissions from './DailyMissions'
import GetAirdrop from './GetAirdrop'
import Overview from './Overview'
import RulesForParticipation from './RulesForParticipation'

const Airdrop = () => {
	return (
		<Container
			maxW={'8xl'}
			py={{ base: 4, lg: 8 }}
			mr={0}
			ml={0}
			px={{ base: 4, lg: 8 }}
			bgImage={'url(/images/container-bg.svg)'}
			bgPos={'center'}
			bgSize={'cover'}
			color={'white'}
		>
			<VStack p={0} spacing={8}>
				<GetAirdrop />

				{/* <Overview /> */}

				<Stack direction={{ base: 'column', xl: 'row' }} spacing={8}>
					<DailyMissions />
					<RulesForParticipation />
				</Stack>
			</VStack>
		</Container>
	)
}
export default Airdrop
