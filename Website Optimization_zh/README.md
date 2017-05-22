# 网站性能优化项目
根据Udacity的网站性能优化课程，第一个网页达到了pageSpeed 90分以上，第二个网页解决了部分卡顿问题。

## pageSpeed
通过对CSS、JS、图片的处理以及对文件的压缩，`index.html`关键路径渲染达到了90分以上。

### 查看pageSpeed分数
* 打开[pageSpeed](https://developers.google.com/speed/pagespeed/insights/)
* 在输入框内输入页面地址`https://yuyangwitness.github.io/yuyang.github.io/`

### 如何进行优化
* 异步加载print.css，内联style.css代码，删除字体css
* 异步加载JS文件
* 通过base64转换图片文件，减少文件请求数
* 通过gulp压缩JS文件，CSS文件以及HTML文件

### 如何查看源码
在本项目中`dist`文件夹中是压缩的代码，即生产环境；在本项目的`src`文件夹中是普通代码，即开发环境；`gulpfile.js`是gulp配置文件。

## 去除卡顿
通过对`views/js/main.js`的优化，让`views\pizza.html`在滚动时保持`60fps`帧数；并且让页面上的 pizza 尺寸滑块运行时间小于5毫秒；

### 滚动如何优化
* 在`main.js`文件的`547行`添加了`requestAnimationFrame`来增强动画的流畅性
* 在`main.js`文件的`526行`提取出了` document.body.scrollTop  / 1250`，防止每一次循环都要进行一次计算，这样大大的消耗了时间
* 更改了背景pizza的个数，只在可视区内生成相应的pizza个数，减少了性能的消耗。

###  尺寸滑块移动时间如何优化
* 把`querySelector`更改为`getElementById`，因为`querySelector`消耗更多的性能
* 在`main.js`文件中合并`determineDx`和`changePizzaSizes`函数，并且新增了一个函数`getRandomPizzaContainerOffWidth`来获取每个`randomPizzaContainer`的`offsetWidth`，这样有效地防止了强制同步布局
* 提取出了`document.querySelectorAll(".randomPizzaContainer")`以及其他在循环内部不断重复获取的信息，把这些重复的信息单独提取出来有效的减少了消耗的时间。
* 代码从`422行`到`477行`，对原来的函数进行了拆分并且进行了新的合并。
