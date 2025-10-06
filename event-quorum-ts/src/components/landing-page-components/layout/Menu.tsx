import Link from "next/link"
import { useRouter } from "next/router"

export default function Menu() {
	const router = useRouter()

	return (
		<>

			<ul className="sub-menu">
				<Link href="/landing-page/landingpage1" className={router.pathname == "/landing-page/landingpage1" ? "active" : ""}>Home Default</Link>
				<Link href="/landing-page/landingpage2" className={router.pathname == "/landing-page/landingpage2" ? "active" : ""}>Home Interior</Link>
			</ul>
		</>
	)
}
