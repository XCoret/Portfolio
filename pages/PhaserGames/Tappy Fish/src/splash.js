var title;
class Splash extends Phaser.Scene{
	constructor(){
		super("Splash");
	}
	create(){
        this.add.image(0,0,'background').setOrigin(0);
        title = this.add.bitmapText(gameOptions.appWidth+100, gameOptions.wcY, 'tappyFish', 'Tappy Fish!');
        title.setOrigin(0.5,0.5);   
        title.setScale(0.5)		;
    }
    update(){
        if (title.x==gameOptions.wcX){
            console.log("Splash done!");
            this.timedEvent = this.time.delayedCall(1500, this.loadGame, [], this);
            
        }else{
            title.x-=2;
        }
    }
    loadGame(){
        this.scene.start("Game");
    }
}