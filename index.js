const cameraButton = document.getElementById("cambutton");
const video = document.getElementById("video");
const zoom = document.querySelectorAll('.zoom button')
let streaming = false;
const constraints = {
    video: {facingMode: { exact: "environment" },}

}
cameraButton.addEventListener("click", () =>{
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      streaming = true
      track = stream.getVideoTracks()[0];
      
    })
})
function zoomFactor(x) {
  zoom.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.id === 'zoom2') {
        x = 2
      }
      if (btn.id === 'zoom4') {
        x = 4
      } 
    })
    
  });
  track.applyConstraints({ advanced: [{ zoom: x}] })
}