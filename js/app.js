// Enemies our player must avoid
var Enemy = function(x , y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = dt * 250;
    this.x+= this.speed;
    if( this.x >= 500 ){
        this.reset();
    }
    //Handle Collisions
    if( player.x >= this.x -55 && player.x <=this.x + 55 ){
        if( player.y >= this.y -55 && player.y <=  this.y+55 ){
            player.x = 200;
            player.y = 400;
            player.level = 1;
        }
    }
    
};
Enemy.prototype.reset = function(){
    //reset the enimeis to their initial state
    this.x = this.initX;
    this.y = this.initY;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function(x , y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
    this.level = 1;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


//player who play the game
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = dt * 45;
    //check if the player reach to the top of game (water-stone)
    if(this.y <= -45 ){
        //reset the game 
        this.reset();
        //increase level by one
        this.level++;
    }
    //check if the player won all three levels , then , then r
    if(this.level>3){
        //make full opacity of something on html with winner class at 3 seconds
        document.querySelector('.winner').style.opacity = '1';
        setTimeout( function(){document.querySelector('.winner').style.opacity = '0' }, 3000 );
        //reset the level to one
        this.level=1;
    }
        
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//reset the player to its initial state
Player.prototype.reset = function(){
    this.x = this.initX;
    this.y = this.initY;
};

//method that process movement of the player
Player.prototype.handleInput = function(input) {
    if(input=== 'left' && this.x > 20){
        this.x = this.x - 40;
    }
    if(input=== 'right' && this.x < 400){
        this.x = this.x + 40;
    }
    if(input === 'up' && this.y > -50){
        this.y = this.y - 40;
    }
    if(input === 'down' && this.y < 400){
        this.y = this.y + 40;
    }
}

// Now instantiate your objects.
var enemy1 = new Enemy(-100 ,60);
var enemy2 = new Enemy(-900,60);
var enemy3 = new Enemy(-165,140);
var enemy4 = new Enemy(-500,140);
var enemy5 = new Enemy(-400,220);
var player1 = new Player(200,400);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1 , enemy2 , enemy3 , enemy4,enemy5];
// Place the player object in a variable called player
const player = player1;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
