

// ---------DEFINITION OF THE "BOARD"

const myObstacles = []; //-----TO STORE THE OBSTACLES

const myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0, // -------TO COUNT HOW MANY TIMES WE CALL UPDATEGAME AREA
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // call updateGameArea() every 20 milliseconds

    this.interval = setInterval(updateGameArea, 20);
  },

  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  stop: function () {
    clearInterval(this.interval);
  },

  score: function () {
    const points = Math.floor(this.frames / 5);
    this.context.font = '18px serif';
    this.context.fillStyle = 'black';
    this.context.fillText(`Score: ${points}`, 350, 50);
  }
};

// ---------- (OUTSIDE THE GAMEAREA CONSTAT )FUCNTION TO CLEAR AND UPDATE THE PLAYER--------

function updateGameArea() {
  myGameArea.clear();
  player.newPos();
  player.update();
  updateObstacles();
   // check if the game should stop
   checkGameOver();
   myGameArea.score();
}
myGameArea.start();
const player = new Component(30, 30, "orange",0,110);
player.update()

//-------OBSTACLES FUNCTION--------

function updateObstacles() {
  
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myGameArea.frames += 1;
  if (myGameArea.frames % 120 === 0) {
    let x = myGameArea.canvas.width;
    let minHeight = 20;
    let maxHeight = 200;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 50;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(10, height, "green", x, 0));
    myObstacles.push(new Component(10, x - height - gap, "green", x, height + gap)
    );

  }

}



document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38: // up arrow
      player.speedY -= 1;
      break;
    case 40: // down arrow
      player.speedY += 1;
      break;
    case 37: // left arrow
      player.speedX -= 1;
      break;
    case 39: // right arrow
      player.speedX += 1;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = 0;
});


function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (crashed) {
      myGameArea.stop();
    }
  }
  

// ------------START GAME ----------


