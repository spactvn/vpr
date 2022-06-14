import { Flex, useToast } from '@chakra-ui/react'
import MyItem from './MyItem'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import {
	Asset1155,
	Asset1155__factory,
} from '../../official-sc/typechain-types'
import { CONTRACT_ADDRESS_ASSET_1155 } from '../../constants'
import { BoxMP } from '../../entities/box'
import { BoxList } from '../../constants/data'
import Pagination from '../pagination'
import { BigNumber } from 'ethers'
import Filters from '../filter/Filters'

const TABLE_MAX_ROWS = 8;

const MyItemList = () => {
	const { active, account, library } = useWeb3React()
	const toast = useToast()

	const [contractAsset1155, setContractAsset1155] =
		useState<Asset1155>(undefined)

	const [filterBoxType, setFilterBoxType] = useState(0)
	const [boxList, setBoxList] = useState(BoxList)
	const [myBoxes, setMyBoxes] = useState<BoxMP[]>([])

	const [totalPage, setTotalPage] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const [currentPageBoxes, setCurrentPageBoxes] = useState<BoxMP[]>([])

	useEffect(() => {
		if (active && library) {
			setContractAsset1155(
				Asset1155__factory.connect(CONTRACT_ADDRESS_ASSET_1155, library)
			)
		}
	}, [active, account, library])

	const fetchItems = async () => {
		const _myBoxes = []
		for (let boxType of boxList) {
			const boxAmount = await contractAsset1155.balanceOf(
				account,
				BigNumber.from(boxType)
			)
			const boxes = Array(boxAmount.toNumber())
				.fill(boxType)
				.map<BoxMP>((_, index) => ({
					boxType,
					boxPseudoId: index + 1,
					owner: account,
				}))

			_myBoxes.push(...boxes)
		}
		
		setMyBoxes(_myBoxes)
		setTotalPage(Math.ceil(_myBoxes.length / TABLE_MAX_ROWS))
		setCurrentPageBoxes(_myBoxes.slice(((currentPage - 1) * TABLE_MAX_ROWS), currentPage * TABLE_MAX_ROWS))
	}

	useEffect(() => {
		if (contractAsset1155) {
			fetchItems()
		}
	}, [contractAsset1155, filterBoxType])

	const onPageChange = (page) => {
		setCurrentPage(page)
		setCurrentPageBoxes(myBoxes.slice(((page - 1) * TABLE_MAX_ROWS), page * TABLE_MAX_ROWS))
	}

	const onFilterChange = (filterBoxType: number) => {
		setFilterBoxType(filterBoxType)
		const _boxList = filterBoxType === 0 ? BoxList : [filterBoxType]
		setBoxList(_boxList)
	}

	return (
		<>
			<Filters
				resultCount={myBoxes.length}
				onFilterChange={onFilterChange}
				showCurrencyFilter={false}
				showSort={false} />
			<Flex flexWrap={'wrap'} gap={4}>
				{currentPageBoxes.map((item, index) => (
					<MyItem key={index} box={item} fetcher={fetchItems} />
				))}
			</Flex>
			<Flex
				my={4}
				justifyContent={'center'}
				bg={'#222'}
				py={4}
				borderRadius={'sm'}
			>
				<Pagination
					currentPage={currentPage}
					totalPage={totalPage}
					onPageChange={onPageChange}
				/>
			</Flex>
		</>
	)
}
export default MyItemList
