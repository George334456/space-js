/**
 * Created by George on 2016-06-09.
 */
var Black_Hole = function (x,y, color){ //Constructor for the black hole object
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

function drawHole(hole){
    var canvas = document.getElementById("space-canvas");
    var context = canvas.getContext("2d");
    switch(hole.color){
        case 0: window.ctx.fillStyle = "purple";
            break;
        case 1: window.ctx.fillStyle = "blue";
            break;
        case 2: window.ctx.fillStyle = "red";
            break;
    }
    window.ctx.beginPath();
    window.ctx.arc(hole.x,hole.y, 25, 0, 2* Math.PI, false);
    window.ctx.fill();
    window.ctx.strokeStyle = "white";
    window.ctx.stroke();
    window.ctx.fillStyle="black";
    window.ctx.beginPath();
    window.ctx.strokeRect(hole.click_left, hole.click_top,  50, 50);
    window.ctx.beginPath();
    window.ctx.strokeRect(hole.collide_left, hole.collide_top, 100,100);
}
