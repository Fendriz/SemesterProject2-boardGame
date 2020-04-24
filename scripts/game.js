



document.querySelector('#dize-button1').addEventListener('click', function(){rollTheDice();});
document.querySelector('#dize-button2').addEventListener('click', function(){rollTheDice2();});



var rollTheDice = function() {
    document.getElementById("dize-button1").disabled = true;
    var player1Roll = Math.floor(Math.random() * 6);
    var roll= "&#x268" + player1Roll + ";";
    document.getElementById('dice').innerHTML = roll;

    checkmove(player1Roll + 1);

    
}

var rollTheDice2 = function() {
    var player2Roll = Math.floor(Math.random() * 6);
    var roll2= "&#x268" + player2Roll + ";";
    document.getElementById('dice2').innerHTML = roll2;
}

var symbol = document.querySelector('.boardgame-image__symbol')

// symbol.style.transitionDelay = "2s";
// symbol.style.left= "500px";
var startposx = 132;
var startposy = 125;
var posx = 132;
var posy = 125;

var currentpos=1;
var startpos=1;

function checkmove(rolled){
    
    var roll = rolled;
    var checktrap1,checktrap2,checktrap3,checktrap4,checktrap5 =false;
    var trapptriggered=false;
    
    // moveright()
    // 
   

   
   
    
    
    
    
 
    var moving = setInterval(move, 1000);
    

    

    function move(){
        

        // if ((roll + startpos) == 5) {
        //     checktrap1 = true;
        // }

        // if ((roll + startpos) == 11) {
        //     checktrap2 = true;
        // }

        // if ((roll + startpos) == 15) {
        //     checktrap3 = true;
        // }

        // if ((roll + startpos) == 24) {
        //     checktrap4 = true;
        // }

        // if ((roll + startpos) == 29) {
        //     checktrap5 = true;
        // }
            
        // if (checktrap1 == true && (currentpos == (roll + startpos))){
        //     // startpos = currentpos;
        //     trapptriggered =true
        //     var trapped = setInterval(trap, 1000);
    
        // }
        // if (checktrap2 == true && (currentpos == (roll + startpos))){
        //     // startpos = currentpos;
        //     trapptriggered =true
        //     var trapped2 = setInterval(trap2, 1000);
    
        // }
        // if (checktrap3 == true && (currentpos == (roll + startpos))){
        //     // startpos = currentpos;
        //     trapptriggered =true
        //     var trapped3 = setInterval(trap3, 1000);
    
        // }
        // if (checktrap4 == true && (currentpos == (roll + startpos))){
        //     // startpos = currentpos;
        //     trapptriggered =true
        //     var trapped4 = setInterval(trap4, 1000);
    
        // }
        // if (checktrap5 == true && (currentpos == (roll + startpos))){
        //     // startpos = currentpos;
        //     trapptriggered =true
        //     var trapped5 = setInterval(trap5, 1000);
    
        // }
        

        if(trapptriggered==false){
            if (currentpos == (roll + startpos)){
            
                clearInterval(moving);
                startpos = currentpos;
    
                setTimeout(function(){ document.getElementById("dize-button1").disabled = false; console.log("trapped") }, 1000);
                
    
            }
            else if (currentpos < 6){
                moveright();
            }
    
            else if (currentpos == 6) {
                movedown();
            }
            else if (currentpos > 6 && currentpos < 12){
                moveleft()
            }
            else if (currentpos == 12) {
                movedown();
            }
            else if (currentpos > 12 && currentpos < 18){
                moveright();
            }
            else if (currentpos == 18) {
                movedown();
            }
            else if (currentpos > 18 && currentpos < 24){
                moveleft();
            }
            else if (currentpos == 24) {
                movedown();
            }
            else if (currentpos > 24 && currentpos < 30){
                moveright();
            }
        }
        
        

        // function trap(){
        
        //     if (currentpos == (startpos - 2)){
               
        //         clearInterval(trapped);
        //         checktrap1 = false;
        //         trapptriggered =false;
        //         startpos = currentpos;
        //         setTimeout(function(){ document.getElementById("dize-button1").disabled = false; }, 1000);
        //     }
        //     else 
        //         trappedleft();

        // }

        // function trap2(){
           
        //     if (currentpos == (startpos - 3)){
                
        //         clearInterval(trapped2);
        //         checktrap2 = false;
        //         trapptriggered =false;
        //         startpos = currentpos;
        //         setTimeout(function(){ document.getElementById("dize-button1").disabled = false; }, 1000);
        //     }
        //     else 
        //         trappedright();

        // }

        // function trap3(){
            
        //     clearInterval(trapped3);
        //     console.log("player 2 gets 2 turen");
        //     checktrap3 = false;
        //     trapptriggered =false;
        //     setTimeout(function(){ document.getElementById("dize-button1").disabled = false; }, 1000);

        // }

        // function trap4(){
           
        //     if (currentpos == (startpos - 4)){
                
        //         clearInterval(trapped4);
        //         checktrap4 = false;
        //         trapptriggered =false;
        //         startpos = currentpos;
        //         setTimeout(function(){ document.getElementById("dize-button1").disabled = false; }, 1000);
        //     }
        //     else 
        //         trappedright();

        // }

        // function trap5(){
            
        //     console.log("player 2 gets 2 turen");
        //     clearInterval(trapped5);
        //     checktrap5 = false;
        //     trapptriggered =false;
        //     setTimeout(function(){ document.getElementById("dize-button1").disabled = false; }, 1000);
        // }
    }
}

function moveright(){
    var id = setInterval(frame, 5);
        
    startposx = posx;

    function frame() {
        if (posx == (127) + startposx) {
        clearInterval(id);
        
        currentpos++
        

        } else {
        posx++; 
        symbol.style.left = posx + "px"; 
        }
    }
}


function moveleft(){
  
    
    var id = setInterval(frame, 5);
    
    startposx = posx;
    function frame() {
        if (posx == startposx - 127) {
        clearInterval(id);
    
        currentpos++
        

        } else {
        posx--; 
        symbol.style.left = posx + "px"; 
        }
    }
     
}

function trappedleft(){
  
    
    var id = setInterval(frame, 5);
    
    startposx = posx;
    function frame() {
        if (posx == startposx - 127) {
        clearInterval(id);
      
        currentpos--;
        

        } else {
        posx--; 
        symbol.style.left = posx + "px"; 
        }
    }
     
}

function trappedright(){
    var id = setInterval(frame, 5);
        
    startposx = posx;

    function frame() {
        if (posx == (127) + startposx) {
        clearInterval(id);
      
        currentpos--;
        

        } else {
        posx++; 
        symbol.style.left = posx + "px"; 
        }
    }
}







function movedown(){

    var id = setInterval(frame, 5);
    
    startposy = posy;
    function frame() {

        if (posy == (127) + startposy) {
        clearInterval(id);
      
        currentpos++

        } else {
        posy++; 
        symbol.style.top = posy + "px"; 
        }
    }
     
}





// for (let i = 0; i < 128; i++) {
//     setTimeout(300)
//     symbol.style.left = 132 + i + "px";
    
// }