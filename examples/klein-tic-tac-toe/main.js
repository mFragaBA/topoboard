var board;
var gameDOM;


$( document ).ready(function(){
    board = new KleinBoard(String, 3, 3);
    game = new TicTacToe("game", board);
});