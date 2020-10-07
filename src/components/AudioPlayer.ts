import IAudioFile from "../interfaces/IAudioFile";

interface IControls {
	playButton: HTMLButtonElement,
	pauseButton: HTMLButtonElement,
	stopButton: HTMLButtonElement
}

export default class AudioPlayer {
	private audioElement: HTMLAudioElement;
	private controls: IControls;

	constructor(audioElement: HTMLAudioElement, controls: IControls) {
		this.audioElement = audioElement;
		this.controls = controls;
		this.setup();
	}

	private setup() {
		this.controls.playButton.addEventListener('click', this.play.bind(this));
		this.controls.pauseButton.addEventListener('click', this.pause.bind(this));
		this.controls.stopButton.addEventListener('click', this.stop.bind(this));
	}

	addSound(sound: IAudioFile) {
		this.audioElement.src = sound.src;
	}

	play() {
		this.audioElement.play();
	}

	pause() {
		this.audioElement.pause();
	}

	stop() {
		this.pause();
		this.audioElement.currentTime = 0;
	}
}
