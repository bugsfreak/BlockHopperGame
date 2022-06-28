//Se declaran las variables iniciales tanto para el dibujo del canvas como las variables iniciales del jugador
//También se usan datos como la gravedad y el intervalo en el que se actualiza el canvas
var canvasAncho = 600;
var canvasAltura = 400;
var jugador;
var posicionYjugador = 200;
var gravedad = 0;
var intervalo = setInterval(actualizarCanvas, 20);
var saltando = false;
var velocidadSalto = 0;
var block;
var score = 0;
var scorelabel;


//La función sirve para llamar todas las propiedades del juego
function EmpezarJuego(){
    juegoCanvas.start();
    jugador = new crearJugador(30,30,10);

    block = new crearBloque();

    scorelabel = new crearScoreLabel(10,30);

}

//Se clara la variable inicial para el dibujo del canvas, el ancho y el alto de la pantalla
var juegoCanvas = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = canvasAncho;
        this.canvas.height = canvasAltura;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    }

}

//Función que crea el jugador colocando el ancho y alto del cuadrado así como su posición inicial el x.
function crearJugador(ancho, alto, x){
    this.ancho = ancho;
    this.alto = alto;
    this.x = x;
    this.y = posicionYjugador;

    //Dibuja su lugar en el canvas
    this.dibujar = function(){
        ctx = juegoCanvas.context;
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    }
    
    //Añade gravedad al jugador haciendo que se aumente su caida en 0.1.
    this.caida = function(){
        if(!saltando){
            this.y += gravedad;
            gravedad += 0.3;
            this.parar();
        }
    }

    //Coloca un tope para el jugador, una vez que llegue al suelo se cancela la gravedad.
    this.parar = function(){
        var suelo = canvasAltura - this.alto;
        if(this.y > suelo){
            this.y = suelo;
        }
    }

    this.saltar = function(){
        if(saltando){
            this.y -= velocidadSalto;
            velocidadSalto += 0.3;
        }
    }
    
}

//Función que crea los bloques enemigos con un ancho y alto aleatorio en un mínimo y máximo.
function crearBloque(){
    var ancho = numeroAleatorio(10,50);
    var alto = numeroAleatorio(10,200);
    var velocidad = numeroAleatorio(2,6);

    this.x = canvasAncho;
    this.y = canvasAltura - alto;

    this.dibujar = function(){
        ctx = juegoCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, ancho, alto);
    }

    this.atacar = function(){
        this.x -= velocidad;
        this.regresarPosicionAtaque();
    }

    this.regresarPosicionAtaque = function(){
        if (this.x < 0){
            ancho = numeroAleatorio(10,50);
            alto = numeroAleatorio(50,200);
            velocidad = numeroAleatorio(4,6);
            this.y = canvasAltura - alto;
            this.x = canvasAncho;
            score ++;
        }
    }
}

//Función que actualiza el canvas en función a los movimientos que se van haciendo en la pantalla.
function actualizarCanvas(){
    detectarColision();

    ctx = juegoCanvas.context;
    ctx.clearRect(0,0,canvasAncho,canvasAltura);
    jugador.caida();
    jugador.dibujar();
    jugador.saltar();

    block.dibujar();
    block.atacar();

    scorelabel.text = "SCORE: " + score;
    scorelabel.dibujar();
}

//Función que permite la aparición de la puntuación en la pantalla
function crearScoreLabel(x,y){
    this.score = 0;
    this.x = x;
    this.y = y;
    this.dibujar = function(){
        ctx = juegoCanvas.context;
        ctx.font = "25px Consolas";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y)

    }

}

//Función que detecta si el jugador esta chocando con el bloque.
function detectarColision(){
    var jugadorIzquierda = jugador.x;
    var jugadorDerecha = jugador.x + jugador.ancho;
    var blockIzquierda = block.x;
    //var blockDerecha = block.x + block.ancho;

    var jugadorFondo = jugador.y + jugador.alto;
    var blockCima = block.y;

    if(jugadorDerecha > blockIzquierda && jugadorIzquierda < blockIzquierda && jugadorFondo > blockCima){
        juegoCanvas.stop();
    }
}

//Se genera un número aleatorio para la aparición de los bloques
function numeroAleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

//Se reinicia el salto del jugador
function actualizarSalto(){
    saltando = false;
    velocidadSalto = 0;
}

//Se asigna la tecla que se usará el up arrow key
document.body.onkeyup = function(e){
    if(e.keyCode == 38){
        saltando = true;
        setTimeout(function() {actualizarSalto();},1000);
    }
}