
import Layout from "src/components/landing-page-components/layout/Layout"
import Section1 from 'src/components/landing-page-components/sections/home5/section1'
import Section10 from 'src/components/landing-page-components/sections/home5/section10'
import Section11 from 'src/components/landing-page-components/sections/home5/section11'
import Section12 from 'src/components/landing-page-components/sections/home5/section12'
import Section2 from 'src/components/landing-page-components/sections/home5/section2'
import Section3 from 'src/components/landing-page-components/sections/home5/section3'
import Section4 from 'src/components/landing-page-components/sections/home5/section4'
import Section5 from 'src/components/landing-page-components/sections/home5/section5'
import Section6 from 'src/components/landing-page-components/sections/home5/section6'
import Section7 from 'src/components/landing-page-components/sections/home5/section7'
import Section8 from 'src/components/landing-page-components/sections/home5/section8'
import Section9 from 'src/components/landing-page-components/sections/home5/section9'
export default function Home5() {

	return (
		<>
			<Layout headerStyle={5} footerStyle={5}>
				<img src="assets/landing-page/img/bg/body-bg1.png" alt="" className="body-bg1" id="body-bg1" />

				<Section1 />
				{/* <Section2 /> */}
				<Section3 />
				{/* <Section4 /> */}
				<Section5 />
				<Section6 />
				{/* <Section7 /> */}
				{/* <Section8 /> */}
				<Section9 />
				{/* <Section10 /> */}
				{/* <Section11 /> */}
				<Section12 />
			</Layout>
		</>
	)
}