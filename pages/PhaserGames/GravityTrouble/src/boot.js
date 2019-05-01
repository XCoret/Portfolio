var loadingText, progressBar, progressBox, loadingText, percentText;
class Boot extends Phaser.Scene{
    constructor(){
        super("Boot");
    }
    
    preload(){
        this.load.image('xcm','../assets/img/gravity_trouble/xcm.png');
        this.load.image('logo','../assets/img/gravity_trouble/logo.png');

        this.load.bitmapFont('gameplay','../assets/fonts/gameplay.png','../assets/fonts/gameplay.xml');

        this.load.image('enemy','../assets/img/gravity_trouble/enemyRed.png');		
		this.load.image('particle','../assets/img/gravity_trouble/particle2.png');	
        this.load.image('background','../assets/img/gravity_trouble/tileBackground.png');
        

        this.load.spritesheet('ship','../assets/img/gravity_trouble/ship.png',{frameWidth:150,frameHeight:170});
        this.load.spritesheet('hearts','../assets/img/gravity_trouble/hearts.png',{frameWidth:50,frameHeight:50});
    }
    create(){
        this.scene.start("Splash");
    }
}