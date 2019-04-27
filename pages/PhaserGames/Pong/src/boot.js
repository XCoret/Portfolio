class Boot extends Phaser.Scene{
	constructor(){
		super("Boot");
	}
	preload(){
		this.load.image("ball","../assets/img/pongBall.png");
		this.load.image("paddle","../assets/img/pongPaddle.png");
		
		this.load.spritesheet('button', 
        '../assets/img/button.png',
        { frameWidth: 330, frameHeight: 130 }
    );

		this.load.bitmapFont("gameplay","../assets/fonts/gameplay.png","../assets/fonts/gameplay.xml");
		
	}
	create(){
		console.log("Boot done!");
		this.scene.start("Splash");
	}
}