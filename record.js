;(function(){

    /**
    * 录制用户行为
    */

    var recordHtml ='<style>#record-tip{position:fixed;top:100px;right:0;font-family: Arial, SimSun;z-index:999;}'+
                    '#record-tip button{margin-right:10px;}'+
                    '#record-tip .hd{padding:10px 10px 0 10px;border:1px solid #121212;width: 200px;height: 30px;background: #121212;display: block;color: white;text-shadow: 1px 1px #555;font-weight: bold;overflow: hidden;line-height: 20px;text-align:center;cursor:move;border-radius: 5px 5px 0 0;}'+
                    '#record-tip .bd{padding:10px 10px  10px;width: 200px;border:1px solid #ccc;background: #fff;border-radius:0 0 5px 5px;font-size: 13px;}'+
                    '#record-tip .bd span{width: 80px;display: inline-block;}</style>'+ 
                    '<div id="record-tip">'+
                        '<div class="hd">'+
                            '<span>面板</span>'+
                        '</div>'+
                        '<div class="bd">'+
                            '<button id="record"><img src="http://static.tuan2.com/bgimg/record/rec.png" alt="record"/>录制</button>'+
                            '<button id="play" accesskey="1"><img src="http://static.tuan2.com/bgimg/record/play.png" alt="play"/>开始</button>'+
                            '<button id="stop"><img src="http://static.tuan2.com/bgimg/record/stop.png" alt="stop"/>停止</button>'+
                            '<input type="text" size="2" value="30" id="fps" />帧'+
                            '<!--div><span>日期：</span>6/8/2013 8:35 AM</div>'+
                            '<div id="panel-size"><span>屏幕尺寸：</span>1920*1080</div-->'+
                        '</div>'+
                    '</div>'+
                    '<img src="http://static.tuan2.com/bgimg/record/pointer.png" id="pointer" style="position: absolute; left: -20px; top: -20px;z-index:999;">';

    var $pointer =$();

    function mouseRecord(){
        this.fps = 30;
        this.state = 0;
        this.coordinates = [];
        this.posx = 0;
        this.posy = 0;
        this.position = '';
        this.timer;
        this.timerReplay;
        this.Date = '6/8/2013 8:35 AM';
        this.resolution = window.screen.availWidth+'x'+window.screen.availHeight;
        //this.moveDate = 'coord=0,0,c|0,0,c|153,44,m|153,45,m|156,48,m|172,59,m|192,77,m|205,91,m|215,112,m|220,138,m|228,160,m|230,179,m|231,195,m|232,204,m|233,205,m|233,205,m|233,205,m|233,205,m|233,205,m|233,205,m|233,205,m|233,205,m|235,205,m|239,205,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|240,204,m|243,204,m|245,204,m|246,204,m|246,204,m|246,204,m|246,204,m|246,204,m|246,204,m|246,205,m|246,205,m|246,205,m|246,205,m|247,205,m|249,205,m|252,206,m|255,207,m|255,207,m|255,207,m|259,209,m|264,212,m|268,216,m|271,219,m|273,219,m|281,220,m|289,223,m|299,224,m|306,224,m|310,225,m|313,226,m|316,227,m|319,227,m|323,227,m|328,227,m|330,227,m|330,227,m|330,227,m|330,227,m|332,227,m|335,227,m|335,227,m|335,227,m|335,227,m|335,227,m|335,227,m|335,227,m|338,225,m|341,225,m|351,225,m|377,225,m|406,226,m|426,227,m|437,227,m|442,227,m|443,228,m|451,229,m|475,229,m|522,234,m|567,237,m|599,240,m|615,243,m|623,245,m|628,245,m|646,245,m|676,245,m|706,245,m|723,245,m|729,245,m|731,245,m|738,245,m|763,245,m|805,245,m|844,246,m|865,249,m|870,251,m|871,252,m|871,252,m|871,252,m|871,252,m|871,252,c|871,252,c|871,252,m|871,252,m|871,252,m|880,252,m|930,251,m|997,251,m|1059,251,m|1134,251,m|1191,252,m|1254,252,m|1325,253,m|1409,257,m|1480,259,m|1551,263,m|1598,273,m|1638,282,m|1666,292,m|1671,294,m|1671,294,m|1671,294,m|1671,294,m|1671,294,m|1671,294,c|1671,294,c|1671,294,m|1671,294,m|1671,294,m|1670,294,m|1633,269,m|1552,235,m|1477,221,m|1334,176,m|1223,157,m|1132,142,m|1070,136,m|1017,129,m|978,127,m|925,121,m|880,114,m|840,107,m|796,98,m|754,88,m|715,83,m|694,82,m|691,79,m|691,79,m|691,79,m|691,79,m|691,79,m|691,79,m|691,79,m|691,79,c|691,79,c|691,79,m|691,79,m|691,79,m|688,79,m|677,79,m|658,81,m|635,85,m|598,91,m|571,91,m|528,91,m|484,90,m|441,89,m|402,87,m|363,86,m|336,85,m|327,85,m|316,84,m|299,80,m|277,74,m|260,66,m|250,60,m|247,58,m|246,58,m|246,58,m|246,58,m|246,58,m|246,58,m';
        this.moveDate = '';
        this.log = [];
        this.cont=0;
        this.movetimer=0;
        this.posxback = 0;
        this.posyback = 0;
        this.postTimer = 0;
        this.onPost = null
    }

    mouseRecord.prototype.isSaved = function(){
        this.appendLog("source is saved !");
    }

    mouseRecord.prototype.createPanel = function(){
        $("body").append(recordHtml);
        $("#record-tip").find('#panel-size').html("<span>屏幕尺寸：</span>"+this.resolution)
            .prev().html("<span>日期：</span>"+this.Date)
        this.drawPanel();    
    }

    mouseRecord.prototype.saveCoordonnees = function(){
        this.positions = this.coordinates.join('|');
        var params = this.positions;
        this.moveDate = params;//存储参数
        //console.log(this.moveDate)//输出
    }

    mouseRecord.prototype.grabCoordinates = function(e, _this){
        if (e.pageX || e.pageY)
        {
            _this.posx = e.pageX;
            _this.posy = e.pageY;
        }
    }

    mouseRecord.prototype.pushCoordinates = function(e){//添加鼠标移动数据

        if(this.posxback == this.posx && this.posyback == this.posy){
            if(++this.movetimer*this.fps > 1500){
                return
            } 
        }else{
            this.movetimer = 0;
        }

        if(++this.postTimer % 150 == 0){
            this.onPost && this.onPost();
        }


        this.posxback = this.posx;
        this.posyback = this.posy;

        this.coordinates.push(this.posx+','+this.posy+',m');
    }

    mouseRecord.prototype.pushClick = function(e, _this){//添加鼠标移动数据
        if (_this.state == 2){
            this.movetimer = 0;
            _this.coordinates.push(_this.posx+','+_this.posy+',c');
            _this.coordinates.push(_this.posx+','+_this.posy+',c');//?
        }
    }

    mouseRecord.prototype.pushScroll = function(_this){
        if (_this.state == 2){
            this.movetimer = 0;
            _this.coordinates.push('0,'+$(window).scrollTop()+',s');
        }
    }

    mouseRecord.prototype.startRecord = function(){//
        var _this = this;
        _this.setFPS();
        _this.state = 2;
        _this.disableAction();
        _this.timer = window.setInterval(function(){
            _this.pushCoordinates.call(_this)
        }, Math.floor(1000/_this.fps));
        $(document).unbind("mousemove").mousemove(function(e){
            _this.grabCoordinates(e, _this)
        });
    }

    

    mouseRecord.prototype.startPlay = function(obj){
        
        var _this = this;
        this.appendLog('record started');
        this.coordinates = obj.split('|');
        this.state = 1;
        this.setFPS();
        this.disableAction();
        this.timerReplay = window.setTimeout(function(){
            _this.setMousePosition();
        },Math.floor(1000/this.fps));
    }


    mouseRecord.prototype.chargeCoordonnees = function(){
        $(window).scrollTop(0);
        $pointer.show();
        this.startPlay(this.moveDate);
    }

    mouseRecord.prototype.drawPanel = function(){
        var recordTip = $("#record-tip .hd");

        drag(recordTip[0]);

        function drag(o){
            o.onmousedown=function(a){
                    var d=document;if(!a)a=window.event;
                    a.preventDefault && a.preventDefault();
                    var x=a.layerX?a.layerX:a.offsetX,y=a.layerY?a.layerY:a.offsetY;
                    
                    if(o.setCapture){
                            o.setCapture();
                            }
                    else if(window.captureEvents){
                
                            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
                    }
        
                    d.onmousemove=function(a){
                            if(!a)a=window.event;
                            if(!a.pageX)a.pageX=a.clientX;
                            if(!a.pageY)a.pageY=a.clientY;
                            var tx=a.pageX-x,ty=a.pageY-y;
                            recordTip.parent()[0].style.left=tx +"px";
                            recordTip.parent()[0].style.top=ty +"px";
                    };

                    d.onmouseup=function(){
                            if(o.releaseCapture)
                                   { o.releaseCapture();}
                            else if(window.releaseEvents)
                                   { window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);}
                            d.onmousemove=null;
                            d.onmouseup=null;
                    };
            };
    }

    }


    mouseRecord.prototype.setMousePosition = function(){
       
       var _this = this;
        if (this.coordinates.length > 0){
            var current = this.coordinates.shift();
            var coord = current.split(',');

            var x = isNaN(parseInt(coord[0]))? 0 : coord[0];
            var y = coord[1];
            var action = coord[2];

            if (action == 's'){//滚动条
                $(window).scrollTop(y);
            }else{//其他
                $pointer.css("left",x+"px").css("top",y+"px");
                if (action == 'm'){
                    $pointer.attr("src","http://static.tuan2.com/bgimg/record/pointer.png");
                }
                else if (action == 'c'){
                    $pointer.attr("src","http://static.tuan2.com/bgimg/record/pointer-clic.png");
                }
            }
            this.setFPS()
            this.timerReplay = window.setTimeout(function(){
                _this.setMousePosition();
            },Math.floor(1000/this.fps));
            
        }
        else{
            this.stopPlay();
        }

        
    }

    mouseRecord.prototype.stopPlay = function(){//停止
        window.clearTimeout(this.timerReplay);
        this.state = 0;
        this.enableAction();
        this.appendLog('stop');
        $pointer.hide();
        alert("it's over")
    }

     mouseRecord.prototype.stop = function(){
        if (this.state == 1){
            this.stopPlay();
        }
        else if (this.state == 2){
            this.stopRecord();
        }
    }

    mouseRecord.prototype.stopRecord = function(){
        window.clearInterval(this.timer);
        this.saveCoordonnees();
        this.state = 0;
        this.enableAction();
        //document.getElementById('which').selectedIndex = 0;
    }

    mouseRecord.prototype.disableAction = function (){
        var _this = this, timer=null;
        $("#play").unbind("click");
        $("#record").unbind("click");
        $("html").click(function(e){
            _this.pushClick(e, _this);
        })
        $(window).scroll(function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                _this.pushScroll(_this);
            },50)
        })
    }

    mouseRecord.prototype.enableAction = function(){
        var _this = this;
        $("#play").unbind("click").click(function(e){
            _this.chargeCoordonnees(e, _this);
        })
        $("#record").unbind("click").click(function(e){
            _this.startRecord(e, _this);
        })
        $("html").unbind("click");
    }

    mouseRecord.prototype.setFPS = function(){//设置帧
        if (!isNaN($("#fps").val())){
            this.fps = $("#fps").val();
        }
        else{
            this.fps = 30;
        }
    }

   

    mouseRecord.prototype.appendLog = function(msg){
        this.log.push(msg);
    }

    mouseRecord.prototype.clearLog = function (){
        this.log = [];
    }


    mouseRecord.prototype.init = function(){
        var _this = this;
        if(true){
            datas = typeof datas == 'undefined' ? '' : datas;
            _this.createPanel();
            _this.moveDate = datas;
            //console.log(datas)
            //_this.chargeCoordonnees(_this);
            $pointer = $("#pointer");
        
            $("#stop").click(function(e){
                _this.stop(e, _this);
            })
            $("#play").click(function(e){
                _this.chargeCoordonnees(e, _this);
            })
            $("#record").click(function(e){
                _this.startRecord(e, _this);
            })
        }else{
            _this.startRecord(_this);
        } 
        
    }


    //window.onload = function(){
        window._record = new mouseRecord();
        _record.init();
    //};

}())