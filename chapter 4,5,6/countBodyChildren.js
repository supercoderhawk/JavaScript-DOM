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
	
}
//window.onload = countBodyChildren;
//window.onload = getNodeType;
//window.open("http://www.baidu.com","popup","width=320, height=480");