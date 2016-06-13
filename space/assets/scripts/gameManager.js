
var GameState;

var GameManager = function() {
	this.level = 0;
	this.state = "start";
	this.score = 200;
	this.spaceObjectArray = [];
	this.blackHoleArray = [];
	this.time = undefined;
	this.width = document.getElementById("space-canvas").width;
	this.height = document.getElementById("space-canvas").height;
	this.mouse_x = undefined;
	this.mouse_y = undefined;
	this.timer_inter = undefined;
	this.space_inter = undefined;

};

GameManager.prototype.startLevel = function() {
	
	var c = document.getElementById("space-canvas");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier

    this.spaceObjectArray = [];
	this.blackHoleArray = [];
	array = this.spaceObjectArray;

    this.level += 1;
    this.time = 60;

    var game = this;

    c.addEventListener("mousemove", function(event) {
    	setMousePos(event, game, this);
    });

    c.addEventListener("click", function(event) {
    	checkPause(event, game, this);
		checkHole(event,game,this);
    });
    //
	// c.addEventListener("click",function(event){
	// 	checkHole(event, game, this);
	// });

    for (var i = 0; i < 10; i++) {

  		array.push(spawnSpaceObject());


  	}

	var collide = false;
	var i = 0;

  	// creates timer
  	this.timer_inter = setInterval(timer, 1000, this);
	if (this.level == 1) {
		//Set the spawn rate to once every 4 seconds.
		this.space_inter = setInterval(spawnBlackHole, 4000, game);
	}
	else if (this.level == 2){
		//Set the spawn rate to once every 2 seconds.
		this.space_inter = setInterval(spawnBlackHole, 2000, game);
	}

	animate(this);
};

// private function for event handler for moving mouse
function setMousePos(event, game, canvas) {
	var rect = canvas.getBoundingClientRect();

    game.mouse_x = event.clientX - rect.left;
    game.mouse_y = event.clientY - rect.top;
}

function checkPause(event, game, canvas) {
	setMousePos(event, game, canvas);
	if (650 >= game.mouse_x && game.mouse_x >= 600 && 30 >= game.mouse_y && game.mouse_y >= 10) {
		if (game.state == "start") {
			game.state = "pause";
			
		} else {
			game.state = "start";

		}
		
	}

}

function checkHole(event,game,canvas){
	setMousePos(event, game, canvas);
	if (game.blackHoleArray.length == undefined)
	{
		return;
	}
	for (var i = 0; i < game.blackHoleArray.length; i++){
		if (isClicked(game.blackHoleArray[i],game.mouse_x, game.mouse_y)){
			clearHole(game.blackHoleArray[i]);
			switch(game.blackHoleArray[i].color){
				case 0: //Colored purple.
					game.score += 10;
					break;
				case 1: //Colored blue.
					game.score += 5;
					break;
				case 2: //colored black/red at the moment.
					game.score += 20;
					break;
			}
			game.blackHoleArray.splice(i,1); //Remove at position i.
		}
	}
}


//pause overlay
function pauseOverlay() {
	var ctx = window.ctx;

	// background
	ctx.beginPath();
	ctx.rect(0, 40, game.width, game.height);
	ctx.fillStyle = "rgba(150, 150, 150, 0.3)";
	ctx.fill();
	ctx.closePath();

	//message Box
	ctx.beginPath();
	ctx.rect(380, 200, game.width/4, game.height/4);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fill();
	ctx.closePath();

	//pause title
	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.font = "24px Arial";
	ctx.fillText("Paused", 460, 250);
	ctx.closePath();

	//pause message
	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.font = "18px Arial";
	ctx.fillText("Click Pause Button", 425, 280);
	ctx.fillText("again to Resume", 430, 300);
	ctx.closePath();


}

// private function used to create the top HUD elements of the game
function createHUD(game) {
	var ctx = window.ctx;
	

	// box
	ctx.beginPath();
	ctx.strokeStyle = "#ff00ff";
	ctx.lineWidth = 2;
	ctx.moveTo(0, 40);
	ctx.lineTo(game.width, 40);
	ctx.closePath();
	ctx.stroke();

	// pause button
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.rect(600, 10, 50, 20);
	if (650 >= game.mouse_x && game.mouse_x >= 600 && 30 >= game.mouse_y && game.mouse_y >= 10 ) {
		ctx.fillStyle = "#ff00ff";
		ctx.strokeStyle = "white";
		ctx.fill();
	} else {
		ctx.strokeStyle = "#ff00ff";
	}
	ctx.closePath();
	ctx.stroke()

	//pause text
	ctx.lineWidth = 1;
	ctx.font = "12px Arial";
	ctx
	ctx.strokeText("Pause", 608, 25);

	//level
	ctx.font = "16px Arial";
	ctx.fillStyle = "#ff00ff";
	ctx.fillText("Level: " + game.level, 50, 25);

	//score
	ctx.font = "16px Arial";
	ctx.fillStyle = "#ff00ff";
	ctx.fillText("Score: " + game.score, 350, 25);

	//timer
	ctx.fillText("Timer: " + game.time, 700, 25);
}

// private helper function used to create space Objects at certain spawn points
function spawnSpaceObject() {
	var temp = new SpaceObject(0,0,0);

	var x_pos = Math.floor((Math.random()*900) + temp.width/2);
	var y_pos = Math.floor((Math.random()*540) + 42 + temp.width/2);
	var type = Math.floor((Math.random()*4));

	return new SpaceObject(x_pos, y_pos, type);
}

//Spawns a black hole and pushes it into the array if there does not exist a collision.
function spawnBlackHole(game){


	var collide = false;
	if(game.state == "pause" || game.blackHoleArray.length >= 15){
		//cap the number of black holes available to spawn to 15.
		return;
	}
	var color_selector = Math.floor(Math.random()*100);
	var color;
	if (color_selector < 50){
		color = 1; //blue, common, 50%
	}
	else if (color_selector < 85){
		color = 0; //purple, second rarest. 30%
	}
	else{
		color = 2; // black, rarest. 20%
	}
	while (true) {
		//Checking for collision. If there doesn't exist one a collision, we push to the array.
		var x = Math.floor(900 * Math.random()) + 50;//50 <= x <= 900
		var y = Math.floor(Math.random() * 500) + 90;//90 <= y <= 540; because of the top bar, we have to move our y down.
		//var color = Math.floor(3 * Math.random()); //0 = purple, 1 = blue, 2 = black
		var hole = new Black_Hole(x, y, color);
		for (var j = 0; j < game.blackHoleArray.length; j++) {
			if (NoCollision(game.blackHoleArray[j], hole)) {
				collide = false;

			}
			else {
				collide = true;
				break;
			}
		}
		if (collide) {
			continue;
		}
		game.blackHoleArray.push(hole);
		//console.log(hole.color);
		return;
	}
}

// private function used by the gameManager in order to draw frames
function animate(game) {
	var c = document.getElementById("space-canvas");
	window.ctx.clearRect(0, 0, c.width, c.height);

	createHUD(game);

	

	var len = game.spaceObjectArray.length;
	var s;

    for (i = 0; i < len; i++) {



	    s = array[i];



	    // move objects only if game state is in start
	    if (game.state == "start") {

	    	s.updatePosition();
	    	s.Rebound();
	    }

	    s.draw();


	}

	//loop through all the existing black holes and draw them.
	for (i = 0 ; i < game.blackHoleArray.length; i++){
		drawHole(game.blackHoleArray[i]);
		game.blackHoleArray[i].pull(game.spaceObjectArray, game);
	}

	if (game.state == "pause") {
		pauseOverlay();
	}
    
	if (game.time == 0) {
		clearInterval(game.timer_inter);
		clearInterval(game.space_inter);
		window.ctx.clearRect(0, 0, c.width, c.height);
		if (game.level == 2){
			for (var i = 0; i< 3; i++){
				var str_high_score = "highscore" + i;
				if (localStorage.getItem(str_high_score) === null){
					localStorage.setItem(str_high_score, game.score);
					break;
				}
				else{
					if (game.score > parseInt(localStorage.getItem(str_high_score))){
						localStorage.setItem(str_high_score,game.score);
					}
					continue;
				}
			}
		}
		loadLevel(game.level, game.score);
	} else {
    	setTimeout(animate, 33, game);
    }
}

function NoCollision(ExistingHole, CreatedHole){
	/*
	 Returns if is no collision between the ExistingHole and the CreatedHole
	 */
	return (CreatedHole.collide_left > ExistingHole.collide_right)
		|| (CreatedHole.collide_right < ExistingHole.collide_left)
		|| (CreatedHole.collide_bottom < ExistingHole.collide_top)
		|| (CreatedHole.collide_top > ExistingHole.collide_bottom);
}

function isClicked(hole, x, y){
	/*
	Determines if the hole is clicked with at mouse coordinate (x,y)
	 */
	return (x < hole.click_right) && (x > hole.click_left) && (y < hole.click_bottom) && (y > hole.click_top);
}

function timer(game) {

	if (game.state == "start") {
		game.time -= 1;
	}
	
}


