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
