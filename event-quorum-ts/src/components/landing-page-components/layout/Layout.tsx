
'use client'
import AOS from 'aos'
import { useEffect, useState } from "react"
import AddClassBody from '../elements/AddClassBody'
import BackToTop from '../elements/BackToTop'
import Footer1 from './footer/Footer1'
import Footer10 from './footer/Footer10'
import Footer2 from './footer/Footer2'
import Footer3 from './footer/Footer3'
import Footer4 from './footer/Footer4'
import Footer5 from './footer/Footer5'
import Footer6 from './footer/Footer6'
import Footer7 from './footer/Footer7'
import Footer8 from './footer/Footer8'
import Footer9 from './footer/Footer9'
import Header1 from "./header/Header1"
import Header10 from './header/Header10'
import Header1_10 from 'src/app/landingpage/landingpage10/Header1_10'
import Header2 from './header/Header2'
import Header1_2 from 'src/app/landingpage/landingpage2/Header1_2'
import Header3 from './header/Header3'
import Header1_3 from 'src/app/landingpage/landingpage3/Header1_3'
import Header4 from './header/Header4'
import Header1_4 from 'src/app/landingpage/landingpage4/Header1_4'
import Header5 from './header/Header5'
import Header1_5 from 'src/app/landingpage/landingpage5/Header1_5'
import Header6 from './header/Header6'
import Header1_6 from 'src/app/landingpage/landingpage6/Header1_6'
import Header7 from './header/Header7'
import Header1_7 from 'src/app/landingpage/landingpage7/Header1_7'
import Header8 from './header/Header8'
import Header1_8 from 'src/app/landingpage/landingpage8/Header1_8'
import Header9 from './header/Header9'
import Header1_9 from 'src/app/landingpage/landingpage9/Header1_9'
import MobileMenu from './MobileMenu'
import MobileMenu2 from './MobileMenu2'
import MobileMenu3 from './MobileMenu3'
import MobileMenu4 from './MobileMenu4'


interface LayoutProps {
	headerStyle?: Number
	footerStyle?: Number
	children?: React.ReactNode
	breadcrumbTitle?: string
}


export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
	const [scroll, setScroll] = useState<boolean>(false)
	// Mobile Menu
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	const handleMobileMenu = (): void => setMobileMenu(!isMobileMenu)
	const [isSearch, setSearch] = useState<boolean>(false)
	const handleSearch = (): void => setSearch(!isSearch)

	useEffect(() => {
		AOS.init()
		const handleScroll = (): void => {
			const scrollCheck: boolean = window.scrollY > 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		}

		document.addEventListener("scroll", handleScroll)

		return () => {
			document.removeEventListener("scroll", handleScroll)
		}
	}, [scroll])


	return (
		<>
			<div id="top" />
			<AddClassBody />
			{/* <AnimatedText /> */}
			{!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  />}
			{headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  /> : null}
			{headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu2={isMobileMenu} handleMobileMenu2={handleMobileMenu}  /> : null}
			{headerStyle == 1_2 ? <Header1_2 scroll={scroll} isMobileMenu2={isMobileMenu} handleMobileMenu2={handleMobileMenu} /> : null}
			{headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu3={isMobileMenu} handleMobileMenu3={handleMobileMenu}  /> : null}
			{headerStyle == 1_3 ? <Header1_3 scroll={scroll} isMobileMenu3={isMobileMenu} handleMobileMenu3={handleMobileMenu} /> : null}
			{headerStyle == 4 ? <Header4 scroll={scroll} isMobileMenu4={isMobileMenu} handleMobileMenu4={handleMobileMenu}  /> : null}
			{headerStyle == 1_4 ? <Header1_4 scroll={scroll} isMobileMenu4={isMobileMenu} handleMobileMenu4={handleMobileMenu} /> : null}
			{headerStyle == 5 ? <Header5 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  /> : null}
			{headerStyle == 1_5 ? <Header1_5 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
			{headerStyle == 6 ? <Header6 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  /> : null}
			{headerStyle == 1_6 ? <Header1_6 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
			{headerStyle == 7 ? <Header7 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  /> : null}
			{headerStyle == 1_7 ? <Header1_7 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
			{headerStyle == 8 ? <Header8 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  /> : null}
			{headerStyle == 1_8 ? <Header1_8 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
			{headerStyle == 9 ? <Header9 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  /> : null}
			{headerStyle == 1_9 ? <Header1_9 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
			{headerStyle == 10 ? <Header10 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}  /> : null}
			{headerStyle == 1_10 ? <Header1_10 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}

			<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
			<MobileMenu2 isMobileMenu2={isMobileMenu} handleMobileMenu2={handleMobileMenu} />
			<MobileMenu3 isMobileMenu3={isMobileMenu} handleMobileMenu3={handleMobileMenu} />
			<MobileMenu4 isMobileMenu4={isMobileMenu} handleMobileMenu4={handleMobileMenu} />
			


			{children}

			{!footerStyle && <Footer1 />}
			{/* {footerStyle == 1 ? <Footer1 /> : null} */}
			{footerStyle == 2 ? <Footer2 /> : null}
			{footerStyle == 3 ? <Footer3 /> : null}
			{footerStyle == 4 ? <Footer4 /> : null}
			{footerStyle == 5 ? <Footer5 /> : null}
			{footerStyle == 6 ? <Footer6 /> : null}
			{footerStyle == 7 ? <Footer7 /> : null}
			{footerStyle == 8 ? <Footer8 /> : null}
			{footerStyle == 9 ? <Footer9 /> : null}
			{footerStyle == 10 ? <Footer10 /> : null}

			<BackToTop target="#top" />
			
		</>
	)
}
