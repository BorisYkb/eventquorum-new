
import RegistrationForm from "src/components/landing-page-components/elements/RegistrationForm"

import Layout from "src/components/landing-page-components/layout/Layout"

import Section1 from 'src/components/landing-page-components/sections/home1/section1'
import Section2 from 'src/components/landing-page-components/sections/home1/section2'
import Section3 from 'src/components/landing-page-components/sections/home1/section3'
import Section4 from 'src/components/landing-page-components/sections/home1/section4'
import Section5 from 'src/components/landing-page-components/sections/home1/section5'
import Section7 from 'src/components/landing-page-components/sections/home1/section7'
import Section9 from "src/components/landing-page-components/sections/home1/section9"
import Tarif1 from "src/components/landing-page-components/sections/home1/tarif1"

export default function Home() {

	return (
		<>
			<Layout headerStyle={1}>
				<Section1 />
				{/* <Section5 /> */}
				<Section2 />
				<Section3 />
				<Section4 />
				<Tarif1/>
				<Section7 />
				<Section9 />
				
			</Layout>
			
			
		</>
	)
}