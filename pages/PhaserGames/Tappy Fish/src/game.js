var fish,ground,score,scoreBoard,groundMovement=1;
var pipes,gaps;
var timedPipes,timedDeath;

class Game extends Phaser.Scene{
	constructor(){
		super("Game");
	}
	create(){
		console.log("Game");
		
		this.physics.world.setBoundsCollision(true, false, false, false);
		this.add.image(0,0,'background').setOrigin(0);
		score=0;
		fish =this.physics.add.sprite(gameOptions.wcX-50,gameOptions.wcY,'fish').setOrigin(0.5).setScale(0.5).setData('swimming',false).setImmovable(false);
		fish.body.gravity.y=0;
		ground = this.add.tileSprite(0,gameOptions.appHeight-52,gameOptions.appWidth,104,'ground').setOrigin(0);

		this.physics.add.existing(ground, true);
		
		this.anims.create({
			key: 'tap',
			frames: this.anims.generateFrameNumbers('fish', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: 1
		});
		pipes = this.physics.add.group();
		gaps = this.physics.add.group();

		this.physics.add.collider(fish,ground,this.fishCollidesGround,null,this);
		this.physics.add.overlap(fish,pipes,this.fishCollidesPipe,null,this);
		this.physics.add.collider(fish,gaps,this.fishGetsPoints,null,this);
					
		
		this.input.on('pointerdown', function (pointer){
            if (!fish.getData('swimming')){
				fish.body.velocity.y=250;
				timedPipes=	this.time.addEvent({ delay: 2000, callback: this.addPipes, callbackScope: this, loop: true });
				groundMovement=1;
                fish.setData('swimming', true);
			}else{
				fish.anims.play('tap', true);
				fish.body.velocity.y*=-1;
			}
		}, this);	
		scoreBoard = this.add.bitmapText(gameOptions.wcX, 30, 'tappyFish', '0').setScale(0.5).setOrigin(0.5);	
	}
	update(){
		if(fish.getData('swimming')){			
			ground.tilePositionX+=groundMovement;
		}
		if(fish.y<0){
			timedDeath = this.time.delayedCall(5000, this.die, [], this);
		}
		if(fish.body.velocity.y<0 && fish.angle>-45){
			fish.angle--;
		}else if(fish.body.velocity.y>0 && fish.angle<45){
			fish.angle++;
		}
		
	}
	fishGetsPoints(_fish,_gap){
		_gap.destroy();
		score++;
		scoreBoard.setText(score);
	}
	addPipes(){
		var y = Phaser.Math.Between(120, gameOptions.appHeight-120);
		var topY=y-80;
		var bottomY=y+80;

		

		var bottomPipe = this.add.sprite(gameOptions.appWidth*1.25,bottomY,'pipe').setFrame(1).setOrigin(0);
		pipes.add(bottomPipe);
		this.physics.add.existing(bottomPipe,true);
		bottomPipe.checkWorldBounds = true;
		bottomPipe.outOfBoundsKill=true;


		var gap = this.add.line(gameOptions.appWidth*1.25+(bottomPipe.width/2),  topY, 1, 160, 0, 0).setOrigin(0);
		console.log("topY:"+topY+" bottomY:"+bottomY);
		gaps.add(gap);
		gap.body.allowGravity = false;	
		gap.visible = false;

		var topPipe = this.add.sprite(gameOptions.appWidth*1.25,topY,'pipe').setFrame(0).setOrigin(0,1);
		pipes.add(topPipe);
		this.physics.add.existing(topPipe,true);

		topPipe.checkWorldBounds = true;
		topPipe.outOfBoundsKill=true;
		gap.checkWorldBounds = true;
		gap.outOfBoundsKill=true;


		gaps.setVelocityX(-100,0);
		pipes.setVelocityX(-100,0);
		
	}
	fishCollidesPipe(fish,pipe){
		pipe.body.velocity.y=0;
		this.die();
		//timedDeath = this.time.delayedCall(5000, this.die, [], this);
		
	}
	fishCollidesGround(){
		
		this.die();
		this.time.addEvent({ delay: 2000, callback: this.resetPosition, callbackScope: this, loop: false });
		
	}
	resetPosition(){
		pipes.clear(true,true);
		gaps.clear(true,true);
		fish.setPosition(gameOptions.wcX-50,gameOptions.wcY);
		fish.setRotation(0);
		fish.body.gravity.y=0;
		score=0;
	}
	die(){
		if(fish.getData('swimming')){			
			fish.setData('swimming',false);
			fish.setVelocityX(0);
			fish.setVelocityY(0);
			fish.body.gravity.y=150;
			this.cameras.main.flash();			
			timedPipes.destroy();
			pipes.setVelocityX(0,0);
			gaps.setVelocityX(0,0);
			groundMovement=0;		
		}		
	}
}