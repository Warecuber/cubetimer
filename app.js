/////////////////////////////////////////
//////// Code for scramble Algs ////////
///////////////////////////////////////

var scrambleController = (() => {
  const sides = [
    "R",
    "R'",
    "R2",
    "L",
    "L'",
    "L2",
    "U",
    "U'",
    "U2",
    "D",
    "D'",
    "D2",
    "F",
    "F'",
    "F2",
    "B",
    "B'",
    "B2",
  ];

  function generateScramble() {
    let scrambleStr;
    let scrambleArr = [];

    for (let i = 0; scrambleArr.length < 24; i++) {
      let randomNum = Math.floor(Math.random() * 18);
      let currentNum = sides[randomNum];
      var lastNum = scrambleArr.slice(-1)[0];
      if (sides[randomNum] == lastNum) {
        scrambleArr.pop();
      } else if (currentNum == `${lastNum}'`) {
        scrambleArr.pop();
      } else if (currentNum == `${lastNum}2`) {
        scrambleArr.pop();
      } else if (`${currentNum}'` == lastNum) {
        scrambleArr.pop();
      } else if (`${currentNum}2` == lastNum) {
        scrambleArr.pop();
      } else if (lastNum) {
        let tempCurrentNum = currentNum.split("");
        if (
          `${tempCurrentNum[0]}'` === lastNum ||
          `${tempCurrentNum[0]}2` === lastNum
        ) {
          scrambleArr.pop();
        }
      }
      scrambleArr.push(sides[randomNum]);
    }
    scrambleStr = scrambleArr.join(" ");
    $(".scramble").html(scrambleStr);
  }

  return {
    scramble: () => {
      generateScramble();
    },
  };
})();

/////////////////////////////////////////
//////////// Code for Timer ////////////
///////////////////////////////////////

var timer = (() => {
  var ms = 0,
    s = 0,
    m = 0,
    running = false,
    color = "white";
  var timer;
  var stopwatch = document.querySelector(".time");

  function start() {
    if (!timer) {
      ms = 0;
      s = 0;
      m = 0;
      timer = setInterval(run, 10);
    }
  }

  function run() {
    if (m <= 0) {
      stopwatch.textContent = `${s < 10 ? `0${s}` : s}:${
        ms < 10 ? `0${s}` : ms
      }`;
    } else {
      stopwatch.textContent = `${m}:${s}:${ms}`;
    }

    ms++;
    if (ms == 100) {
      ms = 0;
      s++;
    }
    if (s == 60) {
      s = 0;
      m++;
    }
  }

  function stop() {
    clearInterval(timer);
    timer = false;
    scrambleController.scramble();
  }

  function recordTime() {}

  function init() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) {
        if (!running && color === "green") {
          color = "white";
          console.log("started");
          running = true;
          $(".time").css({
            color: "rgb(214, 214, 214)",
          });
          start();
        } else if (color !== "green") {
          $(".time").css({
            color: "rgb(214, 214, 214)",
          });
        }
      }
    });
    window.addEventListener("keydown", (e) => {
      if (running) {
        console.log("stopped");
        stop();
        running = false;
      } else {
        if (e.keyCode === 32) {
          console.log(color);
          if (color === "white") {
            $(".time").css({
              color: "rgb(252, 164, 0)",
            });
            color = "orange";
          }
          setTimeout(() => {
            if (color === "orange") {
              $(".time").css({
                color: "rgb(8, 187, 8)",
              });
              color = "green";
            }
          }, 1000);
        }
      }
    });
    scrambleController.scramble();
  }

  // let running = false;
  // var color = "white";

  // function init() {
  //   window.addEventListener("keyup", (e) => {
  //     if (e.keyCode === 32) {
  //       if (!running && color === "green") {
  //         color = "white";
  //         console.log("started");
  //         running = true;
  //         $(".time").css({
  //           color: "rgb(214, 214, 214)",
  //         });
  //         var start = new Date().getTime(),
  //           elapsed = "0.0";
  //         if (running) {
  //           window.setInterval(function () {
  //             var time = new Date().getTime() - start;
  //             elapsed = Math.floor(time / 10) / 100;
  //             if (Math.round(elapsed) == elapsed) {
  //               elapsed += ".0";
  //             }
  //             document.querySelector(".time").innerHTML = elapsed;
  //           }, 10);
  //         }
  //       } else if (color !== "green") {
  //         $(".time").css({
  //           color: "rgb(214, 214, 214)",
  //         });
  //       }
  //     }
  //   });
  //   window.addEventListener("keydown", (e) => {
  //     if (running) {
  //       console.log("stopped");
  //       setTimeout(() => {
  //         running = false;
  //       }, 500);
  //     } else {
  //       if (e.keyCode === 32) {
  //         console.log(color);

  //         if (color === "white") {
  //           $(".time").css({
  //             color: "rgb(252, 164, 0)",
  //           });
  //           color = "orange";
  //         }
  //         setTimeout(() => {
  //           if (color === "orange") {
  //             $(".time").css({
  //               color: "rgb(8, 187, 8)",
  //             });
  //             color = "green";
  //           }
  //         }, 1000);
  //       }
  //     }
  //   });
  //   scrambleController.scramble();
  // }

  return {
    init: () => {
      init();
    },
  };
})(scrambleController);

timer.init();
