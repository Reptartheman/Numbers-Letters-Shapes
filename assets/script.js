const startButton = document.getElementById("startButton");
const questionDiv = document.getElementById("questions");
const imageDisplay = document.getElementById("imageDisplay");
const answersList = document.getElementById("answersList");
const answerButtons = document.querySelectorAll("#answers");
const filePath = "./assets/images";
let startIndex = 0;
let timeLeft;

const getRandomizedItems = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const quizData = {
  questions: [
    `What shape is this?`,
    "What number do you see?",
    "How many X's do you see?",
  ],
  
  answers:
    {
      shapes: ["Triangle", "Circle", "Square"],
      numbers: [1, 2, 3, 4, 5],
    },
  numbersImageSources: [
    `${filePath}/1.svg`,
    `${filePath}/2.svg`,
    `${filePath}/3.svg`,
    `${filePath}/4.svg`,
    `${filePath}/5.svg`,
  ],
  shapesImageSources: [
    `${filePath}/Triangle.svg`,
    `${filePath}/Circle.svg`,
    `${filePath}/Square.svg`,
  ],
  theXImageSource: `${filePath}/X.svg`,
  images: [getRandomizedItems(quizData.shapesImageSources), getRandomizedItems(quizData.numbersImageSources)],
  
};

//if the clicked answers value, matches the source of the image, it is correct

const displayImagesForQuestions = (imageSrc) => {
   imageDisplay.innerHTML = "";

   const img = document.createElement("img");
   img.src = imageSrc;
   imageDisplay.appendChild(img);
};


function displayXs() {
  imageDisplay.innerHTML = "";
  answersList.innerHTML = "";
  let arrayOfXs = Array.from({ length: getRandomNumber(1, 6) }, () => theX);
  arrayOfXs.forEach((xSrc) => {
    const img = document.createElement("img");
    img.src = xSrc;
    imageDisplay.appendChild(img);
  });

  for (let i = 1; i <= 5; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      prompt('hi');
    });
    answersList.appendChild(button);
  }
  
}


function displayAnswers(answers) {
  answersList.innerHTML = "";
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", (e) => {
      
    });
    answersList.appendChild(button);
  });
}

function displayRandomQuestion(arr) {

  questionDiv.textContent = getRandomizedItems(arr);

  if (questionDiv.textContent.includes("shape")) {
    displayAnswers(quizData.answers.shapes)
    displayImagesForQuestions(quizData.images[0])
  } else if (questionDiv.textContent.includes("number")) {
    displayAnswers(quizData.answers.numbers)
    displayImagesForQuestions(quizData.images[1])
  } else if (questionDiv.textContent.includes("X's")) {
    displayXs();
  }

}



function startQuiz() {
  displayRandomQuestion(quizData.questions);
}



startButton.addEventListener("click", startQuiz);
