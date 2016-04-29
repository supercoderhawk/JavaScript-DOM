function createVideoControls(){
	var vids = document.getElementsByTagName('video');
	for (var i = 0; i < vids.length; i++) {
		vids[i]
	};
}

addLoadEvent(createVideoControls);

function addControls(vid){
	vid.removeAttribute('controls');

	vid.height = vid.videoHeight;
	vid.width = vid.videoWidth;
	vid.parentNode.style.height = vid.videoHeight + 'px';
	vid.parentNode.style.width = vid.videoWidth + 'px';

	var controls = document.createElement('div');
	controls.setAttribute('class', 'controls');

	var play = document.createElement('button');
	play.setAttribute('tit', 'Play');
	play.innerHTML = '&#x25BA;';

	controls.appendChild(play);
	vid.parentNode.insertBefore(controls, vid);

	play.onclick = function(){
		if(vid.ended){
			vid.currentTime = 0;
		}
		if(vid.paused){
			vid.play();
		}else{
			vid.parse();
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
