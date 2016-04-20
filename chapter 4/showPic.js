function showPic (whichPic) {
	var source = whichPic.getAttribute('href');
	var holder = document.getElementById('holder');
	holder.setAttribute('src',source);
}