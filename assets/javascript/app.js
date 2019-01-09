var correct = "";
var incorrect = "";
var unanswered = "";
var timer = "";
var currentQuestion;
var currentAnswer = "";
var timerCount;
var timerRunning=false;
var questionNum = 0;
var endPic = ["assets/images/end/chris.png", "assets/images/end/cleveland.png", "assets/images/end/glenn.png", "assets/images/end/lois.png", "assets/images/end/peter.png", "assets/images/end/stewart.png"];


var triviaQ = [
     {
        question: "Who is Brian?",
        options: ["the dog", "the dad", "the son", "the baby"],
        answer: "the dog",
        pic: "assets/images/brian.png",
    },

     {
        question: "Who is the oldest Griffin child?",
        options: ["Stewie", "Chris", "Meg", "Peter"],
        answer: "Meg",
        pic: "assets/images/meg.png",
    },

     {
        question: "Which character is on a wheelchair?",
        options: ["Glenn Quagmire", "Cleveland Brown", "Bonnie Swanson", "Joe Swanson"],
        answer: "Joe Swanson",
        pic: "assets/images/joe.png",
    },

     {
        question: "What is the name of the bar where Peter and his friends frequent?",
        options: ["Broken Clam", "Drunken Clam", "Joe's Bar", "Sinkhole"],
        answer: "Drunken Clam",
        pic: "assets/images/clam.png",
    },

     {
        question: "What is Stewie's mission in life?",
        options: ["world domination", "be rich", "own a company", "get a cat"],
        answer: "world domination",
        pic: "assets/images/stew.png",
    },

     {
        question: "What lives in Chris' closet?",
        options: ["An evil monkey", "A bat", "The bogey man", "A gnome that steals things from him"],
        answer: "An evil monkey",
        pic: "assets/images/monkey.png",
    },

     {
        question: "Who is the mayor in Quahog?",
        options: ["Cleveland Brown", "Adam West", "Tom Tucker", "Diane Simmons"],
        answer: "Adam West",
        pic: "assets/images/adamwest.png",
    },

     {
        question: "Who does Peter continue to get in a fight with?",
        options: ["A dog", "A bull", "A duck", "A chicken"],
        answer: "A chicken",
        pic: "assets/images/chicken.png",
    },

     {
        question: "Where did Stewie train?",
        options: ["Right testicle bunker", "In the womb", "Testicular boot camp", "Anti-Lois foundation"],
        answer: "Testicular boot camp",
        pic: "assets/images/bootcamp.png",
    },
];

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
    questionNum=0;
            
    newQuestion();
});

function newQuestion(){ //choose a new question in order automatically
    $(".timer").show(); 
    $(".question").show();
    $(".choice").show();
    $("#correctPic").empty();
    $("#answerPic").empty();
    $("#answerWas").empty()

    currentQuestion = triviaQ[questionNum];

    if(questionNum === triviaQ.length){
        gameOver();
    } 

    timer = 10;
    $("#timer").text(timer);
    currentAnswer = triviaQ[questionNum].answer;

    console.log("#of questions used:"+questionNum)
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

var media = window.matchMedia("(max-width: 500px)");
media.addListener(nextQ);

function nextQ(){
    questionNum++;
    $(".timer").hide();
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
}

function correctAnswer(){
    correct++;
    $("#correctPic").html('<img src="' + correctPic.correct + '" height=250px />');
    $("#answerWas").text(currentAnswer+"!");
    
    nextQ(media)
    console.log("#correct:"+correct)
}

function wrongAnswer(){
    incorrect++;
    $("#correctPic").html('<img src="' + correctPic.incorrect + '" height=250px />');
    $("#answerWas").text("The correct answer was "+ currentAnswer);
    
    nextQ(media)
    console.log("#incorrect:"+incorrect)
}

function timeUp(){
    unanswered++;
    $("#correctPic").html('<img src="' + correctPic.timeout + '" height=250px />');
    $("#answerWas").text("You ran out of time, the correct answer was "+ currentAnswer);
   
    nextQ(media)
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
