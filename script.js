// ========================================
// QUIZ QUESTIONS
// ========================================

const questions = [

    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management",
            "Home Tool Markup Language"
        ],
        correct: 0
    },

    {
        question: "What does CPU stand for?",
        answers: [
            "Computer Personal Unit",
            "Central Program Utility",
            "Central Processing Unit",
            "Computer Processing Utility"
        ],
        correct: 2
    },

    {
        question: "Which device is commonly used to type text into a computer?",
        answers: [
            "Monitor",
            "Keyboard",
            "Speaker",
            "Printer"
        ],
        correct: 1
    },

    {
        question: 'What does "WWW" stand for?',
        answers: [
            "World Web Window",
            "Wide World Website",
            "Web World Wide",
            "World Wide Web"
        ],
        correct: 3
    },

    {
        question: "Which one is a programming language?",
        answers: [
            "JavaScript",
            "Google",
            "Windows",
            "Chrome"
        ],
        correct: 0
    },

    {
        question: "Which language is mainly used to style a webpage?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correct: 1
    },

    {
        question: "Which language is used to make a webpage interactive?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: 2
    },

    {
        question: "Which type of memory is temporary and loses its data when the computer is turned off?",
        answers: [
            "ROM",
            "RAM",
            "Hard Drive",
            "SSD"
        ],
        correct: 1
    },

    {
        question: "Which of the following is an operating system?",
        answers: [
            "Google Chrome",
            "Microsoft Word",
            "Windows",
            "Google"
        ],
        correct: 2
    },

    {
        question: "What does URL stand for?",
        answers: [
            "Universal Reference Link",
            "United Resource Language",
            "Uniform Resource Locator",
            "Uniform Response Location"
        ],
        correct: 2
    }

];


// ========================================
// SCORE SETTINGS
// ========================================

// 10 questions = 10 regular points
const MAX_QUESTION_POINTS = 10;

// Maximum bonus = 5 points
const MAX_BONUS_POINTS = 5;

// Maximum possible score = 15
const MAX_SCORE =
    MAX_QUESTION_POINTS + MAX_BONUS_POINTS;


// ========================================
// VARIABLES
// ========================================

let currentQuestion = 0;

let score = 0;

let bonusPoints = 0;

let streak = 0;

let timeLeft = 10;

let timer;


// ========================================
// MYSTERY BONUS
// ========================================

// One random question gives +2 bonus points
let bonusQuestion =
    Math.floor(Math.random() * questions.length);


// ========================================
// HTML ELEMENTS
// ========================================

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const startButton =
    document.getElementById("start-btn");

const restartButton =
    document.getElementById("restart-btn");

const questionElement =
    document.getElementById("question");

const answerButtons =
    document.querySelectorAll(".answer-btn");

const nextButton =
    document.getElementById("next-btn");

const questionNumber =
    document.getElementById("question-number");

const scoreElement =
    document.getElementById("score");

const timerElement =
    document.getElementById("timer");

const progressBar =
    document.getElementById("progress-bar");

const finalScore =
    document.getElementById("final-score");

const resultMessage =
    document.getElementById("result-message");


// ========================================
// START QUIZ
// ========================================

startButton.addEventListener(
    "click",
    startQuiz
);


function startQuiz() {

    currentQuestion = 0;

    score = 0;

    bonusPoints = 0;

    streak = 0;

    // Choose a new random bonus question
    bonusQuestion =
        Math.floor(Math.random() * questions.length);

    startScreen.classList.add("hide");

    resultScreen.classList.add("hide");

    quizScreen.classList.remove("hide");

    showQuestion();
}


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion() {

    resetButtons();

    const current =
        questions[currentQuestion];


    questionElement.textContent =
        current.question;


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    scoreElement.textContent =
        `Score: ${score}/${MAX_SCORE}`;


    // Update progress bar

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    // Display answers

    for (let i = 0; i < answerButtons.length; i++) {

        answerButtons[i].textContent =
            current.answers[i];

        answerButtons[i].disabled = false;

        answerButtons[i].onclick =
            () => selectAnswer(i);

    }


    nextButton.disabled = true;


    // Start timer

    startTimer();
}


// ========================================
// SELECT ANSWER
// ========================================

function selectAnswer(selectedIndex) {

    clearInterval(timer);

    const current =
        questions[currentQuestion];


    // ====================================
    // CORRECT ANSWER
    // ====================================

    if (selectedIndex === current.correct) {

        // Regular question point
        score++;

        // Increase streak
        streak++;


        // =================================
        // MYSTERY BONUS
        // =================================

        if (
            currentQuestion === bonusQuestion &&
            bonusPoints < 5
        ) {

            bonusPoints += 2;

            score += 2;

            questionElement.textContent =
                "MYSTERY BONUS!";
        }


        // =================================
        // STREAK BONUS
        // =================================

        // Bonus at 3, 6, and 9 correct answers
        if (
            streak === 3 ||
            streak === 6 ||
            streak === 9
        ) {

            bonusPoints += 1;

            score += 1;

            questionElement.textContent =
                `${streak} CORRECT IN A ROW!`;
        }


        // =================================
        // BONUS LIMIT
        // =================================

        // Maximum bonus points = 5

        if (bonusPoints > MAX_BONUS_POINTS) {

            bonusPoints = MAX_BONUS_POINTS;

        }


        // =================================
        // SCORE LIMIT
        // =================================

        // Maximum score = 15

        if (score > MAX_SCORE) {

            score = MAX_SCORE;

        }


        // Show correct answer

        answerButtons[selectedIndex]
            .classList.add("correct");

    }


    // ====================================
    // WRONG ANSWER
    // ====================================

    else {

        // Wrong answer resets streak
        streak = 0;


        // Show wrong answer

        answerButtons[selectedIndex]
            .classList.add("wrong");


        // Show correct answer

        answerButtons[current.correct]
            .classList.add("correct");

    }


    // Disable all answer buttons

    for (let button of answerButtons) {

        button.disabled = true;

    }


    // Update score

    scoreElement.textContent =
        `Score: ${score}/${MAX_SCORE}`;


    // Enable Next button

    nextButton.disabled = false;
}


// ========================================
// NEXT QUESTION
// ========================================

nextButton.addEventListener(
    "click",
    nextQuestion
);


function nextQuestion() {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }
}


// ========================================
// RESET ANSWER BUTTONS
// ========================================

function resetButtons() {

    for (let button of answerButtons) {

        button.classList.remove("correct");

        button.classList.remove("wrong");

        button.disabled = false;

    }

}


// ========================================
// TIMER
// ========================================

function startTimer() {

    clearInterval(timer);

    timeLeft = 10;

    timerElement.textContent =
        timeLeft;


    timer = setInterval(function() {

        timeLeft--;

        timerElement.textContent =
            timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            timeUp();

        }

    }, 1000);

}


// ========================================
// TIME UP
// ========================================

function timeUp() {

    const current =
        questions[currentQuestion];


    // Time's up resets streak

    streak = 0;


    // Show correct answer

    answerButtons[current.correct]
        .classList.add("correct");


    // Disable all answers

    for (let button of answerButtons) {

        button.disabled = true;

    }


    // Enable Next button

    nextButton.disabled = false;


    questionElement.textContent =
        "⏰ Time's up!";
}


// ========================================
// SHOW RESULT
// ========================================

function showResult() {

    clearInterval(timer);

    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");


    // =================================
    // FINAL SCORE
    // =================================

    // Maximum score is always 15

    if (score > MAX_SCORE) {

        score = MAX_SCORE;

    }


    finalScore.textContent =
        `${score} / ${MAX_SCORE}`;


    // =================================
    // RESULT MESSAGE
    // =================================

    if (score === MAX_SCORE) {

        resultMessage.textContent =
            "PERFECT!";

    } else if (score >= 12) {

        resultMessage.textContent =
            "Excellent!";

    } else if (score >= 9) {

        resultMessage.textContent =
            "Great job!";

    } else if (score >= 6) {

        resultMessage.textContent =
            "Good effort! Keep learning and improving!";

    } else {

        resultMessage.textContent =
            "Nice try! Play again and beat your score!";

    }

}


// ========================================
// RESTART QUIZ
// ========================================

restartButton.addEventListener(
    "click",
    startQuiz
);