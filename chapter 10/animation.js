function moveMessage(){

	if(!document.getElementById) return false;
	if (!document.getElementById("message"))  return false;
	var elem = document.getElementById("message");
	elem.style.position = "absolute";
	if (elem.style.left == "") {
		elem.style.left = "0px";
		
	}
	if (elem.style.top == "") {
		elem.style.top = "0px";
		
	}
	
	var xPos = parseInt(elem.style.left);
	var yPos = parseInt(elem.style.top);
	
	if(xPos == 200 && yPos == 200){
		return true;
	}
	if (xPos < 200) {
		xPos ++;
	}
	if (xPos > 200) {
		xPos --;
	}
	if (yPos < 200) {
		yPos ++;
	}
	if (yPos > 200) {
		yPos --;
	}

	elem.style.left = xPos + "px";
	elem.style.top = yPos + "px";
	
	movement = setTimeout("moveMessage()", 10);
	//alert(typeof elem.style.top);
	//alert(elem.style.left + "//" + yPos);
	//elem.style.left = "100px";
}

addLoadEvent(moveMessage);

function moveElement(elementID, final_x, final_y, interval){
	
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
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
	movementElement = setTimeout(repeat, interval);
}

//addLoadEvent(moveElement);

function positionMessage(){
	if(!document.getElementById) return false;
	if (!document.getElementById("message"))  return false;
	var elem = document.getElementById("message");
	elem.style.position = "absolute";
	elem.style.left = "10px";
	elem.style.top = "10px";
	moveElement("message", 200, 100, 10);
	//movement = setTimeout("moveMessage()",10);

}

//addLoadEvent(positionMessage);

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