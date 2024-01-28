//https://p5js.org/examples/motion-circle-collision.html collision detection reference code 
//https://www.youtube.com/watch?v=HK_oG_ev8FQ

let maze;
let ball;
//maze rotation 
let mazeRotationX = 0;
let mazeRotationY = 0;
let lastRotationX = 0;
let lastRotationY = 0;
//ball movement control
let ballShouldMove = true; 
//data input 
let displayingQuestions = true;
let firstQuestionAnswer;
//text 
let letters = []; // letter array
let letters2 = []; // letter array line 2
let letters3 = []; // letter array line 3
let delayFrames = 240; // 2 seconds to begin 
let addedW = false; // Track if first letter has been added
let delayBetweenLetters = 10; //time between letters
let nextLetterTime = 0; // Track when to add the next letter
let lettersToAdd = [];
let lettersToAdd2 = ['T','0',' ','C','O','M','P','L','E','T','E',' ','T','H','E',' ','M','A','Z','E'];
let lettersToAdd3 = ['R','E','A','C','H',' ', 'T','H','E',' ','B','L','U','E',' ','T','I','L','E'] 


//array of questions 
let questions = ["ENTER YOUR NAME TO START THE GAME", "ENTER THE CITY OF YOUR CURRENT LOCATION", "WHAT IS THE LAST WEBSITE YOU VISITED", "WHAT WAS THE LAST THING YOU PURCHASED ONLINE", "WHAT WAS YOUR LAST GOOGLE SEARCH"]; 
let currentQuestionIndex = 0;//questions count

let input, button, question; // input, question and submit button for data


function setup() {
  createCanvas(windowWidth, 550, WEBGL); //main canvas with maze

  extraCanvas = createGraphics(380,400);
  extraCanvas.background(0); // canvas displaying extra text 

  maze = new Maze(); //maze 
  ball = new Ball(0,0); //ball 

  style(); // the css of the data input 
}

function style() {
    //questions 
    question = createP(questions[currentQuestionIndex]);
    question.position(505, 250);
    question.style('font-family', 'monospace');
    question.style('color', 'white');
    question.style('background-color', 'rgb(0,0,0,0.9)');
    question.style('width', '230px');
    question.style('height', '70px');
    question.style('padding', '10px');
    question.style('text-align', 'center');
  
  
  //input bar
  input = createInput();
  input.position(518, 310);
  input.style('font-family', 'monospace');
  input.style('color', 'white');
 input.style('background-color', 'rgb(0,0,0)');

  //Enter button
  button = createButton('ENTER');
  button.position(input.x + input.width, 310);
  button.mousePressed(showNextQuestion);
  button.style('font-family', 'monospace');
  button.style('color', 'white');
  button.style('background-color', 'rgb(0,0,0)');

}

function draw() {
  clear(); // Clear the canvas at the beginning of each frame
  background(0);
  fill(255)

  image(extraCanvas, -600, -250); //display extra canvas 
  extraCanvas.fill(225);
  extraCanvas.textSize(13);
  extraCanvas.textFont('courier'); 

  ballShouldMove = true; // this creates a function so the maze and ball freeze when the game requires data input 
  if (displayingQuestions) {
    // Displaying questions, freeze the ball
    ballShouldMove = false;
  }
    if (ballShouldMove) { // if the ball is moving 
      // Call the mazeRotation function to update rotation values
      maze.mazeRotation();
    } else {
      // Set rotation values to their last known values
      rotateX(lastRotationX);
      rotateY(lastRotationY);
    }

     // Check if the ball has reached the final coordinates
     if (ball.pos.x <= -190 && ball.pos.y >= 190) {
      // Display alert and reset the game or perform any other actions
      alert('Congratulations! You have completed the game.');
      // The game then enters a final interface 
      window.open("EndScreen.html"); 
    }
  
  // calls all function in the draw function 
  displayGreeting(); 
  maze.display();
  ball.edges();
  ball.updatePosition(mazeRotationX, mazeRotationY);
  ball.show();
}


//function that asks the next data input question 
function showNextQuestion() { 
  //check if input value is not empty
  if (input.value() !== '') { 
    input.hide();
    button.hide();
    question.hide(); // hide the question, button and input elements

    //disable question display and ball movement
    displayingQuestions = false;
    ballShouldMove = false; 

    //move to next question 
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
       // If there are more questions, set up for the next question after a delay
      setTimeout(function () {
        style(); // apply styling function 
        question.html(questions[currentQuestionIndex]); //set question text
        input.value(''); // rest input value 
        displayingQuestions = true; //enable display question 
        ballShouldMove = true; // enable ball movement 
        //if ball movement is enabled so its maze rotation 
      }, 10000);

      // Store the answer to the first question
      if (currentQuestionIndex === 1) {
        firstQuestionAnswer = input.value();
      }
  

    } else {
      //if there are no more question hide the button, input and button 
      input.hide();
      button.hide();
      question.hide();
    }
  } else {
    //if input is submitted empty make an alery appear 
    alert('Please input data to proceed.');
  }
}

function displayGreeting() {
  if (firstQuestionAnswer) { // this function runs once it has recieved the first data answer
    const uppercasedAnswer = firstQuestionAnswer.toUpperCase(); //make the letters capitals
  
    //the display greating function displays the text in an animation letter by letter rather than a pop up on the screen. 

    push(); // to display the users name that it inserts 
    if (frameCount < delayFrames && !addedW) { //if frame count is smaller than delayframes add first letter
      lettersToAdd = uppercasedAnswer.split(''); // Split the answer into individual letters
      addedW = true; // Indicate that first letter have been added
      nextLetterTime = frameCount + delayBetweenLetters; // time in between letters
    }

    if (frameCount >= nextLetterTime && lettersToAdd.length > 0) {
      letters.push(lettersToAdd.shift()); // Add the next letter from the array
      nextLetterTime = frameCount + delayBetweenLetters; // Add next letter after 10 frames
    }

    const spacing = 20; // amount of spacing beteen letters 
    // Display the letters from the array
    for (let i = 0; i < letters.length; i++) {
      extraCanvas.text(letters[i], 10 + i * spacing, 60); //display on the extra canvas, add spacing so letters are clear
    }
    console.log(firstQuestionAnswer); 
    pop();
    // the push and pop functions allow me to change the setting for brief parts of the code 

    push(); //repeat for the first line of the greeting 
    if (frameCount < delayFrames && !addedW) {
      letters2.push("I"); // Add "W" only once
      addedW = true; // indicate that "W" has been added
      nextLetterTime = frameCount + delayBetweenLetters;
    }
  
    if (frameCount >= nextLetterTime && lettersToAdd2.length > 0) {
      letters2.push(lettersToAdd2.shift()); // Add the next letter from the array
      nextLetterTime = frameCount + delayBetweenLetters; //add next letter after 10 frames
    }
  
    const spacing2 = 10;
    // Display the letters from the array
    for (let i = 0; i < letters2.length; i++) {
     extraCanvas.text(letters2[i], 10 + i * spacing2, 100);
    }
  pop(); 

  push(); //repeat for the second line of the greeting 
    if (frameCount < delayFrames && !addedW) {
      letters3.push("R"); // Add "W" only once
      addedW = true; // indicate that "W" has been added
      nextLetterTime = frameCount + delayBetweenLetters;
    }
  
    if (frameCount >= nextLetterTime && lettersToAdd3.length > 0) {
      letters3.push(lettersToAdd3.shift()); // Add the next letter from the array
      nextLetterTime = frameCount + delayBetweenLetters; //add next letter after 10 frames
    }
  
    // Display the letters from the array
    for (let i = 0; i < letters3.length; i++) {
     extraCanvas.text(letters3[i], 10 + i * spacing2, 120);
    }
  pop(); 
  }
}


class Maze {
  constructor() { // the maze is made through a custom objects, each individual wall saved through its size and position 
    this.sizePositions = [ 
    { size: [10, 400, 20], positions: [-200, 10, 0] },
    { size: [10, 400, 20], positions: [200, 10, 0] },
    { size: [390, 10, 20], positions: [0, -185, 0] },
    { size: [390, 10, 20], positions: [0, 205, 0] },
    { size: [10, 70, 20], positions: [20, -145, 0] },
    { size: [10, 30, 20], positions: [-20, -165, 0] },
    { size: [70, 10, 20], positions: [-20, -115, 0] },
    { size: [20, 10, 20], positions: [-75, -155, 0] },
    { size: [10, 50, 20], positions: [-60, -135, 0] },
    { size: [10, 30, 20], positions: [-120, -165, 0] },
    { size: [40, 10, 20], positions: [-145, -155, 0] },
    { size: [60, 10, 20], positions: [-135, -115, 0] },
    { size: [10, 60, 20], positions: [-105, -90, 0] },
    { size: [56, 10, 20], positions: [-168, -80, 0] },
    { size: [60, 10, 20], positions: [-70, -80, 0] },
    { size: [10, 40, 20], positions: [-145, -55, 0] },
    { size: [20, 10, 20], positions: [-160, -40, 0] },
    { size: [95, 10, 20], positions: [-148, 0, 0] },
    { size: [10, 27, 20], positions: [-105, -18.5, 0] },
    { size: [60, 10, 20], positions: [-35, -38, 0] },
    { size: [10, 51, 20], positions: [0, -58, 0] },
    { size: [10, 70, 20], positions: [-60, 2, 0] },
    { size: [80, 10, 20], positions: [-95, 42, 0] },
    { size: [10, 42, 20], positions: [-140, 26, 0] },
    { size: [30, 10, 20], positions: [-5, 0, 0] },
    { size: [60, 10, 20], positions: [71, -80, 0] },
    { size: [95, 10, 20], positions: [88, -37, 0] },
    { size: [10, 33, 20], positions: [46, -59, 0] },
    { size: [10, 70, 20], positions: [140, -67, 0] },
    { size: [10, 50, 20], positions: [65, -135, 0] },
    { size: [90, 10, 20], positions: [115, -135, 0] },
    { size: [10, 50, 20], positions: [165, -155, 0] },
    { size: [10, 20, 20], positions: [110, -170, 0] },
    { size: [20, 10, 20], positions: [185, -97, 0] },
    { size: [10, 30, 20], positions: [-15, 20, 0] },
    { size: [60, 10, 20], positions: [10, 40, 0] },
    { size: [10, 40, 20], positions: [35, 15, 0] },
    { size: [10, 50, 20], positions: [80, -7, 0] },
    { size: [10, 30, 20], positions: [80, 60, 0] },
    { size: [150, 10, 20], positions: [10, 80, 0] },
    { size: [10, 30, 20], positions: [-60, 60, 0] },
    { size: [10, 75, 20], positions: [80,162,0] },
    { size: [10, 20, 20], positions: [40,190,0] },
    { size: [40, 10, 20], positions: [145,130,0] },
    { size: [50, 10, 20], positions: [145,170,0] },
    { size: [10, 40, 20], positions: [165,145,0] },
    { size: [10,60,20], positions: [-165, 105,0] },
    { size: [10,20,20], positions: [-170, 35,0] },
    { size: [30,10,20], positions: [-180,50,0] },
    { size: [30,10,20], positions: [-145,80,0] },
    { size: [100,10,20], positions: [-145,170,0] },
    { size: [50,10,20], positions: [-145,140,0] },
    { size: [10,30,20], positions: [-90,160,0] },
    { size: [10,80,20], positions: [-60,160,0] },
    { size: [10, 40, 20], positions: [-30,166,0] },
    { size: [10, 20, 20], positions: [-0,170,0] },
    { size: [10, 50,20], positions: [170, -40,0] },
    { size: [50, 10,20], positions: [60, 120,0] },
    { size: [10, 30,20], positions: [120, 120,0] },
    { size: [10, 40,20], positions: [0, 105,0] },
    { size: [10, 25,20], positions: [40, 138,0] },
    { size: [50, 10,20], positions: [20, 155,0] },
    { size: [50, 10,20], positions: [20, 155,0] },
    { size: [60,10,20], positions: [-60, 115,0] },
    { size: [10,50,20], positions: [-95, 95,0] },
    { size: [10,40,20], positions: [-125, 95,0] },
    { size: [80, 10,20], positions: [155, 100, 0] },
    { size: [40, 10,20], positions: [175,60, 0] },
    { size: [10, 30,20], positions: [160,40, 0] },
    { size: [20, 10,20], positions: [155, -60,0] },
    { size: [20, 10,20], positions: [185, -20,0] },
    { size: [150, 10,20], positions: [10,80, 0] },
    { size: [10, 28, 20], positions: [-60,61, 0] },
    { size: [10, 60, 20], positions: [120,35, 0] },
    { size: [30, 10,20], positions: [100, 60, 0] },
    { size: [30, 10,20], positions: [130, 0, 0] },

    { size: [20,25,1], positions: [-185, 190, -10]} //end point needs to be able to move over

  
    ];
  } 

getSizePositions() {
return this.sizePositions;
} 

mazeRotation() { // this function makes the maze rotation set to mouse control 
  // Map mouseY to a range between -PI and PI
  let mappedY = map(mouseY, 0, height, -PI, PI);

  // Constrain the mapped value to be between 0.9 and 1.9 for rotationX
  mazeRotationX = constrain(mappedY, 0.9, 1.9);

  // Map mouseX to a range between -PI and PI
  let mappedX = map(mouseX, 0, width, -PI, PI);

  // Constrain the mapped value to be between -0.5 and 0.5 for rotationY
  mazeRotationY = constrain(mappedX, -0.5, 0.5);

//controls orientation of maze
 rotateX(mazeRotationX); 
 rotateY(mazeRotationY);

 lastRotationX = mazeRotationX; //save the last rotation of maze on X axis
 lastRotationY = mazeRotationY; //save the last rotation of maze on Y axis

}

// ball 
display() {
  // Displaying the maze
  for (let i = 0; i < this.sizePositions.length; i++) {
    push(); // Save the current transformation matrix

    if (i === 76) {
      // Make the first box transparent and red
      fill(31, 27, 83); // Red color with 150 alpha (transparency)
    }else{
      fill(255,0,0);
    }
    // Separate the position and translation for the current box
    let { size, positions } = this.sizePositions[i];
   // Lighter red for the top
   stroke( 178, 34, 34)
    translate(positions[0], positions[1], positions[2]);
    box(size[0], size[1], size[2]);
    pop(); // Restore the previous transformation matrix
  }
}}


class Ball {
  constructor(){
       this.radius = 5
       this.pos = createVector(0, -190);
       // Calculate the velocity components based on the rotation angles
  }
    
edges() { // the balls boundaries (collision detection)
  for (let i = 0; i < maze.getSizePositions().length - 1; i++) {
    let { size, positions } = maze.getSizePositions()[i]; // loops in all of maze apart from the end position 

    let minX = positions[0] - size[0] / 2;
    let maxX = positions[0] + size[0] / 2;
    let minY = positions[1] - size[1] / 2;
    let maxY = positions[1] + size[1] / 2;
    //the boundaries of the maze based on positions and size, like a floor space map 

    let closestX = constrain(this.pos.x, minX, maxX);
    let closestY = constrain(this.pos.y, minY, maxY);
    //where the ball is constrained within, the boundaries of the maze 

    let distanceX = this.pos.x - closestX;
    let distanceY = this.pos.y - closestY;
    //the distance of the ball to its current closest point of the maze 

    let distanceSquared = distanceX * distanceX + distanceY * distanceY;
    //the distance squared, calculation used to detect collision 

    if (distanceSquared < this.radius * this.radius) {
      // Ball hits a maze element, prevent it from going through the wall
      //if the distance squared is smaller than the balls radius squared a collision is detected
      let angle = atan2(distanceY, distanceX);
      // this calculates the angle the ball has hit the maze, angle from the center of the ball 
      //the balls position is adjusted to be just outside of the wall
      this.pos.x = closestX + cos(angle) * (this.radius + 1);//new x coordinate
      this.pos.y = closestY + sin(angle) * (this.radius + 1);//new y coordinate
      
    }
  }
}

  show(){ // the display settings of the ball 
  push();
  translate(this.pos.x, this.pos.y) 
  stroke(225); 
  sphere(this.radius)
  pop();
  }


 updatePosition() { // this is the balls movement 
    if ((maze.mazeRotation &&
      (mazeRotationX >= -1 && mazeRotationX <= 1.7) || (mazeRotationX <= -1 || mazeRotationX >= 1.8) ||
        (mazeRotationY >= -1 && mazeRotationY <= 0) || (mazeRotationY <= -1 || mazeRotationY >= 0))) {
      //its movement being tied to the mazes rotation 

      let targetY = (mazeRotationX >= -1 && mazeRotationX <= 1.8) ? 200 : -350;
      let targetX = (mazeRotationY >= -1.2 && mazeRotationY <= 0) ? -350 : 190; // targets for the ball 

    // Interpolate the ball's position towards the target
     this.pos.x = lerp(this.pos.x, targetX, 0.01);
     this.pos.y = lerp(this.pos.y, targetY, 0.01);
    }
  }
}



// every 10 seconds the ball stops and goes through an array of quiestions which ask for your data 

