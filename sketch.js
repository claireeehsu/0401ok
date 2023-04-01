var colors = "fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a".split("-").map(a=>"#"+a)
var colors2 = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)
class ball_class{
  constructor(args){ //初始值
    this.r =random(50,150) //直徑
    //this.p ={x:random(width),y:random(height)} //初始顯示位置
    //this.p = {x:width/2,y:height/2}
    this.p = args.p || {x:random(width),y:random(height)}
    this.v ={x:random(-1,1),y:random(-1,1)} //速率
    this.color =args.color || random(colors) //顏色
    //this.a = {x:0,y:0.5}// 主要改變每個球的速率
    this.mode = random(["happy","bad"])//球的心情
    this.rid =random(100,10000)
  }
  draw()//繪圖函數
    {
    push()
      translate(this.p.x,this.p.y)//把座標原點放到(this.p.x,this.p.y)
    fill(this.color)
    ellipse(0,0,this.r)//畫球
    if(this.mode=="happy"){
      fill(255)
      arc(0,0,this.r/2,this.r/2,0,2*PI)//白色半圓眼球
      fill(0)
      arc(0,0,this.r/3,this.r/3,0,2*PI)//黑色半圓眼球
    }
    else{   
    fill(255)
    arc(0,0,this.r/2,this.r/2,0,PI)//白色半圓眼球
    fill(0)
    arc(0,0,this.r/3,this.r/3,0,PI)//黑色半圓眼球
  }
    pop()
  }
  update() //移動後更新圓的畫面
  {
    //this.v.x = this.v.x *0.995
    //this.v.y = this.v.y *0.995
    if(this.mode=="happy"){
      this.p.y = this.p.y + sin(frameCount/10+this.rid/100)*5
  }
    else{
    this.p.x = this.p.x + this.v.x
    this.p.y = this.p.y + this.v.y
  }
    // this.v.x = this.v.x+this.a.x //自由落體，越往下(x不改變，y改變)，速率會增加
    // this.v.y = this.v.y+this.a.y //自由落體，越往下(x不改變，y改變)，速率會增加
     if((this.p.y-this.r/2) > height){//碰到底下的邊
      this.v.y = -this.v.y
      this.p.y = this.p.y-this.r/2
     }
      if((this.p.y-this.r/2) < 0){//碰到上面的邊
       this.v.y = -this.v.y
       this.p.y = this.p.y+this.r/2
    }
    if((this.p.y-this.r/2) < 0){//碰到左邊，只有牽涉到x軸
      this.v.x = -this.v.y
      this.p.x = this.p.y+this.r/2
    }
    if((this.p.y-this.r/2) < 0){//碰到右邊，只有牽涉到x軸
      this.v.x = -this.v.y
      this.p.x = this.p.y+this.r/2
  }
  }
}
var ball
var balls=[] //宣告一個放置球資料的陣列
function setup() { //靜態的顯示物間，就在set up()，注意draw()函數內的background(220)，不可執行
  createCanvas(windowWidth, windowHeight);
  for(i=0;i<20;i=i+1)
  {
    if(i<10){
      ball = new ball_class({
        p:{x:width/2,y:height/2},
        color: random(colors2)
      })//產生一個球(的類別)
    }
    else{
      ball = new ball_class({})//產生一個球(的類別)
    }
    balls.push(ball)
  }
  }
  // ellipse(50,50,100) //繪出圓與橢圓
  // circle() //只能繪出圓
  //+++++++++++++++++++++=//
  // var ball_x=100
  // var ball_y=50
  // var ball_r=100
  //++++++++++++++++++++++//
  // ball = { //ball代表一個球元件，以下的資料為整個球的基本資料
  //   p:{x:50,y:50},//p代表球的位置(x,y)
  //   r:100, //r:代表球的寬度
  //   v:{x:1,y:1},//v:球的移動速率，y=1代表球要往下1距離
  //   color:color(252,68,68) //球的顏色
  // }
  //++++++++++++++++++++++//
  for(i=0;i<100;i=i+1)
  {
    if(i<50){
    ball = new ball_class({
      p:{x:width/2,y:height/2}
    }) //產生一個球(的類別)
  }
  else{
    ball = new ball_class({})
  }
  
    balls.push(ball) //把一個球推入balls的陣列內
}
  
 

function draw() { //產生動態的話，就在draw()內執行繪圖
   background(255);
   noStroke()
//   fill(ball.color)
//   ellipse(ball.p.x,ball.p.y,ball.r) //繪出圓與橢圓
//   ball.p.x = ball.p.x + ball.v.x
//   ball.p.y = ball.p.y + ball.v.y
for(let ball of balls){
  //ball = balls[i]
  ball.draw()
  ball.update()
//   fill(ball.color)
//   ellipse(ball.p.x,ball.p.y,ball.r)
//   ball.p.x = ball.p.x + ball.v.x
//   ball.p.y = ball.p.y + ball.v.y
 }
 }
