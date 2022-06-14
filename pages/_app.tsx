import '../styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import type { AppProps } from 'next/app'
import { ChakraProvider, DarkMode, extendTheme } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import WrongNetwork from '../components/wallet/WrongNetwork'
import MissingMetamask from '../components/wallet/MissingMetamask'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../redux/store'

function getLibrary(provider?: any) {
	return new Web3Provider(provider)
}

const theme = extendTheme({
	fonts: {
		heading: 'UTM Banque',
		body: 'UTM Banque',
	},
})

function MyApp({ Component, router, pageProps }: AppProps) {
	return (
		<ReduxProvider store={store}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<ChakraProvider theme={theme}>
					<DarkMode>
						{router.pathname.toString() === '/' ? (
							<Component {...pageProps} />
						) : (
							<Layout>
								{/* <MissingMetamask /> */}
								<WrongNetwork />
								<Component {...pageProps} />
							</Layout>
						)}
					</DarkMode>
				</ChakraProvider>
			</Web3ReactProvider>
		</ReduxProvider>
	)
}

export default MyApp
