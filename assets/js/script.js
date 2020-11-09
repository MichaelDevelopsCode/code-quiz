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

// array of questions
var questions = [ 
    {q: 'What color is the sky?', choices: ['yellow', 'blue', 'green', 'orange'], a: 0, },
    {q: 'What color idnenc snd?', choices: ['djdd', 'blue', 'green', 'orange'], a: 1, },
    {q: 'What color is dsnkcl sky?', choices: ['yellow', 'bdssjnlue', 'green', 'orange'], a: 2, },
    {q: 'What sdc jnc is the sky?', choices: ['yellow', 'blue', 'gredsmen', 'orange'], a: 3, },
    {q: 'What color isdjkncdws the sky?', choices: ['yellow', 'blue', 'green', 'orangdsse'], a: 0, },
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
            answersEl.innerHTML += "<li><button class='choices' id='choice"+i+"'>" + questions[qNumber].choices[i] + "</button></li>";
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
    // clear elements
    answersEl.style.display = "none";
    answerResponseEl.style.display = "none";
    // add elements
    introEl.style.display = "block";
    scoreFormEl.style.display = "block";



};

var restartOrClear = function(event) {
    if(event.target.id == "clear") {
        localStorage.removeItem('score');
        document.getElementById("scoreList").querySelector("ul").innerHTML = "";

    }
    if (event.target.id == "back") {
        window.location.reload();
    }
    else {
        return;
    }
} 

var scoreHandler = function(event) {
    // stop page from refreshing
    event.preventDefault();

    // store initials
    var initial = scoreFormEl.querySelector("input").value;
    localStorage.setItem('initials', initial);


    // clear any elements
    answersEl.style.display = "none";
    answerResponseEl.style.display = "none";

    // edit/display elements 
    introEl.style.display = "block";
    scoreFormEl.style.display = "block";
    questionEl.textContent = "High Scores";
    introEl.innerHTML = "<div id='scoreList'><ul></ul></div>";
    scoreList = document.getElementById("scoreList");
    scoreListChild = scoreList.querySelector("ul");

    // get initials and score
    var initials = localStorage.getItem('initials');
    var score = localStorage.getItem('score');

    // display them & add buttons
    scoreListChild.innerHTML += "<li>1."+initials+" - "+score+"</li>";
    scoreList.innerHTML += "<button class='scoreBtns' id='back'>Go Back</button><button class='scoreBtns' id='clear'>Clear Highscores</button>";

    // handle buttons
    scoreList.addEventListener("click", restartOrClear);
};

startBtnEl.addEventListener("click", startQuiz);
answersEl.addEventListener("click", answerCheck);
scoreFormEl.addEventListener("submit", scoreHandler);
viewScore.addEventListener("click", scoreHandler);

