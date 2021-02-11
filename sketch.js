var ball, database, position, bg, ballImage;
function preload(){
    bg=loadImage("pro-C35 images/bg.png")
    ballImage=loadImage("pro-C35 images/balloon.png")
}
function setup(){
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.addImage(ballImage);
    ball.scale=0.5;
    ball.shapeColor = "red";
    var locOfChild=database.ref("ball/position");
    locOfChild.on("value", readOP)
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        'x': position.x+x,
        'y': position.y+y
    })
}
function readOP(data){
    position=data.val();
    ball.x=position.x
    ball.y=position.y
}