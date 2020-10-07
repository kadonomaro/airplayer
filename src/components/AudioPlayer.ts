import IAudioFile from "../interfaces/IAudioFile";

interface IControls {
	playButton: HTMLButtonElement,
	pauseButton: HTMLButtonElement,
	stopButton: HTMLButtonElement
}

export default class AudioPlayer {
	private audioElement: HTMLAudioElement;
	private controls: IControls;
	private _sound: IAudioFile | null;

	constructor(audioElement: HTMLAudioElement, controls: IControls) {
		this.audioElement = audioElement;
		this.controls = controls;
		this._sound = null;
		this.setup();
	}

	private setup() {
		this.controls.playButton.addEventListener('click', this.play.bind(this));
		this.controls.pauseButton.addEventListener('click', this.pause.bind(this));
		this.controls.stopButton.addEventListener('click', this.stop.bind(this));
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
}
