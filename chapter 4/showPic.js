function showPic (whichPic) {
	var source = whichPic.getAttribute('href');
	var holder = document.getElementById('holder');
	holder.setAttribute('src',source);
	var text = whichPic.getAttribute('title');
	var description = document.getElementById('description');
	description.firstChild.nodeValue = text;
}