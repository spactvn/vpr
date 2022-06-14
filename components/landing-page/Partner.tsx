import { Box, Flex, Image, Text } from '@chakra-ui/react'

const Partner = () => {
	return (
		<Box position="relative" zIndex="12" mt={32}>
			<Flex flexDir={'column'} alignItems={'center'}>
				<Text color={'white'} fontSize={['2xl', '4xl']} mb={12}>
					Partner
				</Text>

				<Flex flexWrap={'wrap'} gap={8}>
					<Image
						src={'/images/partner-basics-capital.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-xt.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-coingecko.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-rok-capital.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-bsc-news.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>

					<Image
						src={'/images/partner-yahoo-finance.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-bsc.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-ava-capital.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-svc.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-newwave-capital.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>

					<Image
						src={'/images/partner-ascensive.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-mexc.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-impossible-finance.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-panony.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
					<Image
						src={'/images/partner-coinmarketcap.svg'}
						maxW={{ base: 'calc(100% / 3 - 24px)', md: '100%' }}
					/>
				</Flex>
			</Flex>
		</Box>
	)
}
export default Partner
