let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



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
            this.lastDir = 1;
        } else if (this.velocityX > 0){
            ctx.arc(this.x, this.y, 10, 0.2 * Math.PI, 1.8 * Math.PI); //hægri
            this.lastDir = 4;
        } else if (this.velocityX < 0){
            ctx.arc(this.x, this.y, 10, 1.2 * Math.PI, 2.8 * Math.PI); //vinstri
            this.lastDir = 0;
        } else if (this.velocityY < 0){
            ctx.arc(this.x, this.y, 10, 1.7 * Math.PI, 3.3 * Math.PI);  //upp
            this.lastDir = 2;
        } else if (this.velocityY > 0) {
            ctx.arc(this.x, this.y, 10, 0.7 * Math.PI, 2.3 * Math.PI);  //Niður
            this.lastDir = 6;
        } else {
            switch (this.lastDir) {
                case 0:
                    ctx.arc(this.x, this.y, 10, 1.2 * Math.PI, 2.8 * Math.PI); //vinstri
                    break;
                case 1:
                    ctx.arc(this.x, this.y, 10, 1.5 * Math.PI, 3.1 * Math.PI);
                    break; 
                case 2:
                    ctx.arc(this.x, this.y, 10, 1.7 * Math.PI, 3.3 * Math.PI);  //upp
                    break;
                case 3:
                    ctx.arc(this.x, this.y, 10, 2 * Math.PI, 3.6 * Math.PI);
                    break;
                case 4:
                    ctx.arc(this.x, this.y, 10, 0.2 * Math.PI, 1.8 * Math.PI); //hægri
                    break;
                case 5:
                    ctx.arc(this.x, this.y, 10, 0.4 * Math.PI, 2.0 * Math.PI); //NiðurHægri
                    break;
                case 6:
                    ctx.arc(this.x, this.y, 10, 0.7 * Math.PI, 2.3 * Math.PI);  //Niður
                    break;
                case 7:
                    ctx.arc(this.x, this.y, 10, 1 * Math.PI, 2.6 * Math.PI);
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

class Ghost {
    constructor(x, y, dx, dy, color = 'red') {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + 30) >= width) {
            this.dx = -(this.dx);
        }

        if ((this.x - 30) <= 0) {
            this.dx = -(this.dx);
        }

        if ((this.y + 30) >= height) {
            this.dy = -(this.dy);
        }

        if ((this.y - 30) <= 0) {
            this.dy = -(this.dy);
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    collisionDetect() {
        for (const ghost of ghosts) {
            if (!(this === ghost)) {
                const px = this.x - ghost.x;
                const py = this.y - ghost.y;
                const distance = Math.sqrt(px * px + py * py);

                if (distance < this.size + ball.size) {
                    ball.color = randomRGB();
                    this.color = randomRGB();
                }
            }
        }
    }
}


let player = new Pacman(100, 100, {x: 3, y: 3});

let ghostO = new Ghost(500, 105, 3, 3, "blue");
let ghostT = new Ghost(700, 300, 3, 3, "blue");
let ghostTH = new Ghost(240, 100, 3, 3, "blue");
let ghostF = new Ghost(789, 340, 3, 3, "blue");

const ghosts = [ghostO, ghostT, ghostTH, ghostTH, ghostF];

let touchY = 0;
let touchX = 0;
const touchThreshold = 30;

window.addEventListener("touchstart", (e) => {
    touchY = e.changedTouches[0].pageY;
    touchX = e.changedTouches[0].pageX;
});
window.addEventListener("touchend", (e) => {
    let distanceY = e.changedTouches[0].pageY - touchY;
    let distanceX = e.changedTouches[0].pageX - touchX;
    console.log(`X: ${distanceX} & Y: ${distanceY}`);
    const angle = Math.atan2(e.changedTouches[0].pageY - touchY, e.changedTouches[0].pageX - touchX)
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    player.velocityX = velocity.x;
    player.velocityY = velocity.y;
});



function animate() {    //Animation fallið
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    player.update();
    for (const ghost of ghosts){
        ghost.update();
        ghost.collisionDetect();
    }
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