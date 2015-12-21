$(function(){
	var oDiv1=document.getElementById('div1');
	var oDiv2=document.getElementById('div2');
	var oImg1=document.getElementById('img1');
	var oImg2=document.getElementById('img2');
	oImg2.style.display = "none";
	var r=oDiv2.offsetWidth/2;
	var count=4;
	var bl=true;
	var aImg1=oImg1.getElementsByTagName('img');
	var aImg2=oImg2.getElementsByTagName('img');
	for (var i = 0; i < aImg1.length; i++) {
		setPos1(aImg1[i],0);
		aImg1[i].rotate=0;
	};

	for (var i = 0; i < aImg2.length; i++) {
		setPos2(aImg2[i],260);
		aImg2[i].rotate=260;
	};

	oImg1.onclick = function(){
		if(bl){
			for(var i=0;i<count;i++){
				move1(aImg1[i],i*(140/(count-1))-70);
			}
			setTimeout(function(){
				oImg2.style.display = "block";
				for(var i=0;i<count;i++){
					move2(aImg2[i],i*(140/(count-1))+110);
				}
			},400);
			bl = false;
		}else{
			for (var i = 0; i < count; i++) {
				move2(aImg2[i],260);
			};
			setTimeout(function(){
				oImg2.style.display = "none";
				for(var i=0;i<count;i++){
					move1(aImg1[i],0);
				}
			},300);
			bl = true;
		}
	}


	function setPos1(obj,ang){
		var a=Math.sin(a2r(ang))*r;
		var b=Math.cos(a2r(ang))*r;

		obj.style.left=oDiv1.offsetLeft+r+a+'px';
		obj.style.top=oDiv1.offsetTop+r-b+'px';	
	}
	function setPos2(obj,ang){
		var a=Math.sin(a2r(ang))*r;
		var b=Math.cos(a2r(ang))*r;

		obj.style.left=oDiv2.offsetLeft+r+a+'px';
		obj.style.top=oDiv2.offsetTop+r-b+'px';	
	}


	function a2r(n){
		return 	n*Math.PI/180;
	}

	function move1(obj,iTarget){
		var start=obj.rotate;
		var dis=iTarget-start;
		var count=Math.round(700/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;

			var a=1-n/count;
			var cur=start+dis*(1-a*a*a);
			setPos1(obj,cur);
			obj.rotate=cur;
			if(n==count){
				clearInterval(obj.timer);
			}	
		},30);
	}
	function move2(obj,iTarget){
		var start=obj.rotate;
		var dis=iTarget-start;
		var count=Math.round(700/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;

			var a=1-n/count;
			var cur=start+dis*(1-a*a*a);
			setPos2(obj,cur);
			obj.rotate=cur;
			if(n==count){
				clearInterval(obj.timer);
			}	
		},30);
	}
});