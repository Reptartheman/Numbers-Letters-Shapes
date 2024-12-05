const startButton = document.getElementById("startButton");
const questionDiv = document.getElementById("questions");
const characterDisplay = document.getElementById("characterDisplay");
const answersDiv = document.getElementById("listanswers");
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


const randomNumber = getRandomNumber(0, 4);
const randomNumberImg = getRandomizedItems(numbers);
const randomShapeImg = getRandomizedItems(shapes);

const arrayOfXs = Array.from({length: randomNumber}, () => theX);
const randomXs = getRandomizedItems(arrayOfXs);


const renderImageSource = (item) => {
  const newButton = document.createElement("button");
  const image = document.createElement("img");
  image.src = item;
  newButton.appendChild(image);
  answersDiv.appendChild(newButton);
};

const quizQuestions = [
  {
    question: "How many X's do you see?",
    characters: randomXs,
    answers: '',
    correctAnswer: 2,
  },
  {
    question: "What Number is this?",
    characters: randomNumberImg,
    answers: '',
    correctAnswer: 2,
  },
  {
    question: "What shape is this?",
    characters: randomShapeImg,
    answers: ['Triangle', 'Circle', 'Square'],
    correctAnswer: 2,
  },
];

const questionsArray = quizQuestions.map(question => question.question);
const charactersArray = quizQuestions.map(character => character.characters);
const randomCharacter = getRandomizedItems(charactersArray);
console.log(randomCharacter);
function displayQuestions(array, index, item) {
  questionDiv.textContent = array[index];
  characterDisplay.textContent = renderImageSource(item);
  answersDiv.innerHTML = "";
}



displayQuestions(questionsArray, randomNumber, randomCharacter);
