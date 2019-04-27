var leftPaddle, rightPaddle,  userBoard,cpuBoard, ball;
var userScore=0,cpuScore=0,turn=1;

class Game extends Phaser.Scene{
	constructor(){
		super("Game");
	}
	create(){
		console.log("Game");
		this.physics.world.setBoundsCollision(false, false, true, true);
		var field = this.add.image(0,0,'field');
		field.setOrigin(0,0);
		field.width = gameOptions.appWidth;
		field.height = gameOptions.appHeight;

		leftPaddle = this.physics.add.image(30,gameOptions.wcY,'paddle').setImmovable();
		rightPaddle = this.physics.add.image(gameOptions.appWidth-30,gameOptions.wcY,'paddle').setImmovable();

		ball = this.physics.add.image(gameOptions.wcX,gameOptions.wcY,"ball").setScale(0.75).setCollideWorldBounds(true).setBounce(1);
		this.physics.add.collider(ball,leftPaddle,this.ballHitPaddle,null,this);
		this.physics.add.collider(ball,rightPaddle,null,null,this);
		ball.setData('ongoing',false);
		userBoard = this.add.bitmapText(gameOptions.wcX-50, 30, 'gameplay', '0').setScale(0.2).setOrigin(0.5);	
		cpuBoard = this.add.bitmapText(gameOptions.wcX+(50-userBoard.width), 30, 'gameplay', '0').setScale(0.2).setOrigin(0.5);
		this.input.on('pointerdown', function (pointer){
            if (!ball.getData('ongoing')){
                ball.setVelocity(turn*300, -75);
                ball.setData('ongoing', true);
			}
		}, this);		
	}
	update(){
		if(game.input.mousePointer.y>leftPaddle.height/2 && game.input.mousePointer.y<gameOptions.appHeight-(leftPaddle.height/2)){
			leftPaddle.y = game.input.mousePointer.y;
		}
		if(ball.x<0){
			cpuScore+=1;
			turn=-1;
			this.resetBall();
		}else if(ball.x>gameOptions.appWidth){
			userScore+=1;
			turn=1;
			this.resetBall();
		}
		var distY= 2*(ball.y - rightPaddle.y);
		rightPaddle.y += distY*0.05;
            if(rightPaddle.y <= rightPaddle.height/2){
                rightPaddle.y= rightPaddle.height/2;
            }else if(rightPaddle.y >=gameOptions.appHeight-(rightPaddle.height/2)){
                rightPaddle.y = gameOptions.appHeight-(rightPaddle.height/2);
            }
		
	}
	ballHitPaddle(ball,paddle){
		var diff = 0;
			if (ball.y< paddle.y)
			{
				diff = paddle.y - ball.y;
				ball.setVelocityY(-10 * diff);
			}
			else if (ball.y > paddle.y)
			{
				diff = ball.y -paddle.y;
				ball.setVelocityY(10 * diff);
			}
			else
			{
				ball.setVelocityY(2 + Math.random() * 8);
			}      
	}
	resetBall(){
		ball.setVelocity(0);
        ball.setPosition(gameOptions.wcX,gameOptions.wcY);
		ball.setData('ongoing', false);
		userBoard.setText(''+userScore);
		userBoard.setOrigin(0.5);
		cpuBoard.setText(''+cpuScore);		
		cpuBoard.setOrigin(0.5);
	}
}