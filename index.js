window.addEventListener("load", () => {
  // mobile device check code from -- https://stackoverflow.com/a/72502261
  let hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
      const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
          hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
          hasTouchScreen = true; // deprecated, but good fallback
      } else {
          // Only as a last resort, fall back to user agent sniffing
          const UA = navigator.userAgent;
          hasTouchScreen = (
              /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
              /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
          );
      }
  }

  const container = document.getElementById("container");
  const start = document.getElementById("start");
  if (!hasTouchScreen) start.style.display = "none";

  let points = [];
  let orientation = {alpha:0,beta:0};
  let xInc = 0;
  let yInc = 1;
  let isMoving = false;
  let offsetWidth = window.innerWidth - 10;
  let offsetHeight = window.innerHeight - 25;

  function handleMovePoints() {
    let newPoints = [];
    isMoving = true;
    points.forEach((p, i) => {
      if (!hasTouchScreen || !DeviceMotionEvent) { // desktop doesn't have sensor, so just move linearly
        if (p.offsetTop != offsetHeight) newPoints.push(p);
        else { // place in staggered final positions at the bottom of page
          p.style.top = p.offsetTop - Math.random()*(i%15) +"px";
          p.style.left = p.offsetLeft + Math.random()*10 +"px";
        }
        if (Math.random() > 0.8) return; // stagger movements so it's non-linear
        p.style.top = p.offsetTop + yInc +"px";
      } else {
        if (p.offsetTop != (offsetHeight+200)) {
          p.style.left = Math.max(0, Math.min(p.offsetLeft + xInc, offsetWidth)) +"px";
          newPoints.push(p);
        }
        p.style.top = p.offsetTop + yInc +"px";
      }
    });
    points = newPoints;
    isMoving = false;
  }

  // all sensor orientation code below from -- https://sensor-js.xyz/demo.html
  function handleOrientation(event) {
    // alpha = x, beta = y, gamma = z
    if (Math.abs(event.alpha - orientation.alpha) < 10) {
      // do nothing
      // xInc = 0;
    } else if (event.alpha > orientation.alpha) {
      // console.log("moving left");
      xInc = -1;
      orientation.alpha = event.alpha;
    } else if (event.alpha < orientation.alpha) {
      // console.log("moving right");
      xInc = 1;
      orientation.alpha = event.alpha;
    } else {
      xInc = 0;
    }
    // if (Math.abs(event.beta - orientation.beta) < 10) {
    //   // do nothing
    //   yInc = xInc == 0 ? 1 : 0;
    // } else if (event.beta > orientation.beta) {
    //   yInc = 1;
    //   console.log("moving down");
    //   orientation.beta = event.beta;
    // } else {
    //   yInc = -1;
    //   console.log("moving up");
    //   orientation.beta = event.beta;
    // }
    if (!isMoving) handleMovePoints();
  }

  let isRunning = false;
  start.onclick = function(e) {
    e.preventDefault();
    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }
    
    if (isRunning) {
      window.removeEventListener("deviceorientation", handleOrientation);
      isRunning = false;
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
      start.style.visibility = "hidden";
      isRunning = true;
    }
  };

  setInterval(() => {
    const span = document.createElement("span");
    span.innerHTML = ".";
    span.style.top = window.innerHeight/2+"px";
    span.style.left = window.innerWidth/2+"px";
    points.push(span);
    container.appendChild(span);
  }, 1000);
  if (!hasTouchScreen) setInterval(handleMovePoints, 10);
});