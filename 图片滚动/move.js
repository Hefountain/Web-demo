function getStyle(obj, name) {//此方法主要是要来区分是否是行间样式，还是非行间样式
    if (obj.currentStyle) {//非行间样式
        return obj.currentStyle[name];
    }
    else {//行间样式
        return getComputedStyle(obj, false)[name];
    }
}
var time = null;
//obj:当前对象  
//value:属性  
//iTarget: 目标
//num:速度的快慢
function startMove(obj, value, iTarget,num) {
    clearInterval(obj.time);//清除obj的time，obj.time的意义为：为每一个对象赋一个自己的定时器，以免产生冲突。
    obj.time = setInterval(function () {
        var cur = 0;//定义一个默认的对象属性值
        if (value == 'opacity') {//如果属性等于透明度
            cur = Math.round(parseFloat(getStyle(obj, value)) * 100);//四舍五入数学函数，因为计算机计算有小数会有点误差，用此函数消除这点误差
            //当前对象属性value=opacity
        }
        else {
            cur = parseInt(getStyle(obj, value));
            //当前对象属性value
        }
        var speed = (iTarget - cur) / num;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//缓冲运动写法
        if (cur == iTarget) {
            clearInterval(obj.time);
        }
        else {
            if (value == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            }
            else {
                obj.style[value] = cur + speed + 'px';
            }
        }
    }, 30);
};