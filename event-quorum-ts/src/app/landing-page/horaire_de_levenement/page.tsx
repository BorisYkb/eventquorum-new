
import Countdown from 'src/components/landing-page-components/elements/Countdown'
import RegistrationForm from 'src/components/landing-page-components/elements/RegistrationForm'
import Layout from "src/components/landing-page-components/layout/Layout"
import Link from "next/link"
export default function EventSchedule() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(assets/landing-page/img/bg/header-bg10.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Horaire de l’événement</h1>
										<div className="space20" />
										<Link href="/">Accueil <i className="fa-solid fa-angle-right" /> <span>Horaire de l’événement</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					
					{/*===== EVENT AREA STARTS =======*/}
					<div className="schedule-section-area sp10 mt-5">
						<div className="container">
							<div className="row">
								<div className="col-lg-11 m-auto">
									<div className="schedule">
										<table>
											<thead>
												<tr>
													<th>Heure</th>
													<th>Vendredi</th>
													<th>Samedi</th>
													<th>Dimanche</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Conférences d’affaires<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conférences d’affaires<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conférences d’affaires<br /><span>Par l’organisateur de l’événement</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Conférences d’affaires<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conférences d’affaires<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conférences d’affaires<br /><span>Par l’organisateur de l’événement</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Conférences d’affaires<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
													<td>Conception UI/UX<br /><span>Par l’organisateur de l’événement</span></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<RegistrationForm/>
					
					
				</div>

			</Layout>
		</>
	)
}