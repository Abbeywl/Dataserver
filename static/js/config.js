
const COLOR = [
    "#EE6A66", "#6BC588", "#FFC300", "#24ABFD"
];

var ISCANVAS2D = true;

switch (uni.getSystemInfoSync().platform) {
	case 'android':
		ISCANVAS2D = true
		break;
	case 'ios':
		ISCANVAS2D = true
		break;
	default:
		ISCANVAS2D = false
		break;
}

const RESPOND = {
    success: 0,
    warn: 301,
    error: 500,
};

const TIMEARRAY = [
    {
        text: '当天',
        value: 'today'
    },
    {
        text: '昨天',
        value: 'yesterday'
    },
    {
        text: '本周',
        value: 'week'
    },
    {
        text: '上周',
        value: 'weeklast'
    },
    {
        text: '本月',
        value: 'month'
    },
    {
        text: '上月',
        value: 'monthlast'
    },
	{
	    text: '指定日期',
	    value: 'auto'
	}
];
const TABLIST = [
    {name:"统计报表",type:"WECHAT"},
    {name:"统计分析",type:"OPERATE"},
    // {name:"会员健康",type:"GJJK"},
    {name:"统计运营",type:"SERVICE"},
];

const CARD_MENU = [
	{title:"会员报表中心",author:"howcode",img:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/aadf06ed-4335-49c6-9dd9-9e10a45db2e0.png",url:"/pages/main/index"},
	{title:"智慧教育报表中心",author:"howcode",img:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/c5c86106-ac2b-49a9-bff6-69c988ed7223.png",url:"/pages/school/index"},
	{title:"差旅报表中心",author:"秋云",img:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/4c278814-13c2-4cbb-b2cb-e99befe613d5.png",url:""},
	{title:"运动报表中心",author:"howcode",img:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/175c0e3f-66d1-4a8a-ae2f-79c83f74eb65.png",url:"/myPackageA/pages/sport/index"},
	{title:"财务报表中心",author:"howcode",img:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/1a448b3a-4029-4329-b8d2-c8000d8beeb5.png",url:"/pages/finance/index"},
]


module.exports = {
    COLOR,
    TIMEARRAY,
    TABLIST,
    RESPOND,
		ISCANVAS2D,
		CARD_MENU
}