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

	const progressBar = document.querySelector('.js-progress-bar') as HTMLDivElement;
	const progressStart = document.querySelector('.js-progress-start') as HTMLDivElement;
	const progressEnd = document.querySelector('.js-progress-end') as HTMLDivElement;

	const playerName = document.querySelector('.js-player-name') as HTMLSpanElement;

	const playlist = new Playlist();
	const render = new Render(playlistElement);
	const player = new AudioPlayer(audioElement, {
		playButton: document.querySelector('.js-player-play') as HTMLButtonElement,
		pauseButton: document.querySelector('.js-player-pause') as HTMLButtonElement,
		stopButton: document.querySelector('.js-player-stop') as HTMLButtonElement
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
			document.querySelectorAll('[data-audio-id]').forEach(item => {
				item.classList.remove('playlist-item--active');
			});
			target.classList.add('playlist-item--active');

			player.sound = playlist.list[+target.dataset.audioId];
			playerName.textContent = player.sound.name;
			progressEnd.textContent = player.sound.duration.toString();
		}
		if (target.classList.contains('js-remove-track')) {
			console.log('remove');
		}
	});




});
