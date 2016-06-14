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
    this.object_count = 0; // num of space objects it has destroyed
    this.img = new Image(); // used to load up image once , not everytime it is drawn

    // sets different pull speeds based on color selection
    if (this.color == 0) { //purple
        this.pull_speed = 2;
        this.capacity = 2;
        this.img.src = "assets/images/portalpurple.svg";

    } else if (this.color == 2) { // red
        this.pull_speed = 3;
        this.capacity = 1;
        this.img.src = "assets/images/portalblack.svg";

    } else if (this.color == 1) { //blue
        this.pull_speed = 1;
        this.capacity = 3;
        this.img.src = "assets/images/portalblue.svg";
    }
}

Black_Hole.prototype.pull = function(spaceobjects, game) {
    for (var i = 0; i < spaceobjects.length; i++) {
        var s = spaceobjects[i];

        if (checkHorizon(this, s)) {
            calculateSpeed(this, s);
        }

        if (this.collision(s)) {
            game.spaceObjectArray.splice(i, 1);
            game.score -= 50;

            this.object_count += 1;
            var g = game;
            var that = this;
            setTimeout(function() {

                if (that.object_count == that.capacity) {
                    var index = g.blackHoleArray.indexOf(that);
                    g.blackHoleArray.splice(index, 1);
                }
                
            }, 0);
        }
    }
};

//private function used to check if the center of the blackhole is hit
Black_Hole.prototype.collision = function(spaceobject) {
    return (this.x <= spaceobject.x_pos + 25 && this.x >= spaceobject.x_pos - 25 && this.y <= spaceobject.y_pos + 25 && this.y >= spaceobject.y_pos - 25);
}

//private function used to check if spaceobject collides with blackhole
function checkHorizon(blackhole, spaceobject) {
    return (spaceobject.y_pos+25 >= blackhole.collide_top && spaceobject.y_pos-25 <= blackhole.collide_bottom  && spaceobject.x_pos+25 >= blackhole.collide_left && spaceobject.x_pos-25 <= blackhole.collide_right);
}

//private function used to calculate new x and y speed of the object based on blackhole pull speed
function calculateSpeed(blackhole, spaceobject) {
    var dx = blackhole.x - spaceobject.x_pos;
    var dy = blackhole.y - spaceobject.y_pos;
    var angle = Math.atan2(dy, dx);


    spaceobject.speed_x = Math.cos(angle) * blackhole.pull_speed;
    spaceobject.speed_y = Math.sin(angle) * blackhole.pull_speed;

   

    //console.log(spaceobject.speed_x, spaceobject.speed_y);
}

function drawHole(hole){
    var canvas = document.getElementById("space-canvas");
    var context = canvas.getContext("2d");
    ctx.drawImage(hole.img, hole.x-25, hole.y-25);
    // window.ctx.beginPath();
    // window.ctx.arc(hole.x,hole.y, 25, 0, 2* Math.PI, false);
    // window.ctx.fill();
    //window.ctx.strokeStyle = "white";
    //window.ctx.stroke();
    //window.ctx.fillStyle="black";
    //window.ctx.beginPath();
    //window.ctx.strokeRect(hole.click_left, hole.click_top,  50, 50);
    //window.ctx.beginPath();
    //window.ctx.strokeRect(hole.collide_left, hole.collide_top, 100,100);
}

function clearHole(hole){
    var canvas = document.getElementById("space-canvas");
    var context = canvas.getContext("2d");
    window.ctx.fillStyle = "white";
    window.ctx.beginPath();
    window.ctx.arc(hole.x,hole.y, 25, 0, 2* Math.PI, false);
    window.ctx.fill();
    window.ctx.strokeStyle = "white";
    window.ctx.stroke();
    window.ctx.fillStyle="white";
    window.ctx.beginPath();
    window.ctx.strokeRect(hole.click_left, hole.click_top,  50, 50);
    window.ctx.beginPath();
    window.ctx.strokeRect(hole.collide_left, hole.collide_top, 100,100);
}