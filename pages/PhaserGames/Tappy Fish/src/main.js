var game;
var gameOptions={
    appHeight:512,
	appWidth:288,
    wcX:144,
    wcY:256
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
                debug: false,
                gravity:{
                    y:-400
                },
            }
        },
        scene:[Boot,Splash,Game]
    }
    game = new Phaser.Game(gameConfig);    
}

