
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup   
var ground,invisibleGround;
var score=0;

var PLAY=0;
var END=1;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,200)
  
  monkey=createSprite(50,60,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(0,182,1000,10);
  ground.shapeColor="grey";
  ground.visible= true
  
  invisibleGround=createSprite(0,184,1000,10);
  invisibleGround.shapeColor="blue";
  invisibleGround.visible= false 
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  }


function draw() {
background("white");
  
if (gameState===PLAY){
  text("survival time:"+score,500,50);
  
  score = score + Math.round(getFrameRate()/60);
  
  ground.velocityX=-3;
  
  if(ground.x < 0){
  ground.x = ground.width/2;
  }
  
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
  
  food();
  obstacles();
  
  if(keyDown("j")&& monkey.y >= 100 ) {
        monkey.velocityY = -10;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
}
 else if(gameState===END){
   FoodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
   
   ground.velocityX=0;
   
   FoodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
 } 
  
  monkey.collide(invisibleGround);
  
drawSprites();  
  
}

function food (){
if (frameCount %120 === 0){
  banana=createSprite(500,100,50,50);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-3;
  banana.y=Math.round(random(50,120))
  FoodGroup.add(banana);
  banana.lifetime=200;
}
 }

function obstacles () {
if (frameCount % 100 === 0){
  obstacle=createSprite(600,167,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-3;
  obstacle.scale=0.1;
  obstacleGroup.add(obstacle);
  obstacle.collide(invisibleGround);
  obstacle.lifetime=200;
} 
 }




