import { useCallback } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { HiDotsHorizontal } from 'react-icons/hi'
import { DOTS, usePagination } from './usePagination'
import { Button, Flex, Icon, IconButton } from '@chakra-ui/react'

type PaginationProps = {
	currentPage: number
	totalPage: number
	onPageChange: (page: number) => void
	siblingCount?: number
	hideArrows?: boolean
}

const Pagination = ({
	currentPage,
	totalPage,
	onPageChange,
	siblingCount = 1 /*, hideArrows = false */,
}: PaginationProps) => {
	const paginationRange = usePagination({
		currentPage,
		totalPage,
		siblingCount,
	})

	const handleOnClick = (page: number) => {
		onPageChange(page)
	}

	const onNext = useCallback(() => {
		onPageChange(currentPage + 1)
	}, [currentPage, onPageChange])

	const onPrevious = useCallback(() => {
		onPageChange(currentPage - 1)
	}, [currentPage, onPageChange])

	const lastPage = paginationRange[paginationRange.length - 1]

	return (
		<Flex gap={2}>
			<IconButton
				aria-label="Previous page"
				icon={<FiChevronLeft />}
				size={'md'}
				disabled={currentPage === 1}
				onClick={onPrevious}
			/>
			{paginationRange.map((pageNumber, i) => {
				if (pageNumber === DOTS) {
					return (
						<Icon key={`${DOTS}${i + 1}`} as={HiDotsHorizontal} m={'auto'} />
					)
				}
				return (
					<Button
						key={pageNumber}
						colorScheme={'blackAlpha'}
						color={'white'}
						onClick={() => handleOnClick(Number(pageNumber))}
						variant={currentPage === pageNumber ? 'solid' : 'outline'}
					>
						{pageNumber}
					</Button>
				)
			})}
			<IconButton
				aria-label="Next page"
				icon={<FiChevronRight />}
				size={'md'}
				disabled={currentPage === lastPage}
				onClick={onNext}
			/>
		</Flex>
	)
}

export default Pagination
