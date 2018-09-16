//
var mode;
var colors;
var chosenClr;
//
var newGame_btn = createBtn("newgame", startGame);
var modeEasy_btn = createBtn("easy", setMode);
var modeHard_btn = createBtn("hard", setMode);
init();

//
function init(){
	modeHard_btn.dispatchEvent(new Event("click"));
}

//
function startGame(){
	colors = getRandomColors(mode);
	chosenClr = pickColor();
	setSquares();
	h1Display(null);
	elTextDisplay("message",undefined);
	elTextDisplay("newgame","new colors");
}

//
function setMode(e){
	modeHard_btn.classList.remove("selected");
	modeEasy_btn.classList.remove("selected");
	(e.target.id === "easy") ? modeEasy_btn.classList.add("selected") : modeHard_btn.classList.add("selected");
	mode = (e.target.id === "easy") ? 3 : 6;
	startGame();
}

//
function getRandomColors(num){
	var arr = [];
	for (var i = 0; i < num; i++) {
		var rgb_arr = [];
		for (var j = 0; j < 3; j++) {
			rgb_arr.push(rndNum(256));
		}
		arr.push("rgb("+rgb_arr[0]+", "+rgb_arr[1]+", "+rgb_arr[2]+")")
	}
	return arr;
}

//
function setSquares(rnd=true){
	var squares = document.querySelectorAll(".square");
	//
	for (var i = 0; i < squares.length; i++) {
		setStyle(squares[i], {display:"none", cursor:"default"});
	}
	//
	for (var i = 0; i < colors.length; i++) {
		setStyle(squares[i], {display:"block", backgroundColor:(rnd) ? colors[i] : chosenClr, border: "1px solid rgba(255,255,255,.15)", cursor:(rnd) ? 'pointer' : 'default'});
		(rnd) ? squares[i].addEventListener("click", checkColor) : squares[i].removeEventListener("click", checkColor);
		(rnd) ? squares[i].addEventListener("mouseover", hover) : squares[i].removeEventListener("mouseover", hover);
	}
}

//
function hover(e){
	setStyle(e.target, {boxShadow: "inset 0px 0px 100px 10px rgba(255,255,255,0.85)"});
	var interval = setInterval(function(){
		setStyle(e.target, {transition:"box-shadow .75s", boxShadow: "inset 0px 0px 10px 0px rgba(255,255,255,0)"})
		clearInterval(interval);
	}, 150);
	var resetInterval = setInterval(function(){
		setStyle(e.target, {transition:"box-shadow none", boxShadow: "null"});
		setStyle(e.target, {transition:"background .6s"});
		clearInterval(resetInterval);
	}, 900)
}

//
function pickColor(){
	var clr = colors[rndNum(colors.length)];
	document.getElementById("colorDisplay").textContent = clr;
	return clr;
}

//
function checkColor(e){
	setStyle(e.target, {transition:"box-shadow none", boxShadow: "null"});
	setStyle(e.target, {transition:"background .6s"});
	if(e.target.style.backgroundColor === chosenClr){
		elTextDisplay("message","CORRECT");
		elTextDisplay("newgame","play again?");
		h1Display(chosenClr);
		setSquares(false);
	}else{
		elTextDisplay("message","Try Again");
		setStyle(e.target, {backgroundColor:"#232323", border:"1px solid rgba(255,255,255,.0)", cursor:"default"});
		e.target.removeEventListener("click", checkColor);
		e.target.removeEventListener("mouseover", hover);
	}
}

// ************** DISPLAY ****************** //
//
function elTextDisplay(el, str){
	document.getElementById(el).textContent = str;
}

//
function h1Display(clr){
	setStyle(document.querySelector("h1"), {backgroundColor:clr});
}

// ***********  TOOLS ******************* //
//
function createBtn(el, func){
	var btn = document.getElementById(el);
	btn.addEventListener("click", func);
	return btn;
}

//
function rndNum(max){
	return Math.floor(Math.random() * max);
}

//
function setStyle(el, obj){
	for (var prop in obj){
		el.style[prop] = obj[prop];
	}
}


//
// end
