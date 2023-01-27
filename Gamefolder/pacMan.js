let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var posPacX = 900;
var posPacY = 500;
var dir = 1;
function drawPacMan(posX, posY, direction) {
    ctx.beginPath();
    if (direction == 1){
        ctx.arc(posX, posY, 15, 0.2 * Math.PI, 1.8 * Math.PI); //hægri
    } else if (direction == 2){
        ctx.arc(posX, posY, 15, 1.2 * Math.PI, 2.8 * Math.PI); //vinstri
    } else if (direction == 3){
        ctx.arc(posX, posY, 15, 1.7 * Math.PI, 3.3 * Math.PI);  //upp
    } else if (direction == 4) {
        ctx.arc(posX, posY, 15, 0.7 * Math.PI, 2.3 * Math.PI);  //Niður
    }
    ctx.lineTo(posX, posY);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

var borderLeftTop = 650;
var borderRightBotton = 760;

function drawArenaBorder(lT, rB) {
    ctx.fillStyle = "blue";
    ctx.fillRect(lT, 50, 500, rB);
    ctx.clearRect(lT+5, 55, 489, rB-10);
}



function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    drawArenaBorder(borderLeftTop, borderRightBotton);
    drawPacMan(posPacX, posPacY, dir);
    console.log(dir);
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