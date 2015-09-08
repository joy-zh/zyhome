window.onload = function()
{
	mv.app.toTip();
	mv.app.toBanner();
	mv.app.showSelect();
}
var mv = {};

mv.tools = {};

mv.ui = {};
mv.ui.textChange = function(obj,str){
	obj.onfocus = function(){
		if(obj.value == str){
			obj.value = '';
		}
	}
	obj.onblur = function(){
		if(obj.value == ''){
			obj.value = str;
		}
	}
}

mv.ui.picPlay = function(aLi){
	var zIndex = aLi.length;
	var num = 0;
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].style.zIndex = zIndex--;
	}

	var timer = setInterval(function () {
		if (num == aLi.length - 1) {
			num = 0;
		} else {
			num ++;
		}
		for (var i = 0; i < aLi.length; i++) {
			startMove(aLi[i], { opacity : 0 },6);
		}
		startMove(aLi[num], { opacity : 100 },6);
	}, 3000);
	
}

mv.ui.hideSelect = function(obj){
	var aUl = obj.getElementsByTagName("ul");
	document.onclick = function(){
		for (var i = 0; i < aUl.length; i++) {
			aUl[i].style.display = "none";
		};
	}
}

mv.app = {};

mv.app.toTip = function(){
	var oText1 = document.getElementById("search1");
	var oText2 = document.getElementById("search2");

	mv.ui.textChange(oText1,"Search website");
	mv.ui.textChange(oText2,"Search website");
}

mv.app.toBanner = function(){
	var oBanner = document.getElementById("ad");
	var aLi = oBanner.getElementsByTagName("li");
	mv.ui.picPlay(aLi);

}

mv.app.showSelect = function(){
	var obj = document.getElementById("selector");
	var aDown = obj.getElementsByClassName("down");
	for (var i = 0; i < aDown.length; i++) {
		aDown[i].index = i;
		aDown[i].onclick = function(e){
			var ul = document.getElementById("sel_ul_"+this.index);
			if(ul.style.display == "block"){
				ul.style.display = "none";
			}else{
				ul.style.display = "block";
			}
			
			var oEvent = e || event;
			if(oEvent.cancelBubble){
				oEvent.cancelBubble = true;
			}else{
				oEvent.stopPropagation();
			}

			ul.onclick = function(e){
				var oEvent1 = e || event;
				if(oEvent1.cancelBubble){
					oEvent1.cancelBubble = true;
				}else{
					oEvent1.stopPropagation();
				}
			}
		}
	};

	mv.ui.hideSelect(obj);
}