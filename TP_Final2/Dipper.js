class Dipper {

  constructor(img, x, y, imgSalto, sonidoSalto) {
    this.mb = img; // guarda la imagen
    this.img3= imgSalto;
    this.x = x;  // posición horizontal
    this.y = y;  // posición vertical
    this.velY = 0;        // velocidad vertical
    this.gravedad = 0.8;  // fuerza que lo hace caer
    this.saltando = false;
    this.suelo = y;       // guarda la posición del piso
    this.contadorIndiceImg = 0;
    this.marcaEnElTiempo = 0;
    this.tam = 60;
    this.sonidoSalto = sonidoSalto;
  }

  dibujarDipper() {
    if (this.saltando) {
      image( this.img3, this.x, this.y);
    } else {
      // si no está saltando, camina
      if ( (millis() - this.marcaEnElTiempo) > 200 ) {  //paso medio segundo
        //
        this.marcaEnElTiempo = millis();
        //
        this.contadorIndiceImg++;
        if ( this.contadorIndiceImg == this.mb.length ) {  //similar a usar % modulo
          this.contadorIndiceImg = 0 ;
        }
      }
      image( this.mb[ this.contadorIndiceImg ], this.x, this.y);
    }
  }



  actualizar() {
    // aplica la física del salto
    if (this.saltando) {
      this.velY += this.gravedad;
      this.y += this.velY;


      // si vuelve al piso, se detiene el salto
      if (this.y >= this.suelo) {
        this.y = this.suelo;
        this.velY = 0;
        this.saltando = false;
      }
    }
  }

  saltar() {
    if (!this.saltando) {
      this.saltando = true;
      this.velY = -20;
      this.sonidoSalto.play();
    }
  }
}
