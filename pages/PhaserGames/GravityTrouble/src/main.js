var game;
var gameOptions = {
    shipSpeedX: 200,
    shipY:290,
    enemySpeed: 100,
    powerupY:66,
    ww:640,
    wh:360,
    wcX: 320,
    wcY:180
}
window.onload = function() {

    var gameConfig = {
        type: Phaser.AUTO,
        width: 640,
        height: 360,
        parent:"game"
        backgroundColor:0x090a0f,
        physics: {
            default: "arcade",
            arcade: {
                debug:false,
                gravity: {
                    y: 0
                }
            }
        },
       scene: [Boot, Splash, Game]
    }
    game = new Phaser.Game(gameConfig);
}