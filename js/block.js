$(function(){
	var oDiv=document.getElementById('div1');
	var aBox=oDiv.children;
	var nCol=50;	//一列放7张
	var nRow=1;	//一行放4张
	var now=0;	//当前第0张
	var count=2;//总张数
	var ready=true;
	
	//1.分块，给div里丢一堆小div,给小div给背景，调整background-position
	for(var r=0;r<nRow;r++){
		for(var c=0;c<nCol;c++){
			var oBox=document.createElement('div');
			oBox.style.width=oDiv.offsetWidth/nCol+'px';
			oBox.style.height=oDiv.offsetHeight/nRow+'px';
			oDiv.appendChild(oBox);
			oBox.style.backgroundPosition=-c*oBox.offsetWidth+'px '+ -r*oBox.offsetHeight+'px';
			oBox.r=r;
			oBox.c=c;
		}
	}
	
	//2.分步
	oDiv.onclick=function(){
		tab();
	};

	var timer = setInterval(tab,1000);

	function tab(){
		if(!ready) return;
		ready=false;
		
		for(var i=0;i<aBox.length;i++){
			(function(index){
				setTimeout(function(){
					move(aBox[index],{opacity:0},{duration:900,complete:function(){
						//判断最后一张到位	
						if(index==aBox.length-1){
							
							//调整所有oBox的背景图为下一张图,并且oBox的opacity=1,oDiv的背景图为下一张
							now++;
							now%=count;
							for(var i=0;i<aBox.length;i++){
								aBox[i].style.backgroundImage='url(images/slider'+now+'.jpg)';
								aBox[i].style.opacity=1;
							}
							oDiv.style.backgroundImage='url(images/slider'+(now+1)%count+'.jpg)';
							ready=true;
						}
					}});
				},(aBox[i].r+aBox[i].c)*100);
			})(i);
		}
	}

	oDiv.onmouseover = function(){
		clearInterval(timer);
	}

	oDiv.onmouseout = function(){
		timer = setInterval(tab,1000);
	}
});