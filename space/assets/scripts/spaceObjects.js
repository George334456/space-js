/*SpaceObject Class: objects that consistently move across the 
	screen in a specified direction but can be destroyed by black hole objects */
var SpaceObject = function(x, y, type) {

	var horizontal_dir = Math.floor((Math.random() * 2) + 1);

	this.x_pos = x;
	this.y_pos = y;
	this.width = 50;
	this.height = 50;
	this.direction = undefined // randomize slope 
	this.types = [planet_draw, ship_draw, nebula_draw, satellite_draw];
	this.draw = this.types[type];

	if (horizontal_dir == 1) {
		this.speed_x = 2;
	} else {
		this.speed_x = -2;
	}
	
	this.speed_y = Math.floor((Math.random() * 3) + 0); // placeholder for now
	this.speed_y *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	
	
};

/*update the space objects new position*/
SpaceObject.prototype.updatePosition = function() {
	this.x_pos = this.x_pos + this.speed_x;
	this.y_pos = this.y_pos + this.speed_y;
}

/*This method will update the objects directional speed if it hits canvas*/
SpaceObject.prototype.Rebound = function() {
	if (this.x_pos - (this.width/2) <= 0 || this.x_pos + (this.width/2) >= 1000) {
		this.speed_x = this.speed_x * -1;
	}
	if (this.y_pos - (this.height/2) <= 0 || this.y_pos + (this.height/2) >= 640) {
		this.speed_y = this.speed_y * -1;
	}
};

function planet_draw() {
	window.ctx.fillStyle = "pink";
	window.ctx.fillRect(this.x_pos-(this.width/2), this.y_pos-(this.height/2), this.width, this.height);
}

function ship_draw() {
	window.ctx.fillStyle = "red";
	window.ctx.fillRect(this.x_pos-(this.width/2), this.y_pos-(this.height/2), this.width, this.height);
}

function nebula_draw() {
	window.ctx.fillStyle = "blue";
	window.ctx.fillRect(this.x_pos-(this.width/2), this.y_pos-(this.height/2), this.width, this.height);
}

function satellite_draw() {
	window.ctx.fillStyle = "green";
	window.ctx.fillRect(this.x_pos-(this.width/2), this.y_pos-(this.height/2), this.width, this.height);
}

//testing
function animate(array) {
	var c = document.getElementById("space-canvas");
	window.ctx.clearRect(0, 0, c.width, c.height);

	var len = array.length;

    for (i = 0; i < len; i++) {



	    var s = array[i];

	    s.Rebound();

	    s.updatePosition();


		// Always clear the canvas after drawing each frame
	    
	    
	    
	    s.draw();
	    //d.draw();
	}
    
    setTimeout(animate, 33, array);
    
} // window.onloa

window.onload = function() {

	var c = document.getElementById("space-canvas");
    window.ctx = c.getContext("2d"); // Dealing with a global context is easier

   	var s = new SpaceObject(50, 50, 0);
   	var d = new SpaceObject(250, 400, 1);
   	var o = new SpaceObject(500, 200, 3);

   	array = [];
   	array.push(s);
   	array.push(d);
   	array.push(o);


	animate(array);
};