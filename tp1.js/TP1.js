//https://youtu.be/QGtsVeC7ieo

let img;
let c1;

function preload() {
  img = loadImage("imagen1.JPG"); 
}

function setup() {
  createCanvas(800, 400);
  c1 = color(255);
  strokeWeight(20);
}

function draw() {
  image(img, 0, 0, 400, 400);
  fill(c1);
  rect(400, 0, 400, 400); //
  stroke(0);
  strokeWeight(18);

  for (let i = 0; i < 5; i++) {
    line(410, 8 + i * 40, 590, 8 + i * 40); // Dibuja líneas horizontales arriba
  }
  for (let i = 0; i < 5; i++) {
    line(615, 200 + i * 43, 800, 200 + i * 43); // Dibuja líneas horizontales abajo
  }
  for (let i = 0; i < 5; i++) {
    let xPos = 595 + i * 45;
    line(xPos, 0, xPos, 200); // Dibuja líneas verticales arriba
  }
  for (let i = 0; i < 5; i++) {
    let xPos = 408 + i * 40;
    line(xPos, 400, xPos, 210); // Dibuja líneas verticales abajo
  }

  dibujarCentroConForAnidado(600, height / 2);
}

function cantidadDeCirculos(alto, ancho) { 
  return ((alto / ancho) * 8 + 2);
}

function dibujarCentroConForAnidado(posX, posY) {
  let cantidad = cantidadDeCirculos(height, width); 
  for (let fila = 0; fila < 1; fila++) {
    for (let i = cantidad; i > 0; i--) {
      if (i % 2 == 0) {
        fill(0);
      } else {
        fill(255);

        if (key === 'g') {
          fill(0, 255, 0);
          strokeWeight(2);
        } else if (key === 'b') {
          fill(0, 0, 255);
          strokeWeight(2);
        } else if (key === 'i') {
          fill(255, 105, 180);
          strokeWeight(2);
        } else if (key === 'l') {
          fill(255, 255, 0);
          strokeWeight(2);
        }
      }
      noStroke();
      ellipse(posX, posY, i * 40, i * 40);
    }
  }
}

function mouseMoved() {
  c1 = color(random(255), random(255), random(255));
}

function keyPressed() {
  if (key === 'r') {
    c1 = color(255);
  }
}
