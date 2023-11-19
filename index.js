window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  const container = document.getElementById("container");
  // setInterval(() => {
  //   const span = document.createElement("span");

  //   container.appendChild(span);
  // }, 1000);
  // if ( location.protocol != "https:" ) {
  //   location.href = "https:" + window.location.href.substring( window.location.protocol.length );
  //   }
    

function handleOrientation(event) {
  console.log("orientation ", event)
  // updateFieldIfNotNull('Orientation_a', event.alpha);
  // updateFieldIfNotNull('Orientation_b', event.beta);
  // updateFieldIfNotNull('Orientation_g', event.gamma);
  // incrementEventCount();
}

function incrementEventCount(){
  let counterElement = document.getElementById("num-observed-events")
  let eventCount = parseInt(counterElement.innerHTML)
  counterElement.innerHTML = eventCount + 1;
}

function updateFieldIfNotNull(fieldName, value, precision=10){
  if (value != null)
    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}

function handleMotion(event) {
  console.log("motion ", event)
  // updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
  // updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
  // updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);

  // updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
  // updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
  // updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);

  // updateFieldIfNotNull('Accelerometer_i', event.interval, 2);

  // updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
  // updateFieldIfNotNull('Gyroscope_x', event.rotationRate.beta);
  // updateFieldIfNotNull('Gyroscope_y', event.rotationRate.gamma);
}

let is_running = false;
let demo_button = document.getElementById("start_demo");
demo_button.onclick = function(e) {
  e.preventDefault();
  
  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }
  
  if (is_running){
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
    demo_button.innerHTML = "Start demo";
    demo_button.classList.add('btn-success');
    demo_button.classList.remove('btn-danger');
    is_running = false;
  }else{
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    document.getElementById("start_demo").innerHTML = "Stop demo";
    demo_button.classList.remove('btn-success');
    demo_button.classList.add('btn-danger');
    is_running = true;
  }
};

});