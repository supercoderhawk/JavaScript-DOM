function countBodyChildren(){
	var bodyElement = document.getElementsByTagName('body')[0];
	alert(bodyElement.childNodes.length);
}
function getNodeType(){

	var bodyElement = document.getElementsByTagName('body')[0];
	var childNodes = bodyElement.childNodes;
	var type = "";
	for (var i = 0; i < childNodes.length; i++) {
		type += childNodes[i].nodeType + "\n";
	};
	alert(type);
}
//window.onload = countBodyChildren;
window.onload = getNodeType;