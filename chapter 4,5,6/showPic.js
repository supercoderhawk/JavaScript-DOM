function showPic (whichPic) {
	if(!document.getElementById('holder')) return false;
	var source = whichPic.getAttribute('href');
	var holder = document.getElementById('holder');
	holder.setAttribute('src',source);
	var text = whichPic.getAttribute('title');
	if (document.getElementById('description')) {
		var description = document.getElementById('description');
		description.firstChild.nodeValue = text;	
	};
	return true;
	
}