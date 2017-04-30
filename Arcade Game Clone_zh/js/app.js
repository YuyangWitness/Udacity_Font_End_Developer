"use strict";

//常量
const TILE_WITH = 101;
const TILE_HEIGHT = 80;
// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多    
    this.x = x;
    this.y = y;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.rd = random(100,500);
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    
    if(this.x < 606){
        this.x = this.x + dt * this.rd;
    }
};

Enemy.prototype.resetPosition = function(x,y) {
    this.x = x;
    this.y = y;
}




// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
let Player = function(x,y,sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

Object.setPrototypeOf(Player.prototype,Enemy.prototype);


//对输入作出回应
Player.prototype.handleInput = function(direction) {
    
    let rsX = this.x;
    let rsY = this.y;
    
    if(direction === "left") {
        rsX = this.x - TILE_WITH;
        //判断左移动以及临界值
         if(rsX < 0){
            this.x = 0;
            return;
        }
    }else if(direction === "right") {
        rsX = this.x + TILE_WITH;
         //判断右移动以及临界值
        if(rsX > 404){
            this.x = 404;
            return;
        }
    }else if(direction === "up") {
        rsY = this.y - TILE_HEIGHT;
         //判断上移动以及临界值
         if(rsY < -25){
            this.y = -25;
            return;
        }
    }else if(direction === "down"){
        rsY = this.y + TILE_HEIGHT;
         //判断下移动以及临界值
        if(rsY > 375){
            this.y = 375;
            return;
        }
    }

    this.update(rsX,rsY);
}

//更新x,y坐标
Player.prototype.update = function(x,y){

    if(x !== undefined && x !== undefined){
        this.x = x;
        this.y = y;
    }
    
}

//金币对象
function Goods(x,y,sprite,score){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.score = score;
}

//渲染金币对象
Goods.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,100,100);
}

//初始化金币
let allGoods = [];

function initGoods(){
    for(let i = 0; i < 5; i++){
        goodsManager();
    }
}

//金币管理器，自动生成金币，并且位置不能重叠
function goodsManager(){
    //105 190 274
    let goodsPositionY = [110,190,270];
    let goodsPositionX = [0,101,202,303,404];
    let goodsUrl = [{url:'images/Gem Blue.png',score:2},{url:'images/Gem Green.png',score:4},
                    {url:'images/Gem Orange.png',score:10}];
    let y = random(0,2);
    let x = random(0,4);
    let url = random(0,2);
    let checkRs = checkOverlapping(goodsPositionX[x],goodsPositionY[y]);
    if(checkRs){

        allGoods.push(new Goods(goodsPositionX[x],goodsPositionY[y],goodsUrl[url].url,goodsUrl[url].score));

    }else{
        goodsManager();
    }

}


//检查金币位置是否重复
function checkOverlapping(x,y){
    let state = true;
    allGoods.forEach(goods => {
       if(goods.x === x && goods.y === y){
         state = false;
       }
       
    });
     return state;
}


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
let allEnemies = [];

//敌人生成和销毁管理
function EnemyManager(){

    allEnemies.forEach((enemy,value) => {

        if(enemy.x > 606){
            allEnemies.splice(value,1);
        }
        
    });

     //随机生成敌人位置
    let specialPosition = [60,145,230];
    let randomRs = random(0,2);
    
    allEnemies.push(new Enemy(-101,specialPosition[randomRs]));
}

//初始化敌人
let enemyInterval = null;
function initEnemy(){
    
    allEnemies.push(new Enemy(-101,60)); 
    allEnemies.push(new Enemy(-101,145)); 
    allEnemies.push(new Enemy(-101,230)); 

   enemyInterval = setInterval(EnemyManager,1000);
}

//重新开始或者下一关的时候要清楚上一次的定时器
function clearEnemyInterval(){
    clearInterval(enemyInterval);
}

//110,190,270
// 把玩家对象放进一个叫 player 的变量里面
function initPlayer(sprite){
    return new Player(202,375,sprite);
}



// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。

function startAddEventListenerKey(){
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

         player.handleInput(allowedKeys[e.keyCode]);
    });
}

//生成随机数，在300——500
function random(rangeL, rangeR){
   
    let num = parseInt(Math.random()*(rangeR-rangeL+1)+rangeL,10);

    return num;
    
}

//通用函数，显示隐藏
function hideAndShow(el){
    if(!el) return;
    let elDisplay = window.getComputedStyle(el, null).display;
    if(elDisplay === "none" || elDisplay === undefined){
        el.style.display = "block";
    }else{
        el.style.display = "none";
    }
}

//增加分数函数
function addScore(score){
    allScore += score;
    document.querySelector(".present_score").textContent = allScore;
}

//重置玩家位置
function resetPosition(){
    player.update(202,375);
}
