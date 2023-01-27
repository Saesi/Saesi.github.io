let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var posPacX = 900;
var posPacY = 500;
function drawPacMan(posX, posY) {
    ctx.beginPath();
    //ctx.arc(posX, posY, 15, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.arc(posX, posY, 15, 0.2 * Math.PI, 1.8 * Math.PI);
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
    drawPacMan(posPacX, posPacY);
    document.onkeydown = function(event) {
        switch (event.keyCode) {
        case 37:
            posPacX -= 3;
        break;
        case 38:
            posPacY -= 3;
        break;
        case 39:
            posPacX += 3;
        break;
        case 40:
            posPacY += 3;
        break;
        }
    };
}
animate();