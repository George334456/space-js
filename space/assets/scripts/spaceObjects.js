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
	var ctx = window.ctx;

	window.ctx.fillStyle = "pink";
	window.ctx.fillRect(this.x_pos-(this.width/2), this.y_pos-(this.height/2), this.width, this.height);

	ctx.fillStyle = "#0055ff";
	ctx.beginPath();
	ctx.strokeStyle = "#ffffff";
	ctx.arc(this.x_pos, this.y_pos, this.width/2, 0, 2*Math.PI, false);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();


	ctx.beginPath();
	ctx.fillStyle = "#00ff55";
	ctx.strokeStyle = "#000000";
	ctx.moveTo(this.x_pos - 15, this.y_pos - 15);
	ctx.quadraticCurveTo(this.x_pos - 10, this.y_pos - 25, this.x_pos + 5, this.y_pos - 10);
	//ctx.quadraticCurveTo(this.x_pos + 3, this.y_pos - 25, this.x_pos, this.y_pos - 8);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	


}

function ship_draw() {
	var ctx = window.ctx;

	//tail
	ctx.fillStyle = "#ff0000";
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(this.x_pos+5, this.y_pos+5);
	ctx.lineTo(this.x_pos+25, this.y_pos+10);
	ctx.lineTo(this.x_pos+10, this.y_pos+25);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	//ship body
	ctx.fillStyle = "#dddddd";
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(this.x_pos-25, this.y_pos-25);
	ctx.quadraticCurveTo(this.x_pos+10, this.y_pos-10, this.x_pos+25, this.y_pos+25);
	ctx.quadraticCurveTo(this.x_pos-10, this.y_pos+10, this.x_pos-25, this.y_pos-25);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	//window
	ctx.fillStyle = "#00bbff";
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.arc(this.x_pos-5, this.y_pos-5, 3, 0, 2*Math.PI, false);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();




}

function nebula_draw() {
	window.ctx.fillStyle = "blue";
	window.ctx.fillRect(this.x_pos-(this.width/2), this.y_pos-(this.height/2), this.width, this.height);
}

function satellite_draw() {
	window.ctx.fillStyle = "green";
	window.ctx.fillRect(this.x_pos-(this.width/2), this.y_pos-(this.height/2), this.width, this.height);
}
