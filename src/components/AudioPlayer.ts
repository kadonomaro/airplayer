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
	private audioElement: HTMLAudioElement;
	private controls: IControls;
	public info: IAudioInfo;
	private _sound: IAudioFile | null;

	constructor(audioElement: HTMLAudioElement, controls: IControls, info: IAudioInfo) {
		this.audioElement = audioElement;
		this.controls = controls;
		this.info = info;
		this._sound = null;
		this.setup();
	}

	private setup() {
		this.controls.playButton.addEventListener('click', this.play.bind(this));
		this.controls.pauseButton.addEventListener('click', this.pause.bind(this));
		this.controls.stopButton.addEventListener('click', this.stop.bind(this));
		this.controls.nextButton.addEventListener('click', this.next.bind(this));
		this.controls.prevButton.addEventListener('click', this.prev.bind(this));
	}

	get sound(): IAudioFile | null {
		return this._sound;
	}

	set sound(sound: IAudioFile | null) {
		this._sound = sound;
		this.audioElement.src = this._sound?.src!;
	}

	play() {
		if (this._sound?.src) {
			this.audioElement.play();
		}
	}

	pause() {
		if (this._sound?.src) {
			this.audioElement.pause();
		}
	}

	stop() {
		if (this._sound?.src) {
			this.pause();
			this.audioElement.currentTime = 0;
		}
	}

	prev() {

	}

	next() {

	}
}
