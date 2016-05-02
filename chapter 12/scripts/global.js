function prepareSlideshow(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById('intro')) return false;

  //创建幻灯片元素
  var intro = document.getElementById('intro');
  var slideShow = document.createElement('div');
  slideShow.setAttribute('id', 'slideshow');
  var preview = document.createElement('img');
  preview.setAttribute('src', 'images/slideshow.gif');
  preview.setAttribute('alt', 'a glimpse of what awaits you');
  preview.setAttribute('id', 'preview');
  //preview.style.position = 'absolute';
  preview.style.top = '0px';
  preview.style.left = '0px';
  slideShow.appendChild(preview);
  insertAfter(slideShow,intro);
  
  //设置幻灯片动画效果
  var links = intro.getElementsByTagName('a');
  var destination = null;
  for (var i = 0; i < links.length; i++) {
    links[i].onmouseover = function(){
      destination = this.getAttribute('href');
      if(destination.indexOf('index.html') != -1){

        moveElement('preview',0,0,5);
      }
      if (destination.indexOf('about.html') != -1) {
        moveElement('preview', -150, 0, 5);
      }
      if(destination.indexOf('photos.html') != -1){
        moveElement('preview', -300, 0, 5);
      }
      if(destination.indexOf('live.html') != -1){
        moveElement('preview', -450, 0, 5);
      }
      if(destination.indexOf('contact.html') != -1){

        moveElement('preview', -600, 0, 5);
      }
    }
  };
}

addLoadEvent(prepareSlideshow);

function moveElement(elementID, final_x, final_y, interval){
  
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if(elem.movementElement){
    clearTimeout(elem.movementElement);
  }

  //elem.style.position = 'absolute';
  var xPos = parseInt(elem.style.left);
  var yPos = parseInt(elem.style.top);
  //alert(xPos + "//" + yPos);
  var dist = 0;
  var scale = 10;

  if (xPos == final_x && yPos == final_y) {
    return true;
  };
  if (xPos < final_x) {
    dist = Math.ceil((final_x - xPos)/scale);
    xPos += dist;
  }
  if (xPos > final_x) {
    dist = Math.ceil((xPos - final_x)/scale);
    xPos -= dist;
  }
  if (yPos < final_y) {
    dist = Math.ceil((final_y - yPos)/scale);
    yPos += dist;
  }
  if (yPos > final_y) {
    dist = Math.ceil((yPos - final_y)/scale);
    yPos -= dist;
  }
  elem.style.top = yPos + "px";
  elem.style.left = xPos + "px";

  var repeat = "moveElement('" + elementID +"'," + final_x + 
      "," + final_y + "," + interval + ")";
  elem.movementElement = setTimeout(repeat, interval);
}

//将函数添加到onload函数
function addLoadEvent(func){
  var oldOnload = window.onload;
  if(typeof oldOnload != 'function'){
    window.onload = func();
  } else {
    window.onload = function(){
      oldOnload();
      func();
    }
  }
}
//将函数添加到onload函数
function addLoadEvent(func){
  var oldOnload = window.onload;
  if(typeof oldOnload != 'function'){
    window.onload = func();
  } else {
    window.onload = function(){
      oldOnload();
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

function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}
