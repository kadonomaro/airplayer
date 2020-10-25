import IAudioFile from '../interfaces/IAudioFile';

export default class Playlist {
	list: Array<IAudioFile> = [];
	private root: HTMLElement
	private _current: IAudioFile;
	private index: number;

	constructor(root: HTMLElement) {
		this.index = 0;
		this._current = this.list[this.index];
		this.root = root;
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

	render() {
		const items = this.list.map((item) => {
			return `
			<li class="playlist__item">
				<div class="playlist-item" data-audio-id="${item.id}">
					<span class="playlist-item__name">${item.name}</span>
					<span class="playlist-item__duration">${item.duration}</span>
					<div class="playlist-item__controls">
						<button class="js-remove-track">Remove</button>
					</div>
				</div>
			</li>
			`
		}).join('');
		this.root.innerHTML = items;
	}
}
