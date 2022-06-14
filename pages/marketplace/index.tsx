import {
	Box,
	Container,
} from '@chakra-ui/react'
import {
	Marketplace,
} from '../../official-sc/typechain-types'
import OnSaleItemList from '../../components/nft/OnSaleItemList'

const Marketplace = () => {
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
			{/* <Overview /> */}

			<Box my={12}>
				<OnSaleItemList myItemsOnly={false} />
			</Box>
		</Container>
	)
}
export default Marketplace
