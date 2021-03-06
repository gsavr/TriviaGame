var correct = "";
var incorrect = "";
var unanswered = "";
var timer = "";
var currentQuestion;
var currentAnswer = "";
var timerCount;
var timerRunning=false;
var questionsUsed = 0;
var endPic = ["assets/images/end/chris.png", "assets/images/end/cleveland.png", "assets/images/end/glenn.png", "assets/images/end/lois.png", "assets/images/end/peter.png", "assets/images/end/stewart.png"];


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

    q6: {
        question: "What lives in Chris' closet?",
        options: ["An evil monkey", "A bat", "The bogey man", "A gnome that steals things from him"],
        answer: "An evil monkey",
        pic: "assets/images/monkey.png",
    },

    q7: {
        question: "Who is the mayor in Quahog?",
        options: ["Cleveland Brown", "Adam West", "Tom Tucker", "Diane Simmons"],
        answer: "Adam West",
        pic: "assets/images/adamwest.png",
    },

    q8: {
        question: "Who does Peter continue to get in a fight with?",
        options: ["A dog", "A bull", "A duck", "A chicken"],
        answer: "A chicken",
        pic: "assets/images/chicken.png",
    },

    q9: {
        question: "Where did Stewie train?",
        options: ["Right testicle bunker", "In the womb", "Testicular boot camp", "Anti-Lois foundation"],
        answer: "Testicular boot camp",
        pic: "assets/images/bootcamp.png",
    },
}

var correctPic = {
    correct : "assets/images/Glen-Quagmire.png",
    incorrect: "assets/images/Consuela.png", 
    timeout: "assets/images/peterdrunk.png",
}

$("#start").on("click", function(){ //start game when clicked on Start Game
    correct = 0;
    incorrect = 0;
    unanswered = 0;

    $("#start").hide();
    $(".gameOver").hide();
    $("#endPic").empty();

    timerRunning=false;
    questionsUsed=0;
            
    newQuestion();

});

function newQuestion(){ //choose a new question in order automatically
    $(".timer").show(); 
    $(".question").show();
    $(".choice").show();
    $("#correctPic").empty();
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
        currentQuestion = triviaQ.q6;
        questionsUsed++;
    }
    else if(questionsUsed === 6){
        currentQuestion = triviaQ.q7;
        questionsUsed++;
    }
    else if(questionsUsed === 7){
        currentQuestion = triviaQ.q8;
        questionsUsed++;
    }
    else if(questionsUsed === 8){
        currentQuestion = triviaQ.q9;
        questionsUsed++;
    }
    else if(questionsUsed === 9){
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
            timeUp(media)
        } 
    }
    if(!timerRunning){
        timerCount = setInterval(timerCountdown, 1000);
    };

}

$(".choice").on("click", function(){
    if($(this).text() === currentAnswer){
        correctAnswer(media)
    }
    else{
        wrongAnswer(media)
    }
});

function timerStop(){
    clearInterval(timerCount)
    
}

var media = window.matchMedia("(max-width: 500px)");
media.addListener(correctAnswer);
media.addListener(wrongAnswer);
media.addListener(timeUp);

function correctAnswer(){
    correct++;
    $(".timer").hide(); 
    $("#correctPic").html('<img src="' + correctPic.correct + '" height=250px />');
    $("#answerWas").text(currentAnswer+"!");
    $(".choice").hide();
    if(media.matches){
        $("#answerPic").html('<img src="' + currentQuestion.pic + '" width=150px />');
    }
    else{
        $("#answerPic").html('<img src="' + currentQuestion.pic + '" height=200px />');
    }
    var nextQ = setTimeout(function() {
        timerStop();
        newQuestion();
        }, 3000);

        console.log("#correct:"+correct)
}

function wrongAnswer(){
    incorrect++;
    $(".timer").hide(); 
    $("#correctPic").html('<img src="' + correctPic.incorrect + '" height=250px />');
    $("#answerWas").text("The correct answer was "+ currentAnswer);
    $(".choice").hide();
    if(media.matches){
        $("#answerPic").html('<img src="' + currentQuestion.pic + '" width=150px />');
    }
    else{
        $("#answerPic").html('<img src="' + currentQuestion.pic + '" height=200px />');
    }
    var nextQ = setTimeout(function() {
        timerStop();
        newQuestion();
        }, 3000);

        console.log("#incorrect:"+incorrect)
}

function timeUp(){
    $(".timer").hide();
    unanswered++;
    $("#correctPic").html('<img src="' + correctPic.timeout + '" height=250px />');
    $("#answerWas").text("You ran out of time, the correct answer was "+ currentAnswer);
    $(".choice").hide();
    if(media.matches){
        $("#answerPic").html('<img src="' + currentQuestion.pic + '" width=150px />');
    }
    else{
        $("#answerPic").html('<img src="' + currentQuestion.pic + '" height=200px />');
    }
    var nextQ = setTimeout(function() {
        timerStop();
        newQuestion();
        }, 3000);

        console.log("#unanswered:"+unanswered)
}

function gameOver(){
    var ranPic = endPic[Math.floor(Math.random() * endPic.length)];
    console.log(ranPic)
    $("#endPic").html('<img src="' + ranPic + '" height=250px style="display:inline-block;" />');

    $(".question").hide();
    $(".timer").hide();
    $(".choice").hide();
    $(".gameOver").show();
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $("#unanswered").text(unanswered);
    $("#start").show();
    timerStop();
    timerRunning=true;

}
