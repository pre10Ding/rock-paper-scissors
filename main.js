// Your JavaScript goes here!
// let again = true;
// while(again){
//   game();
//   if(prompt(`Do you want to play again? (Y/N)`).toLowerCase!=='y'){
//     //again=false;
//     alert("Goodbye!");
//   }
// }

let playerSelection = "";
let playerWins = 0;
let computerWins = 0;

let listOfSelection = document.querySelectorAll('.player-panel');
listOfSelection.forEach((selected) => selected.addEventListener('click', handleChoice));


function handleChoice(e) {

  //remember the player choice
  playerSelection = e.path[0].id;

  highlightChoice(e);

  let computerSelection = computerPlay();

  displayComputerChoice(computerSelection);

  //tie=0, player win=1, cpu win=2
  let result = playRound(playerSelection, computerSelection);

  console.log(result);

  //displays corresponding text and keeps track of wins/losses
  handleResult(result);

  return 0;
}

//makes the player selected hand bigger to match the CPU select panel
function highlightChoice(e) {
  let refOfChosen = document.querySelector(`#${playerSelection}`);


  //erase all previous CSS changes
  listOfSelection.forEach((el) => el.classList.remove(el.classList[1])); //pop the second class

  //add the 'chosen-panel' css styles to the choice
  refOfChosen.classList.add('chosen-panel');

  //a toggle to flip between flex order 1 and 3, since the player choice is order 2
  let toggle = true;
  listOfSelection.forEach((el) => {
    if (el.classList.length === 1) { //checks class length to determine if it's been processed yet
      if (toggle) {
        el.classList.add('top-panel');
        toggle = false;
      }
      else {
        el.classList.add('bottom-panel');
      }
    }

  });

  return 0;
}

//updates the CPU panel with the hand that CPU chose
function displayComputerChoice(computerSelection) {

  let cpuImg = document.querySelector('#cpu-icon');
  cpuImg.setAttribute('src', `assets/${computerSelection}Robot.png`)

  return 0;
}

function handleResult(result) {
  let resultPanel = document.querySelector('#interactive-button');

  switch (result) {
    case 0:
      resultPanel.textContent = `It's a Tie!`;
      break;
    case 1:
      resultPanel.textContent = `You Win!`;
      playerWins = playerWins + 1;
      break;
    case 2:
      resultPanel.textContent = `You Lose!`;
      computerWins = computerWins + 1;
      break;
  }

  updateScore();

  checkForGameEnd(resultPanel);


  return 1;
}

function checkForGameEnd(resultPanel) {
  if (playerWins >= 3 && playerWins >= computerWins) {
    resultPanel.innerHTML = `Congratulations! <br> 
    You win with a score of ${playerWins}-${computerWins}! <br>
    Click here to play again.`;
  } else if (computerWins >= 3) {
    resultPanel.innerHTML = `Oh no! <br>
    You lost with a score of ${playerWins}-${computerWins}! <br>
    Click here to play again.`;
  }
  if (playerWins === 3 || computerWins === 3) {
    resultPanel.style.fontSize = '18px';
    resultPanel.style.lineHeight = '18px';
    let oldArea = document.querySelector('#right-side-area');
    let newArea = oldArea.cloneNode(true);
    oldArea.parentNode.replaceChild(newArea, oldArea);

    resultPanel.addEventListener('click', ()=>location.reload()); 
    resultPanel.classList.add('interactive-button-button')
  }
}


function updateScore() {
  let cpuScore = document.querySelector('#cpu-score');
  let playerScore = document.querySelector('#player-score');
  cpuScore.textContent = computerWins;
  playerScore.textContent = playerWins;
  return 1;
}



let winCount = 0;
let lossCount = 0;

//randomly choose rock, paper, or scissors every time this function is called
function computerPlay() {
  let randInt = Math.floor(Math.random() * 3);
  switch (randInt) {
    case 0:
      return "rock";
      break;
    case 1:
      return "paper";
      break;
    case 2:
      return "scissors";
      break;
  }
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  //player tie
  if (playerSelection === computerSelection) {
    return 0;
  }
  //player win
  else if (
    playerSelection === "rock" && computerSelection === "scissors" ||
    playerSelection === "scissors" && computerSelection === "paper" ||
    playerSelection === "paper" && computerSelection === "rock") {
    return 1;
  }

  //cpu win
  else {
    return 2;

  }
}
