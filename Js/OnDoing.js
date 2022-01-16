//查看选中的棋子
function  onChose(j,i){
    if(!runNow)return;
    if(onMove)return;
   // alert(j+""+i);
    var CC=WhatSpace(j,i);
    if(CC==0)
    {
        onChoseS(j,i);
    }else
    {
        //j为行，i为列，cc为所选中的棋子
        Log("选择了"+j+"-"+i+"  "+CC);
        //alert("选择了"+j+"-"+i+"  "+CC)
        //选中棋子后调用方法，将cc传入
        onChoseC(j,i,CC);
    }

}
//解除棋子的被选中状态
function cleanSt(){
    nowChoseC=[];
    cleanChose();
    moveList=[];
    eatList=[];
    OnChoseNow=false;
}
function trunH(){
    if(nowWho==0){
        nowWho=1;
    }else{
        nowWho=0;
    }
    cleanSt();
}
function showSt(j,i,t){
    nowChoseC=[];
    cleanChose();
    showChose(j,i,1);
    //tmap保存棋子可以走的位置以及可以吃掉哪枚棋子的位置
    var tmap = WhereCan(j,i,t);
    //alert(tmap);
    if(tmap!=null && tmap.length>0)
        for(var q=0;q<tmap.length;q++){          //进行for循环遍历tmap，判断棋子所进行的操作是移动还是吃棋子
            if(map[tmap[q][0]][tmap[q][1]]==0){
                //添加数组元素
                moveList.push(tmap[q]);
            }else{
                eatList.push(tmap[q]);
            }
            showChose(tmap[q][0],tmap[q][1],tmap[q][2]+2);
        }
    nowChoseC[0]=j;
    nowChoseC[1]=i;
    nowChoseC[2]=t;
    OnChoseNow=true;
}

var onMove=false;
//判断的节点
var OnChoseNow=false;
var nowChoseC=[];
var nowWho=0;//0红 1黑
var moveList=[];
var eatList=[];

function onChoseC(j,i,t){
    if(!OnChoseNow){
        if(nowWho==0){
            if(t<0)return;
        }
        if(nowWho==1){
            if(t>0)return;
        }
    }
    // alert(nowChoseC[0])
    // alert(nowChoseC[1])
    //判断所选择的要吃的棋子是否正确
    if(nowChoseC[0]==j&&nowChoseC[1]==i){
        cleanSt();
        return;
    }
    if(OnChoseNow==true){
        for(var q=0;q<eatList.length;q++){
            if(eatList[q][0]==j&&eatList[q][1]==i){
                //eat && move
                //传入棋子位置及信息
                eat(nowChoseC[0],nowChoseC[1],j,i);
                //调用胜负的方法
                victory(nowChoseC[0],nowChoseC[1],j,i);
                break;
            }
        }
        cleanSt();
    }
    //红方棋子解除效果
    if(nowWho==0){
        if(t<0){
            cleanSt();
            return;
        }
    }
    //黑方棋子解除效果
    if(nowWho==1){
        if(t>0){
            cleanSt();
            return;
        }
    }
    showSt(j,i,t);
}
function onChoseS(j,i){
    if(OnChoseNow){
        for(var q=0;q<moveList.length;q++){
            if(moveList[q][0]==j&&moveList[q][1]==i){
                /*
                此处为判断所加节点
                 */
                // alert(moveList[q][0])
                // alert(moveList[q][1])
                //棋子将移动的位置
                move(nowChoseC[0],nowChoseC[1],j,i);
                break;
            }
        }
    }
    cleanSt();
}

