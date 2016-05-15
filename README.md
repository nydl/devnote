# 诺亚大陆系统开发技术笔记

开发一套大型系统社交+电商系统，涉及前端（ios、安卓、pc、微信）、后台、接口、数据库、缓存、负载均衡、集群等方方面面的知识和技能。
我们将开发中所涉及的技能、知识、思想记录并整理出来，将其中承载的价值分享、传播给更多人。   
如果你想成为一名全栈或某一方面的编程专家，请跟着我们一起探索、前进。

> * 无论你现在懂一点还是什么都不懂，请跟着我们前进，成为全栈专家
> * 无论你是初中毕业、高中毕业、大专毕业、本科毕业，请跟着我们前进，成为全栈专家
> * 无论你是谁，只要有强烈的兴趣，请跟着我们前进，成为全栈专家
> * 我们的CEO在14岁时创建诺亚大陆项目，研发团队有初中毕业、高中毕业、大专毕业、本科毕业
> * 相信自己，就能创造奇迹，请跟着我们前进，做更好的自己

## 笔记清单

- [koa 2.0 web服务框架](https://github.com/nydl/devnote/blob/master/koa.md)
- 增加了离线浏览的 css、js 文件，脱离 github环境可直接打开 html文件浏览。

## markdown 编写工具及注意事项

- [Visual Studio Code] 跨平台，微软良心作品，非常棒！无需安装插件支持markdown。
- [Sublime Text] 不错，需注册，需安装markdown插件
- [ATOM] 跨平台，不错，但是太慢、太卡，资源消耗大，用起来不是特别爽
- [MacDown](http://macdown.uranusjr.com) Mac OS，苹果操作系统，对列表里面的代码块没有正确识别！
- [简书](http://www.jianshu.com) 目前使用比较多的在线工具，免费需注册！
- [Cmd Markdown](https://www.zybuluo.com/mdeditor) 有在线及客户端，基本功能免费，界面不错，tab无法设置！
- [dillinger](http://dillinger.io)国外的在线工具
- **编写注意**：代码部分，顶格没有问题，如果在列表中，不是顶格，则中间或最后必须有空行，否则不作为代码显示，原因不明！  
  按语法规范，4个空格或一个tab都昨晚代码处理，实际上，github必须空一行才行

## vs code使用

- 跨平台，开源，免费，启动非常快，目录作为项目管理，集成 git版本管理，使用 node 作为外部任务，能打开大文件，并且编辑不卡顿
- 是目前发现**最好用的编辑器**，之前使用的 Sublime、Pad ++ 等都不用了！
- 同步预览：拆分 md文件，在拆分的文件上点击右上角预览，或者使用 cmd+shift+v 切换到预览视图，即可同步预览。
- tab设置：编辑器似乎能跟踪每个文件的tab设置，如果一个文件开始设置tab自动转空格，用户设置tab改为不转空格，
  新的用户设置对原来编辑过的文件不起作用，非常神奇，不知道是bug还是一个特色功能。
	需要变更 tab 设置，只能将原文件更名，创建新文件，把内容拷贝过来！
- md转html
  1. npm install -g marked
  2. Create tasks.json  
    F1 and type in 'Configure Task Runner', press Enter to select it.
    Select Others.
    tasks.json file in your workspace .vscode folder with the following content:  
    {
      // See http://go.microsoft.com/fwlink/?LinkId=733558
      // for the documentation about the tasks.json format
      "version": "0.1.0",
      "command": "echo",
      "isShellCommand": true,
      "args": ["Hello World"],
      "showOutput": "always"
    }
    we change the contents as follows:  
    {
      // See http://go.microsoft.com/fwlink/?LinkId=733558
      // for the documentation about the tasks.json format
      "version": "0.1.0",
      "command": "marked",
      "isShellCommand": true,
      "args": ["sample.md", "-o", "sample.html"],
      "showOutput": "always"
    }
    Use ⌃Space to see the available settings.
  3. Run the Build Task  
    As this is the only task in the file, you can execute it by simply pressing ⇧⌘B (Run Build Task).
- [第三方插件](https://marketplace.visualstudio.com/VSCode)
  - cmd+p，输入 ext+空格，即可浏览所安装的插件，点击 x 即可卸载
  - ext install xxx 安装插件
  - ext update 更新插件
  - ext install beautify，js、css、html、json 美化，推荐！
  
  

---
<a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/cn/">
<img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc/3.0/cn/88x31.png" />
</a></br>本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/cn/">知识共享署名-非商业性使用 3.0 中国大陆许可协议</a>进行许可。 
