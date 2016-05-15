
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/markdown.css" rel="stylesheet" />

<link href="css/prettify.css" rel="stylesheet" />

<script src="http://apps.bdimg.com/libs/jquery/2.0.3/jquery.min.js"></script>

<script src="js/prettify.js"></script>  

git
===

最好用的代码版本管理系统，开发必备。 所有使用过Git后，发现Git提供的种种特性大大提高了我们的开发效率，在认识Git前我们无法想象一个版本控制工具可以让开发任务切换变得如此自然流畅。 所有使用过git的程序员，都会强烈推荐大家使用Git，你付出的学习绝对物有所值！

>- **官方网站**: http://git-scm.com/  
- **windows网站**：https://git-for-windows.github.io/  
	msysgit是 Git 版本控制系统在 Windows 下的版本。
-	使用手册：http://www.git-scm.com/book/zh/v2  
-	使用手册：http://progit.org/book/zh/ch1-5.html http://www.open-open.com/lib/view/1328070404827

![git-local](https://raw.githubusercontent.com/nydl/devnote/master/img/git-local.png)

## git是每个程序员必须掌握的基本技能

- git是每一个程序员必须学习、掌握的基本技能，用于管理代码版本，发布协作与回溯
- 开源项目请使用 github，私有项目请 使用 git.oschina.net创建云端版本库
- 按项目分好目录，将源代码纳入版本库管理，dll、二进制文件、相关库等，备份、无关文件等，通过.gitignore配置不纳入版本库
- 针对每个项目创建版本库，每天提交版本，重要版本，请打上 tag 标记！
- 投产的版本，请无比打上 版本标记（年月日），将该版本留一个快照，相关的其它未纳入版本管理文件，请创建专门的版本目录，单独保存！
- 后续开发，请在该版本节点上，创建分支，如 dev，作为开发版本分支，不影响主版本
- 投产版本，如需要修改，请在投产节点上创建bug修复分支，如：bug#67 修正67号bug的分支
- 分支版本比较稳定时可合并到主线，bug修复分支测试稳定后，也可合并到主版本
- 一般代码库，基本由三个分支：主版本、当前开发版本、bug#xxx版本，如开发特别版本，可创建特别专版，版本分支，跟目录类似，替代了平时的目录拷贝而已！ git的研发者就是 linux操作系统内核创世人，git设计目的就是可回溯多版本文件系统。
- 版本分支比目录的好处，是能方便切换、创建，比目录拷贝快无数倍，当然，还能回滚，能随意打上标记（版本号），能随意比较差异， 能随意自动合并或解决冲突，还能多人协作等等无数专门为程序员开发的功能。


安装git
-------

-	根据操作系统位数，下载32位或64位windows版本，并运行。
-	最新的版本是 2.6.1，Git-2.6.1-64-bit.exe
	-	如果是32位操作系统，请选择32位版本！
	-	如果安装了旧版本，请卸载旧版本，安装新版本！
-	默认安装路径 C:\Program Files\Git
-	选择 Additional icons
-	选择 Git Bash、Git GUI
-	选择 Use a TrueType font in all console windows
-	Use Git and optional Unix tools from the Windows Command Prompt
	-	将 git 路径 加入 path
	-	第一个，不改变 系统 path，执行 不方面
	-	中间一个，改变 系统 path，在任何 命令行下都能执行 git
	-	如果喜欢 执行 unix工具，则可选择 最后一个，最后一个，同时将 unix 工具加入 到 path，这样，就可以 在 windows中，执行 unix 工具！ Unix工具会覆盖 windows的 命令：如 find、sort等，unix的 工具更强大！
	-	linux 工具：find、sort等替换windows的命令行工具！linux的工具会更强大，建议选择使用！
	-	如果是服务器，则建议使用缺省选项，不对path改动！
-	Checkout Windows-style,commit Unitx-style line endings  
	自动转换回车换行符，就是提交时，按linux风格转换回车换行！
-	Use MinTTY，Git Bash的命令行终端  
	建议采用其推荐的，可伸缩,彩色，比较好用！不使用微软的cmd console终端。
-	Enable file system caching  
	可在 core.fscashe 中设置！ 可提高性能，但是提示是 experimental 实验性的，建议服务器不要选择，个人可选择

安装windows图形化客户端
-----------------------

-	如果你不需要图形化界面，你甚至无需安装TortoiseGit，  
	但是如果你喜欢TortoiseSVN的操作方式，你一定想安装TortoiseGit.
-	windows版本客户端：tortoiseGit(http://tortoisegit.org/download/，根据cpu类型选择32位或者64位版本)  
-	按缺省安装即可！
-	选择对应的简体中文语音包，安装完毕，在设置中选择中文即可！
-	安装 TortoiseGit，如出现选择 ssh时，选择 PLink
-	该客户端与文件管理器整合的，需要设置、使用，选择一个目录，或桌面任意地方，点击鼠标右键，选择 TortoiseGit菜单

Tortoise 优化
-------------

-	win10的git库图标不变问题  
	Windows Explorer Shell 支持的 Overlay Icon 最多 15 个，本来大家是按照音序排序的，但是win10版本，微软在注册表中将它的OneDrive、SkyDrive前面加上了空格!强行排到所有项目前面。  
	【解决方法】在注册表HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers里找到Tortoise的项目，在它们前面加空格，让它们排到前面就可以了。
-	TortoiseGit 进程里会有一个TGitCache.exe进程对全盘文件、文件夹的变动进行监视，可能导致计算机打开文件浏览器时很慢，计算机很卡，优化办法如下。

	-	右键->TortoiseSvn-settings->Icon Overlays
	-	驱动器中只勾选硬盘，不对其它盘进行图标覆盖，比如 U盘等
	-	在Exclude paths:里先把所有盘的监视去掉，每个盘一行例如：  
		C:\*  
		D:\*  
		E:\*  
		F:\*
	-	然后在Include paths添入要监视的文件夹  
		例如： D:\1Prjs\*
	-	Show overlays and context menu only in explorer"可以勾选  
		它的意思是只在explorer中才会进尽图标的覆盖， 而对于保存文件对话框/另存为对话框等则不会进行这个动作，因此，勾选上这一 项， 可以在一定程度上节约资源。
	-	在设置了Exclude paths和Include paths之后，情况应该已经大大改观
	-	如果你仍觉得不够，计算机还是很卡，还有个选择，Status cache：None.  
		这样将永远不会再自动的对文件夹下的文件变动进行扫描并更新图标。 虽然文件夹的图标仍会覆盖为 打绿勾的图标， 但对于其下的文件，则不会有任何图标的覆盖。  
		如果想查看某文件夹下的文件是否有变化，需要手动的通过 TortoiseGit->Check for modifications来做到。 (查看起来不太直观)  

-	比较工具，请安装 Araxis Merge，这是最好的比较、合并工具！  
	D:\Program Files\Araxis\Araxis Merge\compare.exe /max /wait /title1:%bname /title2:%yname %base %mine

-	合并工具  
	D:\Program Files\Araxis\Araxis Merge\compare.exe /max /wait /3 /title1:%tname /title2:%bname /title3:%yname %theirs %base %mine %merged /a2

-	在桌面任意位置，点击鼠标右键，就应该可以看到TortoiseGit的菜单了。

操作系统默认的 console问题
--------------------------

-	windows 2008 cmd 窗口拖动自动 回车的问题！
-	在 Console的 Setting 中 创建 一个 Tab，名称为 Redis，Shell 指令 C:\Redis\Redis-server Redis.conf，
-	启动路径 C:\Redis 创建一个 快捷方式：D:\Tools\Console\Console.exe -t Redis 注意 console的实际路径
-	北京服务器 已经 用 console 替代了 cmd，解决了 cmd 窗口 拖动导致 redis关闭问题！
-	新的redis 已经能支持 服务启动了！
-	装上它们之后。需要重启一下系统。等windows重启后，你的电脑，己经可以使用git了。

中文问题
--------

Cygwin 里面带的 git 很好解决了中文问题，但是 tortoiseGit 不支持！  
Cygwin 在widows中模拟了 linux，对于 学习、熟悉 Linux 环境非常有帮助！ Get that Linux feeling - on Windows!  
好像不小！一般很少用到！不建议安装！

git 基本配置
------------

-	git 配置文件分三个级别
	-	一个是系统级别，存储在 C:\ProgramData\Git目录，文件名为 config，系统对所有用户都普遍适用的配置。
	-	一个是全局 C:\Users\xxx 用户目录，文件名 .gitconfig，对当前用户所有项目适用的配置。
	-	一个是项目级别，存放在当前项目所在目录，文件名 .git/config，只对当前项目起作用。
-	使用 TortoiseGit中的设置，git里面，就有编辑三个级别配置文件按钮。也可以直接编辑配置文件。
-	直接编辑要注意，需以***管理员***身份运行文本编辑器修改配置文件，否则 会提示 无修改权限、文件只读，打开文件进行修改，打开时提示是否转换为 dos格式， 提示是否转换时，选择 不转换。
-	也可以使用 git config 指令来设置
	-	git config --system 系统
	-	git config --global 全局
	-	git config 不带参数，当前项目。
-	设置用户名和email，可通过以上三种方式配置，使用操作台指令配置脚本如下：  
	$ git config --global user.name "Your Name"  
	$ git config --global user.email "your@email.address"  
	用户信息：可以设置你的名字和email，这样在你提交代码的时候就会显示出你的名字
-	升级 git时，请先 备份修改过的系统及全局配置，安装新版本后，需merge回原来的修改！

git 优化配置
------------

-	C:\Program Files\Git\etc\profile 末尾增加  
	export LESSCHARSET=utf-8  
	1.8 git 已经加了，2.6 又没有了，但是 2.6 使用的是 自带的mingw64终端，可能不需要这个！  
	说明：$ git log 命令不像其它 vcs 一样，n 条 log 从头滚到底，它会恰当地停在第一页， 按 space 键再往后翻页。这是通过将 log 送给 less 处理实现的。  
	以上即是设置 less 的字符编码，使得 $ git log 可以正常显示中文。 其实，它的值不一定要设置为 utf-8，比如 latin1 也可以……。 还有个办法是 $ git –no-pager log，在选项里禁止分页，则无需设置上面的选项。
-	[core]  
	editor = "notepad++"  
	 若命令行里没有提供修订说明，则会自动弹出一个编辑器，等待输入。默认的编辑器是 Vim。  
	 Vim 的使用是很简单的，首先要明白它有两个模式，一个是命令模式、一个是输入模式。  
	 Vim 启动的时候默认的是命令模式，需要先按’i'键，进入输入模式； 然后就正常编辑；编辑完成之后，将输入法切换回英文状态，  
	 按 Esc 重新进入命令模式； 此时按 ‘(Shift):wq‘ 并回车，w 表示写入保存、q 表示退出。完毕！  
	 若实在不习惯 Vim，也可以设置为其它编辑器： notepad++ 等 （不过它们在命令行里无法直接访问，得先设置 PATH 变量）。  
	quotepath=false  
	 解决git status 时中文文件名乱码，当源代码中存在中文名文件时，使用git status 时屏幕输出的中文文件名却是乱码。  
	 这是因为git默认是以UNICODE编码输出的，只需在配置文件中把该选项关闭即可
-	[color]  
	ui = auto
-	[gui]  
	encoding = utf-8  
	说明：我们的代码库是统一用的 utf-8，这样设置可以在 git gui 中正常显示代码中的中文。否则会显示乱码！
-	[i18n]  
	commitencoding = utf-8  
	设置 commit log 提交时使用 utf-8 编码，可避免服务器上乱码，同时与Unix上的提交保持一致！  
	说明：如果没有这一条，虽然我们在本地用 $ git log 看自己的中文修订没问题，但是我们的 log 推到服务器后会变成乱码；  
	别人在 Linux 下推的中文 log 我们 pull 过来之后看起来也是乱码。  
	这是因为，我们的 commit log 会被先存放在项目的 .git/COMMIT_EDITMSG 文件中；  
	在中文 Windows 里，新建文件用的是 GB2312 的编码； 但是 Git 不知道，当成默认的 utf-8 的送出去了，所以就乱码了。  
	有了这条之后，Git 会先将其转换成 utf-8，再发出去，于是就没问题了。  
	logoutputencoding = GB2312  
	使得在 $ git log 可以正常显示中文，将 utf-8 编码转换成 gbk 编码，解决 Bash 中 $ git log 乱码。  
	增加该行，配合 上行，解决日志乱码问题！
-	[diff]  
	 tool = araxis
-	[difftool "araxis"]  
	 path = C:/Program Files/Araxis/Araxis Merge/compare.exe
-	[merge]  
	 tool = araxis
-	[mergetool "araxis"]  
	 path = C:/Program Files/Araxis/Araxis Merge/compare.exe
-	[alias] 指令别名  
	go = "! bash -c \"git pull && git add .; if [ \\\"$*\\\" == \\\"\\\" ]; then git commit -a; else git commit -am \\\"$*\\\"; fi; git push origin master:your-id;\""  
	注意，your-id 是你在服务器上的用户名，比如 yhfeng ck = checkout 说明：强大的 alias，有了这个，我们 90% 的情况下只需要输入 $ git go 这一个命令，免去了先拉后提交再推的繁琐步骤。  
	两种用法： $ git go 或 $ git go aaa 修订说明  
	命令后带修订说明时，会直接提交。需要注意的是，在“修订说明”之前，有还个“aaa”，这是个 bug， 参数中的第一个会被忽略，所以随便写一个凑数的……。  
	以上 alias 是为 Windows 定制的，Linux 下可以写得更优雅，不过鉴于使用上没分别，就保持一致吧～。  
	co = checkout  
	ci = commit -a  
	st = status  
	br = branch  
	mg = merge  
	mt = mergetool  
	dt = difftool  
	oneline = log --pretty=oneline --since='2 days ago'  
	onelog = log -p -1
	-	以上，给 Windows 下的同事在 Git Bash 里推代码就比较完美了。不过仍然有 3 个问题
		1.	上面的 alias $ git go 有 bug，代码修订说明之前要输入一串字符凑数；
		2.	$ git diff，如果代码里有中文，会显示乱码；
		3.	$ git checkout 有时候需要修改/增删很多文件，如果某些文件被占用，会被 Windows 拒绝， 导致失败，甚至可能造成版本库出现无法修复的问题。  
			这 3 个都是可承受的问题，前两个应该有办法解决；第 3 个归功于文件系统，只能尽量避免 checkout， 实在需要的时候先注销一次，就不会有问题了。
	-	命令别名：这是程序员最喜欢的部分，它可以大大减少你敲击键盘的次数  
		在该文件中，co设置 为checkout的别名， 那么下次要用'git co new_branch'就可以切换到new_branch分支下了，简洁而优雅；  
		将ci设置为commit -a的别名，-a选项表示我不需要将修改和删除的文件通过'git add'命令来加入索引， 这样设置在使用'git ci -m"message"'这样的命令时， 相当于连续执行了'git add 被修改和删除的文件'和'git commit -m"message"'两条命令， 再一次节省了我们宝贵的时间；最酷的是最后两行。  
		Git提供许多优雅、人性化的选项，我们如果 再结合别名的设置，可以发挥你最大的想象力， 真的让你自己的Git活起来

检查配置信息
------------

-	如果想要检查你的配置，可以使用 `git config --list` 命令来列出所有 Git 当时能找到的配置。

```
$ git config --list
user.name=John Doe
user.email=johndoe@example.com
color.status=auto
color.branch=auto
color.interactive=auto
color.diff=auto
```

git 版本管理
------------

1.	git 本质上可看做一个文件管理系统
2.	不像 svn，在所有目录创建 .svn 目录，git只在根目录 创建 .git 目录，该目录默认不可见，需在查看选项中选择查看隐藏路径
3.	基于 项目（目录）的版本管理 vss 等是基于 文件的版本管理， 实际项目是按目录管理的，要取昨天的版本， 无论何时都能取到昨天所有目录文件，也就是昨天的项目！ 通常我们在vss中使用分支解决项目版本问题，在git中则不需要！ git中，独立的文件是不被跟踪的。Git跟踪整个项目的变更，这通常才是有益的。
4.	用 tag 设定 发布版本 svn有该功能，vss 则没有 tag 在发布版本时，对整个目录、项目设置 版本号， 方便随时回到该版本设置新的分支，解决老版本问题
5.	强大的分支功能 创建、切换、合并分支非常快、非常方便， 分支有些类似文件系统中的目录， 创建分支，就是创建备份目录 切换分支，就是拷贝目录 与文件系统目录不同的是，切换分支，在原目录里面变化子目录和文件，  
	创建分支也可用克隆来替代，分支在原目录操作，克隆则在一个不同的目录操作 你可能犹疑于分支是否值得一试。毕竟，克隆也几乎一样快，并且你可以用 cd 来在 彼此之间切换，而不是用Git深奥的命令。 考虑一下浏览器。为什么同时支持多标签和多窗口？因为允许两者同时接纳纳了 多种风 格的用户。一些用户喜欢只保持一个打开的窗口，然后用标签浏览多个网页。 一些可能 坚持另一个极端：任何地方都没有标签的多窗口。一些喜好处在两者之间。 分支类似你工作目录的标签，克隆类似打开的浏览器新窗口。 这些是本地操作很快，那 为什么不试着找出最适合你的组合呢？ Git让你按你确实所希望的那样工作
6.	拷贝目录，同时拷贝了这个 git库，没有中心的 git 库， git库部署、管理非常简单方便
7.	本地两级管理 可先暂存，等修改完毕，再一起提交，避免太多临时版本 提交后，存储在本地
8.	服务器提交 每周提交一次到中心版本库，方便统计工作量及公司版本管理！
9.	本地克隆 比如你想并行开发多个功能。那么提交你的项目并运行：
10.	git 与 svn 等 最大的不同就是，本地保存压缩的全部版本库，从服务器 clone 整个 项目版本库到本地工作路径， 而不只是最新版本的文件。 因此，做版本比较、回滚等，不需要 服务器支持！

git 常用指令
-----------

![git-remote](https://raw.githubusercontent.com/nydl/devnote/master/img/git-remote.png)

- 标记说明
	- workspace: 本地的工作目录。（记作A）
	- index：缓存区域，临时保存本地改动。（记作B）
	- local repository: 本地仓库，只想最后一次提交HEAD。（记作C）
	- remote repository：远程仓库。（记作D）												
- 创建版本库
	- git init # 在当前目录创建版本库，如果 clone则不需要改指令
	- git clone /path/to/repository：克隆版本库到指定路径
		-	克隆本地库 # git clone . /some/new/directory
		- 克隆远程库 # git clone https://git.oschina.net/nydl/nuoya.git  
		Git使用硬链接和文件共享来尽可能安全地创建克隆，因此它一眨眼就完成了，因此你现 在可以并行操作两个没有相互依赖的功能。  
		例如，你可以编辑一个克隆，同时编译另一个。本地克隆比简单备份省时省地。 
- 提交文件
	- git add . # 添加所有文件，A → B
	- git commit -m "代码提交信息" # 文件提交，B → C
	- git commit --amend # 与上次commit合并, *B → C
	- git push <remote> <branch> --force # amend后，需强制push
- 远程同步
	-	git remote add origin git@github.com:phoenixtoday/git-usage.git # 增加远程服务器代码库地址
		如果是克隆的代码库，已经设置，无需另行设置，
	- git pull # 更新本地仓库至最新改动， D → A
	- git fetch # 获取远程仓库更新， D → C
	- git push origin master # 推送至master分支, C → D
	- git push # 推送本地版本库到云端，需设置确实推送分支
		git config --global push.default matching # 推送所有匹配分支
		git config --global push.default simple   # 推送当前分支
- 查看信息
	- git log # 查看提交记录日志
	- git status # 查看修改状态
	- git diff # 查看详细修改内容
	- git show # 显示某次提交的内容
- 撤销回滚
	- git reset file # 某个文件索引会回滚到最后一次提交， C → B
	- git reset # 索引会回滚到最后一次提交， C → B
	- git reset --hard # 索引会回滚到最后一次提交， C → B → A
	- git checkout # 从index复制到workspace， B → A
	- git checkout --files # 文件从index复制到workspace，B → A
	- git checkout HEAD --files # 文件从local repository复制到workspace， C → A
- 分支操作
	- git checkout -b branch_name # 创建名叫“branch_name”的分支，并切换过去
	- git checkout master # 切换回主分支
	- git branch -d branch_name # 删除名叫“branch_name”的分支
	- git push origin branch_name # 推送分支到远端仓库
- 合并冲突
	- git merge branch_name # 合并分支branch_name到当前分支(如master)
	- git rebase # 衍合，线性化的自动， D → A#冲突处理
	- git diff # 对比workspace与index
	- git diff HEAD # 对于workspace与最后一次commit
	- git diff source_branch target_branch # 对比分支差异
	- git add filename # 修改完冲突，需要add以标记合并成功
- 其他
	- gitk //开灯图形化git
	- git config color.ui true //彩色的 git 输出
	- git config format.pretty oneline //显示历史记录时，每个提交的信息只显示一行


## 指令详细说明

-	git stash：  
	使用branch解决紧急任务切换的问题，其实stash命令也可以很好的解决这样的问题。当你不想提交当前完成了一半的代码，但是却不得不修改一个紧急Bug，  
	那么使用'git stash'就可以将你当前未提交到本地（和服务器）的代码推入到Git的栈中，这时候你的工作区间和上一次提交的内容是完全一样的，所以你可以放心的修 Bug，等到修完Bug，提交到服务器上后，再使用'git stash apply'将以前一半的工作应用回来。  
	也许有的人会说，那我可不可以多次将未提交的代码压入到栈中？  
	答案是可以的。当你多次使用'git stash'命令后，你的栈里将充满了未提交的代码，这时候你会对将哪个版本应用回来有些困惑，  
	'git stash list'命令可以将当前的Git栈信息打印出来，你只需要将找到对应的版本号，  
	例如使用'git stash apply stash@{1}'就可以将你指定版本号为stash@{1}的工作取出来。  
	当你将所有的栈都应用回来的时候，可以使用'git stash clear'来将栈清空。
-	git format-patch  
	当你想给一个开源项目（例如Rails）提交一段代码的时候，或者你想给小组成员展示一段你并不想提交的代码，那么你还是需要 patch的，  
	Git的'format-patch'命令良好的支持了这个功能。我来基本描述一下使用这个命令的步骤和方法：  
	第一，利用branch命令 创建一个分支；  
	第二，修改你的代码；  
	第三，在该分支上提交你的修改；  
	第四，使用'git format-patch'命令来生成一个patch文件，  
	例如：'git format-patch master --stdout > ~/Desktop/tmp.patch'  
	就是将工作分支与master主干的不同，存放在'~/Desktop'文件夹下，生成一个叫做 tmp.patch的文件。  
	另一种简单的版本是利用diff命令，例如'git diff ..master > ~/Desktop/tmp.patch'，  
	这样就生成了patch文件。  
	那么别人就可以使用'git apply'命令来应用patch，例如'git apply ~/Desktop/tmp.patch'就是将patch打在当前的工作分支上
-	origin(remote) 是 Repository 的版本 master(branch) 是 local 端, 正在修改的版本  
	平常沒事不要去動到 origin, 如果動到, 可用 git reset --hard 回覆到沒修改的狀態。
-	git add 
	- git add . 將所有資料先暫存到 staging area, add 之後再新增的資料, 於此次 commit 不會含在裡面.  
	- git add filename  
	- git add modify-file # 修改過的檔案, 也要 add. (不然 commit 要加上 -a 的參數)  
	- git add -u # 只加修改過的檔案, 新增的檔案不加入.  
	- git add -i # 進入互動模式
-	git rm filename # 刪除檔案，如果遇到中文文件名称乱码，tortoiseGit 无法提交， 
	则需要用 git commit -a -m 指令提交变化即可！
-	git mv filename new-filename # Git 修改檔名、搬移目錄 
-	git commit # 提交代码库	  
	- git commit -m 'commit message'  
	- git commit -a -m 'commit -message' 所有纳入版本库的文件修改后，可省略 add，直接使用 -a 提交！  
		注意，新增的文件，還是得要先 add.  
	- git commit -a -v 
		-v 可以看到檔案哪些內容有被更改, 
		-a 把所有修改的檔案都 commit
-	git 分支管理  
	- git branch # 列出目前有多少  
	- git branch new-branch # 复制分支到新的 branch, 若没有特別指定, 由目前所在的 branch / master 复制  
	- git branch new-branch master # 由 master 產生新的 branch(new-branch)  
	- git branch new-branch v1 # 由 tag(v1) 產生新的 branch(new-branch)  
	- git branch -d new-branch # 刪除 new-branch  
	- git branch -D new-branch # 強制刪除 new-branch  
	- git checkout -b new-branch test # 產生新的 branch, 并切换到 new-branch  
	- git branch -r # 列出所有 Repository branch  
	- git branch -a # 列出所有 branch
-	Git checkout 切换分支  
	- git checkout branch-name # 切換到 branch-name  
	- git checkout master # 切換到 master  
	- git checkout -b new-branch master # 從 master 建立新的 new-branch, 並同時切換過去 new-branch  
	- git checkout -b newbranch # 由現在的環境為基礎, 建立新的 branch  
	- git checkout -b newbranch origin # 於 origin 的基礎, 建立新的 branch  
	- git checkout filename # 還原檔案到 Repository 狀態  
	- git checkout HEAD . # 將所有檔案都 checkout 出來(最後一次 commit 的版本), 注意, 若有修改的檔案都會被還原到上一版.  
		(git checkout -f 亦可)  
	- git checkout xxxx . # 將所有檔案都 checkout 出來(xxxx commit 的版本, xxxx 是 commit 的編號前四碼),  
	注意, 若有修改的檔案都會被還原到上一版.
	-	同时恢复多个被删除的文件 #  git ls-files -d | xargs -i git checkout
-	Git diff比较版本差异  
	- git diff master # 與 Master 有哪些資料不同  
	- git diff --cached # 比較 staging area 跟本來的 Repository git diff tag1 tag2 # tag1, 與 tag2 的 diff  
	- git diff tag1:file1 tag2:file2 # tag1, 與 tag2 的 file1, file2 的 diff git diff # 比較 目前位置 與 staging area  
	- git diff --cached # 比較 staging area 與 Repository 差異 git diff HEAD # 比較目前位置 與 Repository 差別  
	- git diff new-branch # 比較目前位置 與 branch(new-branch) 的差別  
	- git diff --stat
-	Git Tag 版本标记  
	- git tag v1 ebff # log 是 commit ebff810c461ad1924fc422fd1d01db23d858773b 的內容, 設定簡短好記得 Tag: v1  
	- git tag 中文 ebff # tag 也可以下中文, 任何文字都可以 git tag -d 中文 # 把 tag=中文 刪掉
-	Git log日志  
	不同于SVN，Git将代码的历史记录全部在本地克隆了一份，所以这就使得'git log'这样的命令使用起来非常的迅速，也是我最常使用的Git命令之一。  
	- git log # 將所有 log 秀出 
	- git log -p # 將所有 log 和修改過得檔案內容列出  
	- git log --stat --summary # 查每個版本間的更動檔案和行數  
	- git log filename # 這個檔案的所有 log  
	- git log directory # 這個目錄的所有  
	- log git log -S'foo()' # log 裡面有 foo() 這字串的.  
	- git log --no-merges # 不要秀出 merge 的 log  
	- git log --since="2 weeks ago" # 最後這 2週的 log git log --pretty=oneline # 秀 log 的方式  
	- git log --pretty=short # 秀 log 的方式 git log --pretty=format:'%h was %an, %ar, message: %s'  
	- git log --pretty=format:'%h : %s' --graph # 會有簡單的文字圖形化, 分支等.  
	- git log --pretty=format:'%h : %s' --topo-order --graph # 依照主分支排序  
	- git log --pretty=format:'%h : %s' --date-order --graph # 依照時間排序	
	-	'-p'表示查看修改的具体内容，例如'git log -p'它不但会打印出提交的时间、版本号、人员等，还会将具体的代码修改部分打印出来； 
	-	'-n'其中n表示一个数字，这表示打印出具体的几个日志，例如 'git -p -1'正如我的Git配置文件中设置的onelog别名的内容一样，就表示打印出当前最新的一次日志记录及具体修改内容；  
	-	'--since="时间/日 期"'，  
	-	'--until="时间/日期"'表示你希望查找某个日期段的日志记录，例如'git log --since="2 days ago"  
	-	--until="1 hour ago"'就表示你希望查找两天前到一小时前的日志记录，Git是足够聪明的，它可以将类似于'2 days ago'和'1 hour ago'这种表示时间的英语转化为具体的时间数字；有的时候，你不希望翻很多页才可以看到所有的日志，你只希望看到简短的说明，那么Git为你提供打印格式的定制  
	-	'git --pretty=格式种类'，其中格式种类有full、short、oneline等，例如'git log pretty=oneline'就会将每条代码历史记录放在一行里，看起来简单明了	
-	Git show  
	- git show ebff # 查 log 是 commit ebff810c461ad1924fc422fd1d01db23d858773b 的內容  
	- git show v1 # 查 tag:v1 的修改內容 git show v1:test.txt # 查 tag:v1 的 test.txt 檔案修改內容  
	- git show HEAD # 此版本修改的資料 git show HEAD^ # 前一版修改的資料 git show HEAD^^ # 前前一版修改的資料  
	- git show HEAD~4 # 前前前前一版修改的資料
-	Git reset 還原  
	- git reset --hard HEAD # 還原到最前面  
	- git reset --hard HEAD~3 git reset --soft HEAD~3  
	- git reset HEAD filename # 從 staging area 狀態回到 unstaging 或 untracked (檔案內容並不會改變)
-	Git grep git grep "te" v1 # 查 v1 是否有 "te" 的字串  
	- git grep "te" # 查現在版本是否有 "te" 的字串
-	Git stash 暫存  
	- git stash # 丟進暫存區  
	- git stash list # 列出所有暫存區的資料  
	- git stash pop # 取出最新的一筆, 並移除.  
	- git stash apply # 取出最新的一筆 stash 暫存資料. 但是 stash 資料不移除  
	- git stash clear # 把 stash 都清掉
-	Git 版本设置 不同版本，涉及引用的 dll 不同，我的做法是将所有发布关联dll放在 公共的 Release 目录，目录中建不同的 版本子目录， 通过拷贝的方式来切换编译环境。  
	理论上，最好将 第三方dll 也纳入版本，这样切换版本库时，第三方 版本库自动切换，避免文件拷贝！
-	Git merge 合并  
	版本之间的合并，好像不太好对单个文件进行合并，单个文件合并可将该文件拷贝出来，人工合并！  
	'git merge git merge master git merge new-branch' git merge <branch_name> # 合併另一個 branch，若沒有 conflict 衝突會直接 commit。  
	若需要解決衝突則會再多一個 commit。  
	- git merge --squash <branch_name> # 將另一個 branch 的 commit 合併為一筆，特別適合需要做實驗的 fixes bug 或 new feature，最後只留結果。合併完不會幫你先 commit。  
	- git cherry-pick 321d76f # 只合併特定其中一個 commit。如果要合併多個，可以加上 -n 指令就不會先幫你 commit，這樣可以多 pick幾個要合併的 commit，最後再 git commit 即可。  
	- Git blame git blame filename # 關於此檔案的所有 commit 紀錄
-	Git配置可视化的diff 和merge工具  
	Windows下使用Git，msysgit是首选，但是msysgit的shell实在不给力，大小不能更改，字体难看。  
	配置第三方工具，最好的是araxis。 Windows下的Diff工具有很多，WinMerge(免费), Araxis Merge(收费，最佳)，装了TortoiseSVN的话，也带有一个Diff工具TortioseIDiff。 这里推荐一款SourceGear MergeDiff，支持Windows，Mac，Linux，非常好用。不过windows上最好的是 araxis
-	git difftool 查看当前目录的修改
-	git difftool -y 使用-y,不必每次询问
-	git difftool HEAD~2 HEAD 查看两个版本之间的差异
-	git mergetool 当merge和rebase发生冲突的时候
-	Git 還原已被刪除的檔案 git ls-files -d # 查看已刪除的檔案
-	git ls-files -d | xargs git checkout -- # 將已刪除的檔案還原
-	Git 维护 git gc # 整理前和整理後的差異, 可由: git count-objects 看到.  
	- git fsck --full Git revert 資料還原  
	- git revert HEAD # 回到前一次 commit 的狀態  
	- git revert HEAD^ # 回到前前一次 commit 的狀態  
	- git reset HEAD filename # 從 staging area 狀態回到 unstaging 或 untracked (檔案內容並不會改變)  
	- git checkout filename # 從 unstaging 狀態回到最初 Repository 的檔案(檔案內容變回修改前)
-	git remote 维护远程版本库  
	- git remote  
	- git remote add new-branch http://git.example.com.tw/project.git # 增加遠端 Repository 的 branch(origin -> project)  
	- git remote show # 秀出現在有多少 Repository git remote rm new-branch # 刪掉  
	- git remote update # 更新所有 Repository branch git branch -r # 列出所有 Repository branch

## 建立纯代码备份库

-	git clone --bare . c:\repos\gitTest.git 将当前代码库克隆到指定路径
-	git config --global push.default matching 匹配的分支可以push到代码库，新建分支不push！
-	git config --global push.default simple，push、pull只对当前分支有效，不同步其他分支，缺省为该值
-	git push --set-upstream c:\repos\gitTest.git master，如果为simple模式，不需使用该指令
-	git push -u c:\repos\gitTest.git


git 分支合并
------------

-	将开发版合并到主线
	1.	查看当前所在分支 git branch  
	2.	切换到 开发版本 git co master 合并 git merge dev 处理冲突 git mergetool（需在配置中配置该工具）
	3.	将 master 合并 到 dev版本，这样确保 dev版本与 master同步 此时，可继续 在dev上进行不稳定的版本开发！
-	将主线上的修正合并到开发版 由于主线已经合并了dev版本，因此dev合并主线无冲突，自动完成合并！
	1.	查看当前所在分支 git branch  
	2.	切换到 开发版本 git co dev
	3.	合并 git merge master
	4.	处理冲突 git mergetool
-	图形化合并配置 修改~/.gitconfig文件，如下所示：[alias]  
	mt = mergetool  
	dt = difftool araxis 的配置，最好用！  
	[diff] tool = araxis  
	[difftool "araxis"] path = C:\\Program Files\\Araxis\\Araxis Merge\\compare.exe  
	[merge] tool = araxis  
	[mergetool "araxis"] path = C:\\Program Files\\Araxis\\Araxis Merge\\compare.exe  
	[difftool] prompt = false
-	TortoiceGit 设置 "C:\Program Files\Araxis\Araxis Merge\compare.exe" /max /wait /title1:%bname /title2:%yname %base %mine  
	"C:\Program Files\Araxis\Araxis Merge\compare.exe" /max /wait /3 /title1:%tname /title2:%bname /title3:%yname %theirs %base %mine %merged /a2
-	自动合并：如果一个版本未修改，只有另外一个修改了，则自动合并 如果 对同一个文件，两个版本都做了修改，则产生冲突标记！
-	冲突标记，表示 两个版本对当前文件都做了改动，则提示各自修改的部分！  
	\<\<\<\<\<\<\< HEAD:file.txt Hello world // 当前版本，或者分支时的版本，git 会自动将下面新的放入 Base  
	======= Goodbye // 合并过来的版本，对方修改了该部分  
	\>\>\>\>\>\>\> master  
	如果 合并过来的版本 未改动，当前版本修改了，git 也会自动将 改动的放入 Base  
	冲突的文件会自动产生三个文件  
	Cfg.cs.orig 增加了 冲突标记的文件，合并完毕，可删除  
	Cfg.cs.BASE.cs git帮你通过 LOCAL 和 REMOTE混合的版本，无冲突自动合并，  
	冲突部分则取Local与Remote两个版本之前的共同版本，也就是两个的Base， 需要手动将 Local 和 Remote 版本合并到Base版本！ Cfg.cs.LOCAL.cs 当前最新的版本 Cfg.cs.REMOTE.cs 合并过来的版本，如 从 dev合并，则代表 dev版本 合并后，  
	这三个文件一般会自动删除，如未自动删除，请手动删除！
-	运行 git mergetool 会依次弹出 需要合并的文件 上面三个窗口依次是“LOCAL”、“BASE”、“REMOTE”，  
	Local、Remote只是提供解决冲突需要的信息，是无法编辑的。  
	保存 Base，会自动 将 原 Cfg.cs 更名为 Cfg.orig，该文件方便与 Cfg.cs 再比较，确认没有问题，可删除  
	将 Base版本保存为 Cfg.cs，冲突标记就没有了！
-	自动合并的会将带合并标记的文件保存为 \*\**.orig，该文件方便与 合并后的文件 进行比较，确认没有问题，可删除  
	注意： merge 之后如冲突未解决，执行提交等其它操作，会提示 unmerge 错误， 要求必须 解决冲突！
-	冲突解决后，提交版本，会自动提示 从哪个分支合并来的版本 如果该版本是稳定工作版本，请 创建 版本标签，如 v3.0，便于从该标签版本创建分支，  
	解决该版本bug， 修改bug的版本，命名一般为 fix3_0，表示对当前版本进行修正，修正后合并，即可删除 修正版！  
	如果该bug也影响了当前的主线，则修正版本 可合并到 主线！

Git亲友团
---------

-	Git的使用技巧还包括利用Git包含的和附加的一些强大工具，  
	这些工具主要包括git svn、git citool、gitk和Git的自动提示脚本：
-	git svn：  
	Git和SVN可以很方便的集成在一起，这就大大减少了从SVN向Git迁移的学习成本， 这也是我特别建议大家首次接触Git的使用方式。  
	git svn是一个Git内置的工具，你安装了Git也就安装了它，譬如说你们团队有一个SVN服务器，但是你想利用Git本地的一些强大特性，那么你依然可以 安装Git， 使用Git的branch功能，只不过再更新代码和提交代码的时候，使用git svn命令即可。  
	在这里我简单的讲讲最常使用和需要注意的两个命令， 其余的命令读者可以通过'git svn --help'来查看：  
	'git svn rebase'命令取代了'svn update'用于将服务器代码更新到本地；  
	'git svn dcommit'取代了'svn ci'，需要注意的是，本地必须用Git提交了代码之后， 再使用'git svn dcommit'。  
	只需要这样，你就可以轻松地从SVN转向Git了。
-	git citool：这是我个人使用率最频繁的一个工具，Git可以本地提交代码，那么你自然可以本地修改你的提交了，这个工具就是可视化界面， 用于修改你本地的提交。  
	只要在你的工作区间输入'git citool'，就会出现 Git自带的GUI界面。  
	你可以用它来提交代码，可以用它来将你本地的修改追加在上一次提交的代码中，你还可以用它来修改你上次提交的信息等等。  
	这个工具可以大大帮助你完成以前SVN不可能完成的任务。
-	gitk：  
	是一个查看主干/分支情况的工具，它主要用于观察整个项目的分支状况。  
	使用'gitk'命令就会出现一个图形化界面供你查看。
-	Git 的自动提示脚本：  
	它是Shawn O. Pearce为了让Git使用起来更方便而写得Shell脚本  
	你可以在http://gitweb.hawaga.org.uk/ 找到一个叫做gitcompletion的脚本，下载下来，并按照该脚本中指导的方式进行配置，你就具有了Git自动提示 （敲入部分Git命令，再按 Tab键）的功能，而且有了这个脚本， 你也可以看到你当前工作在哪个branch下。 惟一的不足是，它只支持Linux、Unix、Mac操作系统（推荐 大家都用Mac进行开发）
-	$ git diff  
	开发过程中，如果你想了解修改了哪些代码，总览所有代码的改动情况  
	【TIP】Git Bash diff 的时候有两个缺点：  
	一、窗口太窄，可能显示不下整行的代码；  
	二、如果代码中有中文，会乱码。  
	如果你碰到这两个问题，可以在项目文件夹下点右键，选择 Git Gui。
-	$ git go aaa 修改说明（改动了什么？为什么这样改？）  
	提交修改 每当完成一个阶段的代码，就需要提交代码以记录进展，方便日后查找问题以及团队协作。  
	【TIP】别忘了 go 后面的 aaa，关于 ‘git go’ 命令的详细说明，请参加 别名设置。  
	【TIP】请尽量养成勤提交的好习惯。当代码不幸出现问题时，比较容易找出从什么时刻开始出现问题，并回退到该时刻进行调试，最大限度保护已完成的阶段性工作。  
	【TIP】以上命令，都需要在项目目录下运行。  
	Git Bash 在命令提示符前，会显示当前所在的目录。  
	如果当前不在项目目录之下，需要用 cd 命令切换到项目所在目录。  
	简单的办法，就是先在资源管理器里打开项目文件夹，再点右键，选择 Git Bash。

Git实战─Git Hub
---------------

注册Git Hub，并创建一个开源项目实践。  
Git Hub是全球最大的Git服务器供应商，每个帐号有100M的免费使用空间， 网址是：https://github.com/

-	首先我们在Git Hub上创建一个帐号，按照上面指导的方法设置好你的认证信息 （每次提交代码都会需要这个认证信息） 然后，新建一个项目(选择Create a New Repository)，名叫git usage
-	在服务器端，你可以看到这个项目的信息，包括项目源代码的URL，如下图 在本地使用如下的命令，就可以完成你的第一次提交了：
-	mkdir git-usage（创建项目目录）
-	cd git-usage（进入项目目录）
-	git init（Git初始化）
-	touch README（创建一个README文件）
-	git add README（增加该文件到索引）
-	git commit -m 'first commit'（本地提交）
-	git remote add origin git@github.com:phoenixtoday/git-usage.git（增加远程服务器代码库地址）
-	将本地代码提交到远程服务器上
	git push origin（远程库） master(本地分支)
	clone时，git会自动设置好 远程库 origin，可以修改远程库地址！
-	create a -.gitignore file that excluded certain files in C:\Users\Walter
-	cmd 窗口，ren -.gitignore .gitignore
-	生成公钥，用于身份认证 key-keygen.exe -C "your@email.address" -t rsa

生成密钥
--------

-	安装完后，需要生成一对 Key（这里指密钥），然后才能通过加密的方式和服务器的代码库取得同步。
-	到开始菜单，找到“Git Bash”，运行之，并执行以下命令：
-	$ ssh-keygen -t rsa程序会提示您输入密钥的文件名，直接按回车即可。
-	然后会要求你输入一个密码，将来在使用密钥的时候需要提供这个密码。
-	可以输入，也可以不输入直接回车（无论输入还是不输入，都会要求你确认一次）。
-	确认完毕后，程序将生成一对密钥存放在以下文件夹：
-	C:\Users\Administrator[这里替换成你的用户名].ssh密钥分成两个文件，一个私钥（id_rsa）、一个公钥（id_rsa.pub）。 私钥保存在您的电脑上，公钥交项目负责人添加到服务器上。用户必须拥有与服务器公钥所配对的私钥，才能访问服务器上的代码库。
-	【注意！】为了项目代码的安全，请妥善保管你的私钥！因为一旦私钥外泄，将可能导致服务器上的代码被泄漏！

使用 tortoiseGit 图形操作
-------------------------

1.	克隆代码库 使用 Windows 资源管理器  
	打开你打算存放项目代码的文件夹，点右键选择 Git Bash。  
	在我们的项目管理系统中，每个项目的首页，都有写明代码克隆的地址，比如我们用于测试目的的沙盒项目：  
	`$ git clone your-name@testing.aysaas.com:/var/projects/sandbox`  
	在 Git Bash 中运行这条命令就能将沙盒项目中的所有代码（其实只是几个随便测试的文件）克隆到本地。
2.	Getting a Git Repository 那么现在我需要一个Git仓库了。怎么办？  
	两个办法： 克隆一个已经存在的。 初始化一个新的。  
3.	如果你要clone的话，你需要知道一个project的git url。  
	git操作跨越多个协议，  
	例如： Ruby代码  
	git url ： git clone git://git.kernel.org/pub/scm/git/git.git  
	或者 http ： git clone http://www.kernel.org/pub/scm/git/git.git  
	kernel 代码  
	git url ： git clone git://git.kernel.org/pub/scm/git/git.git  
	或者 http ： git clone http://www.kernel.org/pub/scm/git/git.git  
	svn ： git svn clone http://www.kernel.org/pub/scm/git/git.git  
	请记住git:// 协议是更快的。但是当你有防火墙或其他原因的时候，还得用http。
4.	Initializing a New Repository 假如你有个工程叫project，那么：  
	Ruby代码 cd project git init  
	则会输出： Initialized empty Git repository in .git/  
	接着您就可以打开习惯的 IDE（如 NetBeans），投入到项目的开发中啦～！
5.	【TIP】上面命令中的 your-name 要改成你在服务器上实际的用户名。
