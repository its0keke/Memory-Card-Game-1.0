let score=0;
let moves=0;
let count=0;
let prevID=undefined;

let cards=[0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34];
cards = shuffle(cards);
let cards_copy=cards;

let imgs=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
imgs = shuffle(imgs);

let flipped=[];
for(let i=0; i<cards.length; i++) flipped[i]=0;

function shuffle(array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function clicked(id) {
    if(id==prevID)
        return;
    let found=false;
    for(let i=0; i<cards.length; i++) {
        if(cards[i]==id) {
            found=true;
            break;
        }
    }
    if(found==false) {
        console.log("Card not found.");
        return;
    }
    else {
        document.getElementById("moves").innerHTML = `Moves: ${moves+=1}`;
        if(count<2) {
            count++;
            flip(id);
            console.log(`clicked(${id})`);
            console.log(`count: ${count}`);
        }
        if(count==2) {
            compare(id, prevID);
            count=0;
            prevID=undefined;
        }
        else
            prevID=id;
    }
}

function flip(id) {
    let i=0;
    for(i; i<cards_copy.length; i++) {
        if(cards_copy[i]==id)
            break;
    }
    if(!flipped[i]) {
        document.getElementById(id).style.backgroundImage=`url("../images/${imgs[Math.floor(i/2)]}.png")`;
        flipped[i]=1;
    }
    else {
        document.getElementById(id).style.backgroundImage=`url("../images/card-back.jpg")`;
        flipped[i]=0;
    }
}

function compare(id1, id2) {
    let i=0;
    let j=0;
    for(i; i<cards_copy.length; i++) {
        if(cards_copy[i]==id1)
            break;
    }
    for(j; j<cards_copy.length; j++) {
        if(cards_copy[j]==id2)
            break;
    }

    let img1=Math.floor(i/2);
    let img2=Math.floor(j/2);

    console.log(`i: ${i} -- j: ${j}`);
    console.log(`img1: ${img1} -- img2: ${img2}`);

    if(img1==img2) {
        document.getElementById("score").innerHTML = `Score: ${score+=1}`;
        cards[i]=-1;
        cards[j]=-1;
        console.log(cards);
    }
    else {
        setTimeout(function(){flip(id1)}, 500);
        setTimeout(function(){flip(id2)}, 500);
        prevID=id2;
    }
}
