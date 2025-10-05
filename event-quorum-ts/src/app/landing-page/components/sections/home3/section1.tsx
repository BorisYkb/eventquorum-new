
import CircleText from '@/components/elements/CircleText'
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero3-section-area">
				<img src="/assets/img/elements/elements18.png" alt="" className="elements18" />
				<img src="/assets/img/elements/elements9.png" alt="" className="elements9" />
				<div className="container">
					<div className="row">
						<div className="col-lg-8 m-auto">
							<div className="hero3-header text-center">
								<h5>Le SARA, l'évènement à ne pas rater</h5>
								<div className="space32" />
								<h1 className="text-anime-style-3">Thème :</h1>
								<div className="space24" />
								<h1 className="text-anime-style-3">Innover et Réussir en 2025</h1>
								<div className="space40" />
								<div className="btn-area1">
									<Link href="/inscription3" className="vl-btn3" aria-label="S'inscrire à la conférence SARA">S'inscrire</Link>
									<Link href="http://localhost:8082/auth/jwt/sign-in/?returnTo=%2Fparticipant%2F" className="vl-btn3 btn2">Se Connecter</Link>
								</div>
								
								<div className="date-btn aniamtion-key-1">
									<h4>15</h4>
									<div className="space14" />
									<p>Janvier</p>
									<div className="space20" />
									
									<p>Sur 3 jours</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
