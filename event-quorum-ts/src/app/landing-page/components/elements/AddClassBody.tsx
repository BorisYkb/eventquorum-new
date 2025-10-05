'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function AddClassBody() {
	const pathname = usePathname()

	useEffect(() => {
		const bodyElement = document.querySelector('body')

		if (bodyElement) {
			// Remove all classes
			bodyElement.classList.remove(
				'homepage1-body',
				'homepage2-body',
				'homepage3-body',
				'homepage4-body',
				'homepage5-body',
				'homepage6-body',
				'homepage7-body',
				'homepage8-body',
				'homepage9-body',
				'homepage10-body'
			)

			// Map pathname to corresponding class
			const classMap: { [key: string]: string } = {
				'/landingpage1': 'homepage1-body',
				'/landingpage2': 'homepage2-body',
				'/landingpage3': 'homepage3-body',
				'/landingpage4': 'homepage4-body',
				'/landingpage5': 'homepage5-body',
				'/landingpage6': 'homepage6-body',
				'/landingpage7': 'homepage7-body',
				'/landingpage8': 'homepage8-body',
				'/landingpage9': 'homepage9-body',
				'/landingpage10': 'homepage10-body',
			}

			// Add class based on pathname or default
			const className = classMap[pathname || ''] || 'homepage1-body'
			bodyElement.classList.add(className)
		}

		// Scroll to the top of the page with a slight delay
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth', // Optional for smooth scrolling
			})
		}, 0)
	}, [pathname])

	return null
}
