const board = document.querySelector(".board");
const blockHight = 50;
const blockWight = 50;

const rows = Math.floor(board.clientHeight / blockHight);
const cols = Math.floor(board.clientWidth / blockWight);
let intervalId = null;
const blocks = []; // put all div inside the array with row and col
const sanke = [
  { x: 5, y: 6 },  // the array of object object contain the cordientes
//   { x: 5, y: 7 },
//   { x: 5, y: 8 },
];

let food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)}


let direction = null  ;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.innerText = `${row}-${col}`
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}


// redering senke use senke array taking each block codinetes of senke  and  add class fill for backgroundColor
const render = function() {
     let head = null;
    
    //  food 
     
     blocks[`${food.x}-${food.y}`].classList.add('food');

     sanke.forEach((block)=> {
       blocks[`${block.x}-${block.y}`].classList.add('fill');

     })
    //   direction logic
      if(direction === 'ArrowLeft') {
         head = {x :sanke[0].x  , y:sanke[0].y-1};
      } else if(direction === 'ArrowRight') {
         head = {x :sanke[0].x  , y:sanke[0].y+1};         
      } else if(direction === "ArrowDown") {
         head = {x :sanke[0].x+1  , y:sanke[0].y};
      } else if(direction === 'ArrowUp')  {
         head = {x :sanke[0].x-1  , y:sanke[0].y};
      }


    //   game over alert 
       if (head.x<0 || head.x>= rows || head.y < 0 || head.y >= cols) {
           alert("game over")
           clearInterval(intervalId);
       }
   
  
    //   sanke eat food logic and adding one block to the senke body
      if(head.x === food.x && head.y === food.y) {
            blocks[`${food.x}-${food.y}`].classList.remove('food');
            food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)}
            blocks[`${food.x}-${food.y}`].classList.add('food');
           sanke.push(head);
      }

       sanke.forEach((block)=> {
       blocks[`${block.x}-${block.y}`].classList.remove('fill')
     })
      sanke.unshift(head);
      sanke.pop()
      
     sanke.forEach((block)=> {
       blocks[`${block.x}-${block.y}`].classList.add('fill');

     })
}


// eventListener for direction
addEventListener('keydown' , (evt)=> {
     direction = evt.key;
     
})


intervalId = setInterval(function(){
      render()
},600);

