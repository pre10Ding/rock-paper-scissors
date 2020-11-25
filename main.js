// Your JavaScript goes here!
// let again = true;
// while(again){
//   game();
//   if(prompt(`Do you want to play again? (Y/N)`).toLowerCase!=='y'){
//     //again=false;
//     alert("Goodbye!");
//   }
// }

let playerSelection="";

let listOfSelection = document.querySelectorAll('.player-panel');
listOfSelection.forEach((selected)=>selected.addEventListener('click',handleChoice));


function handleChoice(e) {

  //remember the player choice
  playerSelection = e.path[0].id;
  
  highlightChoice(e);
  
  let computerSelection = computerPlay();

  displayComputerChoice(computerSelection);

  //tie=0, player win=1, cpu win=2
  let result = playRound(playerSelection,computerSelection);

  console.log(result);

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
    if(el.classList.length===1) { //checks class length to determine if it's been processed yet
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
function displayComputerChoice(computerSelection){



  return 0;
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

//validate player selection, true if input is valid
function validateSelection(playerSelection) {
  playerSelection = playerSelection.toLowerCase();
  if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
    return true;
  }
  else {
    console.log(`Invalid entry`);
    return false;
  }
}

//update the win/loss counters in the HTML
function updateCounters() {
  document.getElementById("win-counter").innerHTML = winCount;
  document.getElementById("loss-counter").innerHTML = lossCount;
}

//main game logic
function game() {
  let playerWins = 0;
  let computerWins = 0;
  let roundsLeft = 5;

  for (roundsLeft; roundsLeft > 0; roundsLeft = roundsLeft - 1) {
    let playerSelection = "";
    //ask for and validate player selection
    while (!validateSelection(playerSelection)) {
      playerSelection = prompt(`Round ${playerWins + computerWins} out of 5. The score is ${playerWins}-${computerWins}. 
Rock, paper, or scissors?`);
    }
    computerSelection = computerPlay();
    //determine who is the winner
    let result = playRound(playerSelection, computerSelection);
    switch (result) {
      case 0:
        alert(`It's a Tie! We both chose ${playerSelection}`);
        roundsLeft = roundsLeft + 1; //since it's a tie, need to increase roundsLeft by 1 to counteract the loop's decremental effect and replay this round
        break;
      case 1:
        alert(`You Win! ${playerSelection} beats ${computerSelection}`)
        playerWins = playerWins + 1;
        break;
      case 2:
        alert(`You Lose! ${computerSelection} beats ${playerSelection}`)
        computerWins = computerWins + 1;
        break;
    }
    //if either reaches 3 wins, end the loop, display game end message, and call update counters.
    if (playerWins === 3) {
      alert(`Congratualations! You win with a score of ${playerWins}-${computerWins}`);
      winCount = winCount + 1;
      updateCounters();
      return 1;
    } else if (computerWins === 3) {
      alert(`You lost with a score of ${playerWins}-${computerWins}`);
      lossCount = lossCount + 1;
      updateCounters();
      return 1;
    }
  }
  //function should have been returned before this point...
  alert("Something went wrong. (Code 0001)");
  return -1;


}