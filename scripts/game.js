


// document.querySelector('.player2__img-src').src = localStorage.player2;

document.querySelector('#dize-button1').addEventListener('click', function(){rollTheDice(player1, player2);});
document.querySelector('#dize-button2').addEventListener('click', function(){rollTheDice(player2, player1);});

console.log(localStorage);
document.querySelector('.player__img-src').src = localStorage.player1_img;
document.querySelector('.player2__img-src').src = localStorage.player2_img;

document.querySelector('#boardgame-image__player1').src = localStorage.player1_symbol;
document.querySelector('#boardgame-image__player2').src = localStorage.player2_symbol;


const diceSound = new Audio('sound/dice.mp3');
const moveSound = new Audio('sound/move.mp3');
// localStorage.player1_img = player1img.src;
// 		localStorage.player1_symbol = player1symbol;
// 		localStorage.player2_img = player2img.src;
// 		localStorage.player2_symbol = player2symbol;


var rollTheDice = function(player, nextplayer) {
    disablebutton(player1);
    disablebutton(player2);

    diceSound.play();

    const DICE= 
    
    ['<i class="fas fa-dice-one fa-dice"></i>',
    '<i class="fas fa-dice-two fa-dice"></i>',
    '<i class="fas fa-dice-three fa-dice"></i>',
    '<i class="fas fa-dice-four fa-dice"></i>',
    '<i class="fas fa-dice-five fa-dice"></i>',
    '<i class="fas fa-dice-six fa-dice"></i>'];



    var player1Roll = Math.floor(Math.random() * 6);

    

    
    var diceanime = setInterval(function(){

        var randomRoll = Math.floor(Math.random() * 6);
        player.dize.innerHTML = DICE[randomRoll];
        setTimeout(function(){
            player.dize.innerHTML = DICE[player1Roll];
            clearInterval(diceanime);
        },500)
    }, 50)
    
    checkmove(player1Roll + 1,player,nextplayer);

    
}

// var rollTheDice2 = function() {
//     disablebutton(player1);
//     disablebutton(player2);
//     var player2Roll = Math.floor(Math.random() * 6);
//     var roll2= "&#x268" + player2Roll + ";";
//     document.getElementById('dice2').innerHTML = roll2;


//     checkmove(player2Roll + 1,player2,player1);
// }



function disablebutton(player){

    
    player.dizebutton.style.backgroundColor = "gray"; 
    player.dizebutton.style.Color = "white"; 
    player.dizebutton.innerHTML = "WAIT";
    player.dizebutton.disabled = true;
}

function enablebutton(player){

    
    player.dizebutton.style.backgroundColor = "#085D34"; 
    player.dizebutton.innerHTML = "ROLL";
    player.dizebutton.disabled = false;
}

// symbol.style.transitionDelay = "2s";
// symbol.style.left= "500px";


// var startposxp1 = 132;
// var startposyp1 = 125;
// var posx = 132;
// var posy = 125;

// var currentpos=1;
// var startpos=1;

var player1 = {

    startposx: 132,
    startposy: 125,
    posx: 132,
    posy: 125,
    currentpos: 1,
    startpos: 1,
    dize: document.getElementById('dice'),
    dizebutton: document.getElementById("dize-button1"),
    symbol: document.querySelector('#boardgame-image__player1')

}

var player2 = {

    startposx: 132,
    startposy: 125,
    posx: 132,
    posy: 125,
    currentpos: 1,
    startpos: 1,
    dize: document.getElementById('dice2'),
    dizebutton: document.getElementById("dize-button2"),
    symbol: document.querySelector('#boardgame-image__player2')
}

// console.log(player1)



// var startposxp2 = 132;
// var startposyp2 = 125;
// var posxp2 = 132;
// var posyp2 = 125;

// var currentposp2=1;
// var startposp2=1;



function checkmove(rolled, player, nextplayer){


    
    var roll = rolled;

    var traptyp1triggered=false;
    var traptyp2triggered=false;
    const traptype1 = [5,11,24]
    const traptype2 = [15,29]

    
    
    checktrap();
    var moving = setInterval(move, 1000);
    

    function checktrap(){
        

        if (traptype1.includes(roll + player.startpos)) {
            traptyp1triggered = true;
        }
        if (traptype2.includes(roll + player.startpos)) {
            traptyp2triggered = true;
        }
    }
    function move(){

            console.log(player.posx)
          
            if (player.currentpos == (roll + player.startpos)){
                clearInterval(moving);
                player.startpos = player.currentpos;
                if(traptyp1triggered != true && traptyp2triggered != true){
                    console.log("sdadfgasdgadsg")
                    setTimeout(enablebutton(nextplayer), 1000);
                }
                else if (traptyp1triggered == true){
                    console.log(traptyp1triggered)
                    var trapped1 = setInterval(trap1, 1000);
                }
                else if (traptyp2triggered == true){
                    var trapped2 = setInterval(trap2, 1000);
                }
    
            }
            else if (player.currentpos < 6){
                moveright(player);
            }
    
            else if (player.currentpos == 6) {
                movedown(player);
            }
            else if (player.currentpos > 6 && player.currentpos < 12){
                moveleft(player)
            }
            else if (player.currentpos == 12) {
                movedown(player);
            }
            else if (player.currentpos > 12 && player.currentpos < 18){
                moveright(player);
            }
            else if (player.currentpos == 18) {
                movedown(player);
            }
            else if (player.currentpos > 18 && player.currentpos < 24){
                moveleft(player);
            }
            else if (player.currentpos == 24) {
                movedown(player);
            }
            else if (player.currentpos > 24 && player.currentpos < 30){
                moveright(player);
            }
        

        function trap1(){
            
            if (player.currentpos == (player.startpos - 3)){
                clearInterval(trapped1);
                traptyp1triggered = false;
                player.startpos = player.currentpos;
                setTimeout(enablebutton(nextplayer), 1000);
            }
            else if (player.currentpos < 6){
                trappedleft(player);
            }
            else if (player.currentpos > 6 && player.currentpos < 12){
                trappedright(player);
            }
            else if (player.currentpos == 24){
                trappedright(player);
            }
            else if (player.currentpos > 18 && player.currentpos < 24){
                trappedright(player);
            }
        }

        function trap2(){
            
            if (player.currentpos == (player.startpos - 2)){
                clearInterval(trapped2);
                traptyp2triggered = false;
                player.startpos = player.currentpos;
                setTimeout(enablebutton(nextplayer), 1000);
            }
            else if(player.currentpos > 12 && player.currentpos < 18){
                trappedleft(player);
            }
            else if(player.currentpos > 24 && player.currentpos < 30){
                trappedleft(player);
            }

        }
    }
}

function moveright(player){
   
    console.log("test")
    var id = setInterval(frame, 5);
        
    player.startposx = player.posx;

    function frame() {
        if (player.posx == (127) + player.startposx) {
        moveSound.play();    
        clearInterval(id);
        player.currentpos++
        

        } else {
            player.posx++; 
            player.symbol.style.left = player.posx + "px"; 
        }
    }
}


function moveleft(player){
  
    
    var id = setInterval(frame, 5);
    
    player.startposx = player.posx;
    function frame() {
        if (player.posx == player.startposx - 127) {
        moveSound.play();
        clearInterval(id);
        player.currentpos++
        

        } else {
            player.posx--; 
            player.symbol.style.left = player.posx + "px"; 
        }
    }
     
}

function trappedleft(player){
  
    
    var id = setInterval(frame, 5);
    
    player.startposx = player.posx;
    function frame() {
        if (player.posx == player.startposx - 127) {
        moveSound.play();
        clearInterval(id);
        
        player.currentpos--;
        

        } else {
            player.posx--; 
            player.symbol.style.left = player.posx + "px"; 
        }
    }
     
}

function trappedright(player){
    var id = setInterval(frame, 5);
        
    player.startposx = player.posx;

    function frame() {
        if (player.posx == (127) + player.startposx) {
        moveSound.play();
        clearInterval(id);
      
        player.currentpos--;
        

        } else {
            player.posx++; 
            player.symbol.style.left = player.posx + "px"; 
        }
    }
}





function movedown(player){

    var id = setInterval(frame, 5);
    
    player.startposy = player.posy;
    function frame() {

        if (player.posy == (127) + player.startposy) {
        moveSound.play();
        clearInterval(id);
      
        player.currentpos++

        } else {
            player.posy++; 
            player.symbol.style.top = player.posy + "px"; 
        }
    }
     
}





// for (let i = 0; i < 128; i++) {
//     setTimeout(300)
//     symbol.style.left = 132 + i + "px";
    
// }