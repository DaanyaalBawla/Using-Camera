const cameraButton = document.getElementById("cambutton");
const video = document.getElementById("video");
let streaming = false;
const constraints = {
    video: true,
}
cameraButton.addEventListener("click", () =>{
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      streaming = true
    })
})