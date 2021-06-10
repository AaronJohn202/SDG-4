var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sonic, sonicImg
var obstacle,obstacleImg;
var ground,groundImg;
var score=0;
var gameOver, restart;
var obstacleGroup;
var sonicImg, bgImg, spikedobImg, goldcoinsImg;

function preload(){
  
  spikedobImg = loadImage("Spikedobstacle.png");
  goldcoinsImg = loadImage("goldcoin.png")

  sonicImg = loadImage("download.png");
  bgImg = loadImage("Background.png");
}

function setup() {
  createCanvas(1200, 400);
  
  sonic = createSprite(50,350,50,50);
  sonic.shapeColor = "blue";
  
  sonic.addImage(sonicImg);
  sonic.scale = 0.7;
  sonic.debug = true;
  ground = createSprite(500,390,2000,20);
  ground.shapeColor = "brown";
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
 // invisibleGround = createSprite(200,190,400,10);
  //invisibleGround.visible = false;

  obstacleGroup= new Group()  
  restart = createSprite(500,200,40,40);
  restart.shapeColor = "orange";
  gameOver=createSprite(500,350,40,40);
  gameOver.shapeColor = "purple";
  
  
}

function draw() {

  background(bgImg);

  //sonicImg.position(50,350)
  //see the score on the screen
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    //calculating score
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && sonic.y >=   300) {
      
      sonic.velocityY = -12;


    }
    if(sonic.y>330){
    text("The y position of sonic is too big! Reduce to play otherwise STOP and play something else. :)" , 600, 400)
    }


    sonic.velocityY = sonic.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    gameOver.visible = false;
    restart.visible= false;
  
    spawnCoins();
    spawnObstacles()

    if(obstacleGroup.isTouching(sonic)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    sonic.velocityY = 0;
    gameOver.visible = true;
    restart.visible = true;
    obstacleGroup.setVelocityXEach(0);
      
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  sonic.collide(ground);
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(950,390,10,40);
    obstacle.shapeColor = "green";
    obstacle.addImage(spikedobImg)
    obstacle.scale = 0.5;
    obstacle.debug = true;
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    

    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  score =0;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  
  
 
  
  score = 0;
  
}

function spawnCoins(){
  if(frameCount%100 === 0){
  coins=createSprite(1150, Math.round(random(50,350)));
  coins.velocityX = -4;
  coins.addImage(goldcoinsImg)
  }
}