
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;
var currentScore = 0;
var menu = true;
var diff = 600;

if(menu === true){
  $("#level-title").text("SIMON");
  $("#returnToMenu").hide();
  $(".optionsBtn").hide();
  $("#optionsReturn").hide();
  $(".creditto").hide();
}

$(".btn").hide();

/*
$("body").ready(function(){
      setTimeout(function(){
          playBackgroundMusic("menu");
      }, 100);
});
*/

$(document).keypress(function(){
  if(!menu){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#returnToMenu").hide();
    $(".creditto").hide();
  }
}
});

function nextSequence(){
  $(".creditto").hide();
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function() {
    displayPattern(0, gamePattern);
  }, 500);
}

function displayPattern(index, array) {

  if(index >= array.length)
    return;

  $("#" + gamePattern[index]).fadeOut(150).fadeIn(150);
  playSound(gamePattern[index] + ".mp3");
  index ++;

  setTimeout(displayPattern.bind({}, index, array), diff);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour + ".mp3");
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name);
  audio.play();
}

/*
function playBackgroundMusic(name){
  var audio2 = new Audio("sounds/" + name + ".mp3");
  audio2.loop = true;
  audio2.play();
}
*/

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        currentScore++;
        if(currentScore > highScore){
        $(".p-highscore").text("Your highscore: " + currentScore);
      }
        $(".p-currentscore").text("Your current score: " + currentScore);
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    if(started === true){
    $("body").addClass("game-over");

    playSound("wrong.mp3");
    if(currentScore > highScore){
      highScore = currentScore;
      $(".p-highscore").text("Your highscore: " + highScore);
    }

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over!");

    setTimeout(function () {
       $("#returnToMenu").fadeIn(500);
    }, 2000);

    setTimeout(function () {
      startOver();
    }, 2000);
  }
  }
}

function startOver(){
  $("#level-title").text("Press A Key to Start Again");
  level = 0;
  started = false;
  gamePattern = [];
  currentScore = 0;
  $(".p-currentscore").text("Your current score: " + currentScore);
}

$(".menuBtn").mouseenter(function(){
  var userHoverOption = $(this).attr("id");
  $("#" + userHoverOption).css("color", "white");
  $("#" + userHoverOption).addClass("textBorder");
});
$(".menuBtn").mouseleave(function(){
  var userHoverOption = $(this).attr("id");
  $("#" + userHoverOption).css("color", "black");
});

$(".menuBtn").click(function(){
  var userChosenOption = $(this).attr("id");
  animatePress(userChosenOption);
  playSound("menuselection.mp3");
  if(userChosenOption === "startGame"){
    $(".btn").fadeIn(500);
    menu = false;

    $(".menuBtn").fadeOut(300);

    setTimeout(function () {
      if(!started){
        $("#level-title").text("Level " + level);
        $(".creditto").hide();
        nextSequence();
        started = true;
      }
    }, 800);
      }

  else if(userChosenOption === "options"){

    $("#level-title").text("OPTIONS");
    $(".creditto").hide();
    $(".menuBtn").hide();
    $(".optionsBtn").fadeIn();
    $("#optionsReturn").show();
  }

  else if(userChosenOption === "credits") {
    $("#level-title").text("CREDITS");
    $(".menuBtn").hide();
    $(".p-highscore").hide();
    $(".p-currentscore").hide();
    $(".creditto").show();
    $("#optionsReturn").show();
  }
});

$(".optionsBtn").click(function(){
  var userChosendiff = $(this).attr("id");
  animatePress(userChosendiff);
  playSound("menuselection.mp3");
  if(userChosendiff === "optionsEasy"){

    diff = 600;
  }

  else if(userChosendiff === "optionsMedium"){
    diff = 300;
  }

  else if(userChosendiff === "optionsHard"){
    diff = 150;
  }
});

$(".optionsBtn").mouseenter(function(){
  var userHoverOption = $(this).attr("id");
  $("#" + userHoverOption).css("color", "white");
  $("#" + userHoverOption).addClass("textBorder");
});
$(".optionsBtn").mouseleave(function(){
  var userHoverOption = $(this).attr("id");
  $("#" + userHoverOption).css("color", "black");
});

$(".returnToMenu").click(function(){

  playSound("menuselection.mp3")
  $(".btn").hide();
  $(".creditto").hide();
  $(".menuBtn").fadeIn(700);
  $(".returnToMenu").hide();
  $(".optionsBtn").hide();
  menu = true;
  $("#level-title").text("SIMON");
  $(".p-highscore").show();
  $(".p-currentscore").show();
  $(".p-highscore").text("Your highscore: " + highscore);
  $(".p-currentscore").text("Your current score: 0");
  $("#optionsReturn").hide();
});

$(".returnToMenu").mouseenter(function(){
  $(this).css("background-color", "black")
  $(this).css("color", "#FEF2BF")
});

$(".returnToMenu").mouseleave(function(){
  $(this).css("background-color", "#FEF2BF")
  $(this).css("color", "black")
});
