var drawingContext =
      document.getElementById('drawingCanvas').getContext('2d'),
    ERASER_LINE_WIDTH    = 1,
    ERASER_SHADOW_STYLE  = 'blue',
    ERASER_STROKE_STYLE  = 'rgba(0,0,255,0.6)',
    ERASER_SHADOW_OFFSET = -5,
    ERASER_SHADOW_BLUR   = 20,
    ERASER_RADIUS        = 60;
// Eraser........................................................
function setEraserAttributes() {
    drawingContext.lineWidth     = ERASER_LINE_WIDTH;
    drawingContext.shadowColor   = ERASER_SHADOW_STYLE;
    drawingContext.shadowOffsetX = ERASER_SHADOW_OFFSET;
    drawingContext.shadowOffsetY = ERASER_SHADOW_OFFSET;
    drawingContext.shadowBlur = ERASER_SHADOW_BLUR;
    drawingContext.strokeStyle = ERASER_STROKE_STYLE;
}

function drawEraser(location) {
    drawingContext.save();
    setEraserAttributes();
    drawingContext.beginPath();
    drawingContext.arc(20, 30, 10, 0, Math.PI * 2, true);
    drawingContext.clip();
    drawingContext.stroke();
    drawingContext.restore();
}
drawingContext.fillStyle = "red";
drawingContext.fillRect(0, 0, drawingContext.canvas.width, drawingContext.canvas.height);
drawingContext.fill();
drawEraser({x: 0, y: drawingContext.canvas.height/2});

