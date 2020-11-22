var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey, monkey_running,collided;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var bananaGroup;
var survivalTime=0 ;
var score=0;
var HI=0;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  collided=loadImage("how-to-draw-a-monkey-step-11.png");

}



function setup() {

  //

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1
  monkey.addAnimation("collided",collided);

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log = (ground.x);
  
 
  
bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  

  

  

}


function draw() {
  background("pink");
 

  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE:" + score, 300, 20);
  
  fill("cyan")
  text(HI,330,50);
  if(score>HI){
    HI=score;
    
  }
  fill("cyan")
text("HI:",300,50)
   
  stroke("black");
  textSize(20);
  fill("black");

  fill("black")
  text(survivalTime, 200, 20);
  text("SURVIVALTIME:",10,20)
  
  if(gameState==PLAY){
    
  food();
  obstacles();
  
   monkey.addAnimation("running", monkey_running)
    
  if (monkey.isTouching(bananaGroup)) {
    score = score + 2;
    bananaGroup.destroyEach();
  } 
    
  survivalTime = Math.round(frameCount /frameRate())

  if (ground.x < 200) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space") && monkey.y > 200) {
    monkey.velocityY = -11;
  }
  
monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  }
  
  else if(gameState===END){
    monkey.velocityX=0;
    monkey.velocityY=0;
    ground.velocityX=0;

    
    monkey.changeAnimation("collided",collided);
   monkey.scale=0.3;
    
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
    fill("purple")
    text("PRESS ENTER TO RESTART",100,200);
   
    
  
    
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
     
    if(keyDown("enter")){
     reset();
    }
  }
  

  

  drawSprites();
 
}

function food() {
  if (World.frameCount % 80 == 0) {
    banana = createSprite(400, 350, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 140;
    bananaGroup.add(banana);


  }
}

function obstacles() {

  if (World.frameCount % 300 == 0) {

    obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 200;
    obstacle.velocityX = -6;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }
  }

function reset(){
  gameState=PLAY;
  score=0;
  survivalTime=0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
}