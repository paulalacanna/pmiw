class Juego {

  constructor(img, fondo, img3, fin, imgGno,sonidoGameOver, sonidoSalto, sonidomusica) {
    this.fondo = fondo;
    this.imgGno = imgGno;
    this.fin= fin;
    this.sonidoGameOver = sonidoGameOver;
    this.sonidoSalto = sonidoSalto;
    this.sonidomusica = sonidomusica;
    this.frase = "Gravity Falls comienza cuando los mellizos de 12 años, Dipper y Mabel Pines,\n" +
    "son enviados a pasar el verano con su Tío abuelo Stan en el misterioso pueblo\n" +
    "de Gravity Falls, Oregón. Allí, Dipper encuentra un diario que revela los\n" +
    "extraños secretos paranormales del lugar, lo que los lleva a él y a Mabel a\n" +
    "vivir una serie de aventuras investigando criaturas y anomalías mientras\n" +
    "intentan descifrar los misterios del diario y el auto.";

    this.fraseY = height + 200; //
   this.botonInicio = new Boton(width/2 - 70, height/2 + 100, 150, 50, "Comenzar");
    this.botonReintentar = new Boton(width/2 - 80, height/2 + 60, 160, 50, "Reintentar");
    this.botonJugarOtraVez = new Boton(width/2 - 70, height/2 - 120, 200, 50, "Volver a jugar");



this.tiempoTotal = 10000;   // 60 segundos en milisegundos
    this.tiempoInicio = millis();
    this.tiempoRestante = this.tiempoTotal;

    // Crea a Dipper y le pasa la imagen
    this.dipper = new Dipper(img, 30, 340, img3, this.sonidoSalto);
    this.gnomos = []; // acá guardamos todos los gnomos
    this.nextSpawnTime = millis() + 1500; // primer spawn
    this.distanciaMinima = 200; // píxeles entre gnomos
    this.estado = "inicio";
    this.vidas = 1;
    
    if (!this.sonidomusica.isPlaying()) {
    this.sonidomusica.loop();
  }
  }

mostrarPantallaInicio() {
  image(this.fondo, 0, 0);

  // ----- FRASE ANIMADA -----
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text(this.frase, width/2, this.fraseY);
  this.fraseY -= 1;

  // si TODAVÍA no terminó de subir, NO mostrar el resto
  if (this.fraseY > -250) {
    return; // ← esto evita que aparezcan los textos encima
  }

  // ----- AHORA SÍ aparece el resto -----
  fill(255);
  textAlign(CENTER, TOP);
  textSize(30);
  text("Salta los gnomos por cierto tiempo \n utilizando ESPACIO", width/2, height/2 - 100);

  textSize(30);
  text("Completa el tiempo para ganar,\n si te chocas un gnomo pierdes", width/2, height/2);

this.botonInicio.dibujar();
}


  mostrar() {

    if( this.estado == "inicio"){
      if (!this.sonidomusica.isPlaying()) {
    this.sonidomusica.loop();
  }
     this.mostrarPantallaInicio();
     return;
    }
    
    if (this.estado === "gameover") {
      this.pantallaGameOver();
      return; // NO seguir dibujando el juego
    }
 if (this.estado === "ganaste") {
    this.pantallaGanar();
    return;
  }
  if (this.estado === "jugando") {
  if (this.sonidomusica.isPlaying()) {
      this.sonidomusica.stop();
    }

  // ---- ACTUALIZAR TIEMPO ----
 this.tiempoRestante = this.tiempoTotal - (millis() - this.tiempoInicio);
  if (this.tiempoRestante <= 0) {
    this.estado = "ganaste";
    return;
  }
    image(this.fondo, 0, 0);
   fill(255);
textSize(24);
textAlign(LEFT, TOP);
text("Tiempo: " + floor(this.tiempoRestante / 1000), 20, 20);
    this.dipper.actualizar();  // actualiza el salto
    this.dipper.dibujarDipper();


  this.manejarGnomos(); 
    this.evaluarColisiones();
  }
  }
manejarGnomos() {
    let ultimoGnomo = this.gnomos[this.gnomos.length - 1];

    // condiciones: pasó el tiempo y el último gnomo está a cierta distancia
    let puedeAparecer = millis() > this.nextSpawnTime;
    let distanciaOk = !ultimoGnomo || ultimoGnomo.x < width - this.distanciaMinima;

    if (puedeAparecer && distanciaOk) {
      let imgElegida = this.imgGno[floor(random(this.imgGno.length))];
      this.gnomos.push(new Gnomo(imgElegida, width + 50, 383));
      // tiempo aleatorio entre 1 y 2 segundos
      this.nextSpawnTime = millis() + random(1500, 2000 );
    }
    for (let i = this.gnomos.length - 1; i >= 0; i--) {
      let gnomo = this.gnomos[i];

      gnomo.correr();

      // eliminar los que ya salieron de la pantalla
      if (gnomo.fueraDePantalla()) {
        this.gnomos.splice(i, 1);
      }
    }
  }

  evaluarColisiones() {
    for (let i = 0; i < this.gnomos.length; i++) {

      let g = this.gnomos[i];

      let colision =
        this.dipper.x < g.x + g.ancho &&
        this.dipper.x + this.dipper.tam > g.x &&
        this.dipper.y < g.y + g.alto &&
        this.dipper.y + this.dipper.tam > g.y;

      if (colision) {
        this.vidas--;

        // eliminar ese gnomo para que no choque infinitamente
        this.gnomos.splice(i, 1);

        // si las vidas terminaron → GAME OVER
        if (this.vidas <= 0) {
          this.estado = "gameover";
          this.sonidoGameOver.play();
        }
      }
    }
  }

  pantallaGameOver() {
    background(0, 0, 0, 200);
if (!this.sonidomusica.isPlaying()) {
    this.sonidomusica.loop();
  }
    fill(255);
    textAlign(CENTER);
    textSize(50);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize (15);
    text ("Juego creado por Valentina Gomez Cipollone y Paula Lacanna Moreno", width / 2, height /2 +215);
    this.botonReintentar.dibujar();
  }

pantallaGanar() {
     if (!this.sonidomusica.isPlaying()) {
    this.sonidomusica.loop();
  }
   image(this.fin, 0, 0);
   fill(255);
    textAlign(CENTER);
    textSize(50);
    text("GANASTE", 340, 50);
    textSize (15);
    text ("Juego creado por Valentina Gomez Cipollone y Paula Lacanna Moreno", width / 2, height /2 +215);
    this.botonJugarOtraVez.dibujar();
  }

  reiniciar() {
    this.estado = "inicio";
    this.vidas = 1;
    
    this.gnomos = [];
    this.nextSpawnTime = millis() + 1500;
    
    this.dipper.y = this.dipper.suelo;
    this.dipper.saltando = false;
    
    this.tiempoInicio = millis();  //  reset total del tiempo
    this.tiempoRestante = this.tiempoTotal;
    
     if (!this.sonidomusica.isPlaying()) {
    this.sonidomusica.loop();
  }
  }

  teclas(keyCode) {
    if (keyCode === 32) { // tecla ESPACIO
      this.dipper.saltar();
    }
  }
  click(mx, my) {
   if (this.estado === "inicio" &&
        this.botonInicio.estaPresionado(mx, my)) {
    this.tiempoInicio = millis();
    this.estado = "jugando";
    return;
  }

  if (this.estado === "gameover" &&
        this.botonReintentar.estaPresionado(mx, my)) {
    this.reiniciar();
    return;
  }

    if (this.estado === "ganaste" &&
        this.botonJugarOtraVez.estaPresionado(mx, my)) {
    this.reiniciar();
    return;
  }
}
}
