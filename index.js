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
/*
function zoomFactor(track,capabilities) {
  zoom.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.zoom === 'max') {
        track.applyConstraints({ advanced: [{ zoom: Number(capabilities.zoom.max) }] });
      } else if (btn.dataset.zoom === 'min') {
        track.applyConstraints({ advanced: [{ zoom: Number(capabilities.zoom.min) }] });
      }
      else {
      track.applyConstraints({ advanced: [{ zoom: btn.dataset.zoom}] }) 
    }
    })
  })
}
*/
function zoomFactor(track,capabilities) {
  zoomvalue = document.querySelector('#zoom')
  zoomvalue.min = capabilities.zoom.min
  zoomvalue.max = capabilities.zoom.max
  zoomvalue.step = '1'
  zoom.addEventListener("input", () => {
  track.applyConstraints({advanced:[{zoom: Number(document.querySelector('#zoom').value)}]})
  })
}
function pan(track) {
  panvalue = Number(document.querySelector('#pan').value)
  track.applyConstraints({advanced:[{pan: panvalue}]})

}
function tilt(track) {
  tiltvalue = Number(document.querySelector('#tilt').value)
  track.applyConstraints({advanced:[{tilt: tiltvalue}]})
}