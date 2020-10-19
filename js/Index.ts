function start(){
    const game = new Game()
    game.startGame();
    let fields = game.setupGame();
    game.render(fields);
}

window.onload = function(){
    start();
};

