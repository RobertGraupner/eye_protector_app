import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

	state = {
		status: 'off',
		time: 0,
		timer: null,
	};

	formatTime = time => {
		let minutes = Math.floor(time / 60);
		let seconds = time - (minutes * 60);

		minutes < 10 ? (minutes = '0' + minutes) : minutes;
		seconds < 10 ? (seconds = '0' + seconds) : seconds;

		return minutes + ':' + seconds;
	};
// funkcja zmniejsza czas o 1 i sprawdza status
	step = () => {
		this.setState({time: this.state.time - 1});

		if (this.state.time == 0) {
			this.playBell();
			if (this.state.status == 'work') {
				this.setState({
					status: 'rest',
					time: 20,
				})
			} else if (this.state.status == 'rest') {
				this.setState({
					status: 'work',
					time: 1200,
				})
			};
		}
	}
// ustawiamy wartość po kliknięciu przycisku Start
	startTimer = () => {
		this.setState({
			time: 1200,
			status: 'work',
			timer: setInterval(this.step, 1000),
		});
	};
// ustawiamy wartość po kliknięciu przycisku Stop
	stopTimer = () => {
		this.setState({
			time: 0,
			status: "off",
			timer: clearInterval(this.state.timer),
		});
	};

	playBell = () => {
		const bell = new Audio('./sounds/bell.wav');
		bell.play();
	};

	closeApp = () => {
		window.close();
	};

	render() {
		const { status} = this.state;

		return (
			<div>
				<h1>Protect your eyes</h1>
				{status === 'off' && (
					<div>
						<p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
						<p>This app will help you track your time and inform you when it'stime to rest.</p>
					</div>
				)}
				{status === 'work' && <img src='./images/work.png' />}
				{status === 'rest' && <img src='./images/rest.png' />}
				{status !== 'off' && (<div className='timer'>{this.formatTime(this.state.time)}</div>)}
				{status === 'off' && (<button className='btn' onClick={() => this.startTimer()}>Start</button>)}
				{status !== 'off' && (<button className='btn' onClick={() => this.stopTimer()}>Stop</button>)}
				<button className='btn btn-close' onClick={() => this.closeApp()}>X</button>
			</div>
		);
	}
}

render(<App />, document.querySelector('#app'));
