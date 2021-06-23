var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    repeatRadio = document.getElementById('repeatRadio'),
    noRepeatRadio = document.getElementById('noRepeatRadio'),
    repeatXRadio = document.getElementById('repeatXRadio'),
    repeatYRadio = document.getElementById('repeatYRadio'),
    image = new Image();

function fillCanvasWithPattern(patternString) {
    console.log(patternString);
    var pattern = context.createPattern(image, patternString);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
}

repeatRadio.onclick = function (e) {
    fillCanvasWithPattern('repeat');
};
repeatXRadio.onclick = function (e) {
    fillCanvasWithPattern('repeat-x');
};
repeatYRadio.onclick = function (e) {
    fillCanvasWithPattern('repeat-y');
};
noRepeatRadio.onclick = function (e) {
    fillCanvasWithPattern('no-repeat');
};

image.onload = function (e) {
    fillCanvasWithPattern('repeat');
};

function start() {
    var canvas1 = document.getElementById("imgSrc"),
        context1 = canvas1.getContext("2d");
    context1.fillStyle = "red";
    // context1.font = "15px serif";
    context1.arc(15, 15, 10, 0, Math.PI * 2, true);
    // context1.fillText("pattern", 0, 20);
    context1.fill();
    image.src = context1.canvas.toDataURL("image/png", 0.5);
    canvas1.style.display = "none";
}
start();