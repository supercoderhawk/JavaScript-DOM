function moveMessage(){
	if(!document.getElementById) return false;
	if (!document.getElementById("message"))  return false;
	var elem = document.getElementById("message");
	elem.style.left = "100px";
}

function positionMessage(){
	if(!document.getElementById) return false;
	if (!document.getElementById("message"))  return false;
	var elem = document.getElementById("message");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "100px";
	movement = setTimeout("moveMessage()",3000);
}

addLoadEvent(positionMessage);

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