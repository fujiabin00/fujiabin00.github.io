$(function(){
	var oClock = document.getElementById('time');
		aClock = oClock.getElementsByClassName('clock');
		clock();
		setInterval(clock,1000);
		function clock(){
			var d = new Date();
			var year = fillZero(d.getFullYear());
			var month = fillZero(d.getMonth()+1);
			var date = fillZero(d.getDate());
			var hour = fillZero(d.getHours());
			var minute = fillZero(d.getMinutes());
			var second = fillZero(d.getSeconds());
			var nowTime = year+""+month+""+date+""+hour+""+minute+""+second;
			for (var i = 0; i < aClock.length; i++) {
				aClock[i].src = "images/time/"+nowTime.charAt(i)+".png";
			};
		}

		//目标时间-当前时间
		var targetTime = new Date();
		targetTime.setFullYear(2015,12,1);
		targetTime.setHours(0,0,0,0);
		var oCountDown = document.getElementById('countdown');

		countdown()
		function countdown(){
			var nowTime = new Date();
			var s = parseInt((targetTime.getTime() - nowTime.getTime())/1000);
			var date = Math.floor(s/86400);
			var hour = Math.floor(s%86400/3600);
			var minute = Math.floor(s%86400%3600/60);
			var sencond = s%86400%3600%60;
			oCountDown.innerHTML = "跨年倒计时还有"+date+"天"+hour+"时"+minute+"分"+sencond+"秒";
		}
		setInterval(countdown,1000);

		function fillZero(n){
			return n<10?'0'+n:''+n;
		}
})