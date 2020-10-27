import IAudioFile from "../interfaces/IAudioFile";

interface IControls {
	playButton: HTMLButtonElement,
	pauseButton: HTMLButtonElement,
	stopButton: HTMLButtonElement,
	prevButton: HTMLButtonElement,
	nextButton: HTMLButtonElement
}

interface IAudioInfo {
	trackName: HTMLSpanElement
}

export default class AudioPlayer {
	private root: HTMLElement;
	private audio: HTMLAudioElement;
	private _sound: IAudioFile | null;

	constructor(root: HTMLElement) {
		this.root = root;
		this.audio = new Audio();
		this._sound = null;
	}

	get sound(): IAudioFile | null {
		return this._sound;
	}

	set sound(sound: IAudioFile | null) {
		this._sound = sound;
		this.audio.src = this._sound?.src!;
	}

	play() {
		if (this._sound?.src) {
			this.audio.play();
		}
	}

	pause() {
		if (this._sound?.src) {
			this.audio.pause();
		}
	}

	stop() {
		if (this._sound?.src) {
			this.pause();
			this.audio.currentTime = 0;
		}
	}

	prev() {

	}

	next() {

	}

	render() {
		this.root.innerHTML =  `
			<div class="player__progress">
					<div class="progress">
						<div class="progress__bar js-progress-bar"></div>
						<div class="progress__info">
							<span class="progress__start">0</span>
							<span class="progress__end js-progress-end">3</span>
						</div>
					</div>
			</div>
			<div class="player__body">
				<div class="player__controls player__col">
						<button class="button button--prev player__button js-player-prev"></button>
						<button class="button button--play player__button js-player-play"></button>
						<button class="button button--pause player__button js-player-pause"></button>
						<button class="button button--stop player__button js-player-stop"></button>
						<button class="button button--next player__button js-player-next"></button>
				</div>
				<div class="player__info player__col">
						<span class="player__name js-player-name">Название трека</span>
				</div>
			</div>
		`
	}
}
