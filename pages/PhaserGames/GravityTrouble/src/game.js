var deathGap, background, ship,enemies, enemy, powerup;
var lastX=0,maxLives=5,hearts=[],score,scoreboard;
var timedEnemies, timerImmunity,trickyTimer;

class Game extends Phaser.Scene{
    constructor(){
        super("Game");
    }
    create(){
        console.log("Game!");
        background = this.add.tileSprite(0,0,gameOptions.ww*2,gameOptions.wh*2,'background');
        background.setDepth(-1);
        var gap = this.add.line(-20,gameOptions.wh+30, gameOptions.ww+20, 2, 0, 0).setOrigin(0);
        this.physics.add.existing(gap,true);
		gap.body.allowGravity = false;	
        gap.visible = false;
        gap.immovable = true;        
        score = 0;
        this.displayShip();
        enemies = this.physics.add.group();
        scoreboard=this.add.bitmapText(30, 30, 'gameplay', '0').setScale(0.15).setOrigin(0.5);        
        timedEnemies=this.time.addEvent({ delay: 500, callback: this.addEnemies, callbackScope: this, loop: true });
        powerup = this.physics.add.sprite(-150,-150,'hearts').setFrame(1).setScale(0.4);
        this.physics.add.existing(powerup, true);
        this.physics.add.collider(ship,enemies,this.shipCollidesEnemy,null,this);
        this.physics.add.collider(gap,enemies,this.enemyOutOfBounds,null,this);
        this.physics.add.collider(ship,powerup,this.shipCollidesPowerUp,null,this);
        this.physics.add.collider(gap,powerup,this.resetPowerupPosition,null,this);
        this.input.on("pointerdown",this.onTap,this);
        this.updateLives();
    }
    update(){
        ship.y = gameOptions.shipY;
        background.tilePositionY--;  
    }
    displayShip(){
        ship = this.physics.add.sprite(gameOptions.wcX,gameOptions.shipY,'ship').setOrigin(0.5).setCollideWorldBounds(true).setData("flying",false).setData("lives",3);
        ship.body.setSize(60, 90, true);
        ship.setScale(0.4);
        this.anims.create({
            key:'fly',
            frames:this.anims.generateFrameNumbers('ship',{start:0,end:7}),
            frameRate:15,
            repeat:-1
        });
        this.anims.create({
            key:'immunity',
            frames:this.anims.generateFrameNumbers('ship',{start:8,end:15}),
            frameRate:15,
            repeat:-1
        });
        this.anims.create({
            key:'woundL',
            frames:this.anims.generateFrameNumbers('ship',{start:16,end:23}),
            frameRate:15,
            repeat:-1
        });
        this.anims.create({
            key:'woundR',
            frames:this.anims.generateFrameNumbers('ship',{start:24,end:31}),
            frameRate:15,
            repeat:-1
        });
        this.anims.create({
            key:'wounded',
            frames:this.anims.generateFrameNumbers('ship',{start:32,end:39}),
            frameRate:15,
            repeat:-1
        });
        ship.anims.play('fly',true);
        ship.setImmovable();
    }
    onTap(tap){
        if(!ship.getData("flying")){
            ship.setData("flying",true);            
        }
        if(tap.x<=gameOptions.wcX){
            ship.body.setVelocityX(-gameOptions.shipSpeedX);
        }else{
            ship.body.setVelocityX(gameOptions.shipSpeedX);   
        }
    }
    shipCollidesEnemy(_ship,_enemy){
        if(!ship.getData("immunity")){
            var live = ship.getData("lives")-1;
            ship.setData("lives",live);
            this.updateLives();
            if(live==0){
                this.scene.start("Game");
            }
        }        
        _enemy.destroy();
    }
    addEnemies(){
            score++;
            if(score%25==0){
                this.dropPowerUp();
            }            
            var randX = Phaser.Math.Between(0,gameOptions.ww);            
            var enemy = this.physics.add.sprite(0,0,'enemy').setOrigin(0.5).setScale(0.2);            
            while(randX<=enemy.width || randX>=gameOptions.ww-(enemy.width)){
                if(lastX!=null && (randX<lastX-enemy.width || randX>lastX+enemy.width)){
                    randX = Phaser.Math.Between(0,gameOptions.ww);
                }else{
                    randX = Phaser.Math.Between(0,gameOptions.ww);
                }
            }            
            enemies.add(enemy);
            if(score%3==0){
                enemy.x=ship.x;
            }else{
                enemy.x=randX;
            }            
            enemy.y = 0-enemy.height;
            enemy.body.velocity.y=gameOptions.enemySpeed+Math.floor(Math.random() * 20) + 10;  
            scoreboard.setText(""+score);         
    }
    enemyOutOfBounds(_gap,_enemy){
        _enemy.destroy();
    }
    updateLives(){
        if(hearts.length>0){
            hearts.forEach(function(element){
                element.destroy();
            },this);
        }
        for(var i=0; i<ship.getData("lives");i++){
            var heart = this.add.sprite(0,30,'hearts');
            heart.setScale(0.35);
            heart.x = gameOptions.ww-40-(heart.width*i)/2.5;
            if(ship.getData("immunity")){
                heart.setFrame(1);
            }else{
                heart.setFrame(0);
            }
            hearts.push(heart);
        }
        switch (ship.getData("lives")) {
            case 2:
                var side = Math.random() < 0.5;
                if(side){
                    ship.anims.play("woundL");
                }else{
                    ship.anims.play("woundR");
                }
            break;
            case 1:
                ship.anims.play("wounded");
            break;
            default:
                if(!ship.getData("immunity")){
                    ship.anims.play("fly");
                }else{
                    ship.anims.play("immunity");
                }
            break;
        }
    }
    dropPowerUp(){
        powerup.x=ship.x;
        powerup.y=-20;
        powerup.body.velocity.y = gameOptions.powerupY;  
        powerup.body.velocity.x = 0; 
        console.log(gameOptions.shipSpeedX/3);
    }
    resetPowerupPosition(){
        powerup.body.velocity.y=0;
        powerup.x=-150;
        powerup.y=-150;
    }
    shipCollidesPowerUp(_ship,_powerup){
        this.resetPowerupPosition();
        var live = ship.getData("lives")+1;
        if(live<maxLives){
            ship.setData("lives",live);
        }else{
            if(ship.getData("immunity")){
                score+=50;
            }else{
                ship.setData("immunity",true);
                timerImmunity=this.time.addEvent({ delay: 5000, callback: this.toggleImmunity, callbackScope: this, loop: false });
            }
        }
        this.updateLives();
    }
    toggleImmunity(){
        ship.setData("immunity",false);
        this.updateLives();
    }
}