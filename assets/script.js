import rough from 'roughjs';

// ========================================
// Numbers, Letters & Shapes Quiz App
// For Special Education Students
// ========================================

// DOM Elements - Screens
const startScreen = document.getElementById("startScreen");
const questionScreen = document.getElementById("questionScreen");
const feedbackScreen = document.getElementById("feedbackScreen");
const endScreen = document.getElementById("endScreen");

// DOM Elements - Controls
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

// DOM Elements - Quiz Content
const questionText = document.getElementById("questionText");
const imageDisplay = document.getElementById("imageDisplay");
const answersGrid = document.getElementById("answersGrid");

// DOM Elements - Score & Progress
const scoreValue = document.getElementById("scoreValue");
const questionValue = document.getElementById("questionValue");

// DOM Elements - Feedback
const feedbackText = document.getElementById("feedbackText");
const countdown = document.getElementById("countdown");
const finalScore = document.getElementById("finalScore");

// ========================================
// Quiz Configuration
// ========================================
const TOTAL_QUESTIONS = 10;
const COUNTDOWN_SECONDS = 3;

const quizConfig = [
  {
    questionCategory: "numbers",
    questionContent: "What number do you see?",
    answerButtonsContent: [1, 2, 3, 4, 5],
  },
  {
    questionCategory: "X's",
    questionContent: "How many X's do you see?",
    answerButtonsContent: [1, 2, 3, 4, 5],
  },
  {
    questionCategory: "shapes",
    questionContent: "What shape do you see?",
    answerButtonsContent: ["Triangle", "Circle", "Square"],
  },
];

// ========================================
// Game State
// ========================================
let gameState = {
  score: 0,
  currentQuestion: 1,
  isQuizStarted: false,
  isQuizOver: false,
  currentConfig: null,
  currentAnswer: null, // The correct answer for the current question
};

// ========================================
// Utility Functions
// ========================================
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========================================
// Rough.js Drawing Functions
// ========================================
const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 800;
  return canvas;
};

// Draw a number on the canvas
const drawNumber = (rc, number) => {
  const canvas = rc.canvas;
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 240px 'Architects Daughter', cursive";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#2f2f2f"; // Graphite
  ctx.fillText(String(number), canvas.width / 2, canvas.height / 2);
};

// Draw X's using Rough.js
const drawXs = (rc, count) => {
  const canvas = rc.canvas;
  const xSize = 160; // 2x larger
  const spacing = 240; // 2x larger gap between X's
  const totalWidth = count * spacing;
  const startX = (canvas.width - totalWidth) / 2 + spacing / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < count; i++) {
    const x = startX + i * spacing;
    // Draw X with two lines - using graphite for all X's
    rc.line(x - xSize / 2, centerY - xSize / 2, x + xSize / 2, centerY + xSize / 2, {
      stroke: "#2f2f2f", // Graphite - consistent for ALL X's
      strokeWidth: 8, // 2x thicker
      roughness: 1.5,
    });
    rc.line(x + xSize / 2, centerY - xSize / 2, x - xSize / 2, centerY + xSize / 2, {
      stroke: "#2f2f2f", // Graphite - consistent for ALL X's
      strokeWidth: 8, // 2x thicker
      roughness: 1.5,
    });
  }
};

// Draw shapes using Rough.js
const drawShape = (rc, shape) => {
  const canvas = rc.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const size = 600; // 2x larger

  // All shapes use lavender to avoid confusion with answer button colors
  const options = {
    stroke: "#2f2f2f", // Graphite
    strokeWidth: 6, // 2x thicker
    fill: "#8a72a6", // Vintage Lavender - consistent for ALL shapes
    fillStyle: "hachure",
    roughness: 2,
    hachureGap: 12, // Slightly larger gap for bigger shapes
  };

  switch (shape) {
    case "Circle":
      rc.circle(centerX, centerY, size, options);
      break;
    case "Square":
      rc.rectangle(centerX - size / 2, centerY - size / 2, size, size, options);
      break;
    case "Triangle":
      const halfSize = size / 2;
      rc.polygon(
        [
          [centerX, centerY - halfSize],
          [centerX + halfSize, centerY + halfSize],
          [centerX - halfSize, centerY + halfSize],
        ],
        options
      );
      break;
  }
};

// ========================================
// Screen Management
// ========================================
const showScreen = (screenToShow) => {
  // Hide all screens
  [startScreen, questionScreen, feedbackScreen, endScreen].forEach((screen) => {
    screen.classList.add("hidden");
  });
  // Show the requested screen
  screenToShow.classList.remove("hidden");
  screenToShow.classList.add("fade-in");
};

// ========================================
// UI Update Functions
// ========================================
const updateScoreDisplay = () => {
  scoreValue.textContent = gameState.score;
};

const updateQuestionCounter = () => {
  questionValue.textContent = `${gameState.currentQuestion} / ${TOTAL_QUESTIONS}`;
};

const clearElement = (element) => {
  element.innerHTML = "";
};

// ========================================
// Question & Answer Logic
// ========================================
const selectRandomQuestion = () => {
  return getRandomItem(quizConfig);
};

const displayQuestion = (config) => {
  gameState.currentConfig = config;
  questionText.textContent = config.questionContent;

  // Clear previous content
  clearElement(imageDisplay);
  clearElement(answersGrid);

  // Draw with Rough.js based on category
  displayDrawing(config);

  // Display answer buttons
  displayAnswerButtons(config);

  // Update counter
  updateQuestionCounter();
};

const displayDrawing = (config) => {
  const canvas = createCanvas();
  imageDisplay.appendChild(canvas);
  const rc = rough.canvas(canvas);

  // Pick a random answer to display
  const correctAnswer = getRandomItem(config.answerButtonsContent);
  gameState.currentAnswer = correctAnswer;

  // Draw based on category
  switch (config.questionCategory) {
    case "numbers":
      drawNumber(rc, correctAnswer);
      break;
    case "X's":
      drawXs(rc, correctAnswer);
      break;
    case "shapes":
      drawShape(rc, correctAnswer);
      break;
  }
};

const displayAnswerButtons = (config) => {
  const answers = config.answerButtonsContent;

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => handleAnswerClick(answer));
    answersGrid.appendChild(button);
  });
};

// ========================================
// Answer Checking
// ========================================
const checkAnswer = (selectedAnswer) => {
  return selectedAnswer === gameState.currentAnswer;
};

const handleAnswerClick = (selectedAnswer) => {
  // Disable all buttons to prevent multiple clicks
  const buttons = answersGrid.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  const isCorrect = checkAnswer(selectedAnswer);

  if (isCorrect) {
    gameState.score++;
    updateScoreDisplay();
    showFeedback(true);
  } else {
    showFeedback(false);
  }
};

// ========================================
// Feedback & Countdown
// ========================================
const showFeedback = (isCorrect) => {
  showScreen(feedbackScreen);

  feedbackText.textContent = isCorrect ? "Correct!" : "Try Again!";
  feedbackText.className = `feedback-text ${isCorrect ? "correct" : "incorrect"}`;

  // Start countdown to next question
  startCountdown();
};

const startCountdown = () => {
  let count = COUNTDOWN_SECONDS;
  countdown.textContent = count;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdown.textContent = count;
    } else {
      clearInterval(timer);
      countdown.textContent = "";
      loadNextQuestion();
    }
  }, 1000);
};

// ========================================
// Quiz Flow Control
// ========================================
const loadNextQuestion = () => {
  gameState.currentQuestion++;

  if (gameState.currentQuestion > TOTAL_QUESTIONS) {
    endQuiz();
  } else {
    showScreen(questionScreen);
    const nextConfig = selectRandomQuestion();
    displayQuestion(nextConfig);
  }
};

const startQuiz = () => {
  // Reset game state
  gameState = {
    score: 0,
    currentQuestion: 1,
    isQuizStarted: true,
    isQuizOver: false,
    currentConfig: null,
    currentAnswer: null,
  };

  // Update UI
  updateScoreDisplay();
  updateQuestionCounter();

  // Show question screen and load first question
  showScreen(questionScreen);
  const firstConfig = selectRandomQuestion();
  displayQuestion(firstConfig);
};

const endQuiz = () => {
  gameState.isQuizOver = true;
  gameState.isQuizStarted = false;

  // Update final score display
  finalScore.textContent = `You scored ${gameState.score} out of ${TOTAL_QUESTIONS}!`;

  showScreen(endScreen);
};

const restartQuiz = () => {
  startQuiz();
};

// ========================================
// Event Listeners
// ========================================
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// ========================================
// Initialize
// ========================================
// Show start screen on load
showScreen(startScreen);