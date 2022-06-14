import { BigNumber } from 'ethers'
import { Asset1155, Marketplace } from '../official-sc/typechain-types'
import { BoxMP } from './box'

export type NFTProps = {
	box?: BoxMP
	imageUrl?: string
	name?: string
	price?: BigNumber
	rarity?: string
}

export type MyItemProps = {
	loading?: boolean
	fetcher: () => void
} & NFTProps

export type OnSaleItemProps = {
	item?: Marketplace.MarketItemStructOutput
	name?: string
	price?: BigNumber
	fetcher: () => void
}

export type OnSaleItemListProps = {
	items: Marketplace.MarketItemStructOutput[]
}
