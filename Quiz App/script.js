const questions = [
    {
        question: "Which of the following is a commonly used programming language for developing AI models?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false }
        ]
    },
    {
        question: "Which of the following AI techniques is used to train machines to make decisions based on reward feedback?",
        answers: [
            { text: "Supervised Learning", correct: false },
            { text: "Unsupervised Learning", correct: false },
            { text: "Reinforcement Learning", correct: true },
            { text: "Deep Learning", correct: false }
        ]
    },    
    {
        question: "Which AI algorithm is commonly used for image recognition and processing?",
        answers: [
            { text: "K-Means Clustering", correct: false },
            { text: "Support Vector Machines", correct: false },
            { text: "Convolutional Neural Networks (CNNs)", correct: true },
            { text: "Decision Trees", correct: false }
        ]
    },    
    {
        question: "Which of the following is a major application of Natural Language Processing (NLP)?",
        answers: [
            { text: "Speech Recognition", correct: true },
            { text: "Autonomous Driving", correct: false },
            { text: "Face Recognition", correct: false },
            { text: "Image Classification", correct: false }
        ]
    },
    {
        question: "Which of the following best describes an AI 'neural network'?",
        answers: [
            { text: "A system that mimics the human brain structure to solve complex problems", correct: true },
            { text: "A machine that can perform basic arithmetic operations", correct: false },
            { text: "A form of genetic algorithm used for optimization", correct: false },
            { text: "A network of computers connected to solve AI tasks", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; 
    score = 0; 
    nextButton.innerHTML = "Next"; 
    showQuestion(); 
}

function showQuestion() {
   resetState(); 
   let currentQuestion = questions[currentQuestionIndex]; 
   let questionNo = currentQuestionIndex + 1; 
   questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

   currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button"); 
       button.innerHTML = answer.text; 
       button.classList.add("btn"); 
       answerButtons.appendChild(button); 
       if (answer.correct) { 
           button.dataset.correct = answer.correct; 
       }
       button.addEventListener("click", selectAnswer); // Fixed spelling error
   });
}

function resetState() {
   nextButton.style.display = "none"; 
   while (answerButtons.firstChild) { 
       answerButtons.removeChild(answerButtons.firstChild); // Fixed spelling error
   }
}

function selectAnswer(e) {
   const selectedButton = e.target; 
   const isCorrect = selectedButton.dataset.correct === "true"; 
   if (isCorrect) { 
       selectedButton.classList.add("correct"); 
       score++; 
   } else { 
       selectedButton.classList.add("incorrect"); 
   }
   Array.from(answerButtons.children).forEach(button => { 
       if (button.dataset.correct === "true") { 
           button.classList.add("correct"); 
       }
       button.disabled = true; 
   });
   nextButton.style.display = "block"; 
}

function showScore() {
   resetState(); 
   questionElement.innerHTML = ` ${score} / ${questions.length} points !`; 
   nextButton.innerHTML = "Play Again"; 
   nextButton.style.display = "block"; 
}

function handleNextButton() {
   currentQuestionIndex++; 
   if (currentQuestionIndex < questions.length) { 
       showQuestion(); 
   } else { 
       showScore(); 
   }
}

nextButton.addEventListener("click", () => {
   if (currentQuestionIndex < questions.length) { 
       handleNextButton(); // Fixed function name
   } else { 
       startQuiz(); // Restart quiz
   }
});

startQuiz(); // Start the quiz when the page loads
