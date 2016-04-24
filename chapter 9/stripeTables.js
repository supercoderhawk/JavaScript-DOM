function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var cells = document.getElementsByTagName("tr");
	
	for (var i = 0; i < cells.length; i++) {
		if(i%2)
			cells[i].style.backgroundColor = "#ffc";
	};
}

addLoadEvent(stripeTables);

//显示所有缩略语元素的信息
function displayAbbreviations(){

	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;

	var abbr = document.getElementsByTagName("abbr");
	var item ,itemText, desc, descText;

	var dlist = document.createElement("dl");
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(dlist);

	for (var i = 0; i < abbr.length; i++) {
		if(!abbr[i].getAttribute("title")) return;
		item = document.createElement("dt");
		itemText = document.createTextNode(
			abbr[i].lastChild.nodeValue);

		item.appendChild(itemText);
		desc = document.createElement("dd");
		descText = document.createTextNode(
			abbr[i].getAttribute("title"));

		desc.appendChild(descText);
		dlist.appendChild(item);
		dlist.appendChild(desc);

	};
}

addLoadEvent(displayAbbreviations);

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