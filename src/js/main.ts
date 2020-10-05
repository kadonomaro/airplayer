import '@/css/style.scss';
import Playlist from '../components/Playlist';
import { IAudioFile } from '../interfaces/IAudioFile';
import { duration } from '../utils/audio';

document.addEventListener('DOMContentLoaded', function () {

    const fileInputElement = document.querySelector('.js-input-file') as HTMLInputElement;
    const audioElement = document.querySelector('.js-audio') as HTMLAudioElement;
    const playlistElement = document.querySelector('.js-playlist') as HTMLDivElement;
    const playlist = new Playlist();
    
    fileInputElement.addEventListener('change', function (evt: Event) {
        const target = evt.target as HTMLInputElement;
        const files: FileList = target.files!;
        Array.from(files).forEach(file => {
            const fileInfo: IAudioFile = {
                name: file.name,
                src: URL.createObjectURL(file),
                duration: 0
            }
            duration(file).then(data => fileInfo.duration = data);
            playlist.add(fileInfo);
            audioElement.src = playlist.list[0].src;
        });
    });
});