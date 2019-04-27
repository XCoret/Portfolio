var game;
var gameOptions={
    appWidth:640,
	appHeight:360,
    wcX:320,
    wcY:180
}
window.onload = function(){
    var gameConfig = {
		parent:"game",
        type: Phaser.AUTO,
        width:gameOptions.appWidth,
        height:gameOptions.appHeight,
        backgroundColor:0x000000,
        physics:{
            default:"arcade",
            arcade:{
                debug: true,
                gravity:{
                    y:0
                },
            }
        },
        scene:[Boot,Splash,Menu,Game]
    }
    game = new Phaser.Game(gameConfig);    
}

