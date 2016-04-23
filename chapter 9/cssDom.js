function displayCSSProperty () {
	var example = document.getElementById('example');
	var color = example.style.color;
	alert(color);
}

addLoadEvent(displayCSSProperty);

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