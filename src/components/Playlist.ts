import IAudioFile from '../interfaces/IAudioFile';

export default class Playlist {
    readonly list: Array<IAudioFile> = [];

    add(audio: IAudioFile) {
        if (!this.list.filter(item => item.name === audio.name).length) {
            this.list.push(audio);
        }
    }

    clear() {
        this.list.length = 0;
    }
}