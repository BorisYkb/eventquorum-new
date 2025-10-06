
import Layout from "src/components/landing-page-components/layout/Layout"
import Section1 from 'src/components/landing-page-components/sections/home10/section1'
import Section2 from 'src/components/landing-page-components/sections/home10/section2'
import Section3 from 'src/components/landing-page-components/sections/home10/section3'
import Section4 from 'src/components/landing-page-components/sections/home10/section4'
import Section5 from 'src/components/landing-page-components/sections/home10/section5'
import Section6 from 'src/components/landing-page-components/sections/home10/section6'
import Section7 from 'src/components/landing-page-components/sections/home10/section7'
import Section8 from 'src/components/landing-page-components/sections/home10/section8'
export default function Home10() {

	return (
		<>
			<Layout headerStyle={10} footerStyle={10}>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Section8 />
			</Layout>
		</>
	)
}