import '@/css/style.scss';
import { IAudioFile } from '../interfaces/IAudioFile';
import { duration } from '../utils/audio';

document.addEventListener('DOMContentLoaded', function () {

    const playlist: Array<IAudioFile> = [];
    const fileInput = document.querySelector('.js-input-file') as HTMLInputElement;
    
    fileInput.addEventListener('change', function (evt: Event) {
        const target = evt.target as HTMLInputElement;
        const files: FileList = target.files!;
        Array.from(files).forEach(file => {
            const fileInfo: IAudioFile = {
                name: file.name,
                duration: 0
            }
            duration(file).then(data => fileInfo.duration = data);
            playlist.push(fileInfo);
        });
        console.dir(playlist);
    });
});