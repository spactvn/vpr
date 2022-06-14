import {
	Divider,
	Flex,
	HStack,
	Image,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'

const DailyMissions = () => {
	return (
		<Flex
			flexDirection={{ base: 'column' }}
			justifyContent={{ base: 'center' }}
			position={'relative'}
			width={{ base: '100%', xl: '49%' }}
			height={'100%'}
		>
			<Image
				src={'/images/daily-mission-bg.svg'}
				objectFit={'cover'}
				objectPosition={'center'}
			/>
			<Text fontSize={'xl'} px={3} position={'absolute'} top={'8px'}>
				Daily Missions
			</Text>
			<Divider
				my={3}
				color={'whiteAlpha.300'}
				position={'absolute'}
				top={'36px'}
			/>
			<Text
				fontSize={'lg'}
				position={'absolute'}
				bottom={'12px'}
				left={'50%'}
				transform={'translateX(-50%)'}
			>
				Coming Soon
			</Text>
		</Flex>
	)
}
export default DailyMissions
