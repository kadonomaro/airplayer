import '@/css/style.scss';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import Render from './components/Render';
import IAudioFile from './interfaces/IAudioFile';
import EventObserver from './libs/EventObserver';
import { duration } from './utils/audio';

document.addEventListener('DOMContentLoaded', function () {

	const fileInputElement = document.querySelector('.js-input-file') as HTMLInputElement;
	const audioElement = document.querySelector('.js-audio') as HTMLAudioElement;
	const playlistElement = document.querySelector('.js-playlist') as HTMLDivElement;

	const progressBar = document.querySelector('.js-progress-bar') as HTMLDivElement;
	const progressEnd = document.querySelector('.js-progress-end') as HTMLDivElement;

	const playlist = new Playlist();
	const render = new Render(playlistElement);
	const player = new AudioPlayer(audioElement, {
		playButton: document.querySelector('.js-player-play') as HTMLButtonElement,
		pauseButton: document.querySelector('.js-player-pause') as HTMLButtonElement,
		stopButton: document.querySelector('.js-player-stop') as HTMLButtonElement,
		prevButton: document.querySelector('.js-player-prev') as HTMLButtonElement,
		nextButton: document.querySelector('.js-player-next') as HTMLButtonElement
	}, {
		trackName: document.querySelector('.js-player-name') as HTMLSpanElement
	});

	const soundObserver = new EventObserver();
	soundObserver.subscribe((sound: IAudioFile) => {
		player.sound = sound;
		player.info.trackName.textContent = sound.name;
		progressEnd.textContent = sound.duration.toString();
	});


	fileInputElement.addEventListener('change', function (evt: Event) {
		const target = evt.target as HTMLInputElement;
		const files: FileList = target.files!;
		const promises: any = [];
		Array.from(files).forEach((file, index) => {
			const fileInfo: IAudioFile = {
				id: ((+new Date) * index).toString(36),
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
			playlist.current = playlist.list.find(item => item.id === target.dataset.audioId)!;
			soundObserver.broadcast(playlist.current);
		}
		if (target.classList.contains('js-remove-track')) {
			const parent = target.closest('[data-audio-id]') as HTMLElement;
			playlist.remove(parent.dataset.audioId);
			render.update(playlist.list);
		}
	});

});
