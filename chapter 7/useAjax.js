function getNewContent(){
	var request = getHTTPObject();
	if(request){
		request.open("GET", "text.txt", true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				var param = document.createElement("p");
				var text = document.createTextNode(
					request.responseText);
				param.appendChild(text);
				document.getElementById('new').appendChild(param);
			}
		}
		request.send(null);
	}else{
		alert("Sorry, your browser doesn\'t support XMLHttpRequest.");
	}
}

addLoadEvent(getNewContent);

//使用对象检测获得XMLHttpRequest对象，主要为兼容IE
function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e){}
			return false;
		}
		return new XMLHttpRequest();
}


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