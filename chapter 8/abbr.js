function displayAbbreviations () {
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;

	var abbreviation = document.getElementsByTagName('abbr');
	var defs = new Array();
	for (var i = 0; i < abbreviation.length; i++) {
		var definition = abbreviation[i].getAttribute("title");
		var key = abbreviation[i].lastChild.nodeValue;
		defs[key] = definition;
	};

	//创建定义列表
	var dlist = document.createElement("dl");
	for(key in defs){
		definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtext = document.createTextNode(key);
		dtitle.appendChild(dtext);
		dlist.appendChild(dtitle);
		var ddes = document.createElement("dd");
		var ddesText = document.createTextNode(definition);
		ddes.appendChild(ddesText);
		dlist.appendChild(ddes);
	}

	var header = document.createElement("h2");
	var headerText = document.createTextNode("Abbreviation");
	header.appendChild(headerText);
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.appendChild(header);
	bodyElement.appendChild(dlist);

}

addLoadEvent(displayAbbreviations);

//添加引用
function displayCitations(){
	var quotes = document.getElementsByTagName("blockquote");
	for (var i = 0; i < quotes.length; i++) {
		if(!quotes[i].getAttribute("cite")){
			continue;
		}
		var url = quotes[i].getAttribute("cite");
		var quoteChildren = quotes[i].getElementsByTagName("*");
		if(quoteChildren.length < 1) continue;
		//elem为引用最后一个元素节点
		var elem = quoteChildren[quoteChildren.length - 1];

		var link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("target", "_blank")
		var linkText = document.createTextNode("source");
		link.appendChild(linkText);
		var superScript = document.createElement("sup");
		superScript.appendChild(link);
		elem.appendChild(superScript);


	};
}

addLoadEvent(displayCitations);

function displayAccesskeys(){

	if(!document.getElementsByTagName) return false;
	if(!document.createTextNode) return false;
	if(!document.createElement) return false;

	var accessKeys = new Array();

	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		if(!links[i].getAttribute("accesskey")) continue;
		var key = links[i].getAttribute("accesskey");
		var dest = links[i].lastChild.nodeValue;
		accessKeys[key] = dest;
	};

	var header = document.createElement("h2");
	var headerText = document.createTextNode("Accesskeys:");
	header.appendChild(headerText);
	var keyList = document.createElement("ul");
	for (key in accessKeys) {
		var elem = document.createElement("li");
		var text = key + ":" + accessKeys[key];
		var elemText = document.createTextNode(text);
		elem.appendChild(elemText);
		keyList.appendChild(elem);
		
	};
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(header);
	body.appendChild(keyList);
}

addLoadEvent(displayAccesskeys);

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