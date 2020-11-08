
// grabing element variables
var timeEl = document.getElementById("time");
var startBtnEl = document.getElementById("startBtn");
var introEl = document.getElementById("intro");
var answersEl = document.getElementById("answers"); 
var questionEl = document.getElementById("question");

// array of questions
var questions = [ 
    {q: 'What color is the sky?', choices: ['yellow', 'blue', 'green', 'orange'], a: 0, },
    {q: 'What color is the sky?', choices: ['yellow', 'blue', 'green', 'orange'], a: 1, },
    {q: 'What color is the sky?', choices: ['yellow', 'blue', 'green', 'orange'], a: 3, },
    {q: 'What color is the sky?', choices: ['yellow', 'blue', 'green', 'orange'], a: 2, },
    {q: 'What color is the sky?', choices: ['yellow', 'blue', 'green', 'orange'], a: 0, },
];

var startQuiz = function() {
    // get rid of intro and display questions + answers
    introEl.style.display = "none";
    startBtnEl.style.display = "none";

    // start time
    var timeStart = 60;

    // handle time left
    var timeLeft = setInterval(function() {
        timeEl.textContent = "Time: " + timeStart;
        timeStart--
        if(timeStart <= 0) {
            clearInterval(timeLeft);
            endQuiz(); // add end quiz funtion
        }
    }, 1000);

    // add questions and choices


    // switch questions logic
    var qNumber = 0;

    questionEl.textContent = questions[qNumber].q;
    // populate answer choices
    for (var i = 0; i < questions[qNumber].choices.length; i++) {
        answersEl.innerHTML += "<li><button class='choices' id='choice"+i+"'>" + questions[qNumber].choices[i] + "</button></li>";
    }   

    
    

};



startBtnEl.addEventListener("click", startQuiz);


