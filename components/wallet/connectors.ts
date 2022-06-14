import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const injected = new InjectedConnector({
	supportedChainIds: [
		1, //mainnet
		3, //ropsten
		4, //rinkeby
		5, //goerli
		42,
		56, // bsc mainnet
		97, // bsc testnet
	],
})

export async function connectWallet(
	activate: (
		connector: AbstractConnector,
		onError?: (error: Error) => void,
		throwErrors?: boolean
	) => Promise<void>,
	injected: InjectedConnector
) {
	try {
		await activate(injected)
		localStorage.setItem('isWalletConnected', 'true')
	} catch (ex) {
		console.error(ex)
	}
}

export const walletconnect = new WalletConnectConnector({
	rpc: {
		56: 'https://bsc-dataseed.binance.org/',
	},
	bridge: 'https://bridge.walletconnect.org',
	qrcode: true,
})

export const enum CONNECTION_TYPES {
	METAMASK,
	WALLETCONNECT,
}
