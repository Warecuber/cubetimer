$(".modalContainer").hide();

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

/////////////////////////////////////////////
///////////// Code for Timer ///////////////
///////////////////////////////////////////
//////////////////////////////////////////
// Timer code from VerkkoNet on Youtube//
////////////////////////////////////////

var timer = (() => {
  var ms = 0,
    s = 0,
    m = 0,
    running = false,
    color = "white",
    times;
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
      stopwatch.textContent = `${s < 10 ? `0${s}` : s}.${
        ms < 10 ? `0${s}` : ms
      }`;
    } else {
      stopwatch.textContent = `${m < 10 ? `0${m}` : m}.${
        s < 10 ? `0${s}` : s
      }.${ms < 10 ? `0${s}` : ms}`;
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
    addTime();
  }

  function loadTimes() {
    if (localStorage.getItem("savedTimes")) {
      times = JSON.parse(localStorage.getItem("savedTimes"));
    } else {
      times = [];
    }
    addTimesToDOM();
  }

  // loop to add initial times to DOM //
  function addTimesToDOM() {
    times.forEach((element) => {
      addTimeToDOM(element);
    });
  }

  function addTimeToDOM(time) {
    var history = document.querySelector(".scrambleHistoryContainer");
    var id = times.indexOf(time);
    var el = document.createElement("p");
    var splitTime = time.split(".");
    el.classList.add("timerHistoryItem");
    el.id = `timeId-${id}`;
    $(el).attr("onclick", "timer.remove(this)");
    if (splitTime[0] === "0") {
      el.innerHTML = `${splitTime[1]}.${splitTime[2]}`;
    } else {
      el.innerHTML = `${splitTime[0]}.${splitTime[1]}.${splitTime[2]}`;
    }
    history.insertAdjacentElement("beforeend", el);
  }

  function confirmationModal(that) {
    newId = that.id.replace("timeId-", "");
    removeValue = document.getElementById(that.id).innerText;
    $(".modaltitleContent").html("Are you sure you want to delete this time?");
    $(".modalcontent").html(
      `This will permanenetly delete your time of ${removeValue} from the record.`
    );
    $(".removeTime").attr("onclick", "timer.confirm(this)");
    document.querySelector(".removeTime").id = `remove-${newId}`;
    $(".modalContainer").fadeIn(200);
    $(".cancel").on("click", () => {
      $("modalContainer").fadeOut(200);
    });
    $(".modalContainer").on("click", () => {
      $(".modalContainer").fadeOut(200);
    });
  }

  function removeTime(that) {
    removeId = that.id.replace("remove-", "");
    times.splice(removeId, 1);
    localStorage.setItem("savedTimes", JSON.stringify(times));
    document.getElementById(`timeId-${removeId}`).remove();
  }

  function addTime() {
    var lastTime = `${m}.${s}.${ms}`;
    times.push(lastTime);
    localStorage.setItem("savedTimes", JSON.stringify(times));
    addTimeToDOM(lastTime);
  }

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
          }, 500);
        }
      }
    });

    scrambleController.scramble();
    loadTimes();
  }

  return {
    init: () => {
      init();
    },
    remove: (that) => {
      confirmationModal(that);
    },
    confirm: (that) => {
      removeTime(that);
    },
  };
})(scrambleController);

timer.init();
