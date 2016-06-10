var black_holes = [];

function Black_Hole(x,y, color){ //Constructor for the black hole object
	/*
	x is the center x-coordinate of the black hole
	y is the center y-coordinate of the black hole
	collide_x is the x-coordinate of the top left corner of the collision box
	collide_y is the y-coordinate of the top left corner of the collision box
	color is the color of the black hole.
	 */
	this.x = x;
	this.y = y;
	this.click_top = y-25;
	this.click_bottom = y + 25;
	this.click_left = x-25;
	this.click_right = x + 25;
	this.collide_top = y-50;
	this.collide_bottom = y + 50;
	this.collide_left = x-50;
	this.collide_right = x + 50;
	this.color = color;
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

function startGame() {
	var transition_menu = document.getElementById("end-level");
	transition_menu.parentNode.removeChild(transition_menu);

	var collide = false;
	var i = 0;
	while(i < 15){
		var x= Math.floor(900*Math.random()) + 50;//50 <= x <= 900
		var y = Math.floor(Math.random()*500)+90;//90 <= y <= 540; because of the top bar, we have to move our y down.
		var color = Math.floor(3*Math.random()); //0 = purple, 1 = blue, 2 = black
		var hole = new Black_Hole(x,y,color);
		for (var j = 0; j < black_holes.length; j++){
			if (NoCollision(black_holes[j], hole)){
				collide = false;
			}
			else{
				collide = true;
				break;
			}
		}
		if (collide){
			continue;
		}
		i++;
		drawBlackHole(hole);
	}
	//every 4 seconds level 1, change to every 2 seconds level 2.
	//info bar 40 px tall.
	//TODO: Click
	//TODO: Timed respawn
	//TODO: Don't spawn within same collision box
	var game = window.game;

	game.startLevel();
}

function drawBlackHole(hole){
	/*
	Draw based on the hole object
	 */
	var canvas = document.getElementById("space-canvas");
	var context = canvas.getContext("2d");
	switch(hole.color){
		case 0: context.fillStyle = "purple";
			break;
		case 1: context.fillStyle = "blue";
			break;
		case 2: context.fillStyle = "red";
			break;
	}
	context.beginPath();
	context.arc(hole.x,hole.y, 25, 0, 2* Math.PI, false);
	context.fill();
	context.strokeStyle = "white";
	context.stroke();
	context.fillStyle="black";
	context.beginPath();
	context.strokeRect(hole.click_left, hole.click_top,  50, 50);
	context.beginPath();
	context.strokeRect(hole.collide_left, hole.collide_top, 100,100);
	black_holes.push(hole);
}

function loadTitle(){

	var transition_menu = document.getElementById("end-level");

	if (transition_menu) {
		transition_menu.parentNode.removeChild(transition_menu);
	}


	loadLevel(0, 0); // second parameter should be taken from html storage, we will fix later

	//not sure why you did this below, just easlity call my load level function like above

	/*

	var c = document.getElementById("space-canvas");
	var ctx = c.getContext("2d");
	ctx.font = "20px Times New Roman"
	ctx.fillStyle="red";
	ctx.fillRect(40,40,100,100); //x,y,w,h
	ctx.fillText("Space Jam", 400,250);
	ctx.fillText("High Score", 390, 270);
	ctx.fillText("Start", 420,290)

	*/
}

/*Loads a level transition menu or title screen in front of the canvas*/
function loadLevel(level, score) {
	high_score = 0;
	var main = document.getElementById("container");
	var level_str = "<span>Level " + level + "</span>";
	var score_str = "<span>Score: " + score + "</span>";
	var title = "<span id=\"title\">Space Jam </span>";
	var high_score_str = "<span> High Score: " + high_score + "</span>";

	//determine if it's last level 

	var button_str;
	var onclick_str;
	if (level == 0) {
		button_str = "Start Game!"
		onclick_str = "startGame()"
		window.game = new GameManager();
	}
	else if (level == 1) {
		button_str = "Next";
		onclick_str = "startGame()"
	} else {
		button_str = "Finish";
		onclick_str = "loadTitle()" 
	}

	var button = "<button onclick=\"" + onclick_str + "\">" + button_str + "</button>";
	if (level > 0) {
		main.innerHTML = "<div id=\"end-level\">" + level_str + score_str + button + "</div>" + main.innerHTML;
	}
	else{
		main.innerHTML = "<div id = \"end-level\">" + title + high_score_str + button + "</div>" + main.innerHTML;
	}
}

//used for testing
//window.onload = startPage();
window.onload = loadTitle();
