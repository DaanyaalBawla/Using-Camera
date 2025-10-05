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
     const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      console.log(capabilities)
      if ('zoom' in capabilities) {
        zoomFactor(track)
      }
      
    })
})
function zoomFactor(track) {
  zoom.forEach(btn => {
    btn.addEventListener("click", () => {
      track.applyConstraints({ advanced: [{ zoom: btn.dataset.zoom}] }) 
    })
  })
}