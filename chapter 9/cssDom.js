function displayCSSProperty () {
	var example = document.getElementById('example');
	
	example.style.color = 'pink';
	
	
}

addLoadEvent(displayCSSProperty);

function styleHeaderSiblings(){
	if(!)
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