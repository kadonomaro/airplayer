export function duration(file: File): Promise<number> {
    const audio = new Audio();
    const urlObj = URL.createObjectURL(file);
    audio.src = urlObj;
    return new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', function(){
            resolve(audio.duration);
            URL.revokeObjectURL(urlObj);
        });
    });
}