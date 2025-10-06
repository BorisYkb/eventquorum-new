'use client'
import { useEffect, useState } from "react"

const msInSecond = 1000
const msInMinute = 60 * msInSecond
const msInHour = 60 * msInMinute
const msInDay = 24 * msInHour

const getPartsOfTimeDuration = (duration: number) => {
	const days = Math.floor(duration / msInDay)
	const hours = Math.floor((duration % msInDay) / msInHour)
	const minutes = Math.floor((duration % msInHour) / msInMinute)
	const seconds = Math.floor((duration % msInMinute) / msInSecond)

	return { days, hours, minutes, seconds }
}

export default function Countdown({ style }: any) {
	const [timeDif, setTimeDif] = useState(() => {
		const now = Date.now()
		const endDateTime = new Date()
		endDateTime.setDate(endDateTime.getDate() + 2) // Set end date 2 days from now
		return endDateTime.getTime() - now
	})

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeDif((prev) => {
				const updatedTime = prev - 1000
				if (updatedTime <= 0) {
					clearInterval(interval)
					return 0
				}
				return updatedTime
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const timeParts = getPartsOfTimeDuration(timeDif)

	return (
		<>


			{!style && <>
				<div className="timer align-items-center" >
					<div className="time-box">
						<span id="days1" className="time-value">{timeParts.days}</span>
						<br />Jours
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="hours1" className="time-value">{timeParts.hours}</span>
						<br />Heures
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="minutes1" className="time-value">{timeParts.minutes}</span>
						<br />Minutes
					</div>
					<div className="space14" />
					<div className="time-box" style={{ margin: "0 26px 0 0" }}>
						<span id="seconds1" className="time-value">{timeParts.seconds}</span>
						<br />Secondes
					</div>
				</div>
			</>}


			{style === 1 && <>
				<div className="timer align-items-center">
					<div className="time-box">
						<span id="days" className="time-value">{timeParts.days} <span>JOURS</span></span>
					</div>
					<div className="time-box">
						<span id="hours" className="time-value">{timeParts.hours} <span>Heures</span></span>
					</div>
					<div className="time-box">
						<span id="minutes" className="time-value">{timeParts.minutes} <span>Minutes</span></span>
					</div>
					<div className="time-box">
						<span id="seconds" className="time-value">{timeParts.seconds} <span>Secondes</span></span>
					</div>
				</div>

			</>}
			{style === 2 && <>
				<div className="row">
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/landing-page/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="days1" className="time-value">{timeParts.days} <span>JOURS</span></span></h2>
						</div>
						<div className="space50 d-lg-none d-block" />
					</div>
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/landing-page/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="hours1" className="time-value">{timeParts.hours} <span>Heures</span> </span></h2>
						</div>
						<div className="space50 d-lg-none d-block" />
					</div>
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/landing-page/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="minutes1" className="time-value">{timeParts.minutes}<span>Minutes</span></span></h2>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<div className="cta-counter-box">
							<img src="/assets/landing-page/img/elements/elements23.png" alt="" className="elements23 keyframe5" />
							<h2><span id="seconds1" className="time-value">{timeParts.seconds}<span>Secondes</span></span></h2>
						</div>
					</div>
				</div>
			</>}
			{style === 3 && <>
				<div className="timer2">
					<div className="time-box">
						<span id="days" className="time-value">{timeParts.days} <span>JOURS</span></span>
						<br />
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="hours" className="time-value">{timeParts.hours} <span>Heures</span></span>
						<br />
					</div>
					<div className="space14" />
					<div className="time-box">
						<span id="minutes" className="time-value">{timeParts.minutes} <span>Minutes</span></span>
						<br />
					</div>
					<div className="space14" />
					<div className="time-box" style={{ margin: '0 26px 0 0' }}>
						<span id="seconds" className="time-value">{timeParts.seconds} <span>Secondes</span></span>
						<br />
					</div>
				</div>

			</>}
		</>
	)
}
