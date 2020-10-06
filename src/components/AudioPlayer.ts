import IAudioFile from "../interfaces/IAudioFile";

export default class AudioPlayer {
	private audioElement: HTMLAudioElement;

	constructor(audioElement: HTMLAudioElement) {
		this.audioElement = audioElement;
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
