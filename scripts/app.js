import { CARDINFO } from './cards/cardinfo.js';

let cards = [];
let player1img;
let player2img;
let player1symbol;
let player2symbol;

async function getResource(cardInfo){
	const response = await fetch(cardInfo.houseUrl);
	const houses = await response.json();
	const response2 = await fetch(cardInfo.caracterUrl);
	const characters = await response2.json();
	createCards(characters,houses,cardInfo);
	
	populateCards();
	populatePlayers();
	console.log(cards);
	console.log(CARDINFO)
}


function createCards(characters,houses,cardInfo){
	let counter = 0;
	
	//Looping over characters and adding characters that matches cardinfo to cards array.
	for (let i = 0; i < characters.length; i++) {

		if (counter < cardInfo.caracter.length ){
			if (characters[i].Id === cardInfo.caracter[counter].id) {
						cards.push(characters[i]);
						cards[counter].fromcardinfo = cardInfo.caracter[counter];
					 	counter++;
			}
		}
	}
	//looping over cards array and adding houses to the allegiances section
	//(before it was just a number here refering to the houses.json).
	for (let i = 0; i < cards.length; i++) {
		for (let j = 0; j < cards[i].Allegiances.length; j++) {
			cards[i].Allegiances[j] = houses[cards[i].Allegiances[j]-1];
		}
	}
}


function populatePlayers(){


	let cardarray = document.querySelectorAll('.card');
	let state = "INIT";
	let player1=0;
	let player2=0;
	let template = `
		<section class="choose_players">
			<h1 id="choose_players__heading">CHOOSE YOUR PLAYERS!</h1>
		</section>
		<section class="player_container">
			<section class="player">
				<h1 id="player1__heading">PLAYER 1</h1>
				<div class="player__img">
					<img class="player__img-src" src="">
					<img class="player__card-stats" src="">
				</div>
			</section>
			<section class="player">
				<h1>VS</h1>
				<button class="button" id="playerButton">START GAME</button>
			</section>
			<section class="player">
				<h1 id="player2__heading">PLAYER2</h1>
				<div class="player2__img">
					<img class="player2__img-src" src="">
					<img class="player2__card-stats" src="">
				</div>
				<div></div>
			</section>
		</section>`

	

	document.querySelector('.players').innerHTML = template;
	document.querySelector('#playerButton').style.display = 'none';
	document.querySelector('.player_container').style.display = 'none';
	document.querySelector('#choose_players__heading').style.color = 'white';

	player1img = document.querySelector('.player__img-src');
	player2img = document.querySelector('.player2__img-src');

	document.querySelector('#playerButton').addEventListener('click', function(){

		localStorage.player1_img = player1img.src;
		localStorage.player1_symbol = player1symbol;
		localStorage.player2_img = player2img.src;
		localStorage.player2_symbol = player2symbol;

		window.location.href = 'game.html'
		// console.log(localStorage);
	});

	cardarray.forEach(function(elem) {

		elem.addEventListener("click", function(evt) {
			
			console.log(evt);





			
			const states = {

				
				trasisions: {
					INIT:	function() {
						document.querySelector('.player_container').style.display = 'none';
						document.querySelector('.choose_players').style.display = 'block';
						player1img.src = '';
						player2img.src = '';
						document.querySelector('#player2__heading').style.color = 'white';
						document.querySelector('#player1__heading').style.color = 'white';
						document.querySelector('#player2__heading').style.background = "";
						document.querySelector('#player1__heading').style.background = "";
						document.querySelector('.player__card-stats').src = '';
						document.querySelector('.player2__card-stats').src = '';
						document.querySelector('#playerButton').style.display = 'none';
						
						for (var i = 0; i < cardarray.length; i++) {
							cardarray[i].style.transform = '';
							cardarray[i].style.opacity = "1.0";
							cardarray[i].classList.add("hover");
						}
						state = "INIT";
					},
					
					PLAYER1: function(){
						player1 = evt.target.offsetParent.dataset.cardnumber;
						elem.style.opacity = "0.3";
						elem.classList.remove("hover");
						player1img.src = elem.querySelector('.card__img-char').src;
						// document.querySelector('.player__img-src').style.opacity = "0.3";
						player1symbol = CARDINFO.caracter[player1-1].symbol[1];
						player1 = evt.target.offsetParent.dataset.cardnumber;	
						document.querySelector('#player1__heading').style.color = CARDINFO.caracter[player1-1].color;
						document.querySelector('#player1__heading').style.background = "white";
						document.querySelector('.player_container').style.display = 'block';
						document.querySelector('.choose_players').style.display = 'none';
						state = "PLAYER1";
						
						
					},
					PLAYER2: function(){
						player2 = evt.target.offsetParent.dataset.cardnumber;
						elem.style.opacity = "0.3";
						elem.classList.remove("hover");
						player2img.src = elem.querySelector('.card__img-char').src;
						// document.querySelector('.player2__img-src').style.opacity = "0.3";
						document.querySelector('#player2__heading').style.color = CARDINFO.caracter[player2-1].color;
						document.querySelector('#player2__heading').style.background = "white";
						player2symbol= CARDINFO.caracter[player2-1].symbol[1];
						document.querySelector('#playerButton').style.display = 'block';


						
						state = "PLAYER2";
					}
				
				}
			}


			console.log(state)
		
			// states.trasisions.PLAYER1();
			
			if (state == "INIT"){
				states.trasisions.PLAYER1();
			}
			else if (state == "PLAYER1"){
				if(evt.target.offsetParent.dataset.cardnumber == player1){
					states.trasisions.INIT();
				}
				else
					states.trasisions.PLAYER2();
					// console.log(player1img)
			}
			else if (state == "PLAYER2"){
				states.trasisions.INIT();
			}
	    });
	});


}

function populateCards(){

	let template = [];
	let gender;
	let text;
	let allegiances;

	for (let i = 0; i < cards.length; i++){

		if(cards[i].IsFemale==false){
			gender="mars";
			}
		else
			gender="venus";
			
		if (typeof cards[i].Allegiances[0] == "undefined") {
 			text = "The free folk are a race of people who live beyond the Wall in northern Westeros. They are more commonly referred to as 'wildlings'."
			allegiances = "Free Folk"	
			}
		else{
			text = `<b>Seats:</b> ${cards[i].Allegiances[0].Seats[0]}<br>
			<b>Region:</b> ${cards[i].Allegiances[0].Region}<br>
			<b>AncestralWeapon:</b> ${cards[i].Allegiances[0].AncestralWeapons[0]}<br>
			<b>Words:</b> ${cards[i].Allegiances[0].Words}`
			allegiances = cards[i].Allegiances[0].Name;
		}
				
		template[i] = `
			
				<div class="card hover" data-cardnumber="${i+1}" style="background:${cards[i].fromcardinfo.color} ; border: 8px solid ${cards[i].fromcardinfo.color}; opacity: 1;">
					<div class="card__name">
						<h2>${cards[i].Name}</h2>
					</div>
					<div class="card__img">
						<img class="card__img-char" src="${cards[i].fromcardinfo.imgUrl}">
					</div>
					<div class="card__faction">
						<h3>${allegiances}</h3>
					</div>
					<div class="card__text">
						<p> 
							${text}
						</p>
					</div>
					<div class="card__stats">
						<div class="card__stats-gender">
							<i class="fas fa-${gender}"></i>
							<div class="type">Gender</div>
						</div>
						<div class="card__stats-text">
							<div class="value">${cards[i].fromcardinfo.trimborn}</div>
							<div class="type">Born</div>
						</div><div class="card__stats-symbol">
							<img class="card__stats-img" src="${cards[i].fromcardinfo.symbol[1]}">
							<div class="type">Symbol</div>
						</div>
					</div>
				</div>`;
				
		document.querySelector('.cards').innerHTML += template[i];
		
	}
}

getResource(CARDINFO);
