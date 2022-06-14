import { Box } from '@chakra-ui/react'
import Footer from './Footer'
import Header from './Header'
import HeroSection from './HeroSection'
import Mission from './Mission'
import OurTeam from './OurTeam'
import Partner from './Partner'
import PlayToEarn from './PlayToEarn'
import Roadmap from './Roadmap'
import Tokenomics from './Tokenomics'

const LandingPage = () => {
	return (
		<Box bg="black" maxW={'1920px'}>
			<Header />
			<HeroSection />
			<Mission />
			<PlayToEarn />
			<Roadmap />
			<OurTeam />
			<Partner />
			<Tokenomics />
			<Footer />
		</Box>
	)
}
export default LandingPage
