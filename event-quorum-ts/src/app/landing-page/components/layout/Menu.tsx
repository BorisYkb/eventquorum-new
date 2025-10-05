import Link from "next/link"
import { useRouter } from "next/router"

export default function Menu() {
	const router = useRouter()

	return (
		<>

			<ul className="sub-menu">
				<Link href="/landingpage1" className={router.pathname == "/landinpage1" ? "active" : ""}>Home Default</Link>
				<Link href="/landingpage2" className={router.pathname == "/landingpage2" ? "active" : ""}>Home Interior</Link>
			</ul>
		</>
	)
}
