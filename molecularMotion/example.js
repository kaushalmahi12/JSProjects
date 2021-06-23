var canvas = document.getElementById("canvas"), context = canvas.getContext("2d");
var FRAME_RATE_PER_SEC = 60, G = 9.8, MOLECULE_RADIUS=30;

function rand() {
    return Math.random() * 255;
}

function Molecule(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;

    this.draw = () => {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, MOLECULE_RADIUS, 0, Math.PI*2);
        context.fill();
    }

    this.update = () => {
        if ((this.x + this.vx + MOLECULE_RADIUS) > canvas.width || (this.x + this.vx - MOLECULE_RADIUS) < 0) {
            this.vx = this.vx * -1;
        }

        if ((this.y + this.vy + MOLECULE_RADIUS) > canvas.height || (this.y + this.vy - MOLECULE_RADIUS) < 0) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.x = Math.max(MOLECULE_RADIUS, this.x);
        this.y = Math.max(MOLECULE_RADIUS, this.y);
        this.draw();
    };
}

var molecules = [];
function init() {
    for (var i=0; i<500; i++) {
        var x = Math.random() * (canvas.width - MOLECULE_RADIUS);
        var y = Math.random() * (canvas.height - MOLECULE_RADIUS);
        var vx = (Math.random() - 0.5) * 4;
        var vy = (Math.random() - 0.5) * 4;
        molecules.push(new Molecule(x, y, vx, vy, `rgba(${rand()}, ${rand()}, ${rand()}, 0.8)`));
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let molecule of molecules) {
        molecule.update();
    }
    requestAnimationFrame(animate);
}

init();
animate();

/**
 * 10x = 7.7
 * x = 0.7
 * 9x=7
 * x = 7 / 9
 */