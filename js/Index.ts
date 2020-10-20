function start(){
    const game = new Game()
    game.startGame();
    game.setupGame();
    game.render();
}

window.onload = function(){
    start();
};

