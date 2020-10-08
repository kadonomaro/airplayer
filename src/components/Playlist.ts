import IAudioFile from '../interfaces/IAudioFile';

export default class Playlist {
    list: Array<IAudioFile> = [];

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
