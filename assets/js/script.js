// grabing element variables
var timeEl = document.getElementById("time");
var startBtnEl = document.getElementById("startBtn");
var introEl = document.getElementById("intro");
var answersEl = document.getElementById("answers");
var questionEl = document.getElementById("question");
var answerResponseEl = document.getElementById("answerCheck");
var scoreFormEl = document.getElementById("score-form");
var viewScore = document.getElementById("viewScore");

// question number
var qNumber = 0;
// start time 
var timeLeft = 60;
var timeCountdown;
13423
// array of questions
var questions = [ 
    {q: 'Commonly used data types DO not include:', choices: ['strings', 'booleans', 'alerts', 'numbers'], a: 2, },
    {q: 'The condition in an if / else statement is enclosed with ____.', choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'], a: 1, },
    {q: 'Arrays in JavaScript can be used to store ____.?', choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'], a: 3, },
    {q: 'String values must be enclosed within ___ when being assigned to variables.', choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'], a: 2, },
    {q: 'A very usefool tool used during development and debugging for printing content to the debugger is:', choices: ['JavaScript', 'terminal/bash', 'for loops', 'console log'], a: 3, },
];

var startQuiz = function() {
    // get rid of intro and display questions + answers
    introEl.style.display = "none";
    startBtnEl.style.display = "none";

    // handle time left
    timeCountdown = setInterval(function() {
        timeEl.textContent = "Time: " + timeLeft;
        timeLeft--
        if(timeLeft <= 0) {
            clearInterval(timeCountdown);
            endGameHandler();
        }
    }, 1000); 

    questionChange();
};

var questionChange = function() {
    // update question
    if (qNumber == questions.length) {
        endGameHandler();
        return;
    }
    questionEl.textContent = questions[qNumber].q;
    // populate answer choices
    for (var i = 0; i < questions[qNumber].choices.length; i++) {
        if (qNumber === 0) {
            answersEl.innerHTML += "<li><button class='choices' id='choice"+i+"'>" + (i+1) + ". " + questions[qNumber].choices[i] + "</button></li>";
            answersEl.querySelector("#choice"+i).setAttribute("data-choice-id", i);
        } else {
            var choiceEl = document.getElementById("choice"+i);
            choiceEl.textContent = questions[qNumber].choices[i];
        }
    }
};

var answerCheck = function(event) {
    var answerChoice = event.target.getAttribute("data-choice-id");
    if (answerChoice == questions[qNumber].a) {
        answerResponseEl.innerHTML = "<hr><h2>Correct!</h2>";
        qNumber++
    }
    else {
        // subtract time
        timeLeft = timeLeft - 10;
        answerResponseEl.innerHTML = "<hr><h2>Wrong!</h2>";
        qNumber++
    }

    questionChange();
};

var endGameHandler = function() {
    // Get score and stop timer
    var score = timeLeft;
    localStorage.setItem('score', score);

    clearInterval(timeCountdown);
    // edit elements
    questionEl.textContent = "All done!";
    introEl.querySelector("p").textContent = "Your final score is "+score;
    introEl.querySelector("p").className = "finalScore";
    // clear elements
    answersEl.style.display = "none";
    answerResponseEl.style.display = "none";
    // add elements
    introEl.style.display = "block";
    scoreFormEl.style.display = "flex";
};

var restartOrClear = function(event) {
    if(event.target.id == "clear") {
        localStorage.removeItem('score');
        localStorage.removeItem('initials');
        document.getElementById("scoreList").querySelector("ul").innerHTML = "";

    }
    if (event.target.id == "back") {
        window.location.reload();
    }
    else {
        return;
    }
} 

var storeScore = function(event) {
    // stop page from refreshing
    event.preventDefault();
    
    // store initials
    var initial = scoreFormEl.querySelector("input").value;
    localStorage.setItem('initials', initial);

    scoreHandler();
};

var scoreHandler = function() {



    // clear any elements
    answersEl.style.display = "none";
    answerResponseEl.style.display = "none";
    startBtnEl.style.display = "none";

    // edit/display elements 
    introEl.style.display = "block";
    scoreFormEl.style.display = "flex";
    questionEl.textContent = "High Scores";
    introEl.innerHTML = "<div id='scoreList'><ul></ul></div>";
    scoreList = document.getElementById("scoreList");
    scoreListChild = scoreList.querySelector("ul");

    // get initials and score
    var initials = localStorage.getItem('initials');
    var score = localStorage.getItem('score');

    if(initials == null || score == null) {
        scoreList.innerHTML += "<button class='choices' id='back'>Go Back</button><button class='choices' id='clear'>Clear Highscores</button>";
    } else {
        // display them & add buttons
        scoreListChild.innerHTML += "<li>1."+initials+" - "+score+"</li>";
        scoreList.innerHTML += "<button class='choices' id='back'>Go Back</button><button class='choices' id='clear'>Clear Highscores</button>";
    }
    // handle buttons
    scoreList.addEventListener("click", restartOrClear);
};

startBtnEl.addEventListener("click", startQuiz);
answersEl.addEventListener("click", answerCheck);
scoreFormEl.addEventListener("submit", storeScore);
viewScore.addEventListener("click", scoreHandler);

