// 18对（36张）图片的隐含位置
var map = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 
	10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18];

var oktoclick;//是否允许单击图片
var click1,click2; //单击过的两张图片数组记录 click1为第一张 click2为第二张
var clickCount = 0;//单击计数
var finished = 0;//已完成数量
var finishedArray = [];//记录图片的状态（是否已完成 false未完成 true完成）

/*初始化函数*/
function init() {

	var startBtn = document.getElementById('startBtn');
	startBtn.value = '游戏进行中';
	startBtn.disabled = true;
	startBtn.style.color='#666';

	//默认所有的图片都未完成，所有图片都是默认图片
	for (var i = 0;i <= 35;i ++) {
		finishedArray[i] = false;
		document.getElementById('img' + i).src = 'img0.gif';
	}

	finished = 0;//已完成数量清零
	oktoclick = true;//设置允许单击图片
	scramble();//进行图片位置混淆
}

/*混淆图片位置函数*/
function scramble() {
	
	var r;//0-35随机数
	var temp;//临时变量
	
	for (x = 0; x <= 35; x++) {
		//产生随机数
		r = Math.floor(Math.random() * 36);

		//随机交换位置
		temp = map[r];
		map[r] = map[x];
		map[x] = temp;
	}
}

/*显示图片函数*/
function showImage(imgNum) {

	//判断重复点击相同图片
	if (imgNum == click1)
		return;	

	//判断是否点击已完成的图片
	if (finishedArray[imgNum])
		return;

	//如果允许点击(最多同时打开两幅图片)
	if (oktoclick) {

		oktoclick = false;//设置为不允许单击显示图片

		//获得当前单击图片对象
		var imgObj = document.getElementById('img' + imgNum);

		//根据传递的下标显示map中对应的图片
		imgObj.src = 'img' + map[imgNum] + '.gif';
		
		if (clickCount == 0) {//如果已单击次数为0（当前是第一张图片）

			clickCount ++; //计数加1
			click1 = imgNum; //记录单击图片1的下标
			oktoclick = true; //允许下次单击

		} else { //如果已单击次数为1（当前是第二张图片）

			clickCount = 0; //计数清零
			click2 = imgNum; //记录单击图片2的下标
			setTimeout(finalCheck,600);//延时执行判断函数
		}

	}	

}

/*结果判断函数*/
function finalCheck() {

	//判断两次单击是否相同图片，不相同：恢复默认图片  相同：完成数量加1，记录图片状态
	if (map[click1] == map[click2]) {

		//设置已完成图片的状态
		finishedArray[click1] = true;
		finishedArray[click2] = true;

		finished ++; //完成数量加1		
	} else {
		document.getElementById('img' + click1).src = 'img0.gif';
		document.getElementById('img' + click2).src = 'img0.gif';		
	}

	click1 = null;
	click2 = null;

	//判断是否完成所有图片
	if (finished >= 18) {
		alert('恭喜你，过关！');

		var startBtn = document.getElementById('startBtn');
		startBtn.value = '再玩一次';
		startBtn.disabled = false;
		startBtn.style.color='#000';
	} else {
		oktoclick = true;
	}

}