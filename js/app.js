$(function() {

  var cardNum = 36;
  var pairNum = 3;

  var app = new SuiJack("mainBoard", "scoreField", cardNum, pairNum);
  app.startGame();

});
