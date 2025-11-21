const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const restartButton = document.querySelector(".btn-restart");
const highScoreElement  = document.querySelector("#high-score")
const scoreElement  = document.querySelector("#score")
const gamePlayTimeElement  = document.querySelector("#time")

const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");


const blockHight = 40;
const blockWight = 40;
const rows = Math.floor(board.clientHeight / blockHight);
const cols = Math.floor(board.clientWidth / blockWight);

let highScore = 0;
let score = 0;
let time = `00-00`;
let clearTime = null;
let intervalId = null;
const blocks = []; // put all div inside the array with row and col
let snake = [{ x: 5, y: 10 }] // the array of object object contain the cordientes];
let food = { x: Math.floor(Math.random() * rows),y: Math.floor(Math.random() * cols),};
let direction = "ArrowUp";






for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    // block.innerText = `${row}-${col}`
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

// redering senke use senke array taking each block codinetes of senke  and  add class fill for backgroundColor
const render = function () {
  let head = null;

  //  food

  blocks[`${food.x}-${food.y}`].classList.add("food");

  //  snake
  snake.forEach((block) => {
    blocks[`${block.x}-${block.y}`].classList.add("fill");
  });

  //   direction logic
  if (!direction) return;

  if (direction === "ArrowLeft") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "ArrowRight") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "ArrowDown") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "ArrowUp") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  //   game over alert
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(intervalId);
    modal.style.display = "flex";
    gameOverModal.style.display = "flex";
    startGameModal.style.display = "none";
    clearInterval(clearTime)
   
    return;
  }

  //   snake eat food logic and adding one block to the senke body
  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols),};
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);

    score = score+10;
    scoreElement.textContent = `${score}`;

    // localstorage highScore
    if(score > highScore) {
        highScore = score;
        localStorage.setItem("highScore" , JSON.stringify(highScore));    
    }
  }

   snake.forEach((block) => {
    blocks[`${block.x}-${block.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();

  snake.forEach((block) => {
    blocks[`${block.x}-${block.y}`].classList.add("fill");
  });



};

// eventListener for direction
addEventListener("keydown", (evt) => {
  direction = evt.key;
});


// start game
startButton.addEventListener("click", function () {
  modal.style.display = "none";
  intervalId = setInterval(function () {
    render();
  }, 300);
    startClock()
});



// restart game
restartButton.addEventListener("click", restartGame);

function restartGame() {
  modal.style.display = "none";

  blocks[`${food.x}-${food.y}`].classList.remove("food");

  snake.forEach((block) => {
    blocks[`${block.x}-${block.y}`].classList.remove("fill");
  }); 
  
  
   snake = [{ x: 5, y: 6 }];
  direction = 'ArrowUp';
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(function () {
    render();
  }, 300);

   gamePlayTimeElement.textContent=`00-00`;
   scoreElement.textContent =`00`
   startClock();
   score = 0;
    highScoreElement.textContent = `${JSON.parse(localStorage.getItem('highScore'))}`;
}




function startClock(){   
  let min = 0;
  let sec = 0;

 clearTime = setInterval(() => {
    sec++;
    if(sec === 60) {
      sec = 0;
      min++;
    }
    const formattedMinutes = min.toString().padStart(2, "0");
    const formattedSeconds = sec.toString().padStart(2, "0")
    gamePlayTimeElement.textContent=`${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
}


