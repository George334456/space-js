var GameManager = function() {
	this.level = 0;
	this.state = "start";
	this.score = 200;
	this.spaceObjectArray = [];
	this.time = undefined;
	this.width = document.getElementById("space-canvas").width;
	this.height = document.getElementById("space-canvas").height;
	this.mouse_x = undefined;
	this.mouse_y = undefined;
	this.timer_inter = undefined;

};

GameManager.prototype.startLevel = function() {
	
	var c = document.getElementById("space-canvas");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier

    this.spaceObjectArray = [];
    array = this.spaceObjectArray;

    this.level += 1;
    this.time = 60;

    var game = this;

    c.addEventListener("mousemove", function(event) {
    	setMousePos(event, game, this);
    });

    c.addEventListener("click", function(event) {
    	checkPause(event, game, this);
    });

    for (var i = 0; i < 10; i++) {
  		
  		array.push(spawnSpaceObject());


  	}

  	// creates timer
  	this.timer_inter = setInterval(timer, 1000, this);

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
	ctx.fillText("level: " + game.level, 50, 25);

	//score
	ctx.font = "16px Arial";
	ctx.fillStyle = "#ff00ff";
	ctx.fillText("level: " + game.score, 350, 25);

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

	if (game.state == "pause") {
		pauseOverlay();
	}
    
	if (game.time == 0) {
		clearInterval(game.timer_inter);
		window.ctx.clearRect(0, 0, c.width, c.height);
		loadLevel(game.level, game.score);
	} else {
    	setTimeout(animate, 33, game);
    }
}

function timer(game) {

	if (game.state == "start") {
		game.time -= 1;
	}
	
}