//官网拖拽
$(function(){
	var oDiv=document.getElementById('div1');
	var oUl=oDiv.children[0];
	var aLi=oUl.children;
	var aImg=oUl.getElementsByTagName('img');
	var aSpan=oUl.getElementsByTagName('span');

	//1.设定ul的width
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	
	//2.拖拽
	oUl.onmousedown=function(ev){
		var oEvt=ev||event;
		var disX=oEvt.clientX-oUl.offsetLeft;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			var l=oEvt.clientX-disX;//计算
			//5.限定
			if(l>oDiv.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth)
				l=oDiv.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth;
			if(l<oDiv.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth)
				l=oDiv.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth;
			oUl.style.left=l+'px'; //使用
			
			setSize();//3.修改尺寸

		};	
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;	
		};
		
		return false;
	};
	//4.设定中心点
	setCenter(3);
	function setCenter(n){
		//	oDiv.w/2-(n+0.5)*li.w
		oUl.style.left=oDiv.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';
	}
	setSize();
	function setSize(){
		//3.放大所有图片，根据距离dis
		//dis=oDiv.w/2-(ul.left+li.left+li.w/2)
		for(var i=0;i<aImg.length;i++){
			var dis=Math.abs(oDiv.offsetWidth/2-(oUl.offsetLeft+aLi[i].offsetLeft+aLi[i].offsetWidth/2));
			var scale=1-dis/800;	//1---0	计算
			
			//限定
			if(scale<0.5) scale=0.5;
			
			//aSpan[i].innerHTML=scale.toFixed(2);
			
			//放大图片width/height/marginLeft/marginTop
			aImg[i].style.width=520*scale+'px';	//使用
			aImg[i].style.height=358*scale+'px';
			aImg[i].style.marginLeft=-(aImg[i].offsetWidth-aLi[i].offsetWidth)/2+'px';
			aImg[i].style.marginTop=-(aImg[i].offsetHeight-aLi[i].offsetHeight)/2+'px';
			aImg[i].style.zIndex=parseInt(scale*10000);
			aImg[i].style.opacity=scale;
			
		}	
	}
	
	window.onresize=setSize;
});

//发牌效果
$(function(){

	function addEvent(obj,sEvt,fn){
		if(obj.addEventListener){
			obj.addEventListener(sEvt,fn,false);
		}else{
			obj.attachEvent('on'+sEvt,fn);	
		}
	}


	var oUl=document.getElementById('pai');
	var aLi=oUl.children;
	var oBtn1=document.getElementById('btn1');
	var oBtn2=document.getElementById('btn2');
	var oBtn3=document.getElementById('btn3');
	var oBtn4=document.getElementById('btn4');
	var oBtn5=document.getElementById('btn5');
	var ready=true;
	//1布局转换
	var aPos=[];	//[{left:?,top:?,width:?,height:?,opacity:?},{}]
	for(var i=0;i<aLi.length;i++){
		aPos.push(
		{
			left:	aLi[i].offsetLeft,
			top:	aLi[i].offsetTop,
			width:	aLi[i].offsetWidth,
			height:	aLi[i].offsetHeight,
			opacity:1
		}
		);
		aLi[i].style.left=aPos[i].left+'px';
		aLi[i].style.top=aPos[i].top+'px';
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position='absolute';
		aLi[i].style.margin=0;
	}
	


	//2.给btn加事件
	addEvent(oBtn1,'click',function(){
		if(!ready) return;
		ready=false;
		var arr = [0,1,2,3];
		down(arr);
	});
	addEvent(oBtn2,'click',function(){
		if(!ready) return;
		ready=false;
		var arr = [0];
		down(arr);
	});
	addEvent(oBtn3,'click',function(){
		if(!ready) return;
		ready=false;
		var arr = [1];
		down(arr);
	});
	addEvent(oBtn4,'click',function(){
		if(!ready) return;
		ready=false;
		var arr = [2];
		down(arr);
	});
	addEvent(oBtn5,'click',function(){
		if(!ready) return;
		ready=false;
		var arr = [3];
		down(arr);
	});
	
	function down(arr){
		var i=aLi.length-1;
		var timer=setInterval(function(){
			//办事
			(function(index){
				move(aLi[i],{left:oUl.offsetWidth/2,top:-100,opacity:0,width:0,height:0},{complete:function(){
					if(index==0){
						up(arr);	
					}
				}});
			})(i);
			
			i--;
			if(i==-1){
				clearInterval(timer);	
			}
		},100);	
	}
	
	function up(arr){
		var i=arr.length-1;
		var timer=setInterval(function(){
			
			(function(index){
				move(aLi[arr[i]],aPos[i],{complete:function(){
					if(index==0){
						ready=true;
					}
				}});
			})(i);
			
			i--;
			if(i==-1){
				clearInterval(timer);	
			}
		},100);	
	}
});
