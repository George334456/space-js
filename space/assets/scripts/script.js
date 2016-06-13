
function startGame() {
	var transition_menu = document.getElementById("end-level");
	transition_menu.parentNode.removeChild(transition_menu);
	
	var game = window.game;

	game.startLevel();
}

function loadTitle(){

	var transition_menu = document.getElementById("end-level");

	if (transition_menu) {
		transition_menu.parentNode.removeChild(transition_menu);
	}


	loadLevel(0, 0); // second parameter should be taken from html storage, we will fix later

	//not sure why you did this below, just easlity call my load level function like above

}

/*Loads a level transition menu or title screen in front of the canvas*/
function loadLevel(level, score) {
	var high_score = [];
	if (typeof(Storage) !== "undefined") {
		for (var i = 0; i < 3; i ++) {
			var str = "highscore" + i;
			high_score[i] = localStorage.getItem(str);
		}
	}
	else{
		for(var i = 0; i < 3; i++) {
			high_score[i] = 0;
		}
	}

	var main = document.getElementById("container");
	var level_str = "<span>Level " + level + "</span>";
	var score_str = "<span>Score: " + score + "</span>";
	var title = "<span id=\"title\">Space Jam </span>";
	var high_score_str = "<span id = \"highscore\"> High Scores: ";
	for (var i = 0; i < 3; i++){
		if (high_score[i] === null || high_score[i] === 0)
			high_score_str += "0";
		else{
			high_score_str += high_score[i];
		}
		if(i !== 2){
			high_score_str += ", ";
		}
	}
	high_score_str +="</span>"
	//var high_score_str = "<span id = \"highscore\"> High Score: " + high_score + "</span>";

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
