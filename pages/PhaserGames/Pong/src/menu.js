class Menu extends Phaser.Scene{
	constructor(){
		super("Menu");
	}
	create(){
		console.log("menu");
		var bg = this.add.sprite(gameOptions.wcX,gameOptions.wcY,'button');

		var playBtn = this.add.bitmapText(gameOptions.wcX, gameOptions.wcY, 'gameplay', 'Play');
		playBtn.setOrigin(0.5,0.5);   		
		playBtn.setScale(0.5);

		playBtn.setInteractive()
		.on('pointerover', () => { bg.setFrame(1); playBtn.tint=0x000000; })
		.on('pointerout', () => { bg.setFrame(0); playBtn.tint=0xffffff; })
		.on('pointerdown', () =>{ this.scene.start("Game"); });
		

        
	}
}