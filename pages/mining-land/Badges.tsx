import { Flex } from "@chakra-ui/react"
import Badge from "./Badge"

const POOL_TYPE = {
	BRONZE: 1,
	SILVER: 2,
	GOLD: 3,
	DIAMOND: 4
}

const Badges = () => {
	return (
		<Flex
			flexDir={'column'}
			gap={8}
			justifyContent={'space-between'}
			width={'100%'}
			overflowX={'auto'}
		>
			<Flex
				flexDir={{ base: 'column', lg: 'row' }}
				justifyContent={'space-between'}
				gap={8}
			>
				<Badge
					poolId={POOL_TYPE.BRONZE}
					title={'Bronze Land'}
					apy={'22.204%'}
					credit={'64592'}
				/>
				<Badge
					poolId={POOL_TYPE.SILVER}
					title={'Silver Land'}
					apy={'35.536%'}
					credit={'8792'}
				/>
			</Flex>
			<Flex
				flexDir={{ base: 'column', lg: 'row' }}
				justifyContent={'space-between'}
				gap={8}
			>
				<Badge
					poolId={POOL_TYPE.GOLD}
					title={'Gold Land'}
					apy={'106.836%'}
					credit={'18592'}
				/>
				<Badge
					poolId={POOL_TYPE.DIAMOND}
					title={'Diamond Land'}
					apy={'485.269%'}
					credit={'433392'}
				/>
			</Flex>
		</Flex>
	)
}
export default Badges
