/*SpaceObject Class: objects that consistently move across the 
	screen in a specified direction but can be destroyed by black hole objects */
var SpaceObject = function(x, y, type) {

	var horizontal_dir = Math.floor((Math.random() * 2) + 1);

	this.x_pos = x;
	this.y_pos = y;
	this.width = 50;
	this.height = 50;
	this.direction = undefined // randomize slope 
	this.types = [planet_draw, ship_draw, asteroid_draw, satellite_draw];
	this.draw = this.types[type];
	this.pulled = false;

	if (horizontal_dir == 1) {
		this.speed_x = 1;
	} else {
		this.speed_x = -1;
	}
	
	this.speed_y = Math.floor((Math.random() * 2)); // placeholder for now
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

	ctx.fillStyle = "#ff3300";
	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.arc(this.x_pos, this.y_pos, this.width/2, 0, 2*Math.PI, false);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();


	ctx.beginPath();
	ctx.fillStyle = "#FFFF00";
	ctx.strokeStyle = "#000000";
	ctx.moveTo(this.x_pos - 17, this.y_pos + 17);
	ctx.quadraticCurveTo(this.x_pos, this.y_pos +10, this.x_pos + 20, this.y_pos -20);
	ctx.quadraticCurveTo(this.x_pos+ 24, this.y_pos-17, this.x_pos + 20, this.y_pos -14);
	ctx.quadraticCurveTo(this.x_pos+10, this.y_pos+10, this. x_pos-20, this.y_pos+23);
	ctx.quadraticCurveTo(this.x_pos-24, this.y_pos+22, this.x_pos-22, this.y_pos+20);
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

function asteroid_draw() {
	window.ctx.fillStyle = "#8B4513";
	var ctx = window.ctx;
	ctx.strokeStyle = "#000";
	ctx.beginPath()
	ctx.moveTo(this.x_pos-25,this.y_pos-25);
	ctx.lineTo(this.x_pos, this.y_pos-25);
	ctx.lineTo(this.x_pos+15, this.y_pos-15);
	ctx.lineTo(this.x_pos+10, this.y_pos-5);
	ctx.lineTo(this.x_pos+10, this.y_pos+5)
	ctx.lineTo(this.x_pos+20, this.y_pos+15);
	ctx.lineTo(this.x_pos+20, this.y_pos+20);
	ctx.lineTo(this.x_pos, this.y_pos+25);
	ctx.lineTo(this.x_pos-25, this.y_pos+15);
	ctx.lineTo(this.x_pos-20, this.y_pos);
	
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(this.x_pos-15, this.y_pos-5, 3, 0, 2*Math.PI, false);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(this.x_pos+10, this.y_pos+15, 4, 0, 2*Math.PI, false);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(this.x_pos+3, this.y_pos-15, 5, 0, 2*Math.PI, false);
	ctx.stroke();
	ctx.closePath();
	
}

function satellite_draw() {
	var ctx = window.ctx;

	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#0055ff";
	ctx.moveTo(this.x_pos-25, this.y_pos-17);
	ctx.lineTo(this.x_pos-17, this.y_pos-25);
	ctx.lineTo(this.x_pos+25, this.y_pos+17);
	ctx.lineTo(this.x_pos+17, this.y_pos+25);
	ctx.fill();
	ctx.closePath();
	
	ctx.stroke();

	
	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#aaaaaa";
	ctx.moveTo(this.x_pos-18, this.y_pos+10);
	ctx.lineTo(this.x_pos-10, this.y_pos+18);
	ctx.lineTo(this.x_pos+20, this.y_pos-12);
	ctx.lineTo(this.x_pos+12, this.y_pos-20);
	ctx.fill();
	ctx.closePath();
	
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#ff0000";
	ctx.arc(this.x_pos+18, this.y_pos-18, 3, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();

	
}
