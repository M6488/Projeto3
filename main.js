const video = document.querySelector('video')

navigator.mediaDevices.getUserMedia({video: true})
.then(stream => {
    video.srcObject = stream
    video.play()
})
.catch(error => {
    console.log(error)
})

document.querySelector('button').addEventListener('click', () => {
    const canvas = document.querySelector('canvas')
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0)
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker Registrado', reg))
        .catch(err => console.log('Erro ao registrar Service Worker', err));
    });
  }
