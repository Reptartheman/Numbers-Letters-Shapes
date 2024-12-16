const questionStateContainer = document.getElementById(
  "questionStateContainer"
);
const questionState = document.getElementById("questionState");
const countdownContainer = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const questionDiv = document.getElementById("questions");
const imageDisplay = document.getElementById("imageDisplay");
const answersList = document.getElementById("answersList");
const userScore = document.getElementById("userScore");

const filePath = "./assets/images";
let isTheQuizStarted = false;
let isTheQuizOver = false;
let scoreCounter = 0;
let questionAmount = 1;
const getRandomizedItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const quizData = {
  questions: [
    "What shape is this?",
    "What number do you see?",
    "How many X's do you see?",
  ],

  answers: {
    shapes: ["Triangle", "Circle", "Square"],
    numbers: [1, 2, 3, 4, 5],
  },

  sources: [
    {
      sourceType: "shape",
      imageName: "Triangle",
      source: `${filePath}/Triangle.svg`,
    },
    {
      sourceType: "shape",
      imageName: "Circle",
      source: `${filePath}/Circle.svg`,
    },
    {
      sourceType: "shape",
      imageName: "Square",
      source: `${filePath}/Square.svg`,
    },
    { sourceType: "shapeX", imageName: "X", source: `${filePath}/X.svg` },
    { sourceType: "number", imageName: 1, source: `${filePath}/1.svg` },
    { sourceType: "number", imageName: 2, source: `${filePath}/2.svg` },
    { sourceType: "number", imageName: 3, source: `${filePath}/3.svg` },
    { sourceType: "number", imageName: 4, source: `${filePath}/4.svg` },
    { sourceType: "number", imageName: 5, source: `${filePath}/5.svg` },
  ],
};

const clearText = (...elements) => {
  elements.forEach((element) => {
    element.textContent = "";
  });
};

const updateTextContent = (element, text = "") => {
  element.textContent = text;
};



const displayAnswers = (answers, correctAnswer, callback) => {
  clearText(answersList);
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => {
      if (answer === correctAnswer) {
        scoreCounter++;
        userScore.textContent =
          scoreCounter === 1
            ? `Your Score: ${scoreCounter} point`
            : `Your Score: ${scoreCounter} points`;

        updateTextContent(questionState, `Correct!!`);
        clearText(questionDiv, answersList, imageDisplay);
        startCountdown(callback);
      } else {
        updateTextContent(questionState, `Incorrect!!`);
        startCountdown(callback);
      }
    });
    answersList.appendChild(button);
  });
};

const displayCountDown = (counter) => {
  if (questionAmount < 10) {
    questionState.textContent = `Get ready for the next question!`;
    countdownContainer.textContent = `${counter}`;
  }
};

const startCountdown = (callback) => {
  let countdown = 4;
  const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      displayCountDown(countdown);
    } else {
      clearInterval(timer);
      callback();
    }
  }, 1000);
};

const loadNextQuestion = () => {
  questionAmount++;
  if (questionAmount > 10) {
    updateTextContent(questionState, `Wow, you scored ${scoreCounter} points. Great job!`);
    clearText(countdownContainer);
    isTheQuizOver = true;
    startButton.style.display = "initial";
    updateTextContent(startButton, "Go again!");
    startButton.onclick = restartQuiz;
  } else {
    clearText(questionState, countdownContainer);
    displayRandomQuestion(quizData.questions);
  }
};

const displayImage = (imageSource) => {
  clearText(imageDisplay);
  const img = document.createElement("img");
  img.src = imageSource;
  imageDisplay.appendChild(img);
};

const getCorrectSource = (array, prop1, prop2, typeAsString, correctSource) => {
  return array.find(
    (elem) => elem[prop1] === typeAsString && elem[prop2] === correctSource
  );
};

const throwSourceErrorMessage = (source, correctSourceType) => {
  if (!source) {
    console.error("Source not found for:", correctSourceType);
    alert("Uh oh, something went wrong. Please refresh the page to restart");
    throw new Error(`Source not found for: ${correctSourceType}`);
  }
};


const displayRandomQuestion = (arr) => {
  console.log(`You are on question number: ${questionAmount}`);
  const randomQuestion = getRandomizedItem(arr);
  updateTextContent(questionDiv, randomQuestion);

  if (randomQuestion === quizData.questions[0]) {
    const correctShape = getRandomizedItem(quizData.answers.shapes);
    const shapeSource = getCorrectSource(
      quizData.sources,
      "sourceType",
      "imageName",
      "shape",
      correctShape
    );
    throwSourceErrorMessage(shapeSource, correctShape);
    displayImage(shapeSource.source);
    displayAnswers(quizData.answers.shapes, correctShape, () =>
      loadNextQuestion()
    );
  } else if (randomQuestion === quizData.questions[1]) {
    const correctNumber = getRandomizedItem(quizData.answers.numbers);
    const numberSource = getCorrectSource(
      quizData.sources,
      "sourceType",
      "imageName",
      "number",
      correctNumber
    );
    throwSourceErrorMessage(numberSource, correctNumber);
    displayImage(numberSource.source);
    displayAnswers(quizData.answers.numbers, correctNumber, () =>
      loadNextQuestion()
    );
  } else if (randomQuestion === quizData.questions[2]) {
    const xCount = Math.floor(Math.random() * 5) + 1;
    clearText(imageDisplay);
    const xSource = getCorrectSource(
      quizData.sources,
      "sourceType",
      "imageName",
      "shapeX",
      "X"
    );

    throwSourceErrorMessage(xSource, "X");

    Array.from({ length: xCount }).forEach(() => {
      const img = document.createElement("img");
      img.src = xSource.source;
      imageDisplay.appendChild(img);
    });
    displayAnswers([1, 2, 3, 4, 5], xCount, () => loadNextQuestion());
  }
};

const startQuiz = () => {
  displayRandomQuestion(quizData.questions);
  isTheQuizStarted = !isTheQuizStarted;
  startButton.style.display = "none";
};

const restartQuiz = () => {
  scoreCounter = 0;
  questionAmount = 1;
  isTheQuizOver = false;
  updateTextContent(userScore, `Your Score: ${scoreCounter} points`);
  clearText(questionState, countdownContainer, answersList);
  displayRandomQuestion(quizData.questions);
  console.clear();
};

startButton.addEventListener("click", startQuiz);
