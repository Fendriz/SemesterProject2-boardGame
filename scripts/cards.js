//---CHARACTER ID's------

//Margaery Tyrell, 16
//Cersei Lannister, 238
//Jaime Lannister, 529
//Olenna Redwyne,784
//Petyr 'Littlefinger' Baelish, 823
//Samwell Tarly, 954
//Tormund Giantsbane, 2024
//Sansa Stark,957
//Tyrion Lannister, 1052
//Ser Sandor 'The Hound' Clegane, 955

let ids = [16,238,529,784,823,2024,955,957,1052,954];

let houses, characters;

let cards=[];



fetch('http://gather.no/JSON/gameofthrones/houses.json')
	.then(function (response) {
		return response.json();
	}).then(function (data) {
 		houses = data;
 		return fetch('http://gather.no/JSON/gameofthrones/characters.json');

	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log(data);
		characters = data;
		createCards();
		populateCards(cards);
		addlistner();

	}).catch(function (error) {
		console.log(error);
	});




function createCards(){

	addCharacters(ids);
	addAllegiances();
	addColors();
	trimBorn();
	addImage();
	console.log(cards)
}

function addCharacters(ids){
	ids.sort((a, b) => a - b);
	console.log(ids)
	let counter = 0;
	for (let i = 0; i < characters.length; i++) {
		if (characters[i].Id === ids[counter]) {
			cards.push(characters[i]);
			counter++;
		}
	}

}


//adding alligances from the houses.
function addAllegiances(){
	for (var i = 0; i < cards.length; i++) {
		for (var j = 0; j < cards[i].Allegiances.length; j++) {
			cards[i].Allegiances[j] = houses[cards[i].Allegiances[j]-1];
		}
		// if (cards[i].Allegiances.length === 0){
		// 	cards[i].Allegiances[0] = cards[i].Culture;
		// }
	}
	// console.log(cards[9].Allegiances.length)
}

function addlistner(){
	let cardarray = [];

	cardarray = document.querySelectorAll('.card');


	let player1 = 0;
	let player2 = 0;
	let newplayer= false;
	let reset = false;

	cardarray.forEach(function(elem) {

		elem.addEventListener("click", function(evt) {


			if (reset==true){
				document.querySelector('.player__img-src').src = ''
				document.querySelector('.player2__img-src').src = ''
				document.querySelector('#player2__heading').style.color = 'white';
				document.querySelector('#player1__heading').style.color = 'white';
				for (var i = 0; i < cardarray.length; i++) {
					cardarray[i].style.transform = '';
					cardarray[i].style.opacity = "1.0";
					cardarray[i].classList.add("hover");
				}
				player1=0;
				player2=0;
				newplayer=false;
				reset=false;
			}

	    	if (player1==0 && newplayer==false ){
    			elem.style.opacity = "0.3";
    			elem.classList.remove("hover");
    		    document.querySelector('.player__img-src').src = elem.querySelector('.card__img-char').src;

    		    // elem.style.border = '2px solid #009EFF';
    		    player1 = evt.toElement.offsetParent.dataset.cardnumber;
    		    document.querySelector('#player1__heading').style.color = cards[player1-1].Color;
    		    newplayer =true;
	    	}
	    	else if (evt.toElement.offsetParent.dataset.cardnumber == player1){

	    		elem.style.opacity = "1.0";
	    		elem.classList.add("hover");
    			elem.style.transform = '';
    		    document.querySelector('.player__img-src').src = '';
    		    document.querySelector('#player1__heading').style.color = 'white';

    		    player1=0;
    		    newplayer =false;
	    	}
	    	else if (evt.toElement.offsetParent.dataset.cardnumber !=player1  && newplayer==true) {
	    		player2 = evt.toElement.offsetParent.dataset.cardnumber;
    			elem.style.opacity = "0.3";
    			elem.classList.remove("hover");
    		    document.querySelector('.player2__img-src').src = elem.querySelector('.card__img-char').src;
    		    document.querySelector('#player2__heading').style.color = cards[player2-1].Color;


    		    reset = true;
	    	}
	    	console.log(player1)
	    	console.log(player2)
	    	console.log(newplayer)
	    	// else if (evt.toElement.offsetParent.dataset.cardnumber == player2){
    		// 	elem.style.transform = '';
    		//     document.querySelector('.player2__img-src').src = '';

	    	// }

	    	// else if (evt.toElement.offsetParent.dataset.cardnumber == player1 && newplayer==true){
    		// 	elem.style.transform = '';
    		//     document.querySelector('.player2__img-src').src = '';
    		//     document.querySelector('.player1__img-src').src =
    		//     player2=player1;

	    	// }



	    	// else if (evt.toElement.offsetParent.dataset.cardnumber == currentCard && newplayer == true) {
    		// 	elem.style.transform = "scale(1.15)";
    		//     document.querySelector('.player2__img-src').src = elem.querySelector('.card__img-char').src;
    		//     currentCard = evt.toElement.offsetParent.dataset.cardnumber;
    		//     newplayer = true;

	    	// }


	    });
	});
}


 function populateCards(cards){

 	for (let i = 0; i < 10; i++) {

 		var flex_container = document.querySelector('.flex-container');

 		let card = document.createElement("div");
 		let card__name = document.createElement("div");
 		let card__img = document.createElement("div");
 		let card__faction = document.createElement("div");
 		let card__text = document.createElement("div");
 		let card__stats = document.createElement("div");
 		let card__stats_gender = document.createElement("div");
 		let card__stats_text = document.createElement("div");
 		let card__stats_symbol = document.createElement("div");
 		let type = document.createElement("div");
 		let type1 = document.createElement("div");
 		let type2 = document.createElement("div");
 		let value = document.createElement("div");

 		let card__stats_img = document.createElement("img");
 		let card__img_char = document.createElement("img");

 		let heading__name = document.createElement("h3");
 		let heading__faction = document.createElement("h3");

 		let text = document.createElement("p");
 		let symbol = document.createElement("i");
 		let symbol2 = document.createElement("i");


 		card.className += "card hover";
 		card__name.className += "card__name";
 		card__img.className += "card__img";
 		card__faction.className += "card__faction";
 		card__text.className += "card__text";
 		card__stats.className += "card__stats";
 		card__stats_gender.className += "card__stats-gender";
 		card__stats_text.className += "card__stats-text";
 		card__stats_symbol.className += "card__stats-symbol";
 		card__stats_img.className += "card__stats-img";
 		card__stats_img.src="images/faction1.png"
 		card__img_char.className += "card__img-char";

 		card__img_char.src= cards[i].ImgUrl;
 		symbol.className +="fas fa-mars"
 		symbol2.className +="fas fa-venus"
 		value.className +="value"
 		type.className +="type"
 		type1.className +="type"
 		type2.className +="type"


 		// console.log(typeof(cards[i].Allegiances[0]))
 		if (typeof cards[i].Allegiances[0] == "undefined") {
 			console.log('sdfsdf')

 			heading__faction.innerHTML = cards[i].Culture
 			text.innerHTML = "The free folk are a race of people who live beyond the Wall in northern Westeros. They are more commonly referred to as 'wildlings' everywhere south of the Wall."
 		}
 		else {
 		  	heading__faction.innerHTML = cards[i].Allegiances[0].Name;
 		  	text.innerHTML = "Seats: " + cards[i].Allegiances[0].Seats[0] + "<br> Region: " +
 		  								 cards[i].Allegiances[0].Region + "<br> AncestralWeapon: " +
 		  								 cards[i].Allegiances[0].AncestralWeapons[0] + "<br> words: " +
 		  								 cards[i].Allegiances[0].Words;


 		  }

 		heading__name.innerHTML = cards[i].Name;

 		// text.innerHTML = "lorem asdfa sdsadf asdf asdf asddfasdf asfdasdfasd fasdf SADFASDG ASDG<asdASDSAFSD dfgdf";


 		type.innerHTML = "Gender";
 		type1.innerHTML = "Born";
 		type2.innerHTML = "Symbol"
 		value.innerHTML = cards[i].Born;



 		flex_container.appendChild(card);


 		card.appendChild(card__name);
			card__name.appendChild(heading__name);

 		card.appendChild(card__img);
 			card__img.appendChild(card__img_char);

 		card.appendChild(card__faction);
 			card__faction.appendChild(heading__faction);

 		card.appendChild(card__text);
 			card__text.appendChild(text);

 		card.appendChild(card__stats);
 			card__stats.appendChild(card__stats_gender);
 				if(cards[i].IsFemale==false){
 					card__stats_gender.appendChild(symbol);
 				}
 				else
 					card__stats_gender.appendChild(symbol2);

 				card__stats_gender.appendChild(type);
 			card__stats.appendChild(card__stats_text);
 				card__stats_text.appendChild(value);
 				card__stats_text.appendChild(type1);
 			card__stats.appendChild(card__stats_symbol);
 				card__stats_symbol.appendChild(card__stats_img);
 				card__stats_symbol.appendChild(type2);

 		card.setAttribute('data-cardNumber', (i+1))
 		card.style.background = cards[i].Color;
 		card.style.border = "8px solid" + cards[i].Color;
 		card__img_char.style.width = '300px'


 		// border: 8px solid #142547;
 		// console.log(cards[i].Color)
 		// if ((i % 2) != 0){
 		// 	card.style.color = "white"
 		// 	time.style.color = "white"
 		// 	button.style.backgroundColor = "#52ce90"
 		// 	button.style.border="3px solid white"
 		// 	card.style.backgroundColor = "#52ce90"
 		// }
 	}
 }

function addColors(){

	//adding colors mannually;
	cards[0].Color = "#8D0100";
	cards[1].Color = "#242329";
	cards[2].Color = "#242329";
	cards[3].Color = "#3D2304";
	cards[4].Color = "#7C7C7C";
	cards[5].Color = "#142547";
	cards[6].Color = "#404040";
	cards[7].Color = "#600000";
	cards[8].Color = "#242329";
	cards[9].Color = "#085D34";
}


function trimBorn(){
	//manually for now:
	cards[0].Born = "283";
	cards[1].Born = "266";
	cards[2].Born = "266";
	cards[3].Born = "228";
	cards[4].Born = "268";
	cards[5].Born = "283";
	cards[6].Born = "270";
	cards[7].Born = "286";
	cards[8].Born = "273";
	cards[9].Born = "unknown";
}

function addImage(){
	cards[0].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0b6bc262472029.5a915904e8982.jpg"; //Margaery Tyrell,16
	cards[1].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e1d3c562472029.5a9190922a64f.jpg"; //Cersei Lannister, 238
	cards[2].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5629cd62472029.5a915904e829f.jpg"; //Jaime Lannister, 529
	cards[3].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ff09b562472029.5a915904e6e3d.jpg"; //Olenna Redwyne,784
	cards[4].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6db28e62472029.5a915904e7344.jpg"; //Petyr 'Littlefinger' Baelish, 823
	cards[5].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b7d10862472029.5a915904e7d89.jpg"; //Samwell Tarly, 954
	cards[6].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fb59d262472029.5a915904e801d.jpg"; //Tormund Giantsbane, 2024
	cards[7].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7d632c62472029.5a918ffa8e392.jpg"; //Sansa Stark,957
	cards[8].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/41ea3f62472029.5a915904e75cc.jpg"; //Tyrion Lannister, 1052
	cards[9].ImgUrl = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6dad0862472029.5a915904e7b11.jpg"; //Ser Sandor 'The Hound' Clegane, 955
}