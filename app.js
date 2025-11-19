const board  = document.querySelector(".board");
const blockHight = 30;
const blockWight = 30;

const rows = Math.floor(board.clientHeight/blockHight);
const cols = Math.floor(board.clientWidth/blockWight);

for(let i = 0; i < rows*cols; i++) {
    let block = document.createElement('div');
    block.classList.add('block');
    board.appendChild(block)
}


