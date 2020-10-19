import IAudioFile from '../interfaces/IAudioFile';

export default class Playlist {
	list: Array<IAudioFile> = [];
	private _current: IAudioFile;
	private index: number;

	constructor() {
		this.index = 0;
		this._current = this.list[this.index];
	}

	get current(): IAudioFile {
		return this._current;
	}

	set current(sound: IAudioFile) {
		const index = this.list.findIndex(item => item.id === sound.id);
		this.index = index;
		this._current = this.list[this.index];
	}

	add(audio: IAudioFile) {
		if (!this.list.filter(item => item.name === audio.name).length) {
			this.list.push(audio);
		}
	}

	remove(id: string | undefined) {
		if (id) {
			this.list = this.list.filter(item => item.id !== id);
		}
	}

	clear() {
		this.list.length = 0;
	}
}
