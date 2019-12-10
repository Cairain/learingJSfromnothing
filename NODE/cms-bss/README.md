###blog-cms-bss




##路由设计
|路径       |方法|get参数|post参数|              是否需要登录 |备注         |
|/          |GET|       |        |                          |  渲染首页  |
|/register  |GET|       |        |                         |  渲染注册页  |
|/register  |POST|      |email,nickname,passward  |        |渲染注册请求   |
|/login     |GET|       |        |                         | 渲染登录页面  |
|/login     |POST|      | email/username psw   |           | 处理登陆请求   |
|/logout    |GET|       |        |                         |  处理退出请求  |
|/upcontent-1|GET|      |          |                      |  测试session.id |
	- 解决方案
	   + 连接数据库post创建数据 http://localhost:3000,运用request解决跨域问题
	   + get数据 TODO


##访问json-server数据库
	 + 跨域
	 + 代理
	 + request模块解决跨域访问
		-requset(option,function(e,res,body))  options包含url，header，请求body, method ,请求是否为表单数据， 请求是否为json，
		请求是否需要压缩， 解码，或者用户名密码验证。
		callback 参数 e =》error ，res =》request， body=》 请求主体
	 + get查询
	 + post创建
	 + put更新
	 + delete删除