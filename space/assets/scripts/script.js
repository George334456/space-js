var black_holes = [];

function black_hole(x,y, color){ //Constructor for the black hole object
	/*
	x is the center x-coordinate of the black hole
	y is the center y-coordinate of the black hole
	collide_x is the x-coordinate of the top left corner of the collision box
	collide_y is the y-coordinate of the top left corner of the collision box
	color is the color of the black hole.
	 */
	this.x = x;
	this.y = y;
	this.collide_x = x-50;
	this.collide_y = y - 50;
	this.color = color;
};

function startGame() {
	var transition_menu = document.getElementById("end-level");
	transition_menu.parentNode.removeChild(transition_menu);

	for (var i = 0; i < 3; i++){
		var x= Math.floor(900*Math.random()) + 50;//50 <= x <= 900
		var y = Math.floor(Math.random()*500)+90;//90 <= y <= 540; because of the top bar, we have to move our y down.
		var color = Math.floor(3*Math.random()); //0 = purple, 1 = blue, 2 = black
		makeBlackHole(color,x,y);
	}

	var game = window.game;

	game.startLevel();

}

function makeBlackHole(color, x, y){
	/*
	x is center x-coordinate of the circle
	y is center y-coordinate of the circle
	color is the color to fill with
	 */
	//draw the blackhole
	var canvas = document.getElementById("space-canvas");
	var context = canvas.getContext("2d");
	switch(color){
		case 0: context.fillStyle = "purple";
			break;
		case 1: context.fillStyle = "blue";
			break;
		case 2: context.fillStyle = "red";
			break;
	}
	context.beginPath();
	context.arc(x,y, 25, 0, 2* Math.PI, false);
	context.fill();
	context.strokeStyle = "white";
	context.stroke();
	var hole = black_hole(x,y,context.fillStyle);
	black_holes.push()
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
