1.溢出元素的省略号：
	1.white-space:nowarp; 
	text-overflow:ellipsis;
	overflow:hidden;
	2.父元素不能是被子元素撑开的行内元素
	
2.图片的水平垂直居中：
	1.在父元素#wrap设置
	#wrap：after｛
		content:'';
		height:100%(父元素有定高)；
		line-height:height;
		vertical-align:middle;
	｝且img{vertival:middle }
3.html不会出现滚动条，当html和body都带有overflow（auto,scroll）时body会有滚动条。
	当html和body的overflow（都为hidden）时文档/窗口的滚动条会消失，此时用全局div#wrap
	代替文档模拟滚动条。#wrap滚动，此时初始包含块未移动，故可用absolute模拟fixed。
