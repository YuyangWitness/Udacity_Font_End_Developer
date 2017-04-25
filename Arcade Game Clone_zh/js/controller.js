window.onload = function(){

	//选择角色
	let images = document.querySelectorAll(".select_player img");
	images.forEach(image => {
		image.addEventListener("click",function(){

			//先把原先有active类删除
			let activeImg = document.querySelector(".select_player .active");
			if(activeImg){
				activeImg.classList.remove("active");
			}
			

			//给现在所点击的img加上active类
			this.classList.add("active");
		})
	});

	//开始游戏吧！
	let beginDiv = document.querySelector(".begin");
    let beginButton = document.querySelector(".begin a");
    let mask = document.querySelector("#mask");   
    let scoreDiv = document.querySelector(".score");    
    beginButton.addEventListener("click",function() { 
    	let activeImg = document.querySelector(".select_player .active");
    	if(activeImg){
    		let playerUrl =  activeImg.getAttribute("data-url");
	    	//隐藏遮照层	
	    	hideAndShow(mask);   //隐藏遮照层
	        hideAndShow(beginDiv);   //隐藏开始游戏 
	        hideAndShow(scoreDiv);
	        //游戏初始化 
	        begin = true;
	        player = initPlayer(playerUrl);         
	        main();    //开始构建图像
	        startAddEventListenerKey();    //开始监听键盘事件
	        initGoods();
	        initEnemy();


    	}else{
    		alert("请选择一个人物");
    	}
    	
        
     });


    //重新开始游戏 
    let restartButton =  document.querySelector(".over a");
    let restartDiv = document.querySelector(".over");  
	restartButton.addEventListener("click",function(){
	        begin = true;
	        hideAndShow(mask);   //隐藏遮照层
		    hideAndShow(restartDiv);   //隐藏开始游戏
	        allEnemies = [];
	        allGoods = [];
	        allScore = 0;
	        addScore(allScore);
	        clearEnemyInterval();
	        resetPosition();
	        main();
	        initGoods();
	        initEnemy();

    });
    

    //下一关
    let nextButton = document.querySelector(".next a");
    let nextDiv = document.querySelector(".next");
    nextButton.addEventListener("click",function(){
	        begin = true;
	        hideAndShow(nextDiv);
        	hideAndShow(mask);
        	allEnemies = [];
	        allGoods = [];
	        clearEnemyInterval();
	        resetPosition();
	        main();
	        initGoods();
	        initEnemy();

    });

	

}
