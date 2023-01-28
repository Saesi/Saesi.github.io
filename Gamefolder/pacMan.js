let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var posPacX = 900;
var posPacY = 500;
var dir = 1;
function drawPacMan(posX, posY, direction) {    //Fall sem teiknar pacman
    ctx.beginPath();
    if (direction == 1){
        ctx.arc(posX, posY, 5, 0.2 * Math.PI, 1.8 * Math.PI); //hægri
    } else if (direction == 2){
        ctx.arc(posX, posY, 5, 1.2 * Math.PI, 2.8 * Math.PI); //vinstri
    } else if (direction == 3){
        ctx.arc(posX, posY, 5, 1.7 * Math.PI, 3.3 * Math.PI);  //upp
    } else if (direction == 4) {
        ctx.arc(posX, posY, 5, 0.7 * Math.PI, 2.3 * Math.PI);  //Niður
    }
    ctx.lineTo(posX, posY);
    ctx.fillStyle = "yellow";
    ctx.fill();
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
];


//Map layout constructor
function layoutMap(map) {
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
}

//backupborder
/*var borderLeftTop = 650;    //Hornin fyrir brautina
var borderRightBotton = 760;

function drawArenaBorder(lT, rB) {
    ctx.fillStyle = "blue";
    ctx.fillRect(lT, 50, 500, rB);
    ctx.clearRect(lT+5, 55, 489, rB-10);
}
*/

layoutMap(mapO);
function animate() {    //Animation fallið
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    layoutMap(mapO);
    drawPacMan(posPacX, posPacY, dir);
    document.onkeydown = function(event) {
        switch (event.keyCode) {
        case 37:
            posPacX -= 3;
            dir = 2;
        break;
        case 38:
            posPacY -= 3;
            dir = 3;
        break;
        case 39:
            posPacX += 3;
            dir = 1;
        break;
        case 40:
            posPacY += 3;
            dir = 4;
        break;
        }
    };
}
animate();