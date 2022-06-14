import { ReactNode } from 'react'
import SidebarWithHeader from './SidebarWithHeader'
import Footer from '../components/landing-page/Footer'
export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<SidebarWithHeader>
				<main>
					{children}
					<Footer />
				</main>
			</SidebarWithHeader>
		</>
	)
}
