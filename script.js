// BUTTON START
// First: Target the elements by setting variables.
// Variables at the top of the page
// As the user clicks and answers a question, it goes onto the next page.
const buttonStart = document.querySelector("#buttonStart");
let questionNumber = 0;
const questionDiv = document.querySelector("#questions")
let answersDiv = document.querySelector("#listanswers")

function startQuiz(){
displayQuestions()
var timeLeft = 20
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
    questionDiv.textContent = quizQuestions[questionNumber].question
    for(let i = 0; i<=2; i++){
    var newLi = document.createElement("li")
        newLi.textContent = quizQuestions[questionNumber].answers[i]
        answersDiv.appendChild(newLi)
    }
}



buttonStart.addEventListener("click", startQuiz)








// QUIZ MATERIAL

const quizQuestions = [
    {
        question: "What instrument did John Coltrane play?",
        answers:  ["Trumpet", "French Horn","Tenor Saxophone"],

        
         
            
       
        correctAnswer: "c"
    },
    {
        question: "What instrument did Roy Haynes play?",
        answers:{
            a: "Tenor Saxophone",
            b: "Drums",
            c: "He's not even real"
        },
        correctAnswer: "b"
    },
    {
        question: "What instrument did Miles Davis play?",
        answers:{
            a: "Trumpet",
            b: "Alto Saxophone",
            c: "Drums",
        },
        correctAnswer: "a"
    }
];
console.log(quizQuestions)

//THE REST OF THE STUFF