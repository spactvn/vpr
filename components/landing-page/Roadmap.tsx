import { Box, Flex, Image, Text } from '@chakra-ui/react'

const Roadmap = () => {
	return (
		<Box position="relative">
			<Image
				src={'/images/roadmap-and-ecosystem-bg.svg'}
				position="absolute"
				top="0"
			/>
			<Flex flexDir={'column'} position="relative" zIndex="11" color={'white'}>
				<Text fontSize={['2xl', '4xl']} textAlign={'center'}>
					Roadmap
				</Text>

				<Image
					src={'/images/roadmap-lg.svg'}
					display={{ base: 'none', lg: 'block' }}
				/>

				<Flex
					flexDir={'column'}
					display={{ base: 'flex', lg: 'none' }}
					px={3}
					mt={12}
					gap={8}
				>
					<Flex flexDir={['column', 'row']} gap={8} alignItems={'baseline'}>
						<Flex flexDir={'column'} alignItems={'center'} w={['100%', '49%']}>
							<Image src={'/images/roadmap-1.svg'} />
							<Text my={2}>Q2.2022</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Launch project https://vprchain.io
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Publicize the VPR token
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Airdrop VPR Token to the community
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								List on CMC, Coingecko, BSC VPR tokens
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Media Release BSC News
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Poocoin Media Cooperation
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								IDO Event
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Marketplace
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Box Event
							</Text>
						</Flex>
						<Flex flexDir={'column'} alignItems={'center'} w={['100%', '49%']}>
							<Image src={'/images/roadmap-2.svg'} />
							<Text my={2}>Q3.2022</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								List on Pancakeswap
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								NFT Badge Collection
							</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Launch Mining Land
							</Text>
						</Flex>
					</Flex>
					<Flex flexDir={['column', 'row']} gap={8} alignItems={'baseline'}>
						<Flex flexDir={'column'} alignItems={'center'} w={['100%', '49%']}>
							<Image src={'/images/roadmap-3.svg'} />
							<Text my={2}>Q4.2022</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								Sign up for BinanceLab Deploy Beta Game MetaLand
							</Text>
						</Flex>
						<Flex flexDir={'column'} alignItems={'center'} w={['100%', '49%']}>
							<Image src={'/images/roadmap-4.svg'} />
							<Text my={2}>Q1.2023</Text>
							<Text
								textAlign={'center'}
								fontSize={['xs', 'sm']}
								color={'whiteAlpha.700'}
							>
								List on centralized exchanges of VPR tokens on Kucoin, Gate.io
								And Binance cooperation to launch DAOLand fund
							</Text>
						</Flex>
					</Flex>
				</Flex>
				<h2 id="ecosystem"></h2>
				<Flex flexDir={'column'} position="relative">
					<Text fontSize={['2xl', '4xl']} textAlign={'center'} mt={12}>
						Ecosystem
					</Text>

					<Image
						src={'/images/roadmap-and-ecosystem-rocket.svg'}
						position="absolute"
						right="0"
						top={{ base: '20px', lg: '0' }}
						w={'20%'}
					/>
					<Flex flexWrap={'wrap'}>
						<Image
							src={'/images/ecosystem-launchpad.svg'}
							maxW={{ base: '50%', lg: '25%' }}
						/>
						<Image
							src={'/images/ecosystem-charity-fund.svg'}
							maxW={{ base: '50%', lg: '25%' }}
						/>
						<Image
							src={'/images/ecosystem-gamefi.svg'}
							maxW={{ base: '50%', lg: '25%' }}
						/>
						<Image
							src={'/images/ecosystem-marketplace.svg'}
							maxW={{ base: '50%', lg: '25%' }}
						/>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
export default Roadmap
