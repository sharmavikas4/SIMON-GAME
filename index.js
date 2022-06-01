var buttonColours=["red","blue","green","yellow"];
var level=0;
var pattern=[];
var userPattern=[];
var started=false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    newSequence();
    started=true;
  }
});
  function ColorAnimate(color) {
    $("." + color).addClass("pressed");
    setTimeout(function() {
      $("." + color).removeClass("pressed");
    }, 100);
  }

  $(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    ColorAnimate(userChosenColor);
    patternChecking(userPattern.length-1);
  });
  function patternChecking(currentLevel){
    if (pattern[currentLevel]===userPattern[currentLevel]){
      if (userPattern.length===pattern.length){
        setTimeout(function(){
          newSequence();
        },1000);
      }
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function newSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  pattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(colorName){
  var audio = new Audio("sounds/"+colorName+".mp3");
  audio.play();
}
function startOver(){
  level=0;
  pattern=[];
  started=false;
}
