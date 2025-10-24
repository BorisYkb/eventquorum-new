
import Layout from "src/components/landing-page-components/layout/Layout"
import Section1 from 'src/components/landing-page-components/sections/home7/section1'
import Section10 from 'src/components/landing-page-components/sections/home7/section10'
import Section2 from 'src/components/landing-page-components/sections/home7/section2'
import Section3 from 'src/components/landing-page-components/sections/home7/section3'
import Section4 from 'src/components/landing-page-components/sections/home7/section4'
import Section5 from 'src/components/landing-page-components/sections/home7/section5'
import Section6 from 'src/components/landing-page-components/sections/home7/section6'
import Section7 from 'src/components/landing-page-components/sections/home7/section7'
import Section8 from 'src/components/landing-page-components/sections/home7/section8'
import Section9 from 'src/components/landing-page-components/sections/home7/section9'
export default function Home7() {

	return (
		<>
			<Layout headerStyle={7} footerStyle={7}>
				<Section1 />
				{/* <Section2 /> */}
				<Section3 />
				{/* <Section4 /> */}
				
				<Section6 />
				<Section5 />
				{/* <Section7 /> */}
				<Section8 />
				{/* <Section9 /> */}
				<Section10 />
			</Layout>
		</>
	)
}