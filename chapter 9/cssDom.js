function displayCSSProperty () {
	var example = document.getElementById('example');
	
	example.style.color = 'pink';
	
	
}

addLoadEvent(displayCSSProperty);

function styleHeaderSiblings(){
	if(!document.getElementsByTagName) return false;
	var headers = document.getElementsByTagName("h1");
	var elem;
	for (var i = 0; i < headers.length; i++) {
		elem = getNextElement(headers[i].nextSibling);
		elem.style.color = 'pink';
		elem.style.fontWeight = "bold";
		elem.style.fontSize = "1.2em";
	};


}

addLoadEvent(styleHeaderSiblings);

//获得节点的下个元素节点
function getNextElement(node){
	if (node.nodeType == 1) {
		return node;
	};
	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}
	return null;
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