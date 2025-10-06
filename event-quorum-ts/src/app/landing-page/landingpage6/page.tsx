
import Layout from "src/components/landing-page-components/layout/Layout"
import Section1 from 'src/components/landing-page-components/sections/home6/section1'
import Section10 from 'src/components/landing-page-components/sections/home6/section10'
import Section2 from 'src/components/landing-page-components/sections/home6/section2'
import Section3 from 'src/components/landing-page-components/sections/home6/section3'
import Section4 from 'src/components/landing-page-components/sections/home6/section4'
import Section5 from 'src/components/landing-page-components/sections/home6/section5'
import Section6 from 'src/components/landing-page-components/sections/home6/section6'
import Section7 from 'src/components/landing-page-components/sections/home6/section7'
import Section8 from 'src/components/landing-page-components/sections/home6/section8'
import Section9 from 'src/components/landing-page-components/sections/home6/section9'
export default function Home6() {

	return (
		<>
			<Layout headerStyle={6} footerStyle={6}>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Section8 />
				<Section9 />
				<Section10 />
			</Layout>
		</>
	)
}