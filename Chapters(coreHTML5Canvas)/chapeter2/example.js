var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");


context.lineJoin = "round";
context.lineWidth = "30";

context.font = '24px Helvetica';
context.fillText('Click anywhere to erase', 175, 200);
context.strokeStyle = 'goldenrod';
context.fillStyle = 'rgba(0,0,255,0.5)';

context.strokeRect(100, 50, 200, 200);
context.fillRect(350, 50, 200, 200);

context.stroke();
context.fill();

// set up the linear gradient along the line from x1, y1 to x2, y2
gradient = context.createLinearGradient(100, 500, 100, 300);
gradient.addColorStop(0,    'blue');
gradient.addColorStop(0.10,    'orange');
gradient.addColorStop(0.25, 'white');
gradient.addColorStop(0.5,  'purple');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1,    'yellow');
context.fillStyle = gradient;
context.rect(100, 300, 200, 200);

context.fill();

canvas.onmousedown = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // creates and sets the radial gradient with first centre at x1,y1, radius1 and x2,y2 radius2 for fill
    gradient = context.createRadialGradient(
        canvas.width/2, canvas.height, 10,
        canvas.width/2, 0, 100);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(0.25, 'white');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(0.75, 'red');
    gradient.addColorStop(1, 'yellow');
    context.fillStyle = gradient;
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
}
