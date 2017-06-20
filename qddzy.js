var tips_module = (function(){

    var tips = document.querySelector('.tip');
    var closeTip = document.querySelector('.notip');

    var cookie = getCookie();

    if (!cookie.noTips) {
        tips.style.display = 'block';
    };

    addClickEvent(closeTip,function(event){
        setCookie('noTip',1,new Date(9999,9));
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
