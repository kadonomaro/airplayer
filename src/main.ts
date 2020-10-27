import '@/css/style.scss';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import IAudioFile from './interfaces/IAudioFile';
import EventObserver from './libs/EventObserver';
import { duration } from './utils/audio';

document.addEventListener('DOMContentLoaded', function () {

	const fileInputElement = document.querySelector('.js-input-file') as HTMLInputElement;
	const audioElement = document.querySelector('.js-player') as HTMLAudioElement;
	const playlistElement = document.querySelector('.js-playlist') as HTMLDivElement;

	const playlist = new Playlist(playlistElement);
	const player = new AudioPlayer(audioElement);

	const soundObserver = new EventObserver();
	soundObserver.subscribe((sound: IAudioFile) => {
		player.sound = sound;
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
			playlist.render();
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
			playlist.render();
		}
	});

});
