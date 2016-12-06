// JavaScript Document

window.onload = function () {
   Slider();
};

/* 定义事件处理程序，兼容IE + Chrome */
var EventUtil = {
    getEvent: function(event){
            return event ? event : window.event;
        },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};

/* 轮播图实现 - 图片切换*/
function Slider(){
    var slider = document.querySelector('.w-slider');
    var buttons = document.querySelectorAll('#buttons span');
    var index =0;
    var timer;

    var imgChange = function(){
        var current=(index==2)?0:index+1;
        imgChanging(index,current,buttons);
        index = current;
    }
    var t=setInterval(imgChange,5000);
    EventUtil.addHandler(slider,'mouseover',function(){
        if(t){
            clearInterval(t);
        }
    });

    EventUtil.addHandler(slider,'mouseout',function(){
        t=setInterval(imgChange,5000);
    });
    
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(){
            var myindex= parseInt(this.getAttribute('index'));
            clearInterval(timer);
            timer=imgChanging(index,myindex-1,buttons);
            index=myindex-1;
            
        };
    }
}
/* 轮播图实现 - 图片切换*/
function imgChanging(cur,next,buttons){
    var imgs=document.querySelectorAll('.w-slider .m-wrap');
    var curImg=imgs[cur];
    var nextImg=imgs[next];
    var deg=0
    nextImg.style.zIndex='3';
    nextImg.style.display='block';
    buttons[next].className='on';
    buttons[cur].className='';
    curImg.style.opacity=1;
    curImg.style.filter='alpha(opacity:100)';
    var timer=setInterval(function(){
        if (deg<10) {
            deg+=2;
            nextImg.style.opacity=deg/10;
            nextImg.style.filter='alpha(opacity:'+ deg*10 +')';
        }else{
            clearInterval(timer);
            nextImg.style.zIndex='2';
            curImg.style.zIndex='1';
            curImg.style.display='none';
            curImg.style.opacity='0';
            curImg.style.filter='alpha(opacity:0)';
        }
    },100);
    return timer;
}
