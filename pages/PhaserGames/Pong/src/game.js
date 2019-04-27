var leftPaddle, rightPaddle, ball;
class Game extends Phaser.Scene{
	constructor(){
		super("Game");
	}
	create(){
		console.log("Game");

		leftPaddle = this.physics.add.sprite(this, 30, gameOptions.wcY, "paddle");
        rightPaddle = this.physics.add.sprite(this, gameOptions.appWidth-30, gameOptions.wcY, "paddle");

        
	}
}