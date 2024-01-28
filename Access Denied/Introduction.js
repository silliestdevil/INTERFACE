//letter array 
let letters = []; // letter array 
let letters2 = []; // letter array 
let delayFrames = 240; // 2 seconds to being 
let addedW = false; // Track if first letter has been added 
let delayBetweenLetters = 10; // 1/6 of a second between letters
let nextLetterTime = 0; // Track when to add the next letter
let lettersToAdd = ["E","L","C","O","M","E"," ","T","O"," ","T","H","E"," ","G","A","M","E"]; // Letters to add
let lettersToAdd2 = ["C","L","I","C","K"," ","T","O"," ","S","T","A","R","T"]; // Letters to add

//Door animation 
let outerX = 20; // outer box Left door 
let outerY = 40;
let BouterX = 20; // outer box Right door 
let BouterY = 40;
let angleL = 0; // rotation 
let angleR = 0;
let targetAngleL = 0; // target Angle
let targetAngleR = 0;
let angleIncrementL = 0.01; // spped of rotation 
let angleIncrementR = -0.013;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WEBGL due to animation 

  topWords = createGraphics(650, 100); //Canvas for first line of text
  topWords.background(0);

  bottomWords = createGraphics(650, 100); //Canvas for second line of text 
  bottomWords.background(0); 

  frameRate(60)// set frame rate 

  //styling for extra canvas's 
  topWords.textSize(20); 
  topWords.textFont('monospace'); 
  bottomWords.textSize(15); 
  bottomWords.textFont('monospace'); 
  
}

function mousePressed() { // when mouse is pressed rotate doors and entre next interface
  targetAngleL = PI/3;
  targetAngleR = PI/3;
  setTimeout(function() { //interface is only opened when doors open 
      if (angleL < 200) {//target position 1/3 of full rotation 
  window.open("Game.html"); } //open next interface
  },2500);
}

function draw(){
  background(0);
  fill(0); 
  stroke(2);
  stroke(18, 69, 26);

//call functions 
 typography(); 
 doors(); 

}

// this function animates the text to come in letter by letter
function typography() {

  image(topWords, -240, -250);
  push(); // the title
  topWords.fill(18, 69, 26);

  if (frameCount < delayFrames && !addedW) { //if frame count is smaller than delayframes add first letter
    letters.push("W"); //push the first letter
    addedW = true; // Indicate that first letter have been added
    nextLetterTime = frameCount + delayBetweenLetters; // time in between letters
  }

  if (frameCount >= nextLetterTime && lettersToAdd.length > 0) {
    letters.push(lettersToAdd.shift()); // Add the next letter from the array
    nextLetterTime = frameCount + delayBetweenLetters; //add next letter after 10 frames
  }

  const spacing = 20;// amount of spacing beteen letters 
  // Display the letters from the array
  for (let i = 0; i < letters.length; i++) {
   topWords.text(letters[i], 40 + i * spacing, 60);//display on the extra canvas, add spacing so letters are clear
  }
pop();// the push and pop functions allow me to change the setting for brief parts of the code 

  image(bottomWords, -500, 100);
push(); // repeat for second part of code 

  bottomWords.fill(225);
  if (frameCount < delayFrames && !addedW) {
    letters2.push("C"); // Add "W" only once
    addedW = true; // indicate that "W" has been added
    nextLetterTime = frameCount + delayBetweenLetters;
  }

  if (frameCount >= nextLetterTime && lettersToAdd2.length > 0) {
    letters2.push(lettersToAdd2.shift()); // Add the next letter from the array
    nextLetterTime = frameCount + delayBetweenLetters; //add next letter after 10 frames
  }

  const spacing2 = 20;
  // Display the letters from the array
  for (let i = 0; i < letters2.length; i++) {
   bottomWords.text(letters2[i], 40 + i * spacing2, 60);
  }
pop(); 
}


function doors(){

  // Door 1
  push(); 
  translate(-110, -8, 0); // Position of rotation center for Door 1
  rotateY(angleL);

  // Check if mouse is pressed and increment angleL
  if (angleL < targetAngleL) {
    angleL += angleIncrementL;
  }

  // Translate to the position of box elements for Door 1
  translate(60, -10, 10);

  // Outer box for Door 1
  let outerZ = 10;
  box(80, 160, outerZ);

  // Inner box for Door 1
  let innerX = outerX;
  let innerZ = outerZ;
  translate(innerX - 20, outerY - 40, innerZ - 10);
  box(60, 120, innerZ);

  // Inner2 box for Door 1
  let inner2X = innerX;
  let inner2Z = outerZ;
  translate(inner2X - 20, 0, 0);
  box(40, 80, inner2Z);

  // Inner3 box for Door 1
  let inner3X = inner2X;
  let inner3Z = outerZ;
  translate(inner3X - inner2X, 0, 0);
  box(20, 40, inner3Z);

  // Log current angle for Door 1
  console.log("angle:", angleL);
  pop(); 

  // Door 2 
  push();
  translate(72, -38, 20); // Position of rotation center for Door 2
  rotateY(angleR);

  // Check if mouse is pressed and increment angleR
  if (angleR < targetAngleR && angleR >= -1.20) {
    angleR += angleIncrementR;
  }

  // Translate to the position of box elements for Door 2
  translate(-40, 20, -10);

  // Outer box for Door 2
  let BouterZ = 10;
  box(80, 160, BouterZ);

  // Inner box for Door 2
  let BinnerX = BouterX;
  let BinnerZ = BouterZ;
  translate(BinnerX - 20, BouterY - 40, BinnerZ - 10);
  box(60, 120, BinnerZ);

  // Inner2 box for Door 2
  let Binner2X = BinnerX;
  let Binner2Z = BouterZ;
  translate(Binner2X - 20, 0, 0);
  box(40, 80, Binner2Z);

  // Inner3 box for Door 2
  let Binner3X = Binner2X;
  let Binner3Z = BouterZ;
  translate(Binner3X - Binner2X, 0, 0);
  box(20, 40, Binner3Z);

  // Log current angle for Door 2
  console.log("angle:", angleR);
  pop(); 
  // image(doorRight, 400, 300); 
}

