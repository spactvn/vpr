import { Box, Flex, Image, Text } from '@chakra-ui/react'
import Slider from 'react-slick'
import CustomNextArrow from './CustomNextArrow'
import CustomPrevArrow from './CustomPrevArrow'
import DiamondBadge from './DiamondBadge'
import Roadmap from './Roadmap'

const PlayToEarn = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
				},
			},
		],
	}
	return (
		<Flex
			position="relative"
			width="100%"
			bg="black"
			height={{ base: '360px', md: '720px', lg: '1124px' }}
			flexDir={'column'}
		>
			<Box
				bg={
					'linear-gradient(180deg, rgba(0, 0, 0, 0) 79.32%, #000000 100%), linear-gradient(180deg, #000000 10.75%, rgba(0, 0, 0, 0) 75.33%), url(/images/play-to-earn-bg.svg)'
				}
				bgPos={'center'}
				bgSize={'cover'}
				bgRepeat={'no-repeat'}
				height={['100%']}
				width="100%"
				position="absolute"
				top="0"
				zIndex={10}
			/>
			<Image
				src={'/images/play-to-earn-ufo.svg'}
				position="absolute"
				top={0}
				left={0}
				zIndex={11}
				w={{ base: '20%' }}
			/>
			<Image
				src={'/images/play-to-earn-ellipse.svg'}
				position="absolute"
				top={0}
				right={0}
				zIndex={11}
				maxWidth={'518px'}
				maxHeight={'518px'}
				objectFit={'cover'}
			/>
			<Text
				fontSize={['3xl', '5xl']}
				textAlign="center"
				color={'white'}
				width="100%"
				position="relative"
				zIndex={11}
			>
				Play to earn
			</Text>

			<Flex
				position="relative"
				zIndex={11}
				justifyContent={'center'}
				alignItems={'center'}
				mt={{ base: 6, lg: 32 }}
			>
				<Box maxW={{ base: '35%', lg: '360px' }} color={'white'}>
					<Slider {...settings}>
						<div>
							<Image src={'/images/play-to-earn-diamond.svg'} />
						</div>
						<div>
							<Image src={'/images/play-to-earn-gold.svg'} />
						</div>
						<div>
							<Image src={'/images/play-to-earn-silver.svg'} />
						</div>
						<div>
							<Image src={'/images/play-to-earn-bronze.svg'} />
						</div>
					</Slider>
				</Box>

				<Flex
					flexDir={'column'}
					color={'white'}
					ml={{ base: 6, lg: 24 }}
					textTransform={'uppercase'}
					maxW={{ base: '55%', lg: '360px' }}
					fontSize={{ base: 'xs', lg: 'sm' }}
					mt={12}
				>
					<Flex mb={3} alignItems={'center'}>
						<Box>
							<DiamondBadge
								w={{ base: '24px', lg: '100%' }}
								h={{ base: '24px', lg: '100%' }}
							/>
						</Box>
						<Text ml={2} fontSize={{ base: 'md', lg: '2xl' }}>
							Diamond Land
						</Text>
					</Flex>
					<Flex mb={3}>
						<Text>
							APY:{' '}
							<Text color={'#DA9917'} as="span">
								485.269%
							</Text>
						</Text>
					</Flex>
					<Flex mb={3}>
						<Text>
							<Text color={'#DA9917'} as="span">
								20
							</Text>{' '}
							days locked
						</Text>
					</Flex>
					<Flex>
						<Text>
							withdrawals made before the{' '}
							<Text color={'#DA9917'} as="span">
								20th
							</Text>{' '}
							day will result in an APY loss of 90%
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}
export default PlayToEarn
