import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from 'ethers/lib/utils'
import truncateEthAddress from 'truncate-eth-address'
import dayjs from 'dayjs'
import Web3 from 'web3'
import { CONTRACT_ADDRESS_AKASHIC, CONTRACT_ADDRESS_BUSD, CONTRACT_ADDRESS_VPR } from '../constants'
import { CURRENCY_TYPE } from '../constants/data'

export const shortenAddress = (address: string): string => {
	return truncateEthAddress(address)
}

export const shortenTxHash = (txHash: string): string => {
	return `${txHash.slice(0, 6)}...${txHash.slice(60)}`
}

export const fromWei = ({
	amount,
	decimal = 18,
	roundedDecimal = 1,
}: {
	amount: BigNumber
	decimal?: number
	roundedDecimal?: number
}): string => {
	const temp = formatUnits(amount, decimal)
	if (temp.length - temp.lastIndexOf('.') + 1 < roundedDecimal) {
		return temp
	} else {
		return (+temp).toFixed(roundedDecimal)
	}
}

export const toWei = (amount: number, decimal: number = 18): BigNumber => {
	return BigNumber.from(amount).mul(
		BigNumber.from(10).pow(BigNumber.from(decimal))
	)
}
export const decimalToWei = (amount: number): BigNumber => {
	return BigNumber.from(Web3.utils.toWei(amount.toString()))
}

export const addressToTokenSymbol = (address: string): CURRENCY_TYPE => {
	switch (address) {
		case CONTRACT_ADDRESS_AKASHIC:
			return CURRENCY_TYPE.AKC
		case CONTRACT_ADDRESS_BUSD:
			return CURRENCY_TYPE.BUSD;
		case CONTRACT_ADDRESS_VPR:
			return CURRENCY_TYPE.VPR;
		default:
			return CURRENCY_TYPE.UNKNOWN;
	}
}

export const tokenSymbolToAddress = (currencyType: CURRENCY_TYPE) => {
	switch (currencyType) {
		case CURRENCY_TYPE.BUSD:
			return CONTRACT_ADDRESS_BUSD;
		case CURRENCY_TYPE.VPR:
		default:
			return CONTRACT_ADDRESS_VPR;
	}
}

export const tokenSymbolToEnum = (currencyTypeStr: string): CURRENCY_TYPE => {
	switch (currencyTypeStr) {
		case CURRENCY_TYPE.BUSD:
			return CURRENCY_TYPE.BUSD;
		case CURRENCY_TYPE.VPR:
		default:
			return CURRENCY_TYPE.VPR;
	}
}

export const formatUnixDate = (
	date: string,
	option = 'DD-MM-YYYY, HH:mm:ss'
): string => {
	return dayjs.unix(parseInt(date)).format(option)
}
export const formatDate = (
	date: string,
	option = 'DD-MM-YYYY, HH:mm:ss'
): string => {
	return dayjs(date).format(option)
}

export const getCurrencyTypeFromAddress = (address: string) => {
	switch (address) {
		case CONTRACT_ADDRESS_VPR:
			return 'VPR';
		case CONTRACT_ADDRESS_BUSD:
			return 'BUSD';
		default:
			return 'UNKNOWN'
	}
}

export const getLandImage = (landId: number) => {
	switch (landId) {
		case 1:
			return '/images/play-to-earn-bronze.svg';
		case 2:
			return '/images/play-to-earn-silver.svg';
		case 3:
			return '/images/play-to-earn-gold.svg';
		case 4:
		default:
			return '/images/play-to-earn-diamond.svg';
	}
}