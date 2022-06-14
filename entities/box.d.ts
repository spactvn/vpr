import { BigNumber, BigNumberish, BytesLike } from 'ethers/lib/ethers'

export type BoxMP = {
	boxType: number
	boxPseudoId: number
	owner: string
}

export type BoxEventCardProps = {
	roundId: number
}

export type BoxEventListProps = {
	roundIds: number[]
}

export type EIP712SignatureStruct = {
	deadline: BigNumberish;
	v: BigNumberish;
	r: BytesLike;
	s: BytesLike;
};