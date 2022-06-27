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
    this.width = ancho;
    this.height = alto;
    this.x = x;
    this.y = posicionYjugador;

    //Dibuja su lugar en el canvas
    this.dibujar = function(){
        ctx = juegoCanvas.context;
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    //Añade gravedad al jugador haciendo que se aumente su caida en 0.1.
    this.caida = function(){
        this.y += gravedad;
        gravedad += 0.1;

        this.parar();
    }

    //Coloca un tope para el jugador, una vez que llegue al suelo se cancela la gravedad.
    this.parar = function(){
        var suelo = canvasAltura - this.height;
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

//Función que actualiza el canvas en función a los movimientos que se van haciendo en la pantalla.
function actualizarCanvas(){
    ctx = juegoCanvas.context;
    ctx.clearRect(0,0,canvasAncho,canvasAltura);
    jugador.caida();
    jugador.dibujar();
    jugador.saltar();
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