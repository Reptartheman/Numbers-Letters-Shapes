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
const logger = (item) => {
  console.log(item);
}

const generateSources = (categoriesArray, filePath) => {
  return categoriesArray.flatMap(({ category, items }) =>
    items.map((item) => ({
      questionCategory: category,
      imageName: item,
      pathToFile: `${filePath}/${item}.svg`,
    }))
  );
};

const categories = [
  { category: "shape", items: ["Triangle", "Circle", "Square"] },
  { category: "shapeX", items: ["X"] },
  { category: "number", items: [1, 2, 3, 4, 5] },
];

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

  sources: generateSources(categories, filePath)
};

//array, prop1, correctSource






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
    finishQuiz(true);
  } else {
    clearText(questionState, countdownContainer);
    displayRandomQuestion(quizData.questions);
  }
};

const finishQuiz = (boolean) => {
    isTheQuizOver = boolean;
    updateTextContent(
      questionState,
      `Wow, you scored ${scoreCounter} points. Great job!`
    );
    clearText(countdownContainer);
    startButton.style.display = "initial";
    updateTextContent(startButton, "Go again!");
    startButton.onclick = restartQuiz;
};

const displayImage = (imageSource) => {
  clearText(imageDisplay);
  const img = document.createElement("img");
  img.src = imageSource;
  imageDisplay.appendChild(img);
};



console.log(quizData.sources)



const throwSourceErrorMessage = (source, correctSourceType) => {
  if (!source) {
    console.error("Source not found for:", correctSourceType);
    alert("Uh oh, something went wrong. Please refresh the page to restart");
    throw new Error(`Source not found for: ${correctSourceType}`);
  }
};

const getCorrectImageSource = (array, prop1, prop2) => {
  return array.find((elem) => elem[prop1].includes(source[prop2]));
};




const handleQuestionDisplay = (questionData) => {
  const { questionType, answers, sourceFilters, correctAnswer, imageHandler } =
    questionData;

  

  const correctSource = getCorrectImageSource(quizData.sources, sourceFilters);
  throwSourceErrorMessage(correctSource, correctAnswer);

  // Display image (using handler for special cases like multiple images)
  const handleImage = imageHandler(correctSource);
  console.log(handleImage);
  // Display answers
  displayAnswers(answers, correctAnswer, () => loadNextQuestion());
};





const displayRandomQuestion = (arr) => {
  console.log(`You are on question number: ${questionAmount}`);
  const randomQuestion = getRandomizedItem(arr);
  updateTextContent(questionDiv, randomQuestion);

  // Define question configurations
  const questionConfigs = {
    "What shape is this?": {
      questionType: "shape",
      answers: quizData.answers.shapes,
      sourceFilters: { questionCategory: "shape" },
      correctAnswer: getRandomizedItem(quizData.answers.shapes),
      imageHandler: (source) => displayImage(source),
    },
    "What number do you see?": {
      questionType: "number",
      answers: quizData.answers.numbers,
      sourceFilters: { questionCategory: "number" },
      correctAnswer: getRandomizedItem(quizData.answers.numbers),
      imageHandler: (source) => displayImage(source),
    },
    "How many X's do you see?": {
      questionType: "shapeX",
      answers: [1, 2, 3, 4, 5],
      sourceFilters: { questionCategory: "shapeX", imageName: "X" },
      correctAnswer: Math.floor(Math.random() * 5) + 1,
      imageHandler: (source) => {
        clearText(imageDisplay);
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).forEach(() => {
          const img = document.createElement("img");
          img.src = source;
          imageDisplay.appendChild(img);
        });
      },
    },
  };

  // Handle the display of the current question
  const config = questionConfigs[randomQuestion];
  if (config) {
    console.log(config);
    handleQuestionDisplay(config);
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
  displayRandomQuestion();
  console.clear();
};

startButton.addEventListener("click", startQuiz);
