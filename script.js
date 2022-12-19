/* WHAT"S NEEDED
WHEN I click the start button ✅
THEN a timer starts and I am presented with a question✅

WHEN I answer a question ✅
THEN I am presented with another question✅

WHEN I answer a question incorrectly
THEN time is subtracted from the clock

WHEN all questions are answered or the timer reaches 0
THEN the game is over

WHEN the game is over
THEN I can save my initials and my score*/

const buttonStart = document.querySelector("#buttonStart");
const questionDiv = document.querySelector("#questions");
let answersDiv = document.querySelector("#listanswers");
let answerButtons = document.querySelectorAll("#answers");
let questionNumber1 = 0;
var timeLeft



//                                      QUIZ MATERIAL                   //
//Add buttons to question one selections then add to other questions.

const quizQuestions = [
    {   question: "Inside which HTML element do we put the JavaScript??",
        answers: ["<scripting>", "<js>", "<header>", "<script>"],
        correctAnswer: "<script>" 
       
    },
    {   question: "Where is the correct place to insert the <script> tag?",
        answers:  ["The <body> section", "The first <h1> element", "Both the <head> and <body> section", "At the end of the CSS file"],
        correctAnswer: "Both the <head> and <body> section"
      
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers:["~ New Comment ~","//New Comment", "<NewComment>", "$NewComment$"],
        correctAnswer: "//New Comment"
        },
    {
        question: "What is the correct syntax for writing a function?",
        answers:["function = newFunction()", "function newFunction()", "function//newFunction", "function.newFunction"],
        correctAnswer: "function newFunction()"
    }
];
//                                  START QUIZ                          //
function startQuiz(){
displayQuestions()
timeLeft = 100
var timer = setInterval(function() {
        timeLeft--;
        if (timeLeft >= 0) {
          span = document.getElementById("timer");
          span.innerHTML = "Time: " + timeLeft;
        }
        if (timeLeft === 0) {
            alert('Sorry, out of time');
            clearInterval(timer);
        }
      }, 1000);
    };

function displayQuestions(){
    questionDiv.textContent = quizQuestions[questionNumber1].question
    answersDiv.innerHTML = ""
    for(let i = 0; i<=3; i++){
    var newLi = document.createElement("button")
        newLi.textContent = quizQuestions[questionNumber1].answers[i]
        answersDiv.appendChild(newLi)
    }
}

function clickAnswer(event){
    var element = event.target.textContent
    console.log("event target" , element)
    console.log("correct Answer",quizQuestions[questionNumber1].correctAnswer)
        if(element !== quizQuestions[questionNumber1].correctAnswer){
            timeLeft -= 15
        if(timeLeft < 0){
            timeLeft = 0
        }
        }
    questionNumber1++
    displayQuestions()
    
        //if(element === quizQuestions[questionNumber1].correctAnswer)
}
buttonStart.addEventListener("click", startQuiz)
answersDiv.onclick = clickAnswer




//                              FUNCTION FOR NEXT QUESTIONS                         //
















//                      QUESTION FUNCTIONS          //


// I want the RIGHT answer to go to nextQuestion.
// I want wrong answer to alert WRONG! then subtract time.