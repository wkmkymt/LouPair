var KEY_INPUT_UP    = 38;
var KEY_INPUT_LEFT  = 37;
var KEY_INPUT_RIGHT = 39;
var KEY_INPUT_DOWN  = 40;

var kcode = 0;

// キーが押されたら
document.onkeydown = function (evt) {
	//document.allはInternet Explorerでのみ使用可能
	if (document.all)
		kcode = event.keyCode;
	else
		kcode = evt.which;
};

// キーが離されたら
document.onkeyup = function (){
	kcode = 0;
};

function KeyCode() {
	return kcode;
}

function CheckKey() {
	var x = 0, y = 0;
	switch(KeyCode()) {
		case KEY_INPUT_DOWN: y = 3; break;
		case KEY_INPUT_UP: y = -3; break;
		case KEY_INPUT_RIGHT: x = 3; break;
		case KEY_INPUT_LEFT: x = -3; break;
	}	
	ScrollMat(x, y);
	setTimeout(CheckKey, 1000/60);
}

if(navigator.userAgent.indexOf('iPhone') == -1
	&& navigator.userAgent.indexOf('iPad') == -1
	&& navigator.userAgent.indexOf('iPod') == -1
	&& navigator.userAgent.indexOf('Android') == -1) {

	try { window.addEventListener("load", CheckKey, false); }
	catch (e) { window.attachEvent("onload", CheckKey); }
}