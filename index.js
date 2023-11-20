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
  // const banner = document.getElementById("banner");
  // const start = document.getElementById("start");
  // if (hasTouchScreen) banner.style.display = "none";
  // else start.style.display = "none";

  let points = [];
  let orientation = {alpha:0,beta:0};
  let xInc = 0;
  let yInc = 1;
  let isMoving = false;

  function handleMovePoints() {
    let newPoints = [];
    // isMoving = true;
    points.forEach((p, i) => {
      if (p.offsetTop != window.innerHeight - 25) newPoints.push(p);
      else {
        p.style.top = p.offsetTop - Math.random()*(i%15) +"px";
        p.style.left = p.offsetLeft + Math.random()*10 +"px";
      }
      if (Math.random() > 0.8) return;
      // if (p.offsetLeft != 0 && p.offsetTop != 0&& p.offsetRight != window.innerWidth && p.offsetBottom != window.innerHeight) newPoints.push(p);
      // p.style.left = p.offsetLeft + xInc +"px";
      p.style.top = p.offsetTop + yInc +"px";
    });
    // console.log(xInc, yInc);
    points = newPoints;
    // isMoving = false;
  }
  // all sensor orientation code below from -- https://sensor-js.xyz/demo.html
  // function handleOrientation(event) {
  //   // alpha = x, beta = y, gamma = z
  //   if (Math.abs(event.alpha - orientation.alpha) < 10) {
  //     // do nothing
  //     xInc = 0;
  //   } else if (event.alpha > orientation.alpha) {
  //     xInc = -1;
  //     orientation.alpha = event.alpha;
  //   } else {
  //     xInc = 1;
  //     orientation.alpha = event.alpha;
  //   }
  //   if (Math.abs(event.beta - orientation.beta) < 10) {
  //     // do nothing
  //     yInc = xInc == 0 ? 1 : 0;
  //   } else if (event.beta > orientation.beta) {
  //     yInc = 1;
  //     orientation.beta = event.beta;
  //   } else {
  //     yInc = -1;
  //     orientation.beta = event.beta;
  //   }
  //   if (!isMoving) handleMovePoints();
  // }

  // let isRunning = false;
  // start.onclick = function(e) {
  //   e.preventDefault();
  //   // Request permission for iOS 13+ devices
  //   if (
  //     DeviceMotionEvent &&
  //     typeof DeviceMotionEvent.requestPermission === "function"
  //   ) {
  //     DeviceMotionEvent.requestPermission();
  //   }
    
  //   if (isRunning) {
  //     window.removeEventListener("deviceorientation", handleOrientation);
  //     isRunning = false;
  //   } else {
  //     window.addEventListener("deviceorientation", handleOrientation);
  //     start.style.visibility = "hidden";
  //     isRunning = true;
  //   }
  // };

  // if (hasTouchScreen) 
  setInterval(() => {
    const span = document.createElement("span");
    span.innerHTML = ".";
    span.style.top = window.innerHeight/2+"px";
    span.style.left = window.innerWidth/2+"px";
    points.push(span);
    container.appendChild(span);
  }, 1000);
  setInterval(handleMovePoints, 10);
});