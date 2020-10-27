import IAudioFile from "../interfaces/IAudioFile";

interface IControls {
	play: HTMLButtonElement,
	pause: HTMLButtonElement,
	stop: HTMLButtonElement,
	prev: HTMLButtonElement,
	next: HTMLButtonElement
}

export default class AudioPlayer {
	private root: HTMLElement;
	private audio: HTMLAudioElement;
	private _sound: IAudioFile | null;
	private controls: IControls;

	constructor(root: HTMLElement) {
		this.root = root;
		this.render();
		this.audio = new Audio();
		this._sound = null;
		this.controls = {
			play: this.root.querySelector('[data-player-play]') as HTMLButtonElement,
			pause: this.root.querySelector('[data-player-pause]') as HTMLButtonElement,
			stop: this.root.querySelector('[data-player-stop]') as HTMLButtonElement,
			prev: this.root.querySelector('[data-player-prev]') as HTMLButtonElement,
			next: this.root.querySelector('[data-player-next]') as HTMLButtonElement
		};
		this.setup();
	}

	private setup() {
		this.controls.play.addEventListener('click', this.play.bind(this));
		this.controls.pause.addEventListener('click', this.pause.bind(this));
		this.controls.stop.addEventListener('click', this.stop.bind(this));
		this.controls.next.addEventListener('click', this.next.bind(this));
		this.controls.prev.addEventListener('click', this.prev.bind(this));
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

	private render() {
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
						<button class="button button--prev player__button" data-player-prev></button>
						<button class="button button--play player__button" data-player-play></button>
						<button class="button button--pause player__button" data-player-pause></button>
						<button class="button button--stop player__button" data-player-stop></button>
						<button class="button button--next player__button" data-player-next></button>
				</div>
				<div class="player__info player__col">
						<span class="player__name" data-player-track>Название трека</span>
				</div>
			</div>
		`
	}
}
