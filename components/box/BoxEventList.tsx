import { Flex, GridItem } from '@chakra-ui/react'
import { BoxEventListProps } from '../../entities/box'
import BoxEventCard from './BoxEventCard'

const BoxEventList = ({ roundIds }: BoxEventListProps) => {
	return (
		<Flex flexWrap={'wrap'} gap={4}>
			{roundIds?.map((roundId, index) => (
				<GridItem key={index}>
					<BoxEventCard roundId={roundId} />
				</GridItem>
			))}
		</Flex>
	)
}

export default BoxEventList
