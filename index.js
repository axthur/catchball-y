// Obtém uma referência para o elemento canvas
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const points = [
    document.getElementById('player0points'),
    document.getElementById('player1points')
];

// Define a gravidade
let gravity = 0.5;
let speed = 10;

// Cria uma classe bola
class Ball {
    constructor(color, x, y, d, dx, dy) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.d = d;
        this.dx = dx;
        this.dy = dy;
    }
}

const ballRadius = 30;

// Define as coordenadas iniciais
let initialWidth = canvas.width / 2;
let initialHeight = canvas.height / 2;

// Define os jogadores
let players = [
    new Ball('red', initialWidth, initialHeight, -1, 0, 0),
    new Ball('blue', initialWidth, initialHeight, -1, 0, 0)
];

// Função para desenhar a bola no canvas
function drawBall(player) {
    context.beginPath();
    context.fillStyle = player.color;
    context.arc(player.x, player.y, ballRadius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

// Função para verificar a colisão entre as bolas
function checkCollision() {
    players.forEach(
        player => {
            let deltaX = player.x - fruitX;
            let deltaY = player.y - fruitY;
            let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance <= ballRadius) {
                var point = points[players.indexOf(player)];
                var value = point.innerText;
                value++;
                point.innerText = value;
                generateFruit();
            }
        }
    );
}

// Função para atualizar a posição da bola
function updatePosition() {
    players.forEach(
        player => {
            player.dy += gravity;

            player.x += player.dx;
            player.y += player.dy;

            if (player.x + ballRadius >= canvas.width) {
                player.x = canvas.width - ballRadius;
            } else if (player.x < ballRadius) {
                player.x = ballRadius;
            }

            if (player.y + ballRadius >= canvas.height) {
                player.y = canvas.height - ballRadius;
            } else if (player.y < ballRadius) {
                player.y = ballRadius;
            }

        }
    )
}

// Desenha uma fruta
var fruitX, fruitY;

function generateFruit() {
    context.beginPath();

    fruitX = Math.floor(Math.random() * 600);
    fruitY = Math.floor(Math.random() * 600);

    context.arc(fruitX, fruitY, ballRadius / 3, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function keepFruit() {
    context.beginPath();
    context.arc(fruitX, fruitY, ballRadius / 3, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

// Função para limpar o canvas e redesenhar a bola na nova posição
function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    keepFruit();
    players.forEach(player => { drawBall(player); })
}

// Função para lidar com os eventos de teclado
function handleKeyDown(event) {
    // Player 0
    // Move para a esquerda
    if (event.keyCode === 65) {
        players[0].dx = -speed;
        console.log(players[0].x);
    }
    // Move para cima
    else if (event.keyCode === 87) {
        players[0].dy = -speed;
    }
    // Move para a direita
    else if (event.keyCode === 68) {
        players[0].dx = speed;
        console.log(players[0].x);
    }
    // Move para baixo
    else if (event.keyCode === 83) {
        players[0].dy = speed;
    }

    // Player 1
    // Move para a esquerda
    if (event.keyCode === 37) {
        players[1].dx = -speed;
    }
    // Move para cima
    else if (event.keyCode === 38) {
        players[1].dy = -speed;
    }
    // Move para a direita
    else if (event.keyCode === 39) {
        players[1].dx = speed;
    }
    // Move para baixo
    else if (event.keyCode === 40) {
        players[1].dy = speed;
    }
}

// Função para lidar com a liberação das teclas
function handleKeyUp(event) {
    // Player 0
    // Para a movimentação na direção horizontal
    if (event.keyCode === 65 || event.keyCode === 68) {
        players[0].dx = 0;
    }
    // Para a movimentação na direção vertical
    else if (event.keyCode === 87 || event.keyCode === 83) {
        players[0].dy = 0;
    }

    // Player 1
    // Para a movimentação na direção horizontal
    if (event.keyCode === 37 || event.keyCode === 39) {
        players[1].dx = 0;
    }
    // Para a movimentação na direção vertical
    else if (event.keyCode === 38 || event.keyCode === 40) {
        players[1].dy = 0;
    }
}

// Adiciona listeners de eventos de teclado
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Função de animação
let start = true;
function animate() {
    updatePosition();
    updateCanvas();

    if (start) generateFruit();
    start = false;
    checkCollision();

    requestAnimationFrame(animate);
}

// Inicia a animação
animate();
