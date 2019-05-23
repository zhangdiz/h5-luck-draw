// 抽奖转盘配置
var opt = {
    rewardNames: [], // 奖品名称数组
    rewardUrl: [], // 奖品图片地址
    prizeId: [],
    colors: [], // 转盘奖品对应块背景颜色
    outsideRadius: 136, // 转盘外圆半径
    textRadius: 116, //转盘奖品位置距离圆心的距离
    insideRadius: 65, //转盘内圆的半径
    startAngle: 0, //开始角度
    bRotate: false //false:停止;ture:旋转
}

opt.rewardNames = ["1666元", "谢谢参与", "30积分", "谢谢参与", "10积分", "谢谢参与"];
opt.rewardUrl = [];
opt.prizeId = ["6", "1", "2", "3", "4", "5"];
opt.colors = [
    "#AE3EFF",
    "#4D3FFF",
    "#FC262C",
    "#3A8BFF",
    "#EE7602",
    "#FE339F"
];

// 图片信息
var imgUrl1 = new Image();
imgUrl1.src = opt.rewardUrl[0];
var imgUrl2 = new Image();
imgUrl2.src = opt.rewardUrl[1];
var imgUrl3 = new Image();
imgUrl3.src = opt.rewardUrl[2];
var imgUrl4 = new Image();
imgUrl4.src = opt.rewardUrl[3];
var imgUrl5 = new Image();
imgUrl5.src = opt.rewardUrl[4];
var imgUrl6 = new Image();
imgUrl6.src = opt.rewardUrl[5];

window.onload = function () {
    drawWheelCanvas();
};

//旋转转盘 item:奖品序号，从0开始的; txt：提示语 ,count 奖品的总数量;
var rotateFunc = function (item, tip, count) {
    // 应该旋转的角度，旋转插件角度参数是角度制。
    var baseAngle = 360 / count;
    // 旋转角度 == 270°（当前第一个角度和指针位置的偏移量） - 奖品的位置 * 每块所占的角度 - 每块所占的角度的一半(指针指向区域的中间)
    angles = 360 * 3 / 4 - (item * baseAngle) - baseAngle / 2; // 因为第一个奖品是从0°开始的，即水平向右方向
    $('#wheelCanvas').stopRotate();
    // 注意，jqueryrotate 插件传递的角度不是弧度制。
    // 哪个标签调用方法，旋转哪个控件
    $('#wheelCanvas').rotate({
        angle: 0,
        animateTo: angles + 360 * 5, // 这里多旋转了5圈，圈数越多，转的越快
        duration: 8000,
        callback: function () { // 回调方法
            alert(tip);
            opt.bRotate = !opt.bRotate;
        }
    });
};

// 抽取按钮按钮点击触发事件
$('.pointer').click(function () {
    // 正在转动，直接返回
    if (opt.bRotate) return;
    opt.bRotate = !opt.bRotate;
    var count = opt.rewardNames.length;
    // 这里应该是从服务器获取用户真实的获奖信息（对应的获奖序号）
    // $.ajax({
    //     type: "POST",
    //     url: "./aaaaaa.htm",
    //     data: {customerId:2589},
    //     async:false,
    //     dataType:"json", // 返回数据类型
    //     success: function(data){
    //         console.log(data);
    //         if(data.type == 1){//积分不足
    //         }else if(data.type == 2){//抽奖次数已经用完
    //         }else{//抽奖
    //             opt.prizeId.forEach(function(currentValue, index){
    //                 if(currentValue == data.prize.id){
    //                     var item = index;
    //                     console.log(index);
    //                     $(".award-warp .content").html(data.prize.name);
    //                     // 开始抽奖
    //                     rotateFunc(item, opt.rewardNames[item],count);
    //                 }
    //             })
    //         }
    //     },
    //     error: function(data){
    //         console.log("网络错误，请检查您的网络设置！");
    //     }
    // });
});

function drawWheelCanvas() {
    var canvas = document.getElementById('wheelCanvas');
    var baseAngle = Math.PI * 2 / (opt.rewardNames.length);
    var ctx = canvas.getContext("2d");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    ctx.fillStyle = '#fff000';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 去掉背景默认黑色
    ctx.strokeStyle = '#199301';

    ctx.font = '16px Microsoft YaHei';

    for (var i = 0; i < opt.rewardNames.length; i++) {
        var angle = opt.startAngle + i * baseAngle;
        ctx.fillStyle = opt.colors[i];
        ctx.beginPath();
        ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, opt.outsideRadius, angle, angle + baseAngle, false);
        ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, opt.insideRadius, angle + baseAngle, angle, true);
        ctx.stroke();
        ctx.fill();
        ctx.save();
        ctx.fillStyle = '#ffff00';


        var rewardName = opt.rewardNames[i];

        var line_height = 24;
        var translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2) * opt.textRadius;
        var translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2) * opt.textRadius;

        ctx.translate(translateX, translateY);
        ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
        //ctx.drawImage(imgUrl1, -15, 10);
        ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 10); // 写字

        //添加对应图标
        // if(i == 0){
        //     ctx.drawImage(imgUrl1,-35,0,60,60);
        // }else if(i == 1){
        //     ctx.drawImage(imgUrl2,-35,0,60,60);
        // }else if(i == 2){
        //     ctx.drawImage(imgUrl3,-35,0,60,60);
        // }else if(i == 3){
        //     ctx.drawImage(imgUrl4,-35,0,60,60);
        // }else if(i == 4){
        //     ctx.drawImage(imgUrl5,-35,0,60,60);
        // }else{
        //     ctx.drawImage(imgUrl6,-35,0,60,60);
        // }
        ctx.restore(); //很关键
    }
}