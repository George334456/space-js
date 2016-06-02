function startGame() {
	var transition_menu = document.getElementById("end-level");
	transition_menu.parentNode.removeChild(transition_menu);

	// will add another function here when we start creating the game
}

/*Loads a level transition menu infront of the canvas*/
function loadLevel(level, score) {
	var main = document.getElementById("container");
	var level_str = "<span>Level " + level + "</span>";
	var score_str = "<span>Score: " + score + "</span>";

	//determine if it's last level 

	var button_str;
	var onclick_str;

	if (level == 1) {
		button_str = "Next";
		onclick_str = "startGame()" // placeholder for when we create this function
	} else {
		button_str = "Finish";
		onclick_str = "loadTitle()" // placeholder for title screen loader
	}

	var button = "<button onclick=\""+ onclick_str +"\">"+ button_str +"</button>";

	main.innerHTML = "<div id=\"end-level\">" +level_str + score_str + button + "</div>" + main.innerHTML;
}


//used for testing
window.onload = loadLevel(2, 200);