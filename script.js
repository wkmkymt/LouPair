
window.onload = function() {
	$('.playmat')[0].style.top = 0;
	$('.playmat')[0].style.left = 0;
}

// 傾き
function deviceorientationHandler(event) {
	$('#test').innerHTML = (event.beta !== null) ? 
		'x: ' + (event.beta>>0) + ',<br>y: ' + (event.gamma>>0) + ',<br>z:' + (event.alpha>>0) + '<br>' : 
		'地磁気センサーが利用できません。<br>';
	var x = event.gamma;
	var y = event.beta - 45;
	x = (-5 < x && x < 5) ? 0 : x * 0.3;
	y = (-5 < y && y < 5) ? 0 : y * 0.3;
	ScrollMat(x, y);
}

(function() {
	window.addEventListener("deviceorientation", deviceorientationHandler);
})();

function ScrollMat(x, y) {
	var scrollmax = -130;
	var top = parseInt($('.playmat')[0].style.top, 10);
	var left = parseInt($('.playmat')[0].style.left, 10);
	top -= y;
	left -= x;
	$('.playmat')[0].style.top = (top > 0 ? 0 : (top < scrollmax ? scrollmax : top)) + '%';
	$('.playmat')[0].style.left = (left > 0 ? 0 : (left < scrollmax ? scrollmax : left)) + '%';
}

// jQueryライクな要素取得
function $(string) {
	if(string.indexOf('#', 0) === 0)
		return document.getElementById(string.slice(1));
	if(string.indexOf('.', 0) === 0)
		return document.getElementsByClassName(string.slice(1));
	return document.getElementsByTagName(string);
}
