function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    for (let i = 0; i < 10; i++) { 
        bullets.push(createBullet()); // Create and store 10 bullets in the array }
     }
}

let bullets = [];
let Spaceship;
let health=3; 
let currenthealth=3;
let hit=false;
let gameOver=false;
let MainMenu=true;
let userclicked=false;
let MenuPass = false;

let timer = 3;
let interval = 1000;
let lastTime = 0; //timer for bullets

let timer2 = 3;
let interval2 = 1000;
let lastTime2 = 0; //timer for Game Start delay
let BotBorder;
let TopBorder;
let ShipBorder;


function preload() {
    BG = loadImage("Images/BG.png");
    HEALTH = loadImage("Images/Health.png");
    MENU = loadImage("Images/Menu.Game.png");
    SHIP = loadImage("Images/Ship.png");
    SHIPRED = loadImage("Images/ShipRED.png");
    UI = loadImage("Images/UI.png");
    UIRED = loadImage("Images/UIRED.png");
    ROCK = loadImage("Images/Rock2.png");
    
  
  }  

function mousePressed() {
    userclicked = true; //allows start
    MenuPass=true;
    
  
    if (MenuPass == true && mouseX < width/1.3+width/20 && mouseX >   width/1.3-width/20 && mouseY < height/1.5+height/40 && mouseY >  height/1.5-height/40) {    //menu button
          fill("green");
          MenuPass = false;
          userclicked = false
          health = 3;
          gameOver = false;
          timer = 2;
          hit = false;
          interval = 1000;
          lastTime = 0;
          timer2 = 3;
          }
    
  }
  
function draw() {
      let BotBorder = 600-height/6;
      let TopBorder = 0;
  
      background("rgb(57,82,57)");
      imageMode(CENTER);
      image(MENU, width/2, height/3, width, height/3);
      image(SHIP, width/2, height/1.6, width/8, width/8);
      textSize(30);
      textFont("Orbitron");
      textAlign(CENTER);
      fill("black");
      text("Click to Start!", width/2, height/1.3);
      imageMode(BOTTOM);
      image(UI, width/2, height/1.065, width/'.9', height/8) 
      
    fill(0, 255, 0);
    textSize(20)
    text("Health:", width/14, height/1.03);
    imageMode(CENTER);
    image(HEALTH, width/6, height/1.04);
    image(HEALTH, width/5, height/1.04);
    image(HEALTH, width/4.3, height/1.04);
    
      if (health <= 0 && MenuPass == true) { //Game Over Screen
      gameOver = true;
        
      background(220);
      fill(255, 255, 255);
        if (gameOver == true && mouseX < width/4+width/12 && mouseX >         width/4-width/12 && mouseY < height/1.5+height/40 && mouseY > height/1.5-height/40 && mouseIsPressed) {    //restart hitbox 
          gameOver = false;
          health = 3;
          currenthealth = 3;
          timer = 2;
          hit = false;
          interval = 1000;
          lastTime = 0;
          
          }
    
  
    
      rectMode(CENTER); //Game Over Screen Text
      rect(width/2, height/2, width)  
    
      //fill("lightblue");
      //rect(width/4, height/1.5, width/6, height/20) 
    
      //fill("lightblue");
      //rect(width/1.3, height/1.5, width/10, height/20) 
    
      fill("white");
      textSize(40);
      textAlign(CENTER);
      text("GAME OVER", width/2, height/2);
      textSize(20);
      text("RESTART", width/4, height/1.5);
      text("MENU", width/1.3, height/1.5);
    }
  
    
  if (health > 0 && userclicked ==true) {  // Game Start Delay
    let currentTime2 = millis(); 
    
    rectMode(CENTER);
    fill("rgb(57,82,57)");
    noStroke();
    rect(width/2, height/1.3, 250, 50) //Starting in...
    textSize(30);
    fill("black");
    text("Starting in...", width/2, height/1.3);
    text(timer2, width/1.5, height/1.3);
    
    if (currentTime2 - lastTime2 >= interval2 && timer2 >0) { 
      timer2--;       
      lastTime2 = currentTime2; 
    }
    if (timer2 == 0) {  
    
    
    image(BG, width/2, height/2, width, height); //sky BG
      
    for (let bullet of bullets) {  
    updateBullet(bullet); //update bullet Y pos
    displayBullet(bullet); 
    
    imageMode(BOTTOM);
    image(UI, width/2, height/1.065, width/'.9', height/8);
    imageMode(CENTER);  
      
    fill(0, 255, 0);
    textSize(20)
    text("Health:", width/14, height/1.03);
          if (currenthealth == 3) {
            imageMode(CENTER);
            image(HEALTH, width/6, height/1.04);
            image(HEALTH, width/5, height/1.04);
            image(HEALTH, width/4.3, height/1.04);
        }
        else if (currenthealth == 2) {
            image(HEALTH, width/6, height/1.04);
            image(HEALTH, width/5, height/1.04);
        }
        else if (currenthealth == 1) {
            image(HEALTH, width/6, height/1.04);
        }
      
      if (bullet.y > height) {
      resetBullet(bullet);
      } //resets bullet if it reaches bottom of canvas
    
    rectMode(CENTER)  
    
      if (bullet.y+10 > mouseY-25 && bullet.y-10 < mouseY+25 && bullet.x+10 > mouseX-25 && bullet.x-10 < mouseX+25 && hit==false) {
        //fill(255, 0, 0);
        ShipBorder = constrain(mouseY, TopBorder, BotBorder);
  
  
        image(SHIPRED, mouseX, ShipBorder, 50, 50); //turns only ship red
        //fill(0,255,0)
        imageMode(BOTTOM);
        image(UIRED, width/2, height/1.065, width/'.9', height/8);
        imageMode(CENTER);
        
        health-- //removes 1 health when hit
        currenthealth = health;
        
        
        fill("black");
        textSize(20)
        text("Health:", width/14, height/1.03);
        if (currenthealth == 3) {
            imageMode(CENTER);
            image(HEALTH, width/6, height/1.04);
            image(HEALTH, width/5, height/1.04);
            image(HEALTH, width/4.3, height/1.04);
        }
        else if (currenthealth == 2) {
            image(HEALTH, width/6, height/1.04);
            image(HEALTH, width/5, height/1.04);
        }
        else if (currenthealth == 1) {
            image(HEALTH, width/6, height/1.04);
        }
        
        //text(currenthealth, width/5, height/10);
        hit = true;
        
    } 
      else if (bullet.y+10 > mouseY-25 && bullet.y-10 < mouseY+25 && bullet.x+10 > mouseX-25 && bullet.x-10 < mouseX+25 && hit==true) {
        let currentTime = millis(); //timer countdown
        if (currentTime - lastTime >= interval && timer >0) { 
          timer--;       
          lastTime = currentTime; 
        }
        if (timer > 0) {
          ShipBorder = constrain(mouseY, TopBorder, BotBorder);
          image(SHIP, mouseX, ShipBorder, 50, 50);
  
        }
        if (timer == 0) {// time before you can be hit again
          ShipBorder = constrain(mouseY, TopBorder, BotBorder);
          image(SHIPRED, mouseX, ShipBorder, 50, 50); //turns only ship red
          
  
          fill("black");
          textSize(20)
          text("Health:", width/14, height/1.03);
          //text(currenthealth, width/5, height/10);
          if (currenthealth == 3) {
            imageMode(CENTER);
            image(HEALTH, width/6, height/1.04);
            image(HEALTH, width/5, height/1.04);
            image(HEALTH, width/4.3, height/1.04);
          }
          else if (currenthealth == 2) {
            image(HEALTH, width/6, height/1.04);
            image(HEALTH, width/5, height/1.04);
          }
          else if (currenthealth == 1) {
            image(HEALTH, width/6, height/1.04);
          }
          fill(0, 255, 0);
  
          timer = 2;
          interval = 1000;
          lastTime = 0;
          hit = false;
  
          }
        
      }
      else {
        ShipBorder = constrain(mouseY, TopBorder, BotBorder);
        fill(0, 255, 0);
        image(SHIP, mouseX, ShipBorder, 50, 50);
  
    }  
    
      } //for each bullet
     } //starting in...
    } //game start delay
  
  }
  
  
function createBullet () {
    return {
      x: random(width), //random X pos
      y:0,              //starts at top of canvas
      size:width/30,
      speed: random (2, 5),
      color: color("purple")
    }; 
  }
function updateBullet(bullet) { //adds random speed to Y
    bullet.y += bullet.speed; 
  }
  
function displayBullet(bullet) {//bullet look
    fill(bullet.color);
    noStroke();
    ellipse(bullet.x, bullet.y, bullet.size)
    //image(ROCK, bullet.x, bullet.y);
  }
  
function resetBullet(bullet) {//resets bullet function
    bullet.x = random(width);
    bullet.y = 0
  }
  
  
