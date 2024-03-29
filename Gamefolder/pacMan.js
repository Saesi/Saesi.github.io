let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

class pellet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.eaten = 0;
    }

    draw = () => {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    update () {
        if (this.eaten == 0) {
            this.draw();
        } else {
            ctx.clearRect(this.x, this.y, 10, 10)
        }
    }
}

class powerPellet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.eaten = 0;
        this.size = 1;
    }

    draw = () => {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update () {
        if (this.eaten == 0) {
            this.draw();
            if (this.size < 12){
                this.size += 0.1;
            } else {
                this.size -= 11;
            }
        } else {
            ctx.clearRect(this.x, this.y, 10, 10)
        }
    }
}

class wall{
    constructor(x, y, sizeX, sizeY){
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw = () => {
        ctx.beginPath();
        ctx.fillStyle = "Blue";
        ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
        ctx.fill();
    }
}

class Pacman {
    constructor(x, y, velocity, life) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lastDir = 0;
        this.lf = life;
        this.score = 0;
        this.hasTakenDmg = false;
        this.hasPowerup = false;

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
        if (this.lastDir == 1) {
            ctx.beginPath();
            ctx.arc(this.x+3, this.y-4, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (this.lastDir == 2) {
            ctx.beginPath();
            ctx.arc(this.x-5, this.y-3, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (this.lastDir == 3) {
            ctx.beginPath();
            ctx.arc(this.x-2, this.y-5, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (this.lastDir == 4) {
            ctx.beginPath();
            ctx.arc(this.x+1, this.y-4, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (this.lastDir == 5) {
            ctx.beginPath();
            ctx.arc(this.x+1, this.y-4, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (this.lastDir == 6) {
            ctx.beginPath();
            ctx.arc(this.x-5, this.y+2, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (this.lastDir == 7) {
            ctx.beginPath();
            ctx.arc(this.x-5, this.y-4, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (this.lastDir == 0) {
            ctx.beginPath();
            ctx.arc(this.x-1, this.y-5, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        }
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
        if (this.lf <= 0) {
            document.getElementById("life").innerHTML = "Dead";
        } else {
            document.getElementById("life").innerHTML = "Life: " + this.lf;
        }
        document.getElementById("counter").innerHTML = "Stig: " + this.score;
    }

    ghostDetector() {
        var pos = 0;
        for (const ghost of ghosts) {
            if (!(this === ghost)) {
                const px = this.x - ghost.x;
                const py = this.y - ghost.y;
                const distance = Math.sqrt(px * px + py * py);

                if (distance < 40){
                    if (this.hasTakenDmg === false && this.hasPowerup === false) {
                        this.lf -=1;
                        this.hasTakenDmg = true;
                        navigator.vibrate([2000]);
                        setTimeout(() => {
                            this.hasTakenDmg = false;
                        }, 3000);
                    }
                    if (this.hasPowerup === true && this.hasTakenDmg === false){
                        this.score += 200;
                        delete ghosts[pos];
                        ghosts = ghosts.filter(elm => elm);
                    }
                }
            }
            pos += 1;
        }
    }

    pelletDetector() {
        var pos = 0;
        for (var pellet of pellets) {
            if (!(this === pellet)) {
                const px = this.x - pellet.x;
                const py = this.y - pellet.y;
                const distance = Math.sqrt(px * px + py * py);

                
                if (distance < 20) {
                    this.score += 10;
                    pellet.eaten += 1;
                    delete pellets[pos];
                    pellets = pellets.filter(elm => elm);
                }
            }
            pos += 1;
        }
    }

    pwrPelletDetector() {
        var pos = 0;
        for (var pwrPellet of pwrPellets) {
            if (!(this === pwrPellet)) {
                const px = this.x - pwrPellet.x;
                const py = this.y - pwrPellet.y;
                const distance = Math.sqrt(px * px + py * py);

                
                if (distance < 22) {
                    this.hasPowerup = true;
                    for (var ghost of ghosts){
                        ghost.color = "Blue";
                    }
                    setTimeout(() => {
                        this.hasPowerup = false;
                        for (var ghost of ghosts){
                            ghost.color = ghost.OGColor;
                        }
                    }, 10000);
                    this.score += 50;
                    pellet.eaten += 1;
                    delete pwrPellets[pos];
                    pwrPellets = pwrPellets.filter(elm => elm);
                }
            }
            pos += 1;
        }
    }
}

class Ghost {
    constructor(x, y, dx, dy, color = 'red') {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.OGColor = color;
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

                if (distance < 60) {
                    //console.log("Hit");
                    this.dx = -(this.dx);
                    this.dy = -(this.dy);
                }
            }
        }
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}

let player = new Pacman(100, 100, {x: 3, y: 3}, 3);

let ghostO = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "cyan");
let ghostT = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "pink");
let ghostTH = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "red");
let ghostF = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "orange");

var ghosts = [ghostO, ghostT, ghostTH, ghostTH, ghostF];

let pelletO = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletT = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletTH = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletF = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletFI = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletS = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletSE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletEI = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletNI = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletTE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelleELE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
let pelletTWE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));

var pellets = [pelletO, pelletT, pelletTH, pelletF, pelletFI, pelletS, pelletSE, pelletEI, pelletNI, pelletTE, pelleELE, pelletTWE];

let pwrPellO = new powerPellet(12, 12);
let pwrPellTW = new powerPellet(width-12, 12);
let pwrPellTh = new powerPellet(width-12, height-12);
let pwrPellF = new powerPellet(12, height-12);

var pwrPellets = [pwrPellO, pwrPellTW, pwrPellTh, pwrPellF];

var victory = false;

let touchY = 0;
let touchX = 0;
const touchThreshold = 30;

window.addEventListener("touchstart", (e) => {
    touchY = e.changedTouches[0].pageY;
    touchX = e.changedTouches[0].pageX;
});
window.addEventListener("touchmove", (e) => {
    //let distanceY = e.changedTouches[0].pageY - touchY;
    //let distanceX = e.changedTouches[0].pageX - touchX;
    //console.log(`X: ${distanceX} & Y: ${distanceY}`);
    const angle = Math.atan2(e.changedTouches[0].pageY - touchY, e.changedTouches[0].pageX - touchX)
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    player.velocityX = velocity.x;
    player.velocityY = velocity.y;
});
window.addEventListener("touchend", (e) =>{
    player.velocityX = 0;
    player.velocityY = 0;
});



function startingScreen() {
    let startButton = document.createElement("button");
    startButton.innerHTML = "Start Game";
    startButton.id = "button"
    document.body.appendChild(startButton);

    startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        restartGame();
    })
}

function restartGame() {
    let pelletO = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletT = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletTH = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletF = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletFI = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletS = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletSE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletEI = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletNI = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletTE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelleELE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    let pelletTWE = new pellet(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height)));
    
    let pwrPellO = new powerPellet(12, 12);
    let pwrPellTW = new powerPellet(width-12, 12);
    let pwrPellTh = new powerPellet(width-12, height-12);
    let pwrPellF = new powerPellet(12, height-12);

    let ghostO = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "cyan");
    let ghostT = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "pink");
    let ghostTH = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "red");
    let ghostF = new Ghost(Math.floor((Math.random() * width) + 10), Math.floor((Math.random() * height) + 10), 1, 1, "orange");

    player = new Pacman(100, 100, {x: 3, y: 3}, 3);
    pwrPellets = [pwrPellO, pwrPellTW, pwrPellTh, pwrPellF];
    pellets = [pelletO, pelletT, pelletTH, pelletF, pelletFI, pelletS, pelletSE, pelletEI, pelletNI, pelletTE, pelleELE, pelletTWE];
    ghosts = [ghostO, ghostT, ghostTH, ghostTH, ghostF];
    victory = false;

    animate();
}

function endScreen() {
    let startButton = document.createElement("button");
    startButton.innerHTML = "Start Game";
    startButton.id = "button"
    document.body.appendChild(startButton);

    startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        restartGame();
    })
}


function animate() {    //Animation fallið
    if (victory === false){
        document.getElementById("vicScreen").innerHTML = "";
        document.getElementById("showscore").innerHTML = "";
        screen.orientation.lock("landscape-primary");
        /*document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
            toggleFullScreen();
            }
        }, false);*/
        document.documentElement.requestFullscreen();
        animationid = requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth,innerHeight);
        player.update();
        console.log(pellets);
        for (const pellet of pellets){
            pellet.update();
            player.pelletDetector();
        }
        for (const ghost of ghosts){
            ghost.update();
            ghost.collisionDetect();
            player.ghostDetector();
        }
        for (const pwrPl of pwrPellets){
            pwrPl.update();
            player.pwrPelletDetector();
        }
        if (pellets.length === 0 && pwrPellets.length === 0){
            document.getElementById("vicScreen").innerHTML = "VICTORY";
            document.getElementById("showscore").innerHTML = "Score: " + player.score;
            localStorage.setItem('Score', player.score);
            victory = true;
            cancelAnimationFrame(animationid);
            endScreen();
        }
        if (player.lf <= 0){
            document.getElementById("vicScreen").innerHTML = "Defeat";
            document.getElementById("showscore").innerHTML = "Score: " + player.score;
            victory = true;
            cancelAnimationFrame(animationid);
            endScreen();
        }
    }
}
startingScreen();


// code-graveyard

/*

let demiWall = new wall(500, 500, 50, 500);

var walls = [demiWall];

wallDetect() {
        for (const wall of walls){
            if (!(this === wall)) {
                let nullX = wall.x;
                let maxX = wall.x+wall.sizeX;
                let nullY = wall.y;
                let maxY = wall.y+wall.sizeY;
                    
                if ((this.x + 10) >= nullX && (this.x + 10) <= maxX && (this.y + 10) >= nullY && (this.y - 10) <= maxY) {
                    this.velocityX = 0;
                }
                else if ((this.x - 10) <= maxX && (this.y + 10) >= nullY && (this.y - 10) <= maxY) {
                    this.velocityX -= this.velocityX;
                }/*
                if ((ghost.y + 5) <= nullY && (ghost.x + 5) >= nullX && (ghost.x - 5) <= maxX) {
                    ghost.dy = -(ghost.dy);
                }
                /*if ((ghost.y - 5) >= maxY && (ghost.x - 5) >= nullX && (ghost.x + 5) <= maxX) {
                    ghost.dy = -(ghost.dy);
                } 
                
                }
            }
        }
    }






const mapO = [
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