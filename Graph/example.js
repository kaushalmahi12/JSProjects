var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d");

var NODE_RADIUS = 20, distanceThreshold = 200;

function rand() {
    return Math.floor(Math.random() * 255);
}

context.lineWidth = 10;
function Coordinate(x, y) {
    this.x = x;
    this.y = y;

    this.drawCircleAtCurrentCoordinate = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, NODE_RADIUS, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${rand()}, ${rand()}, ${rand()}, 0.3)`;
        ctx.fill();
        ctx.closePath();
    }

    this.distanceTo = function(other) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        return Math.sqrt(dx*dx + dy*dy);
    }


    this.lineTo = function(ctx, other) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(${rand()}, ${rand()}, ${rand()}, 0.3)`;
        ctx.lineWidth = "8";
        ctx.stroke();
        ctx.closePath();
    }
}

function Edge(from, to) {
    this.from = from;
    this.to = to;
}

function Graph(edges) {
    this.edges = edges;

    this.draw = function(ctx) {
        for (var i=0; i<this.edges.length; i++) {
            var edge = this.edges[i];
            var from = edge.from;
            var to = edge.to;

            from.lineTo(ctx, to);
        }
    };
}

var coordinates = [];
for (var i=0; i<10; ) {
    var randX = Math.max(NODE_RADIUS, Math.floor(Math.random() * (canvas.width - NODE_RADIUS - 10)));
    var randY = Math.max(NODE_RADIUS, Math.floor(Math.random() * (canvas.height- NODE_RADIUS - 10)));
    var entry = new Coordinate(randX, randY);
    var add = true;
    for (var ind=0; ind < coordinates.length; ind++) {
        if (entry.distanceTo(coordinates[ind]) < distanceThreshold) {
            add = false;
            break;
        }
    }

    if (add === true) {
        entry.drawCircleAtCurrentCoordinate(context);
        coordinates.push(entry);
        i++;
    } 
}

console.log(coordinates)

var edges = [];

var seen = {};
for (var i=0; i<10; i++) {
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    var key = x + "-" + y;
    var key_ = y + "-" + x;
    if (seen[key] === undefined && seen[key_] === undefined) {
        edges.push(new Edge(coordinates[x], coordinates[y]));
        seen[key] = true;
        seen[key_] = true;
    }
}

var graph = new Graph(edges);
graph.draw(context);