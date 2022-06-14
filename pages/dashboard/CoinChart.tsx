import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import axios from "axios";

const CoinChart = () => {
	return (
		<Box width={'100%'}>
			<Flex
				py={2}
				px={12}
				bg={'#222222'}
				flexWrap={'wrap'}
				justifyContent={'space-between'}
			>
				<CoinContainer ticker='BNB' />
				<CoinContainer ticker='BTC' />
				<CoinContainer ticker='ETH' />
				<CoinContainer ticker='ADA' />
			</Flex>
		</Box>
	)
}
export default CoinChart

const CoinContainer = ({ ticker }: { ticker: string }) => {
	const [metric, setMetric] = useState(undefined)

	const fetchMetrics = useCallback(async () => {
		const resp = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}USDT`)
		setMetric(resp.data)
	}, [ticker])

	useEffect(() => {
		fetchMetrics()
	}, [])

	return (
		<Flex
			key={ticker}
			p={2}
			flexDir={['column', 'row']}
			alignItems={'center'}
		>
			<Image
				src={`https://huobicfg.s3.amazonaws.com/currency_icon/${ticker.toLowerCase()}.png`}
				alt={ticker}
				width={'48px'}
				height={'48px'}
				mr={[0, 4]}
			/>
			<Flex
				flexDir={'column'}
				maxW={'280px'}
				textAlign={['center', 'left']}
			>
				<Flex mb={1} alignItems={'flex-end'}>
					<Text noOfLines={1} color={'white'} fontSize={'18px'}>
						{ticker}
					</Text>
					<Text
						color={metric?.priceChange[0] === '-' ? 'red.600' : 'green.600'}
						fontSize={'13px'}
						ml={2}
					>
						{metric ? metric.priceChangePercent : 0}%
					</Text>
				</Flex>
				<Text noOfLines={3} fontSize={'14px'} color={'whiteAlpha.700'}>
					${metric ? metric.weightedAvgPrice : 0}
				</Text>
			</Flex>
		</Flex>
	)
}