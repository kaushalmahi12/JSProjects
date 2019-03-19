function Game() {
    var width, height, ctx;
    this.init = () => {
        const canvas = document.getElementById('canvas');
        this.width = canvas.width = 1200;
        this.height = canvas.height = 500;
        this.ctx = canvas.getContext('2d');
        document.body.addEventListener('keydown', this.handleDownKey);
        this.snake.init();
        this.play();
        this.food.generateNew(this.width, this.height);
    };

    this.handleDownKey = (evt) => {
        if (evt.key == 'ArrowDown') {
            this.snake.direction = 'down';
        } else if (evt.key == 'ArrowLeft') {
            this.snake.direction = 'left';
        } else if (evt.key == 'ArrowRight') {
            this.snake.direction = 'right';
        } else {
            this.snake.direction = 'up';
        }
    };

    this.food = {
        x: 0,
        y: 0,
        draw: function () {
            const canvas = document.getElementById('canvas');
            const pen = canvas.getContext('2d');
            pen.fillStyle = "yellow";
            pen.strokeStyle = "black";
            pen.lineWidth  = 5;
            pen.strokeRect(this.x*20, this.y*20, 20, 20);
            pen.fillRect(this.x*20, this.y*20, 20, 20);
        },

        generateNew: function(width, height) {
            this.x = Math.round(Math.random() * (width-20)/20);
            this.y = Math.round(Math.random() * (height-20)/20);
        }
    };

    this.snake = {
        len: 5,
        cells: [],
        color: 'yellow',
        direction: 'right',
        init: function() {
            for (let i=0; i<this.len; i++)
            this.cells.push({x:i, y:0});
        },
        draw: function() {
            const canvas = document.getElementById('canvas');
            const pen = canvas.getContext('2d');
            for(var i=this.cells.length-1;i>=0;i--){
                pen.fillStyle = this.color;
                
                pen.strokeStyle = "black";
                pen.lineWidth  = 5;
                
                pen.strokeRect(this.cells[i].x*20,this.cells[i].y*20,20,20);
                pen.fillRect(this.cells[i].x*20,this.cells[i].y*20,20,20);  
            }
        }
    };

    this.update = () => {
        const cell = this.snake.cells[this.snake.cells.length-1];
        let newX = cell.x;
        let newY = cell.y;

        if (newX == this.food.x && newY == this.food.y) {
            this.food.generateNew(this.width, this.height);
        } else {
            this.snake.cells.shift();
        }

        if (this.snake.direction === 'right') {
            newX += 1;
            if (newX*20 > this.width) newX = 0;
            
        } else if (this.snake.direction === 'left') {
            newX -= 1;
            if (newX*20 < 0) newX = this.width/20;
        } else if (this.snake.direction === 'up') {
           newY -= 1;
           if (newY*20 < 0) {
               newY = this.height/20;
           }
        } else {
            newY += 1;
            if (newY*20 > this.height) newY = 0;
        }
        this.snake.cells.push({x: newX, y: newY});
    };

    this.draw = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.snake.draw();
        this.food.draw();
    };

    this.play = () => {
        this.draw();
        this.update();
        setTimeout(() => requestAnimationFrame(this.play), 100);
    };
}