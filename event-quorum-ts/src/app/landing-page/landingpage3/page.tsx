
import Layout from "src/components/landing-page-components/layout/Layout"
import Section1 from 'src/components/landing-page-components/sections/home3/section1'
import Section10 from 'src/components/landing-page-components/sections/home3/section10'
import Section2 from 'src/components/landing-page-components/sections/home3/section2'
import Section3 from 'src/components/landing-page-components/sections/home3/section3'
import Section4 from 'src/components/landing-page-components/sections/home3/section4'
import Section5 from 'src/components/landing-page-components/sections/home3/section5'
import Section6 from 'src/components/landing-page-components/sections/home3/section6'
import Section7 from 'src/components/landing-page-components/sections/home3/section7'
import Section8 from 'src/components/landing-page-components/sections/home3/section8'
import Section9 from 'src/components/landing-page-components/sections/home3/section9'
import Tarif3 from "src/components/landing-page-components/sections/home3/tarif3"
export default function Home3() {

	return (
		<>
			<Layout headerStyle={3} footerStyle={3}>
				<Section1 />
				<Section2 />
				{/* <Section6 /> */}
				<Section7 />
				<Section4 />
				
				
				
				{/* <Section8 /> */}
				{/* <Section9 /> */}
				<Tarif3/>
				<Section3 />
				<Section5 />
				{/* <Section10 /> */}
			</Layout>
		</>
	)
}