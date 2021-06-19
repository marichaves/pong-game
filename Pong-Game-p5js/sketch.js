// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro /2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostrabolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW) && yRaquete >= 0){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW ) && yRaquete <= (400 - raqueteAltura)){
    yRaquete += 10;
  }

}


function movimentaRaqueteOponente(){
   if (keyIsDown(SHIFT)  && yRaqueteOponente >= 0){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(CONTROL) && yRaqueteOponente <= (400 - raqueteAltura)){
    yRaqueteOponente += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento &&  yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function verificaColisaoRaqueteOponente(){
  if (xBolinha + raio > xRaqueteOponente &&  yBolinha - raio < yRaqueteOponente + raqueteAltura  && yBolinha + raio > yRaqueteOponente){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function incluiPlacar() {
    stroke(225)
    textAlign(CENTER);
    textSize(16);
    fill(color(204, 0, 82));
    rect(130, 10, 40, 20);
    fill(255);
    text(meusPontos, 150, 26);
    fill(color(204, 0, 82));
    rect(430, 10, 40, 20);
     fill(255);
    text(pontosDoOponente, 450, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
      ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
      ponto.play();
    }
}