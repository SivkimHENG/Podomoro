import React, { useEffect, useRef, useState } from "react";
import './podomoro.css'
const STATUS = {
	pause: 0,
	start: 1,
	default: 2
}

function Podomoro() {

	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);
	const [displayMessage, setDisplayMessage] = useState(false);
	const [status, setStatus] = useState(false);
	const interval = useRef();

	function Countdown() {

		if (seconds === 0) {
			if (minutes !== 0) {
				setSeconds(59);
				setMinutes(minutes - 1);
			}
			else {
				var BreakMinutes = displayMessage ? 24 : 4
				var BreakSeconds = 59;

				setMinutes(BreakMinutes);
				setSeconds(BreakSeconds);
				setDisplayMessage(!displayMessage);

			}

		}
		else {
			setSeconds(seconds - 1);
		}
	}

	React.useEffect(() => {
		if (status === STATUS.start) {

			interval.current = setInterval(() => {
				Countdown();
			}, 1000);
		}
		else if (status === STATUS.pause && interval.current) {
			clearInterval(interval.current);
		}
		return () => {
			clearInterval(interval.current);
		}
	}, [minutes, seconds, status]);




	const TimerMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const TimerSeconds = seconds < 10 ? `0${seconds}` : seconds;

	const start = () => setStatus(STATUS.start);
	const pause = () => setStatus(STATUS.pause);
	const stop = () => {
		setStatus(STATUS.pause);
		setMinutes(25);
		setSeconds(0);
	}



	return (

		<div className="podomoro">
			<div className="timer">
				{TimerMinutes} : {TimerSeconds}
			</div>
			<div className="container" >
				<button className="btn-ctr" onClick={start}>Start</button>
				<button className="btn-ctr" onClick={stop}>Stop</button>
				<button className="btn-ctr" onClick={pause}>Pause</button>
			</div>
		</div>
	);
}

export default Podomoro;
