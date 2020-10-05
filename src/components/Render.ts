import IAudioFile from "../interfaces/IAudioFile";

export default class Render {
    private root: HTMLElement
    constructor(root: HTMLElement) {
        this.root = root;
    }

    update(list: Array<IAudioFile>) {
        list.forEach((item, index) => {
            this.root.insertAdjacentHTML('beforeend', `
                <li class="playlist__item">
                    <div class="playlist-item" data-audio-id="${index}">
                        <span class="playlist-item__name">${item.name}</span>
                        <span class="playlist-item__name">${item.duration}</span>
                    </div>
                </li>
            `);
        });
    }
}