function prepareSlideshow () {
	if (!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById('linklist')) return false;
	if(!document.getElementById('slideshow')) return false;

	//为图片应用样式
	var preview = document.getElementById('preview');
	preview.style.position = 'absolute';
	preview.style.top = '0px';
	preview.style.left = '0px';

	//取得链接并添加动画效果
	var list = document.getElementById('linklist');
	var links = list.getElementsByTagName('a');
	links[0].onmouseover = function(){
		moveElement('preview', -100, 0, 10);
	}
	links[1].onmouseover = function(){
		moveElement('preview', -200, 0, 10);
	}
	links[2].onmouseover = function(){
		moveElement('preview', -300, 0, 10);
	}
}

addLoadEvent(prepareSlideshow);

function moveElement(elementID, final_x, final_y, interval){
	
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movementElement){
		clearTimeout(elem.movementElement);
	}

	var xPos = parseInt(elem.style.left);
	var yPos = parseInt(elem.style.top);
	if (xPos == final_x && yPos == final_y) {
		return true;
	};
	if (xPos < final_x) {
		xPos ++;
	}
	if (xPos > final_x) {
		xPos --;
	}
	if (yPos < final_y) {
		yPos ++;
	}
	if (yPos > final_y) {
		yPos --;
	}
	elem.style.top = yPos + "px";
	elem.style.left = xPos + "px";

	var repeat = "moveElement('" + elementID +"'," + final_x + 
			"," + final_y + "," + interval + ")";
	elem.movementElement = setTimeout(repeat, interval);
}

//添加onload函数
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}