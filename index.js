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
        zoomFactor(track,capabilities)
      }
      if ('pan' in capabilities) {
        pan(track,capabilities)
      }
      if ('tilt' in capabilities) {
        tilt(track,capabilities)
      }
      
    })
})
function zoomFactor(track,capabilities) {
  zoom.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.zoom === 'max') {
        track.applyConstraints({ advanced: [{ zoom: capabilities.zoom.max }] });
      } else if (btn.dataset.zoom === 'min') {
        track.applyConstraints({ advanced: [{ zoom: capabilities.zoom.min }] });
      }
      else {
      track.applyConstraints({ advanced: [{ zoom: btn.dataset.zoom}] }) 
    }
    })
  })
}
function pan(track, capabilities) {
  panvalue = Number(document.querySelector('#pan').value)
  track.applyConstraints({advanced:[{pan: panvalue}]})

}
function tilt(track,capabilities) {
  tiltvalue = Number(document.querySelector('#tilt').value)
  track.applyConstraints({advanced:[{tilt: tiltvalue}]})
}