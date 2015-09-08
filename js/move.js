function startMove(obj,json,fenmu,fun){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var flag = true;         //假设所有值都到了

        for(var attr in json){
            var cur = 0;
            if(attr == "opacity")
            {
                cur = Math.round( parseFloat( getStyle(obj,attr) )*100 );
            }
            else
            {
                cur = Math.round( parseInt( getStyle(obj,attr) ) );
            }

            var speed = (json[attr]-cur)/fenmu;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            

            if(json[attr] != cur)
            {
                flag = false;
            }


            if(attr == "opacity")
            {
                obj.style.filter = "alpha(opacity:"+(cur+speed)+")";
                obj.style.opacity = (cur+speed)/100;
            }
            else
            {
                obj.style[attr] = cur+speed+"px";
            }
        }
        if(flag)
        {
            clearInterval(obj.timer);
            if(fun)fun();
        }
        
    },30);
}

//抖动
function shake(oDiv,range,time){
    var num = 0;
    var count = 1;
    var arr = [{top:(-range),left:0},{top:0,left:range},{top:range,left:0},{top:0,left:(-range)},{top:(-range),left:0}];
    var left = getStyle(oDiv,"left").replace(/px/,"");
    var top = getStyle(oDiv,"top").replace(/px/,"");

    clearInterval(oDiv.timer);
    oDiv.timer = setInterval(function(){
        oDiv.style.left = parseInt(left) + parseInt(arr[num].left) + "px";
        oDiv.style.top = parseInt(top) + parseInt(arr[num].top) + "px";
        num++;

        if(num == arr.length && count == time){
            clearInterval(oDiv.timer);
            oDiv.style.left = left + "px";
            oDiv.style.top = top + "px";

            num = 0;
        }
        if(num == arr.length){
            count++;
            num = 0;
        }
    },30);
}

function tick(target)
{
    target = "2015-07-10 10:00:00";
    var t_timestamp = Date.parse(target);
    var s_timestamp = new Date();
    c_timestamp = t_timestamp - s_timestamp; // 倒计时间戳

    c_timestamp = Math.floor(c_timestamp/1000);

    var d = Math.floor(c_timestamp/(60*60*24));
    c_timestamp = c_timestamp-(d*60*60*24);
    var h = Math.floor(c_timestamp/(60*60));
    c_timestamp = c_timestamp-(h*60*60);
    var m = Math.floor(c_timestamp/60);
    c_timestamp = c_timestamp-(m*60);
    var s = Math.floor(c_timestamp);

    document.getElementById('sy_d').innerHTML = d;
    document.getElementById('sy_h').innerHTML = h;
    document.getElementById('sy_m').innerHTML = m;
    document.getElementById('sy_s').innerHTML = s;
}

function getStyle(obj,name){
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
    }
    else
    {
        return getComputedStyle(obj,null)[name];
    }
}

function getElementsByClassName(obj,names)
{
  var aChild = obj.getElementsByTagName("*");
  var result = [];
  var names = names.split(" ");
  for(var i=0;i<aChild.length;i++)
  {
    var flag = true;
    
    for (var j = 0; j < names.length; j++) {
      if(aChild[i].className.indexOf(names[j]) == -1 )
      {
        flag = false;
      }
    };
    if(flag)
    {
      result.push(aChild[i]);
    }
  }

  return result;
}

function myAddEvent(obj,type,fn)
{
    if(obj.attachEvent)
    {
        obj.attachEvent("on"+type,fn);
    }
    else
    {
        obj.addEventListener(type,fn,false);
    }
}

function setCookie(name,value,iday)
{
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+iday);

    document.cookie = name+"="+value+";expires="+oDate;
}

function getCookie(name){
    var arr = document.cookie.split("; ");

    for(var i=0;i<arr.length;i++)
    {
        var arr2 = arr[i].split("=");
        if(arr2[0] == name)
        {
            return arr2[1];
        }
    }
    return "";
}

function removeCookie(name)
{
    setCookie(name,1,-1);
}

function extend(obj1,obj2)
{
    for(var attr in obj1){
        obj2[attr] = obj1[attr];
    }
}