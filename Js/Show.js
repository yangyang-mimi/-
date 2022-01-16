function LoadGround(){
    var g="";
    //十行九列
    for(var j=0;j<10 ;j++){
        map[j]=[];
        for(var i=0;i<9 ;i++){
            map[j][i]=0;
            //点击调用onChose方法,放置棋子
            g+="<article class='CS' id='CS"+j+"-"+i+"' onclick='onChose("+j+","+i+")'></article>";
        }
    }
    $("#space").html(g);
    Log("完成创建场景");
}

//0空
//兵1 炮2 车3 马4 相5 士6 将7 红
//卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑

//功能函数，得到棋子信息
function getCText(j,i){
    var T=[];
    switch (map[j][i])
     {
     case (0):
        return null;
     break;
     case (1):
         T[0]="兵";
         T[1]="BR";
     break;
     case (2):
         T[0]="炮";
         T[1]="PR";
     break;
     case (3):
         T[0]="车";
         T[1]="JR";
     break;
     case (4):
         T[0]="马";
         T[1]="MR";
     break;
     case (5):
         T[0]="相";
         T[1]="XR";
     break;
     case (6):
         T[0]="士";
         T[1]="SR";
     break;
     case (7):
         T[0]="将";
         T[1]="J";
     break;
     case (-1):
         T[0]="卒";
         T[1]="BB";
     break;
     case (-2):
         T[0]="炮";
         T[1]="PB";
     break;
     case (-3):
         T[0]="车";
         T[1]="JB";
     break;
     case (-4):
         T[0]="马";
         T[1]="MB";
     break;
     case (-5):
         T[0]="象";
         T[1]="XB";
     break;
     case (-6):
         T[0]="士";
         T[1]="SB";
     break;
     case (-7):
         T[0]="帅";
         T[1]="S";
     break;
     default :
         return null;
     break;
     }
    return T;
}

function showC()
{
    for(var j=0;j<10 ;j++) {
        for (var i = 0; i < 9; i++) {
            var cla="";
            var tex="";
            var isNone=false;
            var T=getCText(j,i);
            if(T == null){
                isNone=true;
            }else{
                //布置红黑方棋子
                cla=T[1];
                tex=T[0];
            }
            if(isNone){
                continue;
            }
            $("#CS"+j+"-"+i).html(
                    "<section class='C "+cla+"'>"+tex+"</section>"
            )
        }
    }
    Log("完成显示场景");
}

/*
红色代表该棋子可以吃掉，绿色为自方棋子，黄色表示你可以持子所走的位置
 */
//0清除 1绿色 2黄色 3红色
function showChose(j,i,t){
    var o=$("#CS"+j+"-"+i);
    if(t==0){
        o.css({
            "box-shadow": "",
            "border": ""
        });
        return;
    }
    var c="";
    switch (t){
        case 1:
            c="6bc274";   //绿色为自己棋子
            break;
        case 2:
            c="eeb948";   //黄色为棋子可以走的所有位置
            break;
        case 3:
            c="c53f46";   //红色代表其可以吃掉的棋子
            break;
        default :
            break;
    }
   o.css({
        "box-shadow": "0 0 25pt #"+c,
        "border": "3px solid #"+c
    })
}
//解除棋子的被选中效果
function cleanChose(){
    $(".CS").css({
        "box-shadow": "",
        "border": ""
    })
}
function move(y,x,j,i,eat){
    onMove=true;
    if(eat==null)
        if(map[j][i]!=0){
            LogError("错误的位置");
            return;
        }
    var cla="";
    var tex="";
    //getCText获取坐标找到棋子，返回棋子信息
    var T=getCText(y,x);
    if(T == null){
        LogError("丢失棋子信息");   //找不到该棋子，报出错误信息
        return;
    }else{
        //赋值棋子的名字
        cla=T[1];
        tex=T[0];
    }
    if(eat==null)
        //哪个棋子移动到哪里
        Log(y+"-"+x+" "+tex+" 移动到"+j+"-"+i);
    else
        //哪个棋子吃了谁，如红方炮吃了黑方兵
        Log(y+"-"+x+" "+tex+" 吃"+j+"-"+i+" "+getCText(j,i)[0]);
    //那么红方炮代替黑方兵的位置，黑方兵消失
    map[j][i]=map[y][x];
    map[y][x]=0;
    $("#CS"+j+"-"+i).html(
            "<section class='C "+cla+"' style='transform:translate("+(x-i)*45+"px,"+(y-j)*45+"px);'>"+tex+"</section>"
    )
    $("#CS"+y+"-"+x).html(
        ""
    )
    setTimeout(function(){
        $("#CS"+j+"-"+i+" section").css({
            transform:""
        })
    },10);
    setTimeout(function(){
        //通过调trunH方法完成cleanSt方法、cleanChose方法
        trunH();
        onMove=false;
    },700);
}

function eat(y,x,j,i){
    onMove=true;
    $("#CS"+j+"-"+i+" section").css({
        transform:"scale(0,0)"
    })
    //设置0.7秒延迟,匿名移动方法
    setTimeout(function(){
        //eat为true进行吃棋子
        move(y,x,j,i,true);
    },700)

}
/*
此处为我构建的判断哪一方获胜的函数，通过getCText方法的返回值来判断双方的老将是否被吃掉
若红方吃掉黑方的老将，便提示红方胜利。
 */
function victory(y,x,j,i) {
    console.log(getCText(j, i));
    if (getCText(j, i)[0] === "帅") {
        // 如果getCText的返回值为“帅”则可以判断出黑子的“帅”被吃掉了
        alert("红子获胜！");
        //刷新
        location.reload();
        console.error("游戏结束");
    } else if (getCText(j, i)[0] === "将") {
        // 如果getCText的返回值为“将”则可以判断出黑子的“将“被吃掉了
        alert("黑子获胜！");
        //刷新
        location.reload();
        console.error("游戏结束");
    }
}