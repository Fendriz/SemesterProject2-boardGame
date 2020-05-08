
//adding winnercard from sessionstorage
document.querySelector('.winner_card').innerHTML += sessionStorage.getItem("winner");

//styling winner card
let winner = document.querySelector('.card');
winner.style.opacity = 1.0;
winner.style.border = "15px solid #FFD700"


//initiating canvas
let canvas = document.getElementById("winner_text");
canvas.width = 1000;
canvas.height = 100;
let context = canvas.getContext("2d");
let winning = "WE HAVE A WINNER!"
let start= 0;

//animates text on screen
let animate = setInterval(function(){

    context.clearRect(0,0,1000,100);
    context.font = "35px Cinzel";
    context.strokeStyle = '#FFD700';
    context.strokeText(winning, start, canvas.height / 2);
    start += 4;
    if(start>1000){
        
        context.strokeText(winning, 320, canvas.height / 2);
        clearInterval(animate)
    }
}, 10)


