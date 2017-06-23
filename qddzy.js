var tips_module = (function(){

    var tips = document.querySelector('.tip');
    var closeTip = document.querySelector('.notip');

    var cookie = getCookie();

    if (!cookie.noTips) {
        tips.style.display = 'block';
    };

    addClickEvent(closeTip,function(event){
        setCookie('notip',1,new Date(9999,9));
        tips.style.marginTop = '-30px';
    });

})();
// 视频模块
var video_module = (function(){
    var videoMask = document.querySelector(".m-video");
    var videoPlay = document.querySelector(".j-play");
    var closeVideo = document.querySelector(".video1 .closed");
    var video = document.querySelector(".video1 video");

    addClickEvent(videoPlay,function(event){
        videoMask.style.display='block';
    });
    addClickEvent(closeVideo,function(event){
        videoMask.style.display = 'none';
        if (video && !video.paused){
            video.pause();
        };
    });
})();
// 轮播图
var slide_module = (function(){
    window.onload = function(){
        var oDiv = document.querySelector('.m-banner');
        var oUl = oDiv.getElementsByTagName('ul')[1];
        var aLi = oUl.getElementsByTagName('li');
        var aImg = oUl.getElementsByTagName('img');

        var oBtn = document.querySelector('.m-banner .nav');
        var aA = oBtn.getElementsByTagName('a');
        var iNow = 0;
        var Runing = true;

        for (var i =0;i < aA.length;i++) {
            aA[i].index = i;
            aA[i].onclick = function(){
                for (var i = 0;i< aA.length;i++){
                    aA[i].parentNode.className = '';
                    aLi[i].className = '';
                };
                this.parentNode.className = 'selected';
                aLi[this.index].className = 'list1';
                iNow = this.index;
            }
        };
        var intervalId = setInterval(toRun,5000);

        function toRun(){
            if (iNow == aLi.length-1){
                iNow = 0;
            }
            else{
                iNow++;
            }
            for (var i = 0;i < aA.length;i++){
                aA[i].parentNode.className = '';
                aLi[i].className = '';
            };
            aA[iNow].parentNode.className = 'selected';
            aLi[iNow].className = 'list1';
        }
        oDiv.onmouseover = function(){
            if(Runing){
                clearInterval(intervalId);
                Runing = false;
            }
        };
        oDiv.onmouseout = function(){
            if(!Runing){
                intervalId = setInterval(toRun,5000);
                Runing = true;
            }
        };
    }
})();
// 右边热门推荐及滚动模块
var top_module = (function(){
    var url = 'http://study.163.com/webDev/hotcouresByCategory.htm';
    var oUl = document.querySelector('.m-htop');
    var aLi = oUl.getElementsByTagName('li');

    // 获取热门排行课程数据
    get(url,null,initTop);
    //初始化热门课程列表
    function initTop(response,now){
        var list = JSON.parse(response);
        console.log(list);

        var templete = document.querySelector('.m-htop .f-templete');
        for (var i=0;i<list.length;i++){
            var cloned = templete.cloneNode(true);
            removeClass(cloned,'f-templete');
            var imgpic = cloned.querySelector('.imgpic');
            var title = cloned.querySelector('.tt');
            var num = cloned.querySelector('.num');

            imgpic.src = list[i].smallPhotoUrl;
            imgpic.alt = list[i].name;
            title.innerText = list[i].name;
            num.innerText = list[i].learnerCount;
            templete.parentNode.appendChild(cloned);
        }

        setInterval(scroll,5000);

        function scroll(){
            var oLi = aLi[20].cloneNode(true);
            oUl.insertBefore(oLi,aLi[1]);
            startMove(oUl,{bottom:-990},function(){
                oUl.removeChild(aLi[21]);
                oUl.style.bottom = '-900px';
            });
        }
    }
})();
//运动模块
var startMove = (function(){
    return function(obj,json,times,fx,fn){
        if (typeof times == 'undefined'){
            times = 400;
            fx = 'linear';
        }
        if(typeof times == 'string'){
            if(typeof fx == 'function'){
                fn = fx;
            }
            fx = times;
            times = 400;
        }
        else if(typeof times == 'function'){
            fn = times;
            times = 400;
            fx = 'linear';
        }else if(typeof times == 'number'){
            if(typeof fx == 'function'){
                fn = fx;
                fx = 'linear';
            }
            else if(typeof fx == 'undefined'){
                fx = 'linear';
            }
        }
        var iCur = {};
        for (var attr in json){
            iCur[attr] = 0;
            if(attr == 'opacity'){
                iCur[attr]= Math.round(getStyle(obj,attr)*100);
            }
            else{
                iCur[attr]= parseInt(getStyle(obj,attr));
            }
        }
        var startTime = now();
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var changeTime = now();
            var t = times - Math.max(0,startTime - changeTime + times);
            for (var attr in json){
                var value =
                Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);

                if(attr == 'opacity'){
                    obj.style.opacity = value/100;
                    obj.style.filter = 'alpha(opacity='+value+')';
                }
                else{
                    obj.style[attr] = value + 'px';
                }
            }
            if(t == times){
                clearInterval(obj.timer);
                if(fn){
                    fn.call(obj);
                }
            }
        },13);
        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj,false)[attr];
            }
        }
        function now(){
            return (new Date()).getTime();
        }
        var Tween = {
            linear:function (t,b,c,d){
                return c*t/d+b;
            }
        }
    }
})();
