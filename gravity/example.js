var canvas = document.getElementById("canvas"), context = canvas.getContext("2d");
var FRAME_RATE_PER_SEC = 60, G = 9.8, BALL_RADIUS=30, E=0.9;

var dt = 10.0 / FRAME_RATE_PER_SEC;
var colors = ["#D55858", "#DC7070", "#FB861A"];
function rand() {
    return Math.floor(Math.random() * 255);
}
function Ball(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.direction = "down";
    this.color = `rgba(${rand()}, ${rand()}, ${rand()}, 0.7)`;

    this.updateV = function(t) {
        this.vy = this.vy + G * t;

        if (this.direction === "up") {
            if (this.vx < 1e-6) {
                this.direction = "down";
            }
        }
    };

    this.updatePos = (t) => {
        var accelaration = G;
        var dy = this.vy * t + 0.5 * accelaration * t * t;
        var dx = this.vx * t + 0.5 * accelaration * t * t;
        var possibleY = this.y + dy;
        if (possibleY >= (canvas.height-BALL_RADIUS)) {
            this.direction = "up";
            this.vy = -E * this.vy;
            this.vx = Math.abs(this.vx) > 0 ? this.vx : E;
        }

        var possibleX = this.x + dx + this.vx;
        if (possibleX >= (canvas.width - BALL_RADIUS) || possibleX < BALL_RADIUS) {
            dx = -dx;
            this.vx = -this.vx;
        }

        this.y = Math.min(this.y + dy, canvas.height - BALL_RADIUS);
        this.x = Math.min(possibleX, canvas.width - BALL_RADIUS);
        this.x = Math.max(BALL_RADIUS, this.x);
    };

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    this.animate = () => {
        this.draw(context);
        this.updatePos(dt);
        this.updateV(dt);
    }
}

var balls = [];
canvas.addEventListener("mousedown", function(event) {
    var x = event.clientX, y = event.clientY;
    var vy = Math.random() * 4;
    // var vy = Math.random();
    var ball = new Ball(x, y, 0, vy);
    balls.push(ball);
});

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let ball of balls) {
        ball.animate();
    }
    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000 / FRAME_RATE_PER_SEC)
}

loop();

/**
 * 1000 ms => 60 px
 * 1 ms => 6 / 100 px
 * 16.33ms => 16.33 * 6 / 100 px
 * 
 * 60 px => 1000 ms
 * 
 */