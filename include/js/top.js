var top_c = {};
top_c.ui = {};
top_c.app = {};

top_c.app.pageLoad = function(){
	var load_before = document.getElementById("load_before");
	var xie_line = load_before.firstElementChild;
	var center_circle = xie_line.firstElementChild;
	var hd_left = document.getElementById("hd_left");
	var hd_right = document.getElementById("hd_right");

	var deg = 100;
	var start = 0;
	var speed = 20;
	var timer = setInterval(function(){
		if(start==deg){
			clearInterval(timer);
			top_c.app.circleToSmall(center_circle,hd_left,hd_right);
			var oDot = center_circle.firstElementChild;
			oDot.style.display="none";
		}else{
			center_circle.style.transform = "rotate("+(start+speed)+"deg)";
			start += speed;
		}
	},30);
	
}

top_c.app.circleToSmall = function(circle,hd_left,hd_right){
	var target = 0;
	var speed = -0.1;
	var start = 1;
	var timer = setInterval(function(){
		if(start==target){
			clearInterval(timer);
			top_c.app.closeDoor(hd_left,hd_right);
		}else{
			circle.style.transform = "scale("+(start+speed)+")";
			start += speed;
			start = Math.floor(start*10)/10;
		}
	},30);
}

top_c.app.closeDoor = function(left_d,right_d){
	var load_before = document.getElementById("load_before");
	startMove(left_d,{width:750},3);
	startMove(right_d,{width:750},3,function(){
		load_before.style.alpha = "(opacity:70)";
		load_before.style.opacity = "0.7";
		startMove(load_before,{opacity:0},5);

		document.body.removeChild(load_before);
	});
}