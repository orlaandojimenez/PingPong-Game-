// https://github.com/chamoysvoice/javascript_PONG/
// twiterr: @chamoysvoice
// FB :     Jumpstart mty
var ball = {
    pos_x : 0,
    pos_y : 0,
    speed_x : 0,
    speed_y : 0,
    radius : 10 
};

var upperPanel = {
    pos_x : 0,
    width: 100,
    height: 10
};


var lowerPanel = {
    pos_x : 0,
    width: 100,
    height: 10
};


var game = {
    score_player_1 : 0,
    score_player_2 : 0
};

var dificulty = parseInt(prompt("Que dificulty tu choose? ( 1 - 4)"));


var mainSpeed = 6;

var colors = {
	background_color: "#000000",
	primary_color: "#00FF00"
};

var canvas = document.getElementById("pong_canvas");
var context = canvas.getContext("2d");

var refreshRate = 1000 / 30;



function onLoad(){

	function drawBackground(){
		context.fillStyle = colors.background_color;
		context.fillRect(0,0, canvas.width, canvas.height);
	
		context.strokeStyle = colors.primary_color;
		context.beginPath();
		context.moveTo(0, canvas.height / 2);
		context.lineTo(canvas.width, canvas.height / 2);
		context.stroke();
	}

	function drawBorder(){
		context.strokeStyle = colors.primary_color;
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(canvas.width, 0);
		context.lineTo(canvas.width, canvas.height);
		context.lineTo(0, canvas.height);
		context.lineTo(0,0);

		context.stroke();
	}

	function drawPanels(){
		context.fillStyle = colors.primary_color;

		context.fillRect(upperPanel.pos_x, 10, 
			upperPanel.width, upperPanel.height);
		
		context.fillRect(lowerPanel.pos_x, canvas.height - 20, 
			lowerPanel.width, lowerPanel.height);
	}

	function drawBall(){
		context.fillStyle = colors.primary_color;
		context.beginPath();
		context.arc(ball.pos_x, ball.pos_y, ball.radius, 0, Math.PI *2 , true); 
		context.fill();
	}	

	function drawScore(){
		context.fillStyle = colors.primary_color;
		context.font = "22px Georgia";
		// Jugador 1
		context.fillText(game.score_player_1, canvas.width / 2, canvas.height /  4);
		// Jugador 2
		context.fillText(game.score_player_2, canvas.width / 2, 3 * canvas.height / 4);
	}


	function drawInitialComment(){
		context.fillStyle = colors.primary_color;
		context.font = "20px Georgia";
		context.fillText("Presiona SPACE BAR to iniciar", 20, canvas.height / 2 - 40);
	}

	function startBall(player){
		ball.speed_x = Math.ceil(Math.random() * 5 * 2) - 5;
		
		if(player == 'Player 1'){
			ball.speed_y = -mainSpeed;
		} else {
			ball.speed_y = mainSpeed;
		}
		ball.pos_x = canvas.width / 2;
		ball.pos_y = canvas.height / 2;
	}

	function startPanels(){
		upperPanel.pos_x = canvas.width / 2 - upperPanel.width / 2;
		lowerPanel.pos_x = canvas.width / 2 - lowerPanel.width / 2;
	}

	function updateBall(){

		if(ball.pos_x - ball.radius < 0 ){
			ball.speed_x *= -1;
		}
		if(ball.pos_x + ball.radius  > canvas.width){
			ball.speed_x *= -1;
		}

		if(ball.pos_y < 0){
			game.score_player_2 +=1;
			startBall("Player 2");
		}

		if(ball.pos_y > canvas.height){
			game.score_player_1 += 1;
			startBall("Player 1");
		}

		if(ball.pos_x > upperPanel.pos_x 
		&& ball.pos_x < upperPanel.pos_x + upperPanel.width &&
		ball.pos_y - ball.radius < 20){
			ball.speed_y *= -1;
		}

		if(ball.pos_x > lowerPanel.pos_x 
		&& ball.pos_x < lowerPanel.pos_x + lowerPanel.width &&
		ball.pos_y + ball.radius > canvas.height - 20){
			ball.speed_y *= -1;
		}


		ball.pos_x += ball.speed_x;
		ball.pos_y += ball.speed_y;
	}

	function updateUpperPanel(){
		document.onkeydown = function(e){
			if(e.keyCode == 37){
				upperPanel.pos_x -= mainSpeed * 5;
			}
			if(e.keyCode == 39){
				upperPanel.pos_x += mainSpeed * 5;
			}
		}

		if(upperPanel.pos_x < 0){
			upperPanel.pos_x = 0;
		}
		if(upperPanel.pos_x + upperPanel.width > canvas.width){
			upperPanel.pos_x = canvas.width - upperPanel.width;
		}
	}

	function updateLowerPanel(){
		if(ball.pos_x < lowerPanel.pos_x ){
			lowerPanel.pos_x -= dificulty;
		}
		if(ball.pos_x > lowerPanel.pos_x + lowerPanel.width){
			lowerPanel.pos_x += dificulty;
		}
	}


	function startGame(){
		startBall("Player 1");
        startPanels();
        drawBackground();
        drawBorder();
        drawPanels();
        drawBall();
        drawScore();
        drawInitialComment();
	}

	function pongGame(){
		console.log("El juego esta running");
        updateBall();
        updateUpperPanel();
        updateLowerPanel();
        drawBackground();
        drawBorder();
        drawPanels();
        drawBall();
        drawScore();
    }

    /*Cuando se presione SPACE se inicia el juego*/
	document.onkeydown = function(e){
		if(e.keyCode == 32){
			setInterval(pongGame,refreshRate);
		}
	};

    startGame();
} // onLoad termina