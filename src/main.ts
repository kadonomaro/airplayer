import '@/css/style.scss';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import Render from './components/Render';
import IAudioFile from './interfaces/IAudioFile';
import { duration } from './utils/audio';

document.addEventListener('DOMContentLoaded', function () {

	const fileInputElement = document.querySelector('.js-input-file') as HTMLInputElement;
	const audioElement = document.querySelector('.js-audio') as HTMLAudioElement;
	const playlistElement = document.querySelector('.js-playlist') as HTMLDivElement;
	const playButton = document.querySelector('.js-player-play') as HTMLButtonElement;
	const pauseButton = document.querySelector('.js-player-pause') as HTMLButtonElement;
	const stopButton = document.querySelector('.js-player-stop') as HTMLButtonElement;

	const playlist = new Playlist();
	const render = new Render(playlistElement);
	const player = new AudioPlayer(audioElement, {
		playButton,
		pauseButton,
		stopButton
	});


	fileInputElement.addEventListener('change', function (evt: Event) {
		const target = evt.target as HTMLInputElement;
		const files: FileList = target.files!;
		const promises: any = [];
		Array.from(files).forEach(file => {
			const fileInfo: IAudioFile = {
				name: file.name,
				src: URL.createObjectURL(file),
				duration: 0
			}
			duration(file).then(data => fileInfo.duration = data);
			promises.push(duration(file));
			playlist.add(fileInfo);
		});

		Promise.all(promises).then(() => {
			render.update(playlist.list);
		});
	});


	document.addEventListener('click', function (evt: Event) {
		const target = evt.target as HTMLElement;
		if (target.dataset.audioId) {
			player.addSound(playlist.list[+target.dataset.audioId]);
		}
	});




});
