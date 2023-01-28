let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



class Pacman {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lastDir = 0;

        window.addEventListener('keydown', (e) => {
            if (e.key == "a") {
                this.velocityX = -this.velocity.x;
            }
            if (e.key == "d") {
                this.velocityX = this.velocity.x;
            }
            if (e.key == "w") {
                this.velocityY = -this.velocity.y;
            }
            if (e.key == "s") {
                this.velocityY = this.velocity.y;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key == "a") {
                this.velocityX = 0;
            }
            if (e.key == "d") {
                this.velocityX = 0;
            }
            if (e.key == "w") {
                this.velocityY = 0;
            }
            if (e.key == "s") {
                this.velocityY = 0;
            }
        });
    }

    restart() {
        this.x = width / 2;
        this.y = height / 2;
        this.velocityX = this.velocityY = 0;
    }

    draw = () => {
        ctx.beginPath();
        if (this.velocityX > 0 && this.velocityY > 0) {
            ctx.arc(this.x, this.y, 10, 0.4 * Math.PI, 2.0 * Math.PI); //NiðurHægri
            this.lastDir = 5;
        } else if (this.velocityX > 0 && this.velocityY < 0){ //HægriUpp
            ctx.arc(this.x, this.y, 10, 2 * Math.PI, 3.6 * Math.PI);
            this.lastDir = 3;
        } else if (this.velocityX < 0 && this.velocityY > 0){   //Niður Vinstri
            ctx.arc(this.x, this.y, 10, 1 * Math.PI, 2.6 * Math.PI);
            this.lastDir = 7;
        } else if (this.velocityX < 0 && this.velocityY < 0) {  //Vinstri Upp
            ctx.arc(this.x, this.y, 10, 1.5 * Math.PI, 3.1 * Math.PI); 
        } else if (this.velocityX > 0){
            ctx.arc(this.x, this.y, 10, 0.2 * Math.PI, 1.8 * Math.PI); //hægri
            this.lastDir = 2;
        } else if (this.velocityX < 0){
            ctx.arc(this.x, this.y, 10, 1.2 * Math.PI, 2.8 * Math.PI); //vinstri
            this.lastDir = 0;
        } else if (this.velocityY < 0){
            ctx.arc(this.x, this.y, 10, 1.7 * Math.PI, 3.3 * Math.PI);  //upp
            this.lastDir = 2;
        } else if (this.velocityY > 0) {
            ctx.arc(this.x, this.y, 10, 0.7 * Math.PI, 2.3 * Math.PI);  //Niður
            this.lastDir = 3;
        } else {
            switch (this.lastDir) {
                case 0:
                    ctx.arc(this.x, this.y, 10, 1.2 * Math.PI, 2.8 * Math.PI); //vinstri
                    break;
                case 1:
                    ctx.arc(this.x, this.y, 10, 1.7 * Math.PI, 3.3 * Math.PI);  //upp
                    break; 
                case 2:
                    ctx.arc(this.x, this.y, 10, 0.2 * Math.PI, 1.8 * Math.PI); //hægri
                    break;
                case 3:
                    ctx.arc(this.x, this.y, 10, 0.7 * Math.PI, 2.3 * Math.PI);  //Niður
                    break;
            }
        }
        ctx.lineTo(this.x, this.y);
        ctx.fillStyle = "yellow";
        ctx.fill();
    }

    update() {
        this.draw();
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x <= 0) {
            this.x = width;
        }
        else if (this.x >= width) {
            this.x = 0;
        }
        if (this.y <= 0) {
            this.y = height;
        }
        else if (this.y >= height) {
            this.y = 0;
        }
    }
}

let player = new Pacman(100, 100, {x: 3, y: 3});

function animate() {    //Animation fallið
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    player.update();
    draw_ghost(ctx, 500, 200, 50);
}
animate();






// code graveyard

/*const mapO = [
    "11111111111111111111111",
    "10000000000100000000001",
    "10111011110101111011101",
    "10101010010101001010101",
    "10111011110101111011101",
    "10000000000000000000001",
    "10111101011111010111101",
    "10000001000100010000001",
    "11111101110101110111111",
    "00000101000000010100000",
    "00000101011111010100000",
    "11111101010001010111111",
    "00000000010001000000000",
    "11111101010001010111111",
    "00000101011111010100000",
    "00000101000000010100000",
    "11111101011111010111111",
    "10000000000100000000001",
    "10111101110101110111101",
    "10000100000000000100001",
    "11110101011111010101111",
    "10000001000100010000001",
    "10111111110101111111101",
    "10000000000000000000001",
    "11111111111111111111111"
];*/


//Map layout constructor
/*function layoutMap(map) {
    var mpx = 700;
    var mpy = 200;
    ctx.fillStyle = "blue";
    for (var x of map) {
        console.log(x, "X");
        for (let y of x) {
            console.log(y);
            if (y == "1") {
                console.log("Drawn");
                ctx.fillRect(mpx, mpy, 20, 20);
            }
            mpx += 20;
        }
        mpy += 20;
        var mpx = 700;
        
    }
}*/

//backupborder
/*var borderLeftTop = 650;    //Hornin fyrir brautina
var borderRightBotton = 760;

function drawArenaBorder(lT, rB) {
    ctx.fillStyle = "blue";
    ctx.fillRect(lT, 50, 500, rB);
    ctx.clearRect(lT+5, 55, 489, rB-10);
}
*/

/* let player = new Pacman(500, 900, {x: 5, y: 5}, 0.98);

function animate() {    //Animation fallið
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    player.update();
}
animate(); */