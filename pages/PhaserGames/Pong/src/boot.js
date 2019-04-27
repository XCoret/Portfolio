class Boot extends Phaser.Scene{
	constructor(){
		super("Boot");
	}
	preload(){
		this.load.image("ball","../assets/img/pong/ball.png");
		this.load.image("paddle","../assets/img/pong/paddle.png");
		this.load.image("field","../assets/img/pong/field.png");
		
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