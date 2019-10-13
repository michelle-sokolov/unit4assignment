// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create questions
let questions = [
  {
  question: "Question #1: Commonly used data types DO NOT include:",
  choiceA: "A. strings",
  choiceB:"B. booleans", 
  choiceC:"C. alerts", 
  choiceD:"D. numbers",
  correct: "C"
},
{
  question: "Question #2: The condition in an if / else statement is enclosed within ____.",
  choiceA: "A. quotes", 
  choiceB:"B. curly brackets", 
  choiceC:"C. parentheses", 
  choiceD:"D. square brackets",
  correct: "C"
},
{
  question: "How do you create an alert box?",
  choiceA: "A. msg();", 
  choiceB:"B. alertBox()", 
  choiceC:"C. msgBox()",     
  choiceD:"D. alert()",
  correct: "D"
},  
{
  question: "Question #4: How do you create a function in JavaScript?",
  choiceA: "A. function myFunction()",
  choiceC: "B. function || myFunction()", 
  choiceB: "C. function = myFunction()",
  choiceD: "D. function:myFunction()",
  correct: "A"
},  
{
  question: "Question #5: How can you add a comment in a JavaScript?",
  choiceA: "A. (This is a comment)", 
  choiceB:"B. **This is a comment**", 
  choiceC:"C. //This is a comment", 
  choiceD:"D. !This is a comment!",
  correct: "C"
}
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0; //change to 15?
const questionTime = 15; // 15s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++ 
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion);
    //.style.backgroundColor = "#0f0
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion);
    //.style.backgroundColor = "#f00"
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

//put result of scoreRender into local storage highscore
//if statement if highscore is beaten 
  //update local storage


