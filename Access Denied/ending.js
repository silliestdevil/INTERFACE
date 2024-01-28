let myModel;
let modelX = 0;
let modelY = 100;
let modelZ = 0;
let textur;
//rotation 
let rotation1X = 0;
let rotation1Y = 4.7;
let rotation1Z = 0;
let rotationAngleY = 0;
let rotationSpeed = 0.01;
//size increase
let sizeIncrease = 1;
let minScale = 4;
let maxScale = 10;
let currentScale = maxScale;

function preload() { 
  myModel = loadModel('Assets/P5Jscoloured.obj'); //load model 
  textur = loadImage('Assets/red.png'); // load texture
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); //WEBGL 3D model 
  colorMode(RGB);
}

function draw() {
  background(0);

  translate(modelX, modelY, modelZ); 
  rotateX(PI); // invert the rotation of the model 

  currentScale = lerp(currentScale, minScale, 0.01); // calculate and set current scale 
  scale(currentScale);
//rotation of the model 
  rotateX(rotation1X);
  rotateY(rotation1Y);
  rotateZ(rotation1Z);

  strokeWeight(0.5);
  stroke(0);

  texture(textur); // load texture and model 
  model(myModel);

  // Update rotation angle
  rotationAngleY += rotationSpeed;

  console.log("Rotation angle on Y-axis:", rotationAngleY);


// add time scale so after (4 seconds) the alert appears
setTimeout(function() {
  if (currentScale > minScale) {  //if current scale is equal to minimum scale 
  alert('YOU HAVE ESCAPED. Thank you for your data.'); } // alert to signify game has finished
    },7000);

   }



 
  