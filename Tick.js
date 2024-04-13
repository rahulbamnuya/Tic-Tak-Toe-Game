let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player X, Player O
let count = 0; // To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes(); // Ensure boxes are enabled and event listeners are attached
  msgContainer.classList.add("hide");
};

// Function to handle box clicks
const handleBoxClick = (event) => {
  let box = event.target;
  if (turnO) {
    box.innerText = "O";
    turnO = false;
  } else {
    box.innerText = "X";
    turnO = true;
  }
  box.disabled = true;
  count++;
  let isWinner = checkWinner();
  if (count === 9 && !isWinner) {
    gameDraw();
  }
};

// Function to handle game draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.addEventListener("click", handleBoxClick);
  }
};


const showWinner = (winner) => {
  msg.innerText = `Congratulations , Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};



resetGame();

newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame);
