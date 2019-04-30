class Boot extends Phaser.Scene{
	constructor(){
		super("Boot");
	}
	preload(){
		this.load.spritesheet('fish','../assets/img/tappy_fish/fish.png',{frameWidth:70,frameHeight:70});
		this.load.image("background","../assets/img/tappy_fish/bg.png");
		this.load.image("ground","../assets/img/tappy_fish/ground.png");
		this.load.spritesheet('pipe', 
        '../assets/img/tappy_fish/pipes.png',
        { frameWidth: 52, frameHeight: 640 });
		this.load.bitmapFont("tappyFish","../assets/fonts/tappyFish.png","../assets/fonts/tappyFish.xml");
		
	}
	create(){
		console.log("Boot done!");
		this.scene.start("Splash");
	}
}