/*
主要为每个棋子的移动规则
 */

//定义棋子兵、卒的移动方法
function binMove(tmap,c,y,x){//0红 1黑
    var w;
    var h=0;
    if(c==0){    //此时为红方兵走
        w=y<5;
        //alert(w)
        h=-1;
    }else{       //此时为黑方兵走
        w=y>4;
        //alert(w)
        h=1;
    }
    if(w){
        if(y+h>=0&&y+h<map.length){
            var t1=[];
            t1[0]=y+h;
            t1[1]=x;
            tmap.push(t1);
        }
        var t2=[];var t3=[];
        t2[0]=y;t3[0]=y;
        t2[1]=x-1;t3[1]=x+1;
        tmap.push(t2);tmap.push(t3);
    }else{
        var t=[];
        //y+h为5时，棋子为红方兵 y+h为4时棋子为黑方卒，x为棋子坐标位，方便找到棋子
        t[0]=y+h;
        t[1]=x;
        // alert(y+h)
        // alert(x)
        tmap.push(t);
    }
}
//调用棋子炮的移动方法
function paoMove(tmap,c,y,x){
    paoMove_(tmap,0,c,y,x); //向上
    paoMove_(tmap,1,c,y,x); //向左
    paoMove_(tmap,2,c,y,x); //向下
    paoMove_(tmap,3,c,y,x); //向右
}
//定义棋子炮的移动方法
function paoMove_(tmap,d,c,y,x){//0上1左2下3右
    var q= y,w= x,qi= 0,wi= 0,ci=0;//ci:0红 1黑
    if(c==0){      //同样为红方炮
        ci=1;
    }else{         //黑方炮
        ci=-1;
    }
    var cc;
    switch (d){
        case 0:              //向上移动
            cc=function(q){return q>=0;}
            qi=-1;
            break;
        case 1:              //向左移动
            cc=function(q,w){return w>=0;}
            wi=-1;
            break;
        case 2:              //向下移动
            cc=function(q){return q<map.length;}
            qi=1;
            break;
        case 3:              //向右移动
            cc=function(q,w){return w<map.length;}
            wi=1;
            break;
    }
    var ce=false;
    while(true){
        if(!cc(q,w))break;
        if(q==y&&w==x){
            q+=qi;w+=wi;
            continue;
        }
        if(map[q][w]==0){
            if(!ce){
                var t=[];
                t[0]=q;
                t[1]=w;
               // alert(t)
                /*
                向tmap中加入棋子炮可以移动的所有位置
                 */
                tmap.push(t);
            }
        }else{
            if(ce){
                if(map[q][w]*ci<0){
                    var t=[];
                    t[0]=q;
                    t[1]=w;
                   // alert(t)
                    /*
                    此处存入棋子炮可以吃掉某个棋子的位置
                     */
                    tmap.push(t);
                    ce=false;      //再将ce变为false继续循环判断
                    break;
                }
            }
            ce=true;
        }
        q+=qi;w+=wi;
        /*alert(q)
        alert(w)*/
    }
}
//调用车的移动方法，制定规则
function juMove(tmap,c,y,x){
    for(var q=y;q>=0;q--){
        if(q==y)continue;
        if(!fastMove(tmap,c,q,x))break;
    }
    for(var q=x;q>=0;q--){
        if(q==x)continue;
        if(!fastMove(tmap,c,y,q))break;
    }
    for(var q=y;q<map.length;q++){
        if(q==y)continue;
        if(!fastMove(tmap,c,q,x))break;
    }
    for(var q=x;q<map.length;q++){
        if(q==x)continue;
        if(!fastMove(tmap,c,y,q))break;
    }
}
//定义车的移动方法
function fastMove(tmap,c,y,x){//c:0红 1黑
    var ci=0;
    if(c==0){       //红方车
        ci=1;
    }else{          //黑方车
        ci=-1;
    }
    if(map[y][x]==0){
        var t=[];
        t[0]=y;
        t[1]=x;
        /*
        存入棋子车可以进行移动的位置
         */
        tmap.push(t);
        //alert(t)
        return true;
    }else{
        /*
        此处的if判断语句是依照红黑方棋子的值
        如红方棋子中兵：1，炮：2，车：3，马：4，象：5，士：6，将：7
        而黑方车要吃掉红方任何一枚棋子时，拿着红方该棋子数值*ci若是小于0便达成可以吃掉的条件
        反过来红方亦是如此。
         */
        if(map[y][x]*ci<0){
            var t=[];
            t[0]=y;
            t[1]=x;
            //alert(t)
            /*
            存入棋子车可以吃掉某个棋子的位置
             */
            tmap.push(t);
        }
        return false;
    }
}
//定义马的移动方法
//函数内嵌套
function maMove(tmap,c,y,x){
    function fastMa(tmap,y,x,ys,xs,c){
        //算法计算马走日的规则
        if(y+ys<map.length&&y+ys>=0&&x+xs<map.length&&x+xs>=0)
        if(map[y+ys][x+xs]==0){
            var yz= 0,xz=0;
            if(ys==0){
                yz=-1;
            }else{
                xz=-1;
            }
            /*
            每个马都会展示能够移动的位置以及可以吃掉的棋子的位置
             */
            if(y+ys+ys-yz<map.length&&y+ys+ys-yz>=0&&x+xs+xs-xz<map.length&&x+xs+xs-xz>=0)
            if(map[y+ys+ys-yz][x+xs+xs-xz]*c<=0){
                var t=[];
                t[0]=y+ys+ys-yz;
                t[1]=x+xs+xs-xz;
                //alert(t)
                tmap.push(t);
            }
            if(y+ys+ys+yz<map.length&&y+ys+ys+yz>=0&&x+xs+xs+xz<map.length&&x+xs+xs+xz>=0)
            if(map[y+ys+ys+yz][x+xs+xs+xz]*c<=0){
                var t1=[];
                t1[0]=y+ys+ys+yz;
                t1[1]=x+xs+xs+xz;
                //alert(t1)
                tmap.push(t1);
            }
        }
    }
    var cc=0;
    if(c==0){
        cc=1;
    }else{
        cc=-1;
    }
    fastMa(tmap,y,x,-1,0,cc);
    fastMa(tmap,y,x,1,0,cc);
    fastMa(tmap,y,x,0,-1,cc);
    fastMa(tmap,y,x,0,1,cc);
}
//定义象的移动方法
function xiangMove(tmap,c,y,x){//c:0红 1黑
    function fastXiang(tmap,y,x,yy,xx,c,cy){
        if(y+yy*2<map.length&&y+yy*2>=0&&x+xx*2<map.length&&x+xx*2>=0){
            if(cy(y+yy*2))
            if(map[y+yy][x+xx]==0){
                if(map[y+yy*2][x+xx*2]*c<=0){
                   /*
                   此处的if判断语句是依照红黑方棋子的值
                   如红方棋子中兵：1，炮：2，车：3，马：4，象：5，士：6，将：7
                   而黑方象要吃掉红方任何一枚棋子时，拿着红方该棋子数值*c若是小于0便达成可以吃掉的条件
                   反过来红方亦是如此。
                    */
                    var t=[];
                    t[0]=y+yy*2;
                    t[1]=x+xx*2;
                    /*
                    存入棋子象可以移动到的位置以及棋子象可以吃掉某个棋子的位置
                     */
                    //alert(t)
                    tmap.push(t);
                }
            }
        }
    }
    var cc=0;
    if(c==0){
        cc=1;
    }else{
        cc=-1;
    }
    var ch;
    if(c==0){
        ch=function(y){return y>4};
    }else{
        ch=function(y){return y<5};
    }
    fastXiang(tmap,y,x,1,1,cc,ch);
    fastXiang(tmap,y,x,1,-1,cc,ch);
    fastXiang(tmap,y,x,-1,1,cc,ch);
    fastXiang(tmap,y,x,-1,-1,cc,ch);
}
//定义士的移动方法
function shiMove(tmap,c,y,x){//c:0红 1黑
    function fastShi(tmap,y,x,yy,xx,c,cc){
        if(cc(y+yy)){
            if(x+xx>=3&&x+xx<=5){
                //此处if语句与上面大致相同
                if(map[y+yy][x+xx]*c<=0){
                    var t=[];
                    t[0]=y+yy;
                    t[1]=x+xx;
                    /*
                    存入棋子士可以移动的位置以及棋子士可以吃掉棋子的位置
                     */
                    tmap.push(t);
                }
            }
        }
    }
    var cf;
    var cc=0;
    if(c==0){
        cc=1;
        cf=function(y){return y>=7&&y<=9}
    }else{
        cf=function(y){return y>=0&&y<=2}
        cc=-1;
    }
    fastShi(tmap,y,x,1,1,cc,cf);
    fastShi(tmap,y,x,-1,1,cc,cf);
    fastShi(tmap,y,x,1,-1,cc,cf);
    fastShi(tmap,y,x,-1,-1,cc,cf);
}
//定义黑红两方老将的移动方法
function JSMove(tmap,c,y,x){
    function fastJS(tmap,y,x,yy,xx,c,cc){
        if(cc(y+yy)){
            if(x+xx>=3&&x+xx<=5){
                if(map[y+yy][x+xx]*c<=0){
                    var t=[];
                    t[0]=y+yy;
                    t[1]=x+xx;
                    /*
                    存入棋子将可以移动的位置以及棋子可以吃掉的位置
                     */
                    tmap.push(t);
                }
            }
        }
    }
    var cf;
    var cc=0;
    if(c==0){
        cc=1;
        cf=function(y){return y>=7&&y<=9}
    }else{
        cf=function(y){return y>=0&&y<=2}
        cc=-1;
    }
    fastJS(tmap,y,x,1,0,cc,cf);
    fastJS(tmap,y,x,-1,0,cc,cf);
    fastJS(tmap,y,x,0,-1,cc,cf);
    fastJS(tmap,y,x,0,1,cc,cf);
    if(c==0){
        for(var q=y-1;q<map.length&&q>=0;q--){
            if(map[q][x]==0){
                continue;
            }
            if(map[q][x]==-7){
                var t=[];
                t[0]=q;
                t[1]=x;
                tmap.push(t);
            }else break;
        }
    }else{
        for(var q=y+1;q<map.length&&q>=0;q++){
            if(map[q][x]==0){
                continue;
            }
            if(map[q][x]==7){
                var t=[];
                t[0]=q;
                t[1]=x;
                tmap.push(t);
            }else break;
        }
    }
}