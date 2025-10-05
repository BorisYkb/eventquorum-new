
import RegistrationForm from "@/components/elements/RegistrationForm"

import Layout from "@/components/layout/Layout"

import Section1 from '@/components/sections/home1/section1'
import Section2 from '@/components/sections/home1/section2'
import Section3 from '@/components/sections/home1/section3'
import Section4 from '@/components/sections/home1/section4'
import Section5 from '@/components/sections/home1/section5'
import Section7 from '@/components/sections/home1/section7'
import Section9 from "@/components/sections/home1/section9"
import Tarif1 from "@/components/sections/home1/tarif1"

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