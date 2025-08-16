const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        answer: 0
    },
    {
        question: "Which programming language is used for web styling?",
        options: ["HTML", "CSS", "Python"],
        answer: 1
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Google", "Microsoft"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreContainer = document.getElementById("scoreContainer");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
    const currentData = quizData[currentQuestion];
    questionEl.textContent = currentData.question;
    optionsEl.innerHTML = "";

    currentData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, index));
        optionsEl.appendChild(button);
    });

    selectedOption = null;
}

function selectOption(button, index) {
    const allOptions = document.querySelectorAll(".option-btn");
    allOptions.forEach(opt => opt.classList.remove("selected"));
    button.classList.add("selected");
    selectedOption = index;
}

nextBtn.addEventListener("click", () => {
    if (selectedOption === null) {
        alert("Please select an option!");
        return;
    }

    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionEl.classList.add("hidden");
    optionsEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreEl.textContent = score;
    totalEl.textContent = quizData.length;
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    questionEl.classList.remove("hidden");
    optionsEl.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    scoreContainer.classList.add("hidden");
    loadQuestion();
});

loadQuestion();
