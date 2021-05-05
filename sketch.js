var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed,fedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed Dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
    })
    fill("white");
    textSize(20);
    if(lastFed>=12){
      text("last Fed : "+ lastFed%12+"PM",150,30);
    }
    else if(lastFed === 0){
      text('last Fed : 12 AM',150,30);
    }
    else{
    text('last Fed : '+ lastFed+ "AM",150,30);
    }
    


  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodValue = foodObj.getFoodStock();
  if(foodValue === 0){
    foodObj.updateFoodStock(0);
  }
  else {
    foodValue = foodValue-1;
    foodObj.updateFoodStock(foodValue);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })


  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
