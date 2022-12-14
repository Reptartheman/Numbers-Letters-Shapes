// BUTTON START
window.onclick = function(){
    (function(){
      var timer = 15;
      setInterval(function() {
        timer--;
        if (timer >= 0) {
          span = document.getElementById("timer");
          span.innerHTML = "Time: " + timer;
        }
        if (timer === 0) {
            alert('Sorry, out of time');
            clearInterval(timer);
        }
      }, 1000);
    })();
    }

// QUIZ MATERIAL

/*const quizQuestions = [
    {
        question: "What instrument did John Coltrane play?"
        answers: {
            a: "Trumpet"
            b: "French Horn"
            c: "Tenor Saxophone" 
        },
        correctAnswer: "c"
    },
    {
        question: "What instrument did Roy Haynes play?"
        answers:{
            a: "Tenor Saxophone"
            b: "Drums"
            c: "He's not even real"
        },
        correctAnswer: "b"
    }
    {
        question: "What instrument did Miles Davis play?"
        answers:{
            a: "Trumpet"
            b: "Alto Saxophone"
            c: "Drums"
        },
        correctAnswer: "a"
    }
];
console.log(quizQuestions)

//THE REST OF THE STUFF

function displayQuestions(quizQuestions, quizContainer)

    const output = [];
    const answers;

    for(var i=0; i<quizQuestions.length; i++){
        answers = []
        for(letter in quizQuestions[i].answers){
          answers.push(
            "<label>"
            + "<input type = 'radio'
            name="question"
          )  
        }

    }
*/
