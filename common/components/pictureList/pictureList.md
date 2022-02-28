2.1基本说明：

该组件主要分为至多三列多行加图片，横向排列，按需填写，不填则不显示，无论两列还是三列都自动等分，溢出部分会自动换行。数据默认样式title重点其他文字样式默认统一，右侧为图片。

2.2参数说明：

参数	说明	类型	是否必填	数据格式
title	标题	String	是	字符串。
subTitle	副标题	String	否	字符串。
rightTitle	右边标题	String	否	字符串。
infoArr	所有行数据列表集合	Array	是（注：每行三列位置固定，不传则不显示）	[{
leftText:String,第一行第一列文字
centerText:String,第一行第二列文字
rightText:String第一行第三列文字
}]
一个对象代表一行（注：flex布局）
listImg	图片对象	Object	否（文字默认撑开，不影响布局）	{isShow:Boolean,src:’’}isShow为true显示图片,false隐藏图片，src为图片路径（如为空显示默认图片）使用模板：
2.1基本说明：

该组件主要分为至多三列多行加图片，横向排列，按需填写，不填则不显示，无论两列还是三列都自动等分，溢出部分会自动换行。数据默认样式title重点其他文字样式默认统一，右侧为图片。

2.2参数说明：

参数	说明	类型	是否必填	数据格式
title	标题	String	是	字符串。
subTitle	副标题	String	否	字符串。
rightTitle	右边标题	String	否	字符串。
infoArr	所有行数据列表集合	Array	是（注：每行三列位置固定，不传则不显示）	[{
leftText:String,第一行第一列文字
centerText:String,第一行第二列文字
rightText:String第一行第三列文字
}]
一个对象代表一行（注：flex布局）
listImg	图片对象	Object	否（文字默认撑开，不影响布局）	{isShow:Boolean,src:’’}isShow为true显示图片,false隐藏图片，src为图片路径（如为空显示默认图片）