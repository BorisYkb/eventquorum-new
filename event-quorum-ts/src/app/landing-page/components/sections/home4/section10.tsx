
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

export default function Section10() {
	return (
		<>

			<div className="cta4-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-10 m-auto">
							<div className="cta1-main-boxarea">
								<div className="timer-btn-area display-flex align-items-center justify-content-center">
									<Countdown />
								</div>
								<ul>
									<li>
										<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
									</li>
									<li className="m-0">
										<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
