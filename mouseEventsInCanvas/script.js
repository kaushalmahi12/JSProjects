var context = document.getElementById('canvas').getContext('2d'),
      startButton = document.getElementById('startButton'),
      glasspane = document.getElementById('glasspane'),
      paused = true,
      BALL_RADIUS = 30;
var colors = ["#75EB00",   "#53BBF4",   "#FF85CB",   "#FF432E",   "#FFAC00",];
function Ball(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function(context) {
        context.beginPath();
        context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        context.strokeStyle = "black";
        context.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2, true);
        context.fill();
        context.stroke();
    }
}
var gId;

startButton.onclick = function(e) {
    e.preventDefault();
    paused = ! paused;
    startButton.innerText = paused ? 'Start' : 'Stop';
    if (paused === false) {
        gId = requestAnimationFrame(loop);
    } else {
        cancelAnimationFrame(gId);
    }
};

function loop() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (var i=0; i<100; i++) {
        new Ball(Math.random()*canvas.clientWidth, Math.random() * canvas.clientHeight)
        .draw(context);
    }
    setTimeout(() => {
        if (paused === false) {
            gId = requestAnimationFrame(loop); 
        } else {
            cancelAnimationFrame(gId);
        }
    }, 2000/10);
}

glasspane.onmousedown = function(e) {
    e.preventDefault();
};