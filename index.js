document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      displayNextParagraph();
    }
});
 
var currentParagraphIndex = 0;
var paragraphs = [
  "This is the first paragraph.",
  "This is the second paragraph.",
  "This is the third paragraph.",
  "This is the fourth paragraph."
];
 
var continueBtn = document.getElementById('continueBtn');
hideContinueButton();

continueBtn.addEventListener('click', function() {
  if (currentParagraphIndex === 0) {
    createPlayerId();
  }
  clearPage();
  displayRandomInstructions();
  hideContinueButton();
});
 
function displayNextParagraph() {
  var outputDiv = document.getElementById('output');
  if (currentParagraphIndex < paragraphs.length) {
    outputDiv.innerHTML += "<p>" + paragraphs[currentParagraphIndex] + "</p>";
    currentParagraphIndex++;
  } else {
    outputDiv.innerHTML += "<p>No more paragraphs to display.</p>";
    showContinueButton();
  }
}

function createPlayerId() {
  var randomId = "P" + Math.floor(Math.random() * 90000 + 10000);
  localStorage.setItem("player_id", randomId);
}
 
function clearPage() {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
  currentParagraphIndex = 0;
}
 
var outputDiv = document.getElementById('output');
function displayRandomInstructions() {
  randomNumber = Math.floor(Math.random() * 2) + 1;
  
  if (randomNumber === 1) {
    outputDiv.innerHTML += "<p>Instructions for Option 1:</p>";
    outputDiv.innerHTML += "<p>Step 1: Perform action A.</p>";
    outputDiv.innerHTML += "<p>Step 2: Perform action B.</p>";
    outputDiv.innerHTML += "<p>Step 3: Perform action C.</p>";
    outputDiv.innerHTML += '<button id="startGameBtn" onclick="startGame(randomNumber)">Start Game</button>';
  } else if (randomNumber === 2) {
    outputDiv.innerHTML += "<p>Instructions for Option 2:</p>";
    outputDiv.innerHTML += "<p>Step 1: Perform action X.</p>";
    outputDiv.innerHTML += "<p>Step 2: Perform action Y.</p>";
    outputDiv.innerHTML += "<p>Step 3: Perform action Z.</p>";
    outputDiv.innerHTML += '<button id="startGameBtn" onclick="startGame(randomNumber)">Start Game</button>';
  }
}
 
function showContinueButton() {
  continueBtn.style.display = 'block';
}

function hideContinueButton() {
  continueBtn.style.display = 'none';
}


function createGameId(randomNumber) {
  var randomId = "G" + Math.floor(Math.random() * 90000 + 10000);
  //ADD CHECK FOR DUPLICATE
  if (randomNumber === 1) {
    localStorage.setItem("game_id1", randomId);
  }
  else if (randomNumber === 2) {
    localStorage.setItem("game_id2", randomId);
  }
  return randomId
}
 
function startGame(randomNumber) {
  clearPage();
  game_id = createGameId(randomNumber);
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML += "<h1 id='versionHeading'></h1>";
  outputDiv.innerHTML += "<h2>Game Board</h2>";
  // DISPLAY BOARD


  //initialize stuff'
  var caseIDList = []; // only defined inside startgame()
  for (var i = 1; i <= 26; i++) {
    caseIDList.push(i);
  }
  list_of_prizes = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000,
    100000, 200000, 300000, 400000, 500000, 750000, 1000000];
  
  case_values = {};
  list_of_prizes_copy = []; // create a copy so that the prizes don't actually get removed from list_of_prizes
  for (var i = 0; i <= 25; i++) {
    list_of_prizes_copy.push(list_of_prizes[i]);
  }
  var used_indeces = []
  for (var i = 1; i <= 26; i++) { // loop through each case
    var randomIndex = Math.floor(Math.random() * caseIDList.length);
    while (used_indeces.includes(randomIndex)) {   // while that index alr used
      randomIndex = Math.floor(Math.random() * caseIDList.length);
    }
    // got out of loop means generated an index not used
    used_indeces.push(randomIndex); // write it down so as to not use it again
    case_values[i] = list_of_prizes[randomIndex]; // save it to the case value
  }
  
  // ^ works
  localStorage.setItem("caseIDList", caseIDList)

  outputDiv.innerHTML += '<h2>Select a Case:</h2>';
  for (var i = 1; i <= 26; i++) {
    outputDiv.innerHTML += '<button class="numberBtn" onclick="selectPCase(' + i + ')">' + i + '</button>';
  }
}

function selectPCase(casenumber) {
  localStorage.setItem("player_case", casenumber);
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML += '<p>You selected case #' + casenumber + '</p>';
  caseIDList = localStorage.getItem("caseIDList"); // currently a string
  caseIDList = caseIDList.split(","); // now an object
  const x = caseIDList.splice(casenumber-1, 1); // remove the case from the list of available cases
  outputDiv.innerHTML += '<button id="rd1" onclick="rd1()">Begin Round 1</button>';
}

function rd1() {
  console.log("rd1()");
  clearPage();
  displayCases(caseIDList); // pass in a list
}

function displayCases(caseIDList) {
  for (var i = 0; i < caseIDList.length; i++) {
    outputDiv.innerHTML += '<div class="case">' + caseIDList[i] + '</div>';
  }
}

