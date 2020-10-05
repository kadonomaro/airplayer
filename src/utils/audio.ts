export function duration(file: File): Promise<string> {
    const audio: HTMLAudioElement = new Audio();
    const urlObj = URL.createObjectURL(file);
    audio.src = urlObj;
    return new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', function(){
            resolve(convertSecondsToMinutes(+audio.duration.toFixed()));
            URL.revokeObjectURL(urlObj);
        });
    });
}

export function convertSecondsToMinutes(seconds: number): string {
    return (Math.floor(seconds / 60) + ':' + (seconds % 60 ? seconds % 60 : '00'));
}