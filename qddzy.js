(function(){
// 消息提示栏
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
/*关注和登录模块*/
var follow_module = (function(){

    var follow = document.querySelector('.follow');
    var closeTip = document.querySelector('.notip');
    var loginMask = document.querySelector('.m-mask');

    // 登录模块
    var login_module = (function(){

        var form = document.forms.loginForm;
        var itmAccount = document.querySelector('.itm1');
        var itmPassword = document.querySelector('.itm2');
        var cancelBtn = document.querySelector('.m-form .closed');
        var accountLab = document.querySelector('.itm1 .lab');
        var passwordLab = document.querySelector('.itm2 .lab');
    
        function disableSubmit(disabled){
            form.loginBtn.disabled = !!disabled;
            if (!disabled) {
                removeClass(form.loginBtn,'j-disabled');
            }
            else{
                addClass(form.loginBtn,'j-disabled');
            }
        }
    
        function invalidInput(node,msg){
            addClass(node,'j-error');
        }
    
        function clearInvalid(node){
            removeClass(node,'j-error');
        }
    
        addEvent(form,'keydown',function(event){
                var event = event || window.event;
                var target = event.target || event.srcElement;
                var parentTarget = target.parentNode;
                var lab = parentTarget.querySelector('.lab');
                lab.style.display = 'none';
                // 还原错误状态
                clearInvalid(target.parentNode);
                // 还原登录按钮状态
                disableSubmit(false);
            }
        );

        function blurHandler(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            var parentTarget = target.parentNode;
            var lab = parentTarget.querySelector('.lab');
            if (target.value == ''){
                lab.style.display = 'block';
            }
        }

        addEvent(form.account,'blur',blurHandler);

        addEvent(form.password,'blur',blurHandler);
    
        addEvent(form,'submit',function(event){
                // 密码验证
                var input = form.password,
                    pswd = input.value,
                    account = form.account.value;

                if (account == ''){
                    // event.preventDefault();
                    invalidInput(itmAccount);
                    return;
                }else if(pswd == ''){
                    // event.preventDefault();
                    invalidInput(itmPassword);
                    return;
                }

                var options = {userName:md5(account),password:md5(pswd)};
                var url = 'http://study.163.com/webDev/login.htm';
                console.log(options);
                function fu(response){
                    // 还原登录按钮状态
                    disableSubmit(false);
                    if (response == 1) {
                        form.reset();
                        loginMask.style.display = 'none';
                        setCookie('loginSuc',1,new Date(9999,9));
                        followAPI();
                    }
                    else{
                        alert('账号密码错误');
                    }
                }
                get(url,options,fu);

                preventDefault(event);
                // 禁用提交按钮
                disableSubmit(true);
            }
        );

        addClickEvent(cancelBtn,function(){
            form.reset();
            accountLab.style.display = 'block';
            passwordLab.style.display = 'block';
            loginMask.style.display = 'none';
        });
        
    })();    

    // followAPI
    function followAPI(){
        var url = 'http://study.163.com/webDev/attention.htm';
        get(url,null,function(response){
            if (response == 1) {
                setCookie('followSuc',1,new Date(9999,9));
                // 重新设置关注按钮
                setFollowbtn();
            };
        })
    }

    function setFollowbtn(){
        var cookie = getCookie();
        var followBtn = document.querySelector('.follow');
        var followedBtn = document.querySelector('.followed');
        if (cookie.followSuc == 1) {
            followBtn.style.display = 'none';
            followedBtn.style.display = 'block';
        }
        else{
            followBtn.style.display = 'block';
            followedBtn.style.display = 'none';
        }
    }

    addClickEvent(follow,function(event){
        var event = event || window.event;
        var cookie = getCookie();
        if (!cookie.loginSuc) {
            loginMask.style.display = 'block';
        }
        else{
            followAPI();
        }
        
        preventDefault(event);
        
    });

    setFollowbtn();

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
/*课程列表*/
var course_module = (function(){

    var url = "http://study.163.com/webDev/couresByCategory.htm";
    var pageSize = 20;
    var pageType = 10;

    var mnav = document.querySelector('.tab');
    var mnavTag = mnav.getElementsByTagName('a');
    var mpager = document.querySelector('.m-pager');

    delegateEvent(mnav,'a','click',
        function(target,event){
            if(pageType != target.getAttribute('data')){
                for(i=0;i<mnavTag.length;i++){
                    removeClass(mnavTag[i],'selected');        
                }
                addClass(target,'selected');
                pageType = target.getAttribute('data');
                mpager.innerHTML = '';
                getPageNum(1);
            }
            preventDefault(event);
        }
    );

    //获取分页器总页数以及课程列表第一页
    function getPageNum(now){    
        var options = {pageNo:now,psize:pageSize,type:pageType};
        get(url,options,function(response){
                initPager(response,now);
            }
        );    
    }
    //初始化分页和课程列表
    function initPager(response,now){
        var res = JSON.parse(response);
        var option = {id:mpager,nowNum:now,allNum:res.totalPage,childLength:8,callback:getCourse};
        //初始化课程列表
        drawCourse(response);
        //初始化分页
        page(option);
    }
    //获取课程列表
    function getCourse(now,all){
        console.log('分页器：'+now);
        
        var options = {pageNo:now,psize:pageSize,type:pageType};
        get(url,options,drawCourse);
    }
    //生成课程列表
    function drawCourse(response){
        var data = JSON.parse(response);
        console.log(data);
        console.log('获取的页码：'+data.pagination.pageIndex);
        
        var boo = document.querySelectorAll('.u-cover');
        for(var i=boo.length-1;i>0;i--){
            boo[i].parentNode.removeChild(boo[i]);
        }
        
        var templete = document.querySelector('.m-data-lists .f-templete');
            
        for(var i=0,list=data.list;i<list.length;i++){       
            var cloned = templete.cloneNode(true);
            removeClass(cloned,'f-templete');
            var imgpic = cloned.querySelector('.imgpic');
            var title = cloned.querySelector('.tt');
            var orgname = cloned.querySelector('.orgname');
            var hot = cloned.querySelector('.hot');
            var pri = cloned.querySelector('.pri');
            var kindname = cloned.querySelector('.kindname');
            var disc = cloned.querySelector('.disc');
            
            imgpic.src = list[i].middlePhotoUrl;
            imgpic.alt = list[i].name;
            title.innerText = list[i].name;
            orgname.innerText = list[i].provider;
            hot.innerText = list[i].learnerCount;
            pri.innerText = '￥' + list[i].price + '.00'; 
            kindname.innerText = list[i].categoryName;
            disc.innerText = list[i].description;      
            templete.parentNode.appendChild(cloned);
        }
    }

    getPageNum(1);    

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
// 底部分页
var page = (function(){
    return function(opt){
        if(!opt.id){
            return false;
        };
        var obj = opt.id;
        var nowNum = opt.nowNum || 1;
        var childLength = opt.childLength;
        var allNum = opt.allNum || childLength;
        var callback = opt.callback || function(){};
        // 可显示页数二分之一+1的位置
        var point = Math.floor(childLength/2) + 1;
        // 页数生成
        var pageInit = function(i){
            var oA = document.createElement('a');
            oA.setAttribute('index',i);
            oA.className = 'pg';
            oA.innerText = i;
            if(nowNum == i){
                addClass(oA,'selected');
            }
            return oA;
        }
        //当前页不等于1时上一页可选
        var oA = document.createElement('a');    
        oA.innerText = '上一页';
        oA.setAttribute('index',nowNum - 1);
        if(nowNum != 1){
            oA.className = 'prv';
        }
        else{
            oA.className = 'prv f-dis';
        }    
        obj.appendChild(oA);
        
        //生成具体页数，总页数小于等于可显示页数的情况
        if(allNum <= childLength){
            for(var i=1; i <= allNum; i++){ 
                var oA = pageInit(i);
                obj.appendChild(oA);
            }
        }
        //生成具体页数，总页数大于可显示页数的情况
        else{
            for(var i=1; i <= childLength; i++){
                //当前页是小于一半+1的可显示页数
                if(nowNum < point){
                    var oA = pageInit(i);
                }
                //当前页是倒数第1或倒数第2
                else if(allNum - nowNum <= point){
                    var oA = pageInit(allNum - childLength +i);
                }
                //当前页在可显示页数一半+1的位置显示，例如可以显示8页，当前页就在第5个位置
                else{
                    var oA = pageInit(nowNum - point + i);
                }            
                obj.appendChild(oA);
            }
        }
        //当前页不是最后一页时显示下一页
        var oA = document.createElement('a');    
        oA.innerText = '下一页';    
        oA.setAttribute('index',nowNum + 1);
        if(allNum != nowNum){
            oA.className = 'nxt';
        }
        else{
            oA.className = 'nxt f-dis';
        }
        obj.appendChild(oA);
        
        //用addevent会重复注册
        var aA = obj.getElementsByTagName('a');
        for(var i=0;i<aA.length;i++){
            aA[i].onclick=function(){
                if(nowNum != parseInt(this.getAttribute('index'))){
                    var nowNum = parseInt(this.getAttribute('index'));
                    obj.innerHTML = '';
                    page({
                        id:opt.id,
                        nowNum:nowNum,
                        allNum:allNum,
                        childLength:childLength,
                        callback:callback
                    });
                    callback(nowNum,allNum);
                }            
                return false;
            }
        }    
    }
})();
})();