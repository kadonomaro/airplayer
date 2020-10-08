import IAudioFile from "../interfaces/IAudioFile";

export default class Render {
	private root: HTMLElement

	constructor(root: HTMLElement) {
		this.root = root;
	}

	update(list: Array<IAudioFile>) {
		const items = list.map((item) => {
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