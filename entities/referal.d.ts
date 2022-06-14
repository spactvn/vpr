import { BigNumber } from 'ethers/lib/ethers'

export type Referral = {
    address: string,
    date: BigNumber,
    bonusAirdrop: BigNumber
    bnbCashBonus: BigNumber
    busdCashBonus: BigNumber,
    tokenBonus: BigNumber,
    miningBonus: BigNumber,
}