/* WHAT"S NEEDED
WHEN I click the start button ✅
THEN a timer starts and I am presented with a question✅

WHEN I answer a question ✅
THEN I am presented with another question✅

WHEN I answer a question incorrectly✅
THEN time is subtracted from the clock✅

WHEN all questions are answered or the timer reaches 0 ✅
THEN the game is over ✅

WHEN the game is over✅
THEN I can save my initials and my score  ✅*/

const startButton = document.getElementById("startButton");
const questionDiv = document.getElementById("questions");
const characterDisplay = document.getElementById("characterDisplay");
let answersDiv = document.getElementById("listanswers");
let answerButtons = document.querySelectorAll("#answers");
let startIndex = 0;
let timeLeft

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
  
const randomNumber = getRandomNumber(0, 9);

const quizQuestions = [
    {   question: "How many X's do you see?",
        characters: "X, X",
        answers: [`${randomNumber}`, `${randomNumber}`, `${randomNumber}`],
        correctAnswer: 2 
       
    },
    {   question: "Question 2 ???",
        characters: "X, X",
        answers: [1, 2, 3],
        correctAnswer: 2 
       
    },
    {   question: "Question 3 ???",
        characters: "X, X",
        answers: [1, 2, 3],
        correctAnswer: 2 
       
    },
    {   question: "Question 3 ???",
        characters: "X, X",
        answers: [1, 2, 3],
        correctAnswer: 2 
       
    },
    {   question: "Question 4 ???",
        characters: "X, X",
        answers: [1, 2, 3],
        correctAnswer: 2 
       
    },
  
];



function displayQuestions(array, index){
    questionDiv.textContent = array[index].question
    characterDisplay.textContent = array[index].characters
    answersDiv.innerHTML = ""
    displayAnswerButtons(array);
}

function displayAnswerButtons(array) {
    const answersArray = array.map(question => question.answers)
        .map(answer => answer);
    console.log(answersArray);
    answersArray.forEach((answer, index) => {
        const newButton = document.createElement("button")
            newButton.textContent = answer;
            answersDiv.appendChild(newButton)
    })

}




function clickAnswer(event){
    let element = event.target.textContent
    console.log("event target" , element)
    console.log("correct Answer",quizQuestions[startIndex].correctAnswer)
        if(element !== quizQuestions[startIndex].correctAnswer){
            timeLeft -= 15
        if(timeLeft < 0){
            timeLeft = 0
        }
        }
        startIndex++
    if(startIndex == quizQuestions.length){
        gameOver()
    }  
    displayQuestions(quizQuestions, startIndex);
    
        //if(element === quizQuestions[startIndex].correctAnswer)
}

answersDiv.onclick = clickAnswer

if (timeLeft <= 0){
gameOver()   
}

function gameOver(){
alert("GAME OVER!");
captureScore();
clearInterval(timer);
timeLeft = 0;
}

function captureScore(){
   let name = prompt("Enter your initials and the time remaining")
   let previousHS = localStorage.getItem("highScore"); 
   let currentScore = {
    name: name,
    score: timeLeft
   }; 
   console.log("timeLeft is equal to: " + name + timeLeft);
   if (!previousHS) {
    localStorage.setItem("highScore" , JSON.stringify(currentScore));console.log("record setter")
   //localStorage.setItem("highScore" , currentScore)
   console.log("newhighscore");
   } else if (previousHS.score < timeLeft) { 
    } else {console.log("do better next")};
}
 
function startQuiz(){
displayQuestions(quizQuestions, startIndex)
/* timeLeft = 60
let timer = setInterval(function() {
        timeLeft--;
        if (timeLeft >= 0) {
          const timerDisplay = document.getElementById("timer");
          timerDisplay.innerHTML = "Time: " + timeLeft;
        }
        if (timeLeft === 0) {
            alert('Sorry, out of time');
            clearInterval(timer);
        }
      }, 1000); */
    };
    startButton.addEventListener("click", startQuiz)