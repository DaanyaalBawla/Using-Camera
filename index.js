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
Originally to test I had 2 zoom buttons
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
// instead of zoom buttons I have a user input for zoom, soon this should be commented out too for the click to zoom,pan,tilt
function zoomFactor(track,capabilities) {
  zoomvalue = document.querySelector('#zoom')
  zoomvalue.min = capabilities.zoom.min
  zoomvalue.max = capabilities.zoom.max
  zoomvalue.step = capabilities.zoom.step
  zoom.addEventListener("input", () => {
  track.applyConstraints({advanced:[{zoom: Number(zoomvalue.value)}]})
  })
}
function pan(track,capabilities) {
  panvalue = document.querySelector('#video')
  panvalue.min = capabilities.pan.min
  panvalue.max = capabilities.pan.max
  panvalue.step = capabilities.pan.step
  track.applyConstraints({advanced:[{pan: Number(panvalue.value)}]})
  centerframepan = (panvalue.min + panvalue.max)/2

}
function tilt(track,capabilities) {
  tiltvalue = document.querySelector('#tilt')
  tiltvalue.min = capabilities.tilt.min
  tiltvalue.max = capabilities.tilt.max
  tiltvalue.step = capabilities.tilt.step
  track.applyConstraints({advanced:[{tilt: Number(tiltvalue.value)}]})
  centerframetilt = (tiltvalue.min + tiltvalue.max)/2

}

video.addEventListener("loadedmetadata", () => {
  console.log(video.videoWidth);
  console.log(video.videoHeight);
});
// tracks mouse movement on the video box
video.addEventListener('click', function(event) {
    const tracking = {x: event.offsetX, y: event.offsetY};
    newPan = ((panvalue.max-panvalue.min)/video.getBoundingClientRect().width)*tracking.x + panvalue.min
  //incomplete there for concept. need to change panvalue probably will combine tilt and pan into 1 function then add this event listener

});