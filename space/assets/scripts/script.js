var black_holes = [];
function startGame() {
	var transition_menu = document.getElementById("end-level");
	transition_menu.parentNode.removeChild(transition_menu);

	var main = document.getElementById("container");
	var draw = document.getElementById("drawing");


	// var black = "<g> <circle cx=\"50\" cy=\"50\" r=\"25\" fill =\"red\" " +
	// 	"stroke=\"blue\" stroke-width = \"1\"/> <rect class=\"btn\" x=\"25\" y=\"25\" width=\"50\" height=\"50\" onclick=\"alert('click!')\" /> </g> ";
	var black = "<circle cx=\"50\" cy=\"50\" r=\"25\" fill =\"red\" " +
		"stroke=\"blue\" stroke-width = \"1\"/>";
	var blue = "<svg width = \"1000\" height = \"640\"> <circle cx=\"500\" cy=\"500\" r=\"25\" fill =\"blue\" " +
		"stroke=\"blue\" stroke-width = \"1\"/> </svg>";
	var purple = "<svg width = \"1000\" height = \"640\"> <circle cx=\"350\" cy=\"350\" r=\"25\" fill =\"purple\" " +
		"stroke=\"blue\" stroke-width = \"1\"/> </svg>";
	for (var i = 0; i < 3; i++){
		var x= Math.floor(850*Math.random()) + 50;//50 <= x <= 900
		var y = Math.floor(Math.random()*450)+90;//90 <= y <= 540; because of the top bar, we have to move our y down.
		var color = Math.floor(2*Math.random()); //0 = purple, 1 = blue, 2 = black
		draw.innerHTML = draw.innerHTML + makeBlackHole(color,x,y);
	}
	//draw.innerHTML = black + draw.innerHTML;
	//every 4 seconds level 1, change to every 2 seconds level 2.
	//info bar 40 px tall.
	// will add another function here when we start creating the game
}

function makeBlackHole(color, x, y){
	var returnString;
	switch(color){
		case 0://purple
			returnString = "<g> <circle cx=\""+ x +"\" cy=\""+ y +"\" r=\"25\" fill =\"purple\" " +
				"stroke=\"blue\" stroke-width = \"1\"/> <rect class=\"btn\" x=\""+x+"\" y=\""+y+"\" width=\"50\" " +
				"height=\"50\" onclick=\"alert('click!')\" /> </g> ";
			break;
		case 1: //blue
			returnString = "<g> <circle cx=\""+ x +"\" cy=\""+ y +"\" r=\"25\" fill =\"blue\" " +
				"stroke=\"blue\" stroke-width = \"1\"/> <rect class=\"btn\" x=\""+x+"\" y=\""+y+"\" width=\"50\" " +
				"height=\"50\" onclick=\"alert('click!')\" /> </g> ";
			break;
		case 2: //black
			returnString = "<g> <circle cx=\""+ x +"\" cy=\""+ y +"\" r=\"25\" fill =\"red\" " +
				"stroke=\"blue\" stroke-width = \"1\"/> <rect class=\"btn\" x=\""+x+"\" y=\""+y+"\" width=\"50\" " +
				"height=\"50\" onclick=\"alert('click!')\" /> </g> ";
			break;

	}
	return returnString;
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
	var title = "<span>Space Jam </span>";
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
window.onload = loadLevel(2, 200);