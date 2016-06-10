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

	if (this.y_pos - (this.height/2) <= 42 || this.y_pos + (this.height/2) >= 640) {
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
