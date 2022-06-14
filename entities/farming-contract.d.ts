import { BigNumber } from 'ethers'

export type NFTPool = {
	NFTId: BigNumber;
	ROI: BigNumber;
	FTBalance: BigNumber;
}

export type TokenPool = {
	ROI: BigNumber;
	rate: BigNumber;
	decimal: BigNumber;
	tokenBalance: BigNumber;
	bnbBalance?: BigNumber;
	busdBalance?: BigNumber;
}

export type NFTUser = {
	NFTBalance: BigNumber
}

export type TokenUser = {
	tokenBalance: BigNumber;
	lastUpdate: BigNumber;
	bnbBalance?: BigNumber;
	busdBalance?: BigNumber;
}