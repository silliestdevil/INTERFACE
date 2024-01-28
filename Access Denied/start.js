//3D Head
let myModel
let modelX = 0;
let modelY = 100;
let modelZ = 0;
//rotation 
let rotation1X = 0;
let rotation1Y = 0;  
let rotation1Z = 0;  
let rotationAngleX = 0;
let rotationAngleY = 0;
let rotationSpeed = 0.01;
let isSpinning = true;
//time
let startTime;
//size
let sizeIncrease = 1;


function preload() { // Preload 
    myModel = loadModel('Assets/P5Jscoloured.obj'); // 3D model made in Blender
    textur = loadImage('Assets/red.png'); // colour texture of head
  }

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); //WEBGL because of 3D model 
    startTime = millis();
    colorMode(RGB)
}

  function draw() {
    background(0);
 
    translate(modelX, modelY, modelZ);  // Set the position of the model
    rotateX(PI);  // Rotate the model upside down by inverting the X-axis rotation
    // Set the rotation of the model
    rotateX(rotation1X);
    rotateY(rotationAngleY);
    rotateZ(rotation1Z);

     
    scale(sizeIncrease); // to increase the scale
    scale(4); // the intial scale it is 
    strokeWeight(0.5);
    stroke(0);
    texture(textur); // apply texture
  
    model(myModel); // apply model


// This function controls the spinning of the model 

    if (isSpinning) { //check if its spinning 
       // Increment the rotation angle around the X-axis
      rotationAngleX += rotationSpeed;
      // Ensure the rotation angle around the X-axis stays within a full circle (0 to 2π)
      rotationAngleX = rotationAngleX % (2 * PI);
      // Increment the rotation angle around the Y-axis 
      rotationAngleY += rotationSpeed;
  }
 

  //Make the head spin till it faces the front on the interface 
    if (rotationAngleX < 4.7) {    //check if rotation angle on x axis is greater than 4.7 
      isSpinning = true; // if it is keep spinning 
    } else {
      isSpinning = false; // if its not stop spinning 
//Once at the centre scale up the model
      sizeIncrease += 0.007; // so the model gradually gets bigger
      if (sizeIncrease > 3) { // once its increased so the mouth consumes the screen
      
        window.open("Introduction.html"); // open the next interface 
      }
  }

  console.log("Rotation angle on X-axis:", rotationAngleX);
//due to size and import of model the angle isn't based on 360 degrees 



}