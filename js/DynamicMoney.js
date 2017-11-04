let state = document.getElementById("start");
let timing = document.getElementById("time");
let jicha = document.getElementById('jicha');
let doRules = document.getElementById('doRules');
let statevalue = 0;
let statevalue1 = 0;
let timelongth = 0;
let changetime;
let changetime1;

//指向对象的prototype
//let custom[0] = new People('peo1', '');
//let custom[1] = new People('peo2', '');
//People.prototype.age = null;
//people1.age = 30; 
//console.log(people1.age);
//已经给custom成员的money属性赋值，现在给写两个方法
//第一个方法的功能是<每人每秒获得10金钱>
//第二个方法的功能是<每人随机给除了自己之外的人2金币>

//利用点击时间来控制时间变化

//根据时间变化来控制每一个数组对象的金钱总量
//面向对象编程模型
function People(name, money) {
	this.name = name;
	this.money = money;
}
//People.prototype.money = null;还可以通过原型为people添加属性

//通过内建数组用for循环进行批量赋值
let custom = new Array(20);
for(let i = 0, j = custom.length; i < j; i++) {
	custom[i] = new People('peo' + i, 20);
}

function getMoney() {
	for(let i = 0, j = custom.length; i < j; i++) {
		custom[i].money = custom[i].money + 5 + Dmoney[i];
	}
}

let ran;

function giveMoney() {
	for(let i = 0, j = custom.length; i < j; i++) {
		function rand() {
			ran = Math.floor(Math.random() * 20);
		}
		rand();
		console.log(ran);

		function equal() {
			if(ran == i) {
				rand();
				equal();
			} else {
				//在这里使用custom[ran]会出错，显示money属性未定义
				//找到出错点：math。ceil向上取整导致数组越界
				custom[i].money = custom[i].money - 4;
				custom[ran].money = custom[ran].money + 4;
			}
		}
		equal();
	}
}

function showMoney() {
	for(let i = 0, j = custom.length; i < j; i++) {
		console.log(custom[i].name + '_money:' + custom[i].money)
	}
}

state.onclick = function() {

	DmoneyUnit();

	if(statevalue == 0) {
		state.innerText = "STOP";
		statevalue = 1;
		changetime = setInterval(function() {
			timelongth++;
			timing.innerText = timelongth;

			getMoney();
			giveMoney();
			//			showMoney();
			moneySort();
			ExMoney[timelongth] = rankMoney[19] - rankMoney[0];

			draw3();
			jicha.innerHTML = '极差（贫富差距）：' + (rankMoney[19] - rankMoney[0]);

		}, 1000);
	} else {
		clearInterval(changetime);
		state.innerText = "START";
		statevalue = 0;
	}
}

doRules.onclick = function() {
	if(statevalue1 == 0) {
		doRules.innerText = "WOKING";
		statevalue1 = 1;
		changetime1 = setInterval(function() {

			proportion();
			getMore();

		}, 1000);
	} else {
		clearInterval(changetime1);
		doRules.innerText = "START WORK";
		statevalue1 = 0;
		DmoneyUnit();
	}
}

//设置一个函数，用来判断所有用户的金钱占比（占总金钱的比例）
//新建一个数组用来存放每个人的金钱占比
let propMoney = new Array(20);
let totalMoney;

function proportion() {
	//首先计算当前金钱总量
	totalMoney = 0;

	for(let i = 0, j = custom.length; i < j; i++) {
		totalMoney += custom[i].money;
	}

	for(let i = 0, j = custom.length; i < j; i++) {
		propMoney[i] = Math.ceil(custom[i].money / totalMoney * 100);
		console.log('额外金币获得比例：' + propMoney[i]);
	}

	console.log("金钱总量为：" + totalMoney);
}

//设置一个函数，根据每个人的金钱占比，为每个人配备不同的金钱获取值（每回合从系统那里获取额外金钱的数量）
let Dmoney = new Array(20);

//设置一个方法，用来初始化Dmoney成员的值
function DmoneyUnit() {
	for(let i = 0, j = custom.length; i < j; i++) {
		Dmoney[i] = 0;
	}
}

function getMore() {
	for(let i = 0, j = custom.length; i < j; i++) {
		Dmoney[i] = (propMoney[i] - 5) * 3;
	}
}

//下面使用canvas动态绘制可视化图形，用来显示各个用户的金币情况
//关键数据custom[i].money

function draw() {
	let myCanvas = document.getElementById('MoneyRandom');

	let cwidth = myCanvas.width;
	let cheight = myCanvas.height;
	let canvasCtx = myCanvas.getContext('2d');
	canvasCtx.clearRect(0, 0, cwidth, cheight);
	canvasCtx.fillStyle = "#4CCD58";

	for(let i = 0, j = custom.length; i < j; i++) {
		canvasCtx.fillRect(i * 14 + 12, (5800 - custom[i].money) / 40, 10, (custom[i].money) / 40);
	}

	requestAnimationFrame(draw);
}

draw();

//建立一个新的数组，用来存放custom[i].money的值
let customMoney = new Array(20);
//建立一个新的数组，用来存放排序之后的数组
let rankMoney = new Array(20);

function moneySort() {
	for(let i = 0, j = custom.length; i < j; i++) {
		customMoney[i] = custom[i].money;
	}

	function sortNumber(a, b) {
		return a - b
	}
	console.log('排序之后的数组：' + customMoney.sort(sortNumber));
	rankMoney = customMoney.sort(sortNumber);
	console.log(rankMoney);

}

function draw1() {
	let myCanvas1 = document.getElementById('MoneyRank');

	let cwidth1 = myCanvas1.width;
	let cheight1 = myCanvas1.height;
	let canvasCtx1 = myCanvas1.getContext('2d');
	canvasCtx1.clearRect(0, 0, cwidth1, cheight1);
	canvasCtx1.fillStyle = "#4CCD58";

	for(let i = 0, j = custom.length; i < j; i++) {
		canvasCtx1.fillRect(i * 14 + 12, (5800 - rankMoney[i]) / 40, 10, (rankMoney[i]) / 40);
	}

	requestAnimationFrame(draw1);
}

draw1();

let ExMoney = new Array();

function draw2() {
	let myCanvas2 = document.getElementById('diff');

	let cwidth2 = myCanvas2.width;
	let cheight2 = myCanvas2.height;
	let canvasCtx2 = myCanvas2.getContext('2d');
	canvasCtx2.clearRect(0, 0, cwidth2, cheight2);
	canvasCtx2.fillStyle = "#4CCD58";

	canvasCtx2.fillRect(4, 65, (rankMoney[19] - rankMoney[0]) / 20, 20);

	requestAnimationFrame(draw2);
}

draw2();

let moreTime = 10;
let ti = new Array();

//这里横坐标标尺根据时间，动态变化
setInterval(function() {
	if(timelongth >=( moreTime-8)) {
		moreTime = moreTime * 1.8;
	}
	for(let i = 0, j = moreTime; i < j; i++) {
		ti[i] = i;
	}
}, 1000)

//绘制折线图的方法

function draw3() {

	var echart = echarts.init(document.getElementById('diffChange'));
	var option = {
		title: {
			text: '极差变化情况'
		},
		tooltip: {},
		legend: {
			data: ['用户来源']
		},
		xAxis: {
			data: ti,
			name: '时间/s'
		},
		yAxis: {
			name: '金钱'
		},
		color: ['green'],
		series: [{
			name: '访问量',
			type: 'line',
			smooth: true,
			data: ExMoney
		}]
	};
	//每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况
	window.onresize = echart.resize;
	echart.setOption(option);

}