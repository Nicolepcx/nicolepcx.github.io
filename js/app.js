//Game class.
var Game = function() {

// Enimies minimum speed.
  this.min_Enemy_Speed = 50;

// Enimies maximum speed.
  this.max_Enemy_Speed = 600;

// Game score start
  this.score = 0;

// avaiable life's
  this.life = 5;

//Set the game to stop or continue (boolean).
  this.stop = false;

//Enimies in the game (Array).
  this.all_Enemies = [];

// Initializes enimies.
  this.init_Enemies();
  // Initialize a new player.
  this.player = new Player();
  // Initialize player helpers.
  this.player_Helper = new player_Helper();
  // Assign "this" to new var "that" to use the object in a nested "keyup" function below.
  var that = this;

// Use keyboard to move player in the game.
  document.addEventListener("keyup", function(e) {
    var allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
    that.player.handleInput(allowedKeys[e.keyCode]);
  });
};

// Initialize enemy objects and put them into the all_Enemies array.
Game.prototype.init_Enemies = function() {
  // Initialize four enemies on each row.
  // Loop through four enemy rows.
  for (var i = 0; i < 4; i++) {
    var enemy = new Enemy();
  // Return random numbers between min_Enemy_Speed and max_Enemy_Speed.
    enemy.speed = Math.floor(Math.random()*this.max_Enemy_Speed + this.min_Enemy_Speed);
  // Push each enemy to all_Enemies array.
    this.all_Enemies.push(enemy);
  }
};

// Check if there are collisions between the player and enemies.
Game.prototype.checkCollisions = function() {
  for (var i = 0; i < this.all_Enemies.length; i++) {
    if (Math.abs(this.player.x - this.all_Enemies[i].x) < 50 && Math.abs(this.player.y - this.all_Enemies[i].y) < 50) {
      // If player is hit, reset player position.
      this.player.reset();
      if (this.life > 0) {
        // If player"s life is more than 0, subtract one life.
        this.life --;
        // Update life.
        document.getElementById("life").innerHTML = "Life: " + this.life;
      }
    }
  }
};

// Change stats or enemies behavior after player collect items, and update stats.
Game.prototype.checkplayer_Helpers = function() {
  // If the player collect an item.
  if (Math.abs(this.player.x - this.player_Helper.x) < 50 && Math.abs(this.player.y - this.player_Helper.y) < 50) {
    // If the player collects a heart, add one life.
    if (this.player_Helper.sprite == "images/Heart.png") {
      this.life ++;
      document.getElementById("life").innerHTML = "Life: " + this.life;
    // If the player collects a star, slow enemies speed for one second.
    } else if (this.player_Helper.sprite == "images/Star.png") {
      // Save enemies original speed.
      var originalEnemySpeeds = new Array(3);
      var all_Enemies = this.all_Enemies;
      // Slow each enemies speed.
      for (var i = 0; i < all_Enemies.length; i++) {
        originalEnemySpeeds[i] = all_Enemies[i].speed;
        all_Enemies[i].speed = all_Enemies[i].speed / 3;
      }
      // Change back to original speed after one second.
      setTimeout(function() {
        for (var i = 0; i < originalEnemySpeeds.length; i++) {
          all_Enemies[i].speed = originalEnemySpeeds[i];
        }
      }, 1000);
    // If the player collects a green gem, add two points.
    } else if (this.player_Helper.sprite == "images/Gem Green.png") {
      this.score += 2;
      document.getElementById("score").innerHTML = "Score: " + this.score;
    // If the player collects a orange gem, add four points.
    } else if (this.player_Helper.sprite == "images/Gem Orange.png") {
      this.score += 4;
      document.getElementById("score").innerHTML = "Score: " + this.score;
    // If the player collects a rock, it will lose one life.
    } else if (this.player_Helper.sprite == "images/Rock.png") {
      this.life --;
      document.getElementById("life").innerHTML = "Life: " + this.life;
    }
    // Once the player hit the helpers, move the helper off the screen.
    this.player_Helper.x = -100;
    this.player_Helper.y = -100;
  }
};

/**
 * Check if player hit water or reach destination.
 * If player hit water, reset the player location, player will lose one life.
 * If player reach destination, increase score.
 */
Game.prototype.checkDestination = function() {
  if (this.player.y < 0) {
    if ((this.player.x > 10 && this.player.x < 200) || (this.player.x > 200 && this.player.x < 400)) {
      this.player.reset();
      this.score ++;
      document.getElementById("score").innerHTML = "Score: " + this.score;
    } else {
      this.player.reset();
      this.life --;
      document.getElementById("life").innerHTML = "Life: " + this.life;
    }
  }
};

/**
 * Check if the game needs to be stopped.
 * If total life is zero, the game will stop.
 */
Game.prototype.render = function() {
  if(this.life === 0){
    this.stop = true;
    this.gameOver();
  }
};

// Game Messages
Game.prototype.gameOver = function() {
  var gameBoard = document.getElementById("game-board");
  gameBoard.parentNode.removeChild(gameBoard);
  var gameOverMessage = document.getElementById("gameOver-message");
  var zeroLifeMessage = "GAME OVER! " + "<br>" + "<br>";
  var gameScoreMessage = "Your score is: " + game.score;
  // If life is zero, display zero life message; if run out of time, display the score.
  if (this.life === 0){
    gameOverMessage.innerHTML = zeroLifeMessage + gameScoreMessage;
  } else {
    gameOverMessage.innerHTML = zeroLifeMessage + gameScoreMessage;
  }
};

/**
* Enemy class.
* Constructs an enemy in the game.
*/
var Enemy = function() {
  /**
   * Enemies all y position values.
   * @type {Array.<number>}
   */
  this.enemyY = [60,145,230,315];
  /**
   * Enemies x position values.
   * @type {number}
   */
  this.x = -101;
  // Enemies randomnized y position values.
  this.y = this.enemyY[Math.round(Math.random()*3)];
  this.speed;
// Load enemy's image.
  this.sprite = "images/enemy-bug.png";
};
// Update enemy position.
Enemy.prototype.update = function(dt) {
  // Move enemy
  this.x += this.speed * dt;
  // If the enemies move off the screen, restart them at one block (101px)
  // right before the start of the screen.
  if (this.x > 500) {
    this.x = -101;
    // Randomnize enemies y value every time enemy move off
    // the screen and start from the begining again.
    this.y = this.enemyY[Math.round(Math.random()*4)];
  }
};

// Renders and draws the enemy on the screen.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Item class.
 * Constructs item that player can collect during the game.
 */
var Item = function(){
  // Item's all x position values.
  this.itemX = [0,100,200,300,400];
  // Item's all y position values.
  this.itemY = [80,160,240,320];
  // Item's x position value.
  this.x = this.startPosX();
  // Item's y position value.
  this.y = this.startPosY();
};

// Set the x position value of the item.
Item.prototype.startPosX = function() {
  var startX = this.itemX[Math.round(Math.random()*this.itemX.length)];
  return startX;
};

// Set the y position value of the item.
Item.prototype.startPosY = function() {
  var startY = this.itemY[Math.round(Math.random()*this.itemY.length)];
  return startY;
};

// Update item's position.
Item.prototype.update = function(dt) {
  this.x*dt;
  this.y*dt;
};

// Reset item's position.
Item.prototype.reset = function() {
  this.x = this.startPosX();
  this.y = this.startPosY();
};

// Renders and draws an item in the game.
Item.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * player_Helper class.
 * Constructs an helper item that player can collect during the game.
 */
var player_Helper = function() {
  Item.call(this);
  this.loadNewHelper();
  this.reset();
};
// player_Helper inherites item.
player_Helper.prototype = Object.create(Item.prototype);
// Set player_Helper constructor.
player_Helper.prototype.constructor = player_Helper;
// Loads an random new helper item.
player_Helper.prototype.loadNewHelper = function() {
  this.spriteOptions = ["images/Rock.png","images/Rock.png","images/Rock.png","images/Heart.png","images/Star.png", "images/Gem Green.png", "images/Gem Orange.png"];
  this.sprite = this.spriteOptions[Math.floor(Math.random()*this.spriteOptions.length)];
};
// Renders and draws a new helper item.
player_Helper.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Reset helper item's position every five seconds.
player_Helper.prototype.reset = function() {
  var that = this;
  // Move the helper off the screen.
  that.x = -100;
  that.y = -100;
  setInterval(function() {
    that.loadNewHelper();
    Item.prototype.reset.call(that);
  }, 5000);
};
// Player class, constructs a player.
var Player = function() {
  this.sprite = "images/char-pink-girl.png";
  this.x = 200;
  this.y = 400;
};

// Update player's position.
Player.prototype.update = function(dt) {
};

// Reset player's position.
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// Renders and draws a player in the game.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles pressed keyboard events.
Player.prototype.handleInput = function(key) {
  switch(key) {
    case "left": {
      if (this.x > 0)
        this.x -= 100;
      break;
    }
    case "up": {
      if (this.y > 0)
        this.y -= 90;
      break;
    }
    case "right": {
      if (this.x < 400)
        this.x += 100;
      break;
    }
    case "down": {
      if (this.y < 375)
        this.y += 90;
      break;
    }
    default:
      return;
  }
};