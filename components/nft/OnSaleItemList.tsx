import { Flex } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { CONTRACT_ADDRESS_MARKETPLACE } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setSellSuccess } from '../../redux/slices/nftSlice'
import {
	Marketplace,
	Marketplace__factory,
} from '../../official-sc/typechain-types'
import OnSaleItem from './OnSaleItem'
import Pagination from '../pagination'
import { BoxList, CURRENCY_TYPE } from '../../constants/data'
import Filters from '../filter/Filters'
import { tokenSymbolToAddress } from '../../utils'

const TABLE_MAX_ROWS = 8;

const OnSaleItemList = ({myItemsOnly = false} : {myItemsOnly: boolean}) => {
	const dispatch = useAppDispatch()
	const { active, activate, account, library } = useWeb3React()
	const { isSellSuccess } = useAppSelector((state) => state.nft)

	const [contractMarketplace, setContractMarketplace] =
		useState<Marketplace>(undefined)
	const [itemsOnSale, setItemsOnSale] =
		useState<Marketplace.MarketItemStructOutput[]>([])

	const [totalPage, setTotalPage] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const [currentPageItems, setCurrentPageItems] =
		useState<Marketplace.MarketItemStructOutput[]>([])

	const [filterBoxType, setFilterBoxType] = useState(0)
	const [boxList, setBoxList] = useState(BoxList)
	const [currency, setCurrency] = useState(CURRENCY_TYPE.VPR)

	useEffect(() => {
		if (active && library) {
			setContractMarketplace(
				Marketplace__factory.connect(
					CONTRACT_ADDRESS_MARKETPLACE,
					library.getSigner()
				)
			)
		}
	}, [active, account, library])

	const fetcher = async () => {
		// fetch
		let _itemsOnSale: Marketplace.MarketItemStructOutput[];
		if (myItemsOnly) {
			_itemsOnSale = await contractMarketplace.getMyItemsOnSale()
		} else {			
			_itemsOnSale = await contractMarketplace.getItemsOnSale()
		}

		// filter
		// based on box type
		let filteredItemsOnSale = _itemsOnSale.filter(x => boxList.includes(x.tokenId.toNumber()))
		// based on currencyType
		filteredItemsOnSale = filteredItemsOnSale.filter(x => x.paymentToken === tokenSymbolToAddress(currency))

		// set to result
		setItemsOnSale(filteredItemsOnSale)

		// set to paging
		setTotalPage(Math.ceil(filteredItemsOnSale.length / TABLE_MAX_ROWS))
		setCurrentPageItems(filteredItemsOnSale.slice(((currentPage - 1) * TABLE_MAX_ROWS), currentPage * TABLE_MAX_ROWS))
	}

	useEffect(() => {
		if (contractMarketplace && boxList && currency) {
			fetcher()
		}
	}, [contractMarketplace, boxList, currency])

	useEffect(() => {
		if (isSellSuccess) {
			fetcher()
			dispatch(setSellSuccess(false))
		}
	}, [isSellSuccess])

	const onPageChange = (page) => {
		setCurrentPage(page)
		setCurrentPageItems(itemsOnSale.slice(((page - 1) * TABLE_MAX_ROWS), page * TABLE_MAX_ROWS))
	}

	const onFilterChange = (filterBoxType?: number, filterCurrency?: CURRENCY_TYPE) => {
		if (filterBoxType) {
			setFilterBoxType(filterBoxType)
			const _boxList = filterBoxType === 0 ? BoxList : [filterBoxType]
			setBoxList(_boxList)
		}
		if (filterCurrency) {
			setCurrency(filterCurrency)
		}
	}

	return (
		<>
			<Filters
				resultCount={itemsOnSale.length}
				onFilterChange={onFilterChange}
				showSort={false} />
			<Flex flexWrap={'wrap'} gap={4}>
				{currentPageItems.map((item, index) => (
					<OnSaleItem key={index} item={item} fetcher={fetcher} />
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
export default OnSaleItemList
