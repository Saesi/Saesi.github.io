let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var posPacX = 200;
var posPacY = 200;
function drawPacMan(posX, posY) {
    ctx.beginPath();
    ctx.arc(posX, posY, 15, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(posX, posY);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

drawPacMan(posPacX, posPacY);