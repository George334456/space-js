
function startGame() {
	var transition_menu = document.getElementById("end-level");
	transition_menu.parentNode.removeChild(transition_menu);

	// will add another function here when we start creating the game
}

function loadTitle(){

	var transition_menu = document.getElementById("end-level");
	transition_menu.parentNode.removeChild(transition_menu);


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
//window.onload = loadLevel(2, 200);