function prepareForms(){
  for (var i = 0; i < document.forms.length; i++) {
    var thisForm = document.forms[i];
    resetFields(thisForm);
    thisForm.onsubmit = function(){
      if(!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if(submitFormWithAjax(this, article)) return false;
      return true;
    }
  };
}

addLoadEvent(prepareForms);

function submitFormWithAjax(whichForm, theTarget){
  var request = getHTTPObject();
  if(!request) {return false;}
  displayAjaxLoading(theTarget);
  var dataParts = [];
  var element = null;
  for (var i = 0; i < whichForm.elements.length; i++) {
    element = whichForm.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  };
  var data = dataParts.join('&');
  request.open('POST', whichForm.getAttribute('action'), true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      if(request.status == 200 || request.status == 0){
        var matches = request.responseText.match('/<article>([\s\S]+)<\/article>/');
        if(matches.length > 0){
          theTarget.innerHTML = matches[1];
        }else{
          theTarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>'
        }
      }else{
        theTarget.innerHTML = '<p>' + request.statusText + '<p>';
      }
    }
  }
  request.send(data);
  return true;
}

function displayAjaxLoading(){
  while(element.hasChildNodes()){
    element.removeChild(element.lastChild);
  }

  var content = document.createElement('img');
  content.setAttribute('src', 'images/loading.gif');
  content.setAttribute('alt', 'Loading');
  element.appendChild(content);
}


function getHTTPObject(){
  if(typeof XMLHttpRequest == 'undefined'){
    XMLHttpRequest = function(){
      try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
        catch(e){}
      try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
        catch(e){}
      try{return new ActiveXObject("Msxml2.XMLHTTP");}
        catch(e){}
      return false;
    }
  }
  return new XMLHttpRequest();
}

function validateForm(whichForm){
  for (var i = 0; i < whichForm.elements.length; i++) {
    var element = whichForm.elements[i];
    if(element.required == 'required'){
      if(!isFilled(element)){
        alert('Please fill in the' + element.name + 'field.');
        return false;
      }
    }
    if(element.type == 'email'){
      if(!isEmail(element)){
        alert('The' + element.name + 'field must be a valid email address');
        return false;
      }
    }
  };
  return true;
}

//验证表单元素是否非空
function isFilled(field){
  if(field.value.replace(' ', '') == 0) return false;
  var placeholder = field.placeholder || field.getAttribute('placeholder');
  return (field.value != placeholder);
}

//验证表单元素的值是否为电子邮件地址
function isEmail(field){
  return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1);
}

function resetFields(whichForm){
  if(!Modernizr.input.placeholder) return;
  
  for (var i = 0; i < whichForm.length; i++) {
    var element = whichForm.elements[i];
    if(element.type == 'submit') continue;
    var check = element.placeholder || element.getAttribute('placeholder');
    if(!check)  continue;
    element.onfocus = function(){
      var text = this.placeholder || this.getAttribute('placeholder');
      if(this.value != null){
        this.oldPlaceholder = text;
        this.placeholder = '';
        //this.className = '';
        //this.value = '';
      }
    }
    element.onblur = function(){
      if(this.value == ''){
       // this.className = 'placeholder';
       // this.value = this.placeholder || this.getAttribute('placeholder');
       this.placeholder = this.oldPlaceholder;
      }
    }
    //element.onblur();
  };
}

function displayAbbreviation(){
  if(!document.getElementsByTagName) return false;
  if(!document.createElement) return false;
  if(!document.createTextNode) return false;

  var abbreviations = document.getElementsByTagName('abbr');
  if(abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i = 0; i < abbreviations.length; i++) {
    currentAbbr = abbreviations[i];
    if(currentAbbr.childNodes.length < 1) return false;
    var defination = currentAbbr.getAttribute('title');
    var key = currentAbbr.lastChild.nodeValue;
    defs[key] = defination;
  };

  var dlist = document.createElement('dl');
  for(key in defs){
    var defination = defs[key];
    var dtitle = document.createElement('dt');
    var dtitleText = document.createTextNode(key);
    dtitle.appendChild(dtitleText);
    var ddesc = document.createElement('dd');
    var ddescText = document.createTextNode(defination);
    ddesc.appendChild(ddescText);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if(dlist.childNodes.length < 1) return false;
  var header = document.createElement('h3');
  var headerText = document.createTextNode("Abbreviations");
  header.appendChild(headerText);
  var articles = document.getElementsByTagName('article');
  if(articles.length == 0) return false;
  var container = articles[0];
  container.appendChild(header);
  container.appendChild(dlist);

}

addLoadEvent(displayAbbreviation);

function highlightRows(){
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    rows[i].oldClassName = rows[i].className;
    rows[i].onmouseover = function(){
      addClass(this, "highlight");
    }
    rows[i].onmouseout = function(){
      this.className = this.oldClassName;
    }
  };
}

addLoadEvent(highlightRows);

function stripeTables(){
  if(!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName('table');
  for (var i = 0; i < tables.length; i++) {
    var rows = tables[i].getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
      if(j%2){
        addClass(rows[j], "odd");
      }
    };
  };
}

addLoadEvent(stripeTables);

function prepareGallery(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById('imagegallery')) return false;
   var gallery = document.getElementById('imagegallery');
   var links = gallery.getElementsByTagName('a');
   for (var i = 0; i < links.length; i++) {
     links[i].onclick = function(){
      return showPic(this);
     }
   };
}

addLoadEvent(prepareGallery);

function preparePlaceholder(){
  if(!document.createElement) return false;
  if(!document.createTextNode) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById('imagegallery')) return false;

  var placeholder = document.createElement('img');
  placeholder.setAttribute('id', 'holder');
  placeholder.setAttribute('src', 'images/placeholder.gif');
  placeholder.setAttribute('alt', 'my image allery');
  var description = document.createElement('p');
  description.setAttribute('id', 'description');
  var descText = document.createTextNode('Choose an image');
  description.appendChild(descText);
  var gallery = document.getElementById('imagegallery');
  insertAfter(description,gallery);
  insertAfter(placeholder, description);
}

addLoadEvent(preparePlaceholder);

function showPic (whichPic) {
  if(!document.getElementById('holder')) return false;
  var source = whichPic.getAttribute('href');
  var holder = document.getElementById('holder');
  holder.setAttribute('src',source);
  if(!document.getElementById('description')) return false;

  var text = null;
  if(whichPic.getAttribute('title')){
    text = whichPic.getAttribute('title');
  }else{
    text = "";
  }

  if (document.getElementById('description')) {
    var description = document.getElementById('description');
    if(description.firstChild.nodeValue == 3){
      description.firstChild.nodeValue = text;
    }
    
  };
  return false;
  
}

function prepareInternalNav(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  var articles = document.getElementsByTagName('article');
  if(articles.length == 0) return false;
  var navs = articles[0].getElementsByTagName('nav');
  if(navs.length == 0)  return false;
  var nav = navs[0];
  var links = nav.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    var sectionId = links[i].getAttribute('href').split('#')[1];
    if(!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = 'none';
    links[i].destination = sectionId;
    links[i].onclick = function(){
      showSection(this.destination);
      return false;
    }
  };

}

addLoadEvent(prepareInternalNav);

function showSection(id){
  var sections = document.getElementsByTagName('section');
  for (var i = 0; i < sections.length; i++) {
    if(sections[i].getAttribute('id') != id){
      sections[i].style.display = 'none';
    }else{
      sections[i].style.display = 'block';
    }
  };
}

//实现幻灯片动画的效果
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
  
  //不加这两句会报错
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
