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
const getRandomNumber = (min, max) =>  Math.floor(Math.random() * (max - min) + min);

const quizConfig = [
  {
    questionCategory: 'numbers',
    questionContent: "What number do you see?",
    answerButtonsContent: [1, 2, 3, 4, 5],
    filePaths: [`${filePath}/1.svg`, `${filePath}/2.svg`, `${filePath}/3.svg`, `${filePath}/4.svg`, `${filePath}/5.svg`]
  }, 
  {
    questionCategory: 'X\'s',
    questionContent: "How many X's do you see?",
    answerButtonsContent: [1, 2, 3, 4, 5],
    filePaths: [`${filePath}/X.svg`]
  }, 
  {
    questionCategory: 'shapes',
    questionContent: "What Shape do you see?",
    answerButtonsContent: ["Triangle", "Circle", "Square"],
    filePaths: [`${filePath}/Triangle.svg`, `${filePath}/Circle.svg`, `${filePath}/Square.svg`]
  }, 
]

const clearText = (...elements) => {
  elements.forEach((element) => {
    element.textContent = "";
  });
};

const updateTextContent = (element, text = "") => {
  element.textContent = text;
};

const randomizeConfig = (config) => getRandomizedItem(config);
const info = randomizeConfig(quizConfig);


const getRandomQuestion = (question) => {
  console.log(question)
  return question;
}

const displayRandomQuestion = (element, question) => {
  console.log(`You are on question number: ${questionAmount}`);
  updateTextContent(element, question.questionContent);
  clearText(answersList); 
  return question; 
};

const getCorrespondingAnswers = (answers) => {
  console.log(answers);
  return answers;
}

const checkAnswer = (imagePath, selectedAnswer) => {
  return imagePath.includes(selectedAnswer);
};

const displayCorrespondingAnswers = (element, answers) => {
  answers.answerButtonsContent.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", (e) => {
      
      const currentImage = imageDisplay.querySelector('img').src;
      if (checkAnswer(currentImage, e.target.textContent)) {
        scoreCounter++;
        userScore.textContent = `Your Score: ${scoreCounter} points`;
        questionState.textContent = "Correct!";
      } else {
        questionState.textContent = "Incorrect!";
      }
      clearText(questionDiv, answersList, imageDisplay);
      questionAmount++;
      startCountdown(loadNextQuestion);
    });
    element.appendChild(button);
  });
}



const getCategoryForImages = (object) => {
  console.log(object);
  return object.questionCategory;
}

/**
 * Description placeholder
 *
 * @param {array} array
 * @param {object} object
 * @returns {image} imageSource
 *
 */
const getCorrespondingImages = (array, object) => {
  const category = getCategoryForImages(object);
  const imageSources = array.filter((source) => source.questionCategory === category);
  console.log(category);
  return imageSources;
};


const displayCorrespondingImages = (imageSource) => {
    clearText(imageDisplay);
  const sources = getCorrespondingImages(quizConfig, imageSource);

  const randomSource = getRandomizedItem(sources);
    console.log(randomSource.filePaths);
  const randomIndex = getRandomNumber(0, randomSource.filePaths.length);
  const image = document.createElement("img");
    image.src = randomSource.filePaths[randomIndex];
    imageDisplay.appendChild(image);

  if (!image.src || !randomSource.questionCategory) {
  throwSourceErrorMessage(image.src, randomSource.questionCategory);
  return image.src;
  };
};

const startQuiz = () => {
  const question = displayRandomQuestion(questionDiv, info);
  const answers = displayCorrespondingAnswers(answersList, info);
  const images = displayCorrespondingImages(info)
  isTheQuizStarted = !isTheQuizStarted;
  startButton.style.display = "none";
  
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
    displayRandomQuestion(quizConfig.questionContent);
  }
};




const throwSourceErrorMessage = (source, correctSourceType) => {
  if (!source) {
    console.error("Source not found for:", correctSourceType);
    alert("Uh oh, something went wrong. Please refresh the page to restart");
    throw new Error(`Source not found for: ${correctSourceType}`);
  }
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