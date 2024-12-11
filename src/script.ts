const startButton: HTMLElement | null = document.getElementById("startButton");
const questionDiv: HTMLElement | null = document.getElementById("questions");
const imageDisplay: HTMLElement | null =
  document.getElementById("imageDisplay");
const answersList: HTMLElement | null = document.getElementById("answersList");
const answerButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll<HTMLButtonElement>("#answers");
const filePath: string = "./assets/images";
let startIndex: number = 0;
let timeLeft: number | undefined;

const numberImgs: string[] = [
  `${filePath}/1.svg`,
  `${filePath}/2.svg`,
  `${filePath}/3.svg`,
  `${filePath}/4.svg`,
  `${filePath}/5.svg`,
];
const shapesImgs: string[] = [
  `${filePath}/Triangle.svg`,
  `${filePath}/Circle.svg`,
  `${filePath}/Square.svg`,
];

const theX: string = `${filePath}/X.svg`;

const getRandomizedItems = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

//const randomNumber = getRandomNumber(1, 6); //for length of X's array to be used when generating the X's images for answers
//array of X images to be used for display of X images

interface QuizAnswers {
  shapes: string[];
  numbers: number[];
}

interface QuizData {
  questions: string[];
  images: string[];
  answers: QuizAnswers;
}

const quizData: QuizData = {
  questions: [
    "What shape is this?",
    "What number do you see?",
    "How many X's do you see?",
  ],
  images: [getRandomizedItems(shapesImgs), getRandomizedItems(numberImgs)],
  answers: {
    shapes: ["Triangle", "Circle", "Square"],
    numbers: [1, 2, 3, 4, 5],
  },
};

const displayImagesForQuestions = (imageSrc: string): void => {
  if (!imageDisplay) {
    console.error("imageDisplay element is not found in the DOM");
    return;
  }

  imageDisplay.innerHTML = "";

  const img: HTMLImageElement = document.createElement("img");
  img.src = imageSrc;
  imageDisplay.appendChild(img);
};

const displayXs = (): void => {
  if (!imageDisplay || !answersList) {
    console.error("imageDisplay element is not found in the DOM");
    return;
  }

  imageDisplay.innerHTML = "";
  answersList.innerHTML = "";
  const arrayOfXs: string[] = Array.from({ length: getRandomNumber(1, 6) }, () => theX);
  arrayOfXs.forEach((xSrc: string) => {
    const img = document.createElement("img");
    img.src = xSrc;
    imageDisplay.appendChild(img);
  });

  for (let i = 1; i <= 5; i++) {
    const button: HTMLButtonElement = document.createElement("button");
    button.textContent = i.toString();
    button.addEventListener("click", () => {
      prompt("hi");
    });
    answersList.appendChild(button);
  }
}

const displayAnswers = (answers: (string[] | number[])): void => {
  if (!answersList) {
    console.error("imageDisplay element is not found in the DOM");
    return;
  }

  answersList.innerHTML = "";

  answers.forEach((answer) => {
    const button: HTMLButtonElement = document.createElement("button");
    button.textContent = answer.toString();
    button.addEventListener("click", () => {
      prompt("hi");
    });
    answersList.appendChild(button);
  });
}

const displayRandomQuestion = (arr: string[]): void => {
  if (!questionDiv) {
    console.error("imageDisplay element is not found in the DOM");
    return;
  }
  const randomQuestion = getRandomizedItems(arr)
  questionDiv.textContent = randomQuestion

  if (questionDiv.textContent.includes("shape")) {
    displayAnswers(quizData.answers.shapes);
    displayImagesForQuestions(quizData.images[0]);
  } else if (questionDiv.textContent.includes("number")) {
    displayAnswers(quizData.answers.numbers);
    displayImagesForQuestions(quizData.images[1]);
  } else if (questionDiv.textContent.includes("X's")) {
    displayXs();
  }
}

/* function displayResultForQuestion(array) {
  array.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      if (e.target.textContent === quizData[0].correctAnswer()) {
        confirm("correct");
      } else {
        alert("wrong");
      }
    });
  });
} */

function startQuiz() {
  displayRandomQuestion(quizData.questions);
}

//displayResultForQuestion(answerButtons)

if (startButton) {
  startButton.addEventListener("click", startQuiz);
} else {
  console.error("startButton element is not found in the DOM.");
}

