
import Layout from "src/components/landing-page-components/layout/Layout"
// import Header2 from "src/components/landing-page-components/layout/header/Header2"
import Section1 from 'src/components/landing-page-components/sections/home2/section1'
import Section2 from 'src/components/landing-page-components/sections/home2/section2'
import Section3 from 'src/components/landing-page-components/sections/home2/section3'
import Section5 from 'src/components/landing-page-components/sections/home2/section5'
// import Section6 from 'src/components/landing-page-components/sections/home2/section6'
import Section7 from 'src/components/landing-page-components/sections/home2/section7'
// import Section8 from 'src/components/landing-page-components/sections/home2/section8'
import Section9 from 'src/components/landing-page-components/sections/home2/section9'
import Section4defile from "src/components/landing-page-components/sections/home2/section4defile"



export default function Home2() {

	return (
		<Layout headerStyle={2} footerStyle={2}>
			
			<Section1 />
			<Section2 />
			<Section5 />
			<Section4defile />
			<Section7 />
			<Section3 />
			
			
			
			{/*<Section6 />
			
			<Section8 />*/}
			<Section9 />
		</Layout>
	)
}