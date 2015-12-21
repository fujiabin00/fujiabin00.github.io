//版权 北京智能社©, 保留所有权利
function $(fn){
	
	if(document.addEventListener){//高级
		document.addEventListener("DOMContentLoaded",fn,false);
	} else {
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState == "complete"){
				fn &&fn();
			}	
		});
	}
}