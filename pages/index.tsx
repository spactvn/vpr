import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import LandingPage from '../components/landing-page'
import Header from '../components/landing-page/Header'

const Index = () => {
	return (
		<>
			<Head>
				<link
					rel="preload"
					href="/fonts/UTM BanqueR.ttf"
					as="font"
					crossOrigin=""
				/>
				<link
					rel="preload"
					href="/fonts/UTM BanqueB.ttf"
					as="font"
					crossOrigin=""
				/>
			</Head>
			<Box>
				<LandingPage />
			</Box>
		</>
	)
}
export default Index
