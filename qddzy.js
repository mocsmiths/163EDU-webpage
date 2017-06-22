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
