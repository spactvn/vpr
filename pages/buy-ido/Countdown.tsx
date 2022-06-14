import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import Counter from '../../components/counter'
import { CONTRACT_ADDRESS_ICO, ICO_ROUND_ID } from '../../constants'
import { ICO, ICO__factory } from '../../official-sc/typechain-types'
import { ICORoundInfoData } from './BuyWithCoins'

const Countdown = () => {
	const { active, activate, account, library } = useWeb3React()
	const [roundId, setRoundId] = useState(ICO_ROUND_ID)

	const [icoRoundInfo, setIcoRoundInfo] = useState<ICORoundInfoData>(undefined)
	const [contractICO, setContractICO] = useState<ICO>(undefined)

	useEffect(() => {
		if (active && library) {
			setContractICO(
				ICO__factory.connect(CONTRACT_ADDRESS_ICO, library.getSigner())
			)
		}
	}, [active, account, library])

	useEffect(() => {
		if (account && contractICO) {
			contractICO._icoRound(roundId).then((v) => {
				setIcoRoundInfo(v);
			})
		}
	}, [account, contractICO])

	return (
		<Box width={'100%'}>
			<Flex
				py={6}
				px={{ base: 4, lg: 12 }}
				bg={'#222222'}
				justifyContent={'center'}
				flexDir={'column'}
				textAlign={'center'}
			>
				<Text color={'whiteAlpha.700'} mb={2}>
					IDO Event ends in:
				</Text>

				<Counter
					startTime={dayjs((icoRoundInfo?.startTime.toNumber() * 1000) ?? 0).toDate()}
					endTime={dayjs((icoRoundInfo?.endTime.toNumber() * 1000) ?? 0).toDate()} />
			</Flex>
		</Box>
	)
}
export default Countdown
