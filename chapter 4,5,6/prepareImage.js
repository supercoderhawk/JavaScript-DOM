function prepareImage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if (!document.getElementById('img')) return false;
	
	var img = document.getElementById('img');
	var links = img.getElementsByTagName('a');

	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function(){
			showPic(this);
			return false;
		}
	}
	
}

//绑定多个函数至onload事件
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

addLoadEvent(prepareImage);
