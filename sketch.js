let bx;
let by;
let boxSize = 40;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
let imgs=[];
let box=[];
let mbox=[];
let cbox;
let left = false;
let distance;
let moved = false;
let cllect= [];
let num=1;

function setup() {

  createCanvas(750, 400);
  bx = width / 7.0;
  by = height / 2.0;
  bx2 = width / 20.0;
  by2 = height / 2.0;
  imgs[0] = loadImage('tile000.png'); // Load the image
  imgs[1] = loadImage('tile001.png'); // Load the image
  imgs[2] = loadImage('tile002.png'); // Load the image
  imgs[3] = loadImage('tile003.png'); // Load the image
  imgs[4] = loadImage('tile004.png'); // Load the image
  imgs[5] = loadImage('tile005.png'); // Load the image
  imgs[6] = loadImage('tile006.png'); // Load the image
  imgs[7] = loadImage('tile007.png'); // Load the image
  imgs[8] = loadImage('tile008.png'); // Load the image

  let collect= [];
  let cont = false;
  let rndm = Math.floor(random(7));
  collect[0] = rndm;
  while(num!=7){
  let rndm = Math.floor(random(7))
  for(let i=0; i<collect.length; i++){
    if(collect[i] == rndm) cont =true
  }
    if(cont == false){
     collect[num] = rndm;
      num++;
    }
    cont=false;
  }


  
 for(let i = 0 ; i<7; i++ ) {
    let index = collect[i];
    box[i] = new boxes(imgs[index], bx+ (i*width/10), by, boxSize, boxSize,overBox,xOffset,yOffset,locked);
     mbox[i] = new mboxes(bx+ (i*width/10), by);

  }


  cbox = new cboxc(0, 0);
  distance = box[1].x - box[0].x;
}
class mboxes{
  constructor(mx, my){
  this.mx=mx;
    this.my=my;
  }
 
}

class cboxc{
  constructor(cx,cy){
  this.cx=cx;
    this.cy=cy;
  }
}

class boxes{
  
 constructor(a,x, y, z, d,overBox,xOffset,yOffset,locked) {
 this.a = a ;
 this.x = x ;
 this.y = y ;
 this.z = z ;                  // objelerin özellikleri
 this.d = d ;
 this.overBox=overBox;
 this.xOfset=xOffset;
 this.yOfset=yOffset;
 this.locked=locked;


 }
  
  

  
   show() {
  if (
    mouseX > this.x - this.z &&          // show function
    mouseX < this.x + this.z &&
    mouseY > this.y - this.z &&
    mouseY < this.y + this.z
  ) {
   this.overBox = true;
    if (!this.locked) {
     
    }
  } else {
  
  this.overBox = false;
  }
  let i = 0 ;
     image(this.a, this.x, this.y, this.z, this.d);  
  }
  
  onClick(){
   if (this.overBox) {
    this.locked = true;
  } else {
    this.locked = false;        // cklick function
  }
  this.xOffset = mouseX - this.x;
  this.yOffset = mouseY - this.y; 
  }
  
  drag(){
  
  if (this.locked) {
    this.x = mouseX - this.xOffset;     // drag function
    this.y = mouseY - this.yOffset;
  }    
  }
  
  release(){
  this.locked= false;
  }                                // release function
}


function draw() {
  background(0);
   for(let i = 0 ; i<7; i++ ) {
  box[i].show();
   }
}


function mousePressed() {
   for(let i = 0 ; i<7; i++ ) {
  box[i].onClick();
   }
  

 

}

function mouseDragged() {
  for(let i = 0 ; i<7; i++ ) {
  box[i].drag();
   }
  
}

function mouseReleased() {
    for(let i = 0 ; i<7; i++ ) {
       control();
       if(moved == false){        
          box[i].x = mbox[i].mx;
          box[i].y = mbox[i].my;                  
      }
      else{
        let boxnum = (cbox.cx - box[i].x)/distance;
        if(left == true){
          for(let j=1; j<=boxnum; j++){
             box[i+j].x = box[i+j].x -distance; 
          }
        }
        else{
          for(let j=1; j<=boxnum; j++){
             box[i+j].x = box[i+j].x +distance; 
          }
        }
      
      }
      mbox[i].mx = box[i].x;
      mbox[i].my = box[i].y;
      left = false;
      moved = false;
    box[i].release();    
    }
}

function control(){
 
 for(let i=0; i<7; i++){
   
   for(let j=0; j<i; j++){
     
        if(box[i].x + 40 == box[j].x + 20 && box[i].y == box[j] -     20 ||box[i].x == box[j].x + 20 && box[i].y - 40 == box[j] -
20 || box[i].x + 40 == box[j].x +20 && box[i].y -40 == box[j] -20 || box[i].x == box[j].x +20 && box[i].y == box[j].y -20){
    if(box[i].x < mbox[i].x){
        moved = true;
       left = true;
       cbox.cx = box[j].x;
       cbox.cy = box[j].y; 
      }
     else if(box[i].x < mbox[i].x){
        moved = true;
       left = false;
       cbox.cx = box[j].x;
       cbox.cy = box[j].y;       
     
     }
       else{ moved = false;}                                                                                                                  
           }  
     
   }
   
   for(let j=6; j>i; j--){
     
      if(box[i].x + 40 == box[j].x + 20 && box[i].y == box[j] -     20 ||box[i].x == box[j].x + 20 && box[i].y - 40 == box[j] -
20 || box[i].x + 40 == box[j].x +20 && box[i].y -40 == box[j] -20 || box[i].x == box[j].x +20 && box[i].y == box[j].y -20){
    if(box[i].x < mbox[i].x){
    
    if(box[i].x < mbox[i].x){
        moved = true;
       left = true;
       cbox.cx = box[j].x;
       cbox.cy = box[j].y; 
      }
     else if(box[i].x < mbox[i].x){
        moved = true;
       left = false;
       cbox.cx = box[j].x;
       cbox.cy = box[j].y;       
     
     }
       else{ moved = false;}                                                                                                                  
           } 
    
    }
     
     
     
   
   }
 
 } 

}