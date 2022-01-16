$().ready(function(){
    //布置游戏场景，放置好场景、棋盘、棋子
    LoadGround();
    putDef();
    showC();
    runNow=true;
});

function Log(info){
    if(DeBug){
        console.log("DEBUG:"+info);
    }
}
function LogError(info){
    if(DeBug){
        console.log("ERROR:"+info);
    }
}

//0空
//兵1 炮2 车3 马4 相5 士6 将7 红
//卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑
var map=[];
var runNow=false;
var DeBug=true;

function putDef(){
    //放置棋子的函数
    /*
    -3: 黑方车   3：红方车
    -4: 黑方马   4：红方马
    -5：黑方象   5：红方象
    -6：黑方士   6：红方士
    -7：黑方将   7：红方将
     */
    map[0][0]=-3; map[9][0]=3;
    map[0][1]=-4; map[9][1]=4;
    map[0][2]=-5; map[9][2]=5;
    map[0][3]=-6; map[9][3]=6;
    map[0][4]=-7; map[9][4]=7;
    map[0][5]=-6; map[9][5]=6;
    map[0][6]=-5; map[9][6]=5;
    map[0][7]=-4; map[9][7]=4;
    map[0][8]=-3; map[9][8]=3;

    //第二行和第七行的1、7列放置棋子炮
    map[2][1]=-2; map[7][1]=2;
    map[2][7]=-2; map[7][7]=2;
    //0、2、4、6、8 分别完成兵和卒的棋子安放
    map[3][0]=-1; map[6][0]=1;
    map[3][2]=-1; map[6][2]=1;
    map[3][4]=-1; map[6][4]=1;
    map[3][6]=-1; map[6][6]=1;
    map[3][8]=-1; map[6][8]=1;
    Log("完成放置默认棋子");
}

//传入坐标，查看该坐标对应的棋子
function WhatSpace(y,x){
    return map[y][x];
}

//判断是否可以吃掉
function CanEat(y,x,c){
    var cc=0;
    if(c==0){
        cc=1;
    }else{
        cc=-1;
    }
    return map[y][x]*cc<0;
}

//0空
//兵1 炮2 车3 马4 相5 士6 将7 红
//卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑
/*
WhereCan函数，求出棋子可以进行移动的位置以及棋子可以选择吃掉谁的位置，在刚开局时，黑方炮可以吃掉红方马
此函数可以得到红方马的位置，返回其位置以便于添加标识
 */
function WhereCan(y,x,t){//0可以走 1可以吃
    var c=0;
    //
    if(t<=0){
        c=1;
        t*=-1;   //将t变为正数 ，正数为红方
    }
    var tmap=[];
    //功能函数，通过switch语句来判断用户进行的操作，从而调用对应的方法
    switch (t){
        case 1:
            binMove(tmap,c,y,x);    //兵移动
            break;
        case 2:
            paoMove(tmap,c,y,x);    //炮移动
            break;
        case 3:
            juMove(tmap,c,y,x);     //车移动
            break;
        case 4:
            maMove(tmap,c,y,x);     //马移动
            break;
        case 5:
            xiangMove(tmap,c,y,x);  //象移动
            break;
        case 6:
            shiMove(tmap,c,y,x);    //士移动
            break;
        case 7:
            JSMove(tmap,c,y,x);     //将移动
            break;
        default :
            break;
    }
    //判断棋子是否可以吃掉
    for(var l=0;l<tmap.length;l++){
        if(CanEat(tmap[l][0],tmap[l][1],c)){
            tmap[l][2]=1;
        }else{
            tmap[l][2]=0;
        }
    }
    /*
    *返回值tmap若为1，可以吃掉
    *返回值若为0，可以移动到此处
     */
    return tmap;
}
