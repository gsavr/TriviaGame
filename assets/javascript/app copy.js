var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer = 10;
var currentQuestion;
var currentAnswer = "";
var timerCount;
var timerRunning=false;
var questionsUsed = 0;


var triviaQ = {
    q1: {
        question: "Who is Brian?",
        options: ["the dog", "the dad", "the son", "the baby"],
        answer: "the dog",
        pic: "assets/images/brian.png",
    },

    q2: {
        question: "Who is the oldest Griffin child?",
        options: ["Stewie", "Chris", "Meg", "Peter"],
        answer: "Meg",
        pic: "assets/images/meg.png",
    },

    q3: {
        question: "Which character is on a wheelchair?",
        options: ["Glenn Quagmire", "Cleveland Brown", "Bonnie Swanson", "Joe Swanson"],
        answer: "Joe Swanson",
        pic: "assets/images/joe.png",
    },

    q4: {
        question: "What is the name of the bar where Peter and his friends frequent?",
        options: ["Broken Clam", "Drunken Clam", "Joe's Bar", "Sinkhole"],
        answer: "Drunken Clam",
        pic: "assets/images/clam.png",
    },

    q5: {
        question: "What is Stewie's mission in life?",
        options: ["world domination", "be rich", "own a company", "get a cat"],
        answer: "world domination",
        pic: "assets/images/stew.png",
    },

}

$("#start").on("click", function(){ //start game when clicked on Start Game
    $("#start").css("display", "none");
            
    newQuestion();

});

function newQuestion(){ //choose a new question in order automatically
    $(".timer").show(); 
    $(".choice").show();
    $("#correctPic").hide();
    $("#incorrectPic").hide();
    $("#answerPic").empty();
    $("#answerWas").empty()

    if(questionsUsed === 0){
        currentQuestion = triviaQ.q1;
        questionsUsed++;
    }
    else if(questionsUsed === 1){
        currentQuestion = triviaQ.q2;
        questionsUsed++;
    }
    else if(questionsUsed === 2){   
        currentQuestion = triviaQ.q3;
        questionsUsed++;
    }
    else if(questionsUsed === 3){
        currentQuestion = triviaQ.q4;
        questionsUsed++;
    }
    else if(questionsUsed === 4){
        currentQuestion = triviaQ.q5;
        questionsUsed++;
    }
    else if(questionsUsed === 5){
        gameOver();
    }
    timer = 10;
    $("#timer").text(timer);
    currentAnswer = currentQuestion.answer;

    console.log("#of questions used:"+questionsUsed)
    console.log(currentQuestion)
    console.log(currentQuestion.answer)
    console.log(currentAnswer)
    console.log(currentQuestion.pic)

    $(".question").text(currentQuestion.question);
    $("#choice1").text(currentQuestion.options[0]);
    $("#choice2").text(currentQuestion.options[1]);
    $("#choice3").text(currentQuestion.options[2]);
    $("#choice4").text(currentQuestion.options[3]);

    function timerCountdown(){
        timer--;
        $("#timer").text(timer);
        if(timer===-1){
            console.log("time is up")
            timeUp()
        } 
    }
    if(!timerRunning){
        timerCount = setInterval(timerCountdown, 1000);
    };

}

$(".choice").on("click", function(){
    if($(this).text() === currentAnswer){
        correctAnswer()
    }
    else{
        wrongAnswer()
    }
});

function timerStop(){
    clearInterval(timerCount)
}

function correctAnswer(){
    correct++;
    $("#correctPic").show();
    $("#answerWas").text(currentAnswer+"!");
    $(".choice").hide();
    $("#answerPic").html('<img src="' + currentQuestion.pic + '" height=200px />');
    var nextQ = setTimeout(function() {
        timerStop();
        newQuestion();
        }, 3500);

        console.log("#correct:"+correct)
}

function wrongAnswer(){
    incorrect++;
    $("#incorrectPic").show();
    $("#answerWas").text("The correct answer was "+ currentAnswer);
    $(".choice").hide();
    $("#answerPic").html('<img src="' + currentQuestion.pic + '" height=200px />');
    var nextQ = setTimeout(function() {
        timerStop();
        newQuestion();
        }, 3500);

        console.log("#incorrect:"+incorrect)
}

function timeUp(){
    $(".timer").hide();
    unanswered++;
    $("#incorrectPic").show();
    $("#answerWas").text("You ran out of time, the correct answer was "+ currentAnswer);
    $(".choice").hide();
    $("#answerPic").html('<img src="' + currentQuestion.pic + '" height=200px />');
    var nextQ = setTimeout(function() {
        timerStop();
        newQuestion();
        }, 3500);

        console.log("#unanswered:"+unanswered)
}
