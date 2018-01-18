var gameField = document.getElementById("gameField");
var graphics = gameField.getContext("2d");

var ballR = 10;
var ballX = gameField.width/2;
var ballY = gameField.height/2+ballR*4;

var ballDx = ballR/4;
var ballDy = ballR/4;

var racketW = ballR*10;
var racketH = ballR*2;
var racketX = gameField.width/2-racketW/2;
var racketY = gameField.height - racketH;
var racketDx = racketW/10;
var racketDirection = 0;
//0 - stop //-1 - left //1 - right

var rowsCount=4;
var columsCount=5;
var bricksMargin=30;
var offsetX=100;
var offsetY=50;

var brickW=ballR*6;
var brickH=ballR*2;
var bricks=[];

var lives=3;

function createBricks() {
    var k=0;
    for (var i=0;i<rowsCount;i++)
    {
        for(var j=0;j<columsCount;j++)
        {
            bricks[k]=
                {
                  x:j*(brickW+bricksMargin)+offsetX,
                  y:i*(brickH+bricksMargin)+offsetY
                };
            k++;
        }
    }
}

function drawBall() {
    graphics.beginPath();
        graphics.arc(ballX, ballY, ballR, 0, Math.PI*2);
        graphics.fillStyle="#0095DD";
        graphics.fill();
    graphics.closePath();
}

function moveBall() {
    ballX+=ballDx;
    ballY+=ballDy;
}

function collisionBallWithBorder() {
    //down side
    if(ballY+ballR>=gameField.height) {
        ballDy*=-1;
        lives--;
    }

    //up side
    if(ballY-ballR<=0) {
        ballDy*=-1;
    }

    //left side
    if(ballX-ballR<=0) {
        ballDx*=-1;
    }

    //right side
    if(ballX+ballR>=gameField.width) {
        ballDx*=-1;
    }
}

function drawRacket() {
    graphics.beginPath();
        graphics.rect(racketX, racketY, racketW,racketH);
        graphics.fillStyle="#0095DD";
        graphics.fill();
    graphics.closePath();
}
function keyDownHandler(key) {
    if(key.keyCode==37){racketDirection=-1;}
    if(key.keyCode==39){racketDirection=1;}
}
function keyUpHandler(key) {
    if(key.keyCode==37){racketDirection=0;}
    if(key.keyCode==39){racketDirection=0;}
}

document.addEventListener("keydown", keyDownHandler, false);

document.addEventListener("keyup", keyUpHandler, false);

function moveRacket(){
    if(racketDirection==1)
    {
        racketX+=racketDx;
        if(racketX+racketW>=gameField.width)
        {
            racketX = gameField.width - racketW;
        }
    }
    if(racketDirection==-1)
    {
        racketX-=racketDx;
        if(racketX<=0)
        {
            racketX = 0;
        }
    }
}

function collisionBallWithRacket() {
    if(ballX>=racketX && ballX<=racketX+racketW &&
    ballY+ballR>=racketY)
    {
        ballDy*=-1;
    }
}

function drawBricks() {
    for (var i=0;i<bricks.length;i++)
    {
        graphics.beginPath();
        graphics.rect(bricks[i].x, bricks[i].y, brickW,brickH);
        graphics.fillStyle="#0095DD";
        graphics.fill();
        graphics.closePath();
    }
}

function collisionBallWithBricks() {
    for (var i = 0; i < bricks.length; i++)
    {
        if(ballX>=bricks[i].x && ballX<=bricks[i].x+brickW &&
            ballY>=bricks[i].y && ballY<=bricks[i].y+brickH )
        {
            bricks.splice(i,1);
            ballDy=-ballDy;
            break;
        }
    }
}

function drawLives() {
    graphics.font="15px Verdana";
    graphics.fillStyle="red";
    graphics.fillText("Lives: "+lives, 10,30);
}

function gameOver() {
    if(lives==0)
    {
        clearInterval(timer);
        if(confirm("You lose! Do you want play again?")==true)
        {
            document.location.reload();
        }
    }
    else if(bricks.length==0)
    {
        clearInterval(timer);
        if(confirm("You WIN!!! Do you want play again?")==true)
        {
            document.location.reload();
        }
    }
}
function updateGameField() {
    graphics.clearRect(0,0,gameField.width, gameField.height);

    drawBall();
    moveBall();
    collisionBallWithBorder();

    drawRacket();
    moveRacket();
    collisionBallWithRacket();

    drawBricks();
    collisionBallWithBricks();

    drawLives();

    gameOver();
}

createBricks();
var timer = setInterval(updateGameField, 10);