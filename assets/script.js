const startButton = document.getElementById("startButton");
const questionDiv = document.getElementById("questions");
const imageDisplay = document.getElementById("imageDisplay");
const answersList = document.getElementById("answersList");
const answerButtons = document.querySelectorAll("#answers");
const filePath = './assets/images';
let startIndex = 0;
let timeLeft;

const numbers = [
  `${filePath}/1.svg`,
  `${filePath}/2.svg`,
  `${filePath}/3.svg`,
  `${filePath}/4.svg`,
  `${filePath}/5.svg`,
];
const shapes = [`${filePath}/Triangle.svg`, `${filePath}/Circle.svg`, `${filePath}/Square.svg`];

const theX = `${filePath}/X.svg`;


const getRandomizedItems = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};


const randomNumber = getRandomNumber(1, 3);
const randomNumberImg = getRandomizedItems(numbers);
const randomShapeImg = getRandomizedItems(shapes);

const arrayOfXs = Array.from({length: randomNumber}, () => theX);
const randomXs = getRandomizedItems(arrayOfXs);

const quizData = [
  {
    question: "What shape is this?",
    images: randomShapeImg,
    answers: ['Triangle', 'Circle', 'Square'],
    correctAnswer: function () {
      for (let i = 0; i <= this.answers.length; i++) {
        if (this.images.includes(this.answers[i])) {
          return this.answers[i]
        }
      }
      return null;
    },
  },
];

console.log(randomShapeImg)



const questionsArray = quizData.map(question => question.question);


const displayImagesForQuestions = () => {
  const newImage = document.createElement("img");
  newImage.src = quizData[0].images;
  imageDisplay.appendChild(newImage);
}


const displayAnswers = (array) => {

  answersList.innerHTML = "";
  array.forEach((answer) => {
    const newButton = document.createElement("button");
    newButton.textContent = answer;
    answersList.appendChild(newButton);
  });
};

function displayQuestions(array, index) {
  questionDiv.textContent = array[index];

}

function startQuiz() {
  displayQuestions(questionsArray, 0);
  displayAnswers(quizData[0].answers);
  displayImagesForQuestions();
}


const currentQuestion = quizData[0];
console.log("Correct Answer:", currentQuestion.correctAnswer());
startQuiz();