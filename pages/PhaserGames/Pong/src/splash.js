var title;
class Splash extends Phaser.Scene{
	constructor(){
		super("Splash");
	}
	create(){
        title = this.add.bitmapText(gameOptions.wcX, gameOptions.appHeight+50, 'gameplay', 'Pong!');
        title.setOrigin(0.5,0.5);   		
    }
    update(){
        if (title.y==gameOptions.wcY){
            console.log("Splash done!");
            this.scene.start("Game");
        }else{
            title.y-=2;
        }
    }
}