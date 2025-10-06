
import Layout from "src/components/landing-page-components/layout/Layout"
import Section1 from 'src/components/landing-page-components/sections/home4/section1'
import Section10 from 'src/components/landing-page-components/sections/home4/section10'
import Section2 from 'src/components/landing-page-components/sections/home4/section2'
import Section3 from 'src/components/landing-page-components/sections/home4/section3'
import Section3_4 from "src/components/landing-page-components/sections/home4/section3_4"
import Section4 from 'src/components/landing-page-components/sections/home4/section4'
import Section5 from 'src/components/landing-page-components/sections/home4/section5'
import Section6 from 'src/components/landing-page-components/sections/home4/section6'
import Section7 from 'src/components/landing-page-components/sections/home4/section7'
import Section8 from 'src/components/landing-page-components/sections/home4/section8'
import Section9 from 'src/components/landing-page-components/sections/home4/section9'
import Tarif4 from "src/components/landing-page-components/sections/home4/tarif4"
export default function Home4() {

	return (
		<>
			<Layout headerStyle={4} footerStyle={4}>
				<Section1 />
				
				<Section3 />
				<Section4 />
				{/* <Section5 /> */}
				{/* <Section6 /> */}
				<Section7 />
				{/* <Section8 /> */}
				{/* <Section9 /> */}
				<Tarif4/>
				<Section3_4 />
				<Section10 />
				{/* <Section2 /> */}
			</Layout>
		</>
	)
}