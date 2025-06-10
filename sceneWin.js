var sceneWin = new Phaser.Class({
    Extends: Phaser.Scene,
  
    initialize: function () {
      Phaser.Scene.call(this, { key: "sceneWin" });
    },
  
    preload: function () {
      this.load.setBaseURL("asset_shooter/");
      this.load.image("BGPlay", "BGPlay.png");
      this.load.image("final", "final.png");
      this.load.image("ButtonMenu", "ButtonMenu.png");
      this.load.audio("snd_win", "fx_win.mp3");
    },
  
create: function (data) {
  const gameWidth = this.sys.game.canvas.width;
  const gameHeight = this.sys.game.canvas.height;

  X_POSITION = {
    LEFT: 0,
    CENTER: gameWidth / 2,
    RIGHT: gameWidth,
  };

  Y_POSITION = {
    TOP: 0,
    CENTER: gameHeight / 2,
    BOTTOM: gameHeight,
  };

  this.add.image(0, 0, "BGPlay").setOrigin(0);
  this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER - 200, "final")
    .setOrigin(0.5)
    .setScale(1)

  this.sound.add("snd_win").play();

  // Update high score in localStorage
  const finalScore = data.finalScore || 0;
  let highScore = parseInt(localStorage.getItem("highScore")) || 0;
  if (finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("highScore", highScore);
  }

  this.add.text(X_POSITION.CENTER, Y_POSITION.CENTER, "KAMU MENANG!", {
    fontFamily: "Verdana, Arial",
    fontSize: "60px",
    color: "#ffff00",
    stroke: "#000000",
    strokeThickness: 5,
  }).setOrigin(0.5);

  const buttonMenu = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER + 200, "ButtonMenu")
    .setInteractive()
    .setScale(0.8);  

  // Efek hover & klik
  buttonMenu.on("pointerover", () => {
    buttonMenu.setTint(0x999999);
  });
  
  buttonMenu.on("pointerout", () => {
    buttonMenu.clearTint();
  });
  
  buttonMenu.on("pointerdown", () => {
    buttonMenu.setTint(0x666666);
  });
  
  buttonMenu.on("pointerup", () => {
    buttonMenu.clearTint();
    this.scene.start("sceneMenu");
  });
  
},
  });
  