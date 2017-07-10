## 横渡长江游戏

### 开发

配置 node 和npm环境

> npm --version 5.0.3 node -v 6.10.3

开发之前运行npm i 安装第三方模块包

开发 npm run dev

构建 npm run build

在 index.html中：
```javascript
<!--配置游戏内资源地址-->
window.gamedata.imgUrl = './images/';
<!--首页走马灯数据 不少于4个-->
window.test_rank  length >= 4
<!--初始化时数据接口-->
window.initGame
<!--初始团队信息-->
window.initTeam
<!--完赛时回调函数-->
window.gamedata.addGameLog
<!--辅助变量 勿修改-->
window.gamedata.swingType
```

在打包构建时 可通过修改webpack.config.js中的publicPath来修改打包生成时css中的引用background图片根路径，以及打包时自动生成的css和js路径
```javascript
 output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/dist/' 
	},
    生成路径
    <link href="/dist/app.min.css" rel="stylesheet">
    <script type="text/javascript" src="/dist/app.min.js"></script>
```
app.min.css中
```css
    .guide {
        background: url(/dist/images/guide_bg.png) 0 0 no-repeat;
        background-size: 295px 326px;
        width: 295px;
        height: 241px;
        position: relative;
        padding-top: 85px;
    }
```

游戏中开始时部分状态判断在mainmenu.js 的create() 时 执行，具体处理函数在control.js中 部分数据接口请求可在control中添加。
