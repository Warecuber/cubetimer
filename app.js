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

  generateScramble();
})();


/////////////////////////////////////////
//////////// Code for Timer ////////////
///////////////////////////////////////


var timer = (() => {
  let running = false;

  

})();