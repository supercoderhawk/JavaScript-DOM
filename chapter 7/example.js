function test () {
	var testdiv = document.getElementById('testdiv');
	testdiv.innerHTML = "<p>I inserted <em>this</em> content.</p>";
}

addLoadEvent(test);

function testElement(){
	var divtest = document.getElementById('testdiv');
	
	//图片元素
	var img = document.createElement("img");
	img.setAttribute("id", "picture");
	img.setAttribute("src", "img/5.jpg");
	img.setAttribute("alt", "picture 5");

	//文本描述元素
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var descText = document.createTextNode("This is a text node.");
	description.appendChild(descText);
	var descBold = document.createElement("b");
	var descBoldText = document.createTextNode("Bold Node");
	descBold.appendChild(descBoldText);
	description.appendChild(descBold);
	insertAfter(img, divtest);
	insertAfter(description, img);


}

addLoadEvent(testElement);

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

function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	};
}
