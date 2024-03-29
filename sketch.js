// our VR world object
//final project 2

let world;
let particles=[];
let animaltypes=['lion','gazelle','elk','fox','bear'];
let buffer1,texture1;
let splash;
let tubesAndBalls=[];
let terrainvalues=[];
let terrainblocks=[];
var mult=50;
var xoff=0;
var yoff=0;
var inc=0.09;
var rocks=[];
var smallrocks=[];
var trees=[];
var birds=[];
let startbox;
var clouds=[];
let text;

var gamestate=0;
let startsphere;
let text2;

let framecnt=0;
let img,cowSound;


let canvasName;
var boids = [];
let foxsound, bearsound, lionsound, wolfsound, elksound, gazellesound;
let bgm;

let flyingmode=false;
let eagle, landing,eaglebox;


function preload(){

  img = loadImage("images/Animals/bird.png");
  cowSound = loadSound("cow.mp3");

  foxsound = loadSound("fox.mp3");
  lionsound = loadSound("lion.mp3");
  bearsound = loadSound("bear.mp3");
  wolfsound = loadSound("wolf.mp3");
  elksound = loadSound("elk.wav");

  bgm= loadSound("bgm.mp3");
  opening=loadSound("opening.wav");

}

function setup() {





  // no canvas needed
  noCanvas();

  canvasName = createCanvas(4096,4096).id();
  for (var i = 0; i < 100; i++) {
    boids.push(new Boid(random(width), random(height)));
  }

  // create a VR World (tell it to look for the 'VRScene' id for our scene tag)
  world = new World('VRScene');
  world.setUserPosition(350,93,12);
  world.setFlying(true);

  buffer1 = createGraphics(256, 256);
  texture1 = world.createDynamicTextureFromCreateGraphics( buffer1 );

  // set the background (sky sphere)
  world.setBackground(290, 78, -3);


  /*
  var vision = new Box({
    x:0,
    y:400,
    z:0,
    width: 10,
    height: 10,
    depth: 10,
    clickFunction: function(theBox) {

      // or hide it!
      //theBox.hide();

      // move the user toward this box over a 2 second period
      // (time is expressed in milliseconds)
      world.teleportToObject(theBox);
    }
});



  world.add(vision);

  */

  startsphere = new Sphere({
    x:350,
    y:93,
    z:12,
    radius:30,
    asset:"universe"
  })

  world.add(startsphere);






  startbox = new Box({
    x:325,
    y:90,
    z:12,
    clickFunction:function(theBox) {
      if(gamestate==0){
        gamestate=0.1;

      }else if(gamestate==0.1){
        gamestate=1;
        for(var x=200;x<400;x++){
          for(var i=0;i<1;i++){
            var tempp = new Particle(x, 61, -50);
            var tempp1 = new Particle(x, 61, 100);

           // add to array
          particles.push( tempp );
          particles.push( tempp1 );

          //opening.play();

          }

        }

          for(var z=-50;z<100;z++){
            for(var i=0;i<1;i++){
              var tempp = new Particle(200, 61, z);

             // add to array
            particles.push( tempp );
            particles.push( tempp1 );

            }

          }


      }

    },

    red:0,
    green:100,
    blue:100,
    scaleX:7,
    scaleY:7,
    scaleZ:7
  })
  world.add(startbox);







for(var y=0;y<70;y++){
  terrainvalues.push([]);
  xoff=0;
  for(var x=0;x<80;x++){

    let tempnoise=noise(xoff,yoff);
    if(x<20&&y>50){
     tempnoise+=0.05;

    }

    terrainvalues[y][x]=map(tempnoise,0,1,0,mult);



    if((x>53&&y>3&&y<47)||(x<25&&y<25)){
      terrainvalues[y][x]+=20;
    }
    if((x>54.5&&y>4.5&&y<45.5)||(x<23.5&&y<23.5)){
      terrainvalues[y][x]+=20;
    }
    if((x>56&&x<77&&y>6&&y<44)||(x<22&&y>0&&y<22)){
      terrainvalues[y][x]+=20;
    }
    if((x>57.5&&y>7.5&&y<42.5)){
      terrainvalues[y][x]+=20;
    }
    if((x>59&&x<74&&y>9&&y<41)){
      terrainvalues[y][x]=120;
    }

    let tempnum4=random(0,1);

    if((x==53&&(y>3&&y<47))|| (x>53&&y==47) ||(x<25&&y==25)||(x==25&&y<25)){
      if(tempnum4>0.6){
        terrainvalues[y][x]+=20;
      }

    }

    if((x==55&&(y>4.5&&y<45.5))|| (x>54.5&&y==45.5) ||(x<23.5&&y==23.5)||(x==23&&y<23.5)){
      if(tempnum4>0.6){
        terrainvalues[y][x]+=20;
      }

    }


    if((x==56&&(y>6&&y<44))|| (x>56&&y==44) ||(x<22&&y==22)||(x==22&&y<22)){
      if(tempnum4>0.6){
        terrainvalues[y][x]+=20;
      }
    }
    if((x==58&&(y>7.5&&y<42.5))|| (x>57.5&&y==42) ){
      if(tempnum4>0.6){
        terrainvalues[y][x]+=20;
      }
    }


    if((x==59&&((y>9&&y<20)||(y<41&&y>30)))|| (x>59&&(y==41||y==9))){

        terrainvalues[y][x]=135;

    }
    xoff=xoff+inc;

    let tempblock=new Box({
     x:x*10-350,
     y:0,
     z:y*10-230,
     scaleX:10,
     scaleZ:10,
     scaleY:terrainvalues[y][x],
     asset:'grass',
     repeatX: 1,
      repeatY: 1,
      metalness:0,
      roughness:0.8


    });

    if((x==59&&((y>9&&y<20)||(y<41&&y>30)))|| (x>59&&(y==41||y==9)) ){

      tempblock.setAsset("fence");

  }

  if((x>59&&x<74&&y>9&&y<41)){
    tempblock.setAsset("path");
  }





    if(((x==79||x==0)&&y%3==0)||((y==69||y==0)&&x%3==0)){
      let temprock=new Rock(x*10-350,terrainvalues[y][x]/2,y*10-230,20,100+random(50));
      rocks.push(temprock);

    }

    if(y>65||y<5||x>75||x<5||(x==49&&(y<15||y>25))
       ||(x>70&&y>60)||(x<10&&y>60)||(x>70&&y<10)){
      let tempnum=random(1,10);
      if(tempnum>6){
        let temprock2=new Rock(x*10-350,terrainvalues[y][x]/2,y*10-230,10,40+random(20));
        rocks.push(temprock2);
      }
    }

    //Add trees:
    //Forest area


    let tempnum2=random(1,10);
    let tempnum5=random(1,10);
    if(dist(37.5,57.5,x,y)<16&&x<50){

      if(tempnum2>6){
        let temptree=new Tree(x*10-350,terrainvalues[y][x]/2+24,y*10-230,6);
        trees.push(temptree);

      }

    }else if(x<50){
      let tempnum3=random(1,10);
      if(tempnum3>9.6){
        let temptree=new Tree(x*10-350,terrainvalues[y][x]/2+24,y*10-230,6);
        trees.push(temptree);

      }
      if(tempnum5>9.6){
        let tempsmallrock=new smallRock(x*10-350,terrainvalues[y][x]/2,y*10-230,random(2,5));
        smallrocks.push(tempsmallrock);
      }
    }

    world.add(tempblock);
    terrainblocks.push(tempblock);





  }
  yoff=yoff+inc;

}






let sky = new Sky({
  radius:700,
  asset: 'sky2'
});
world.add(sky);




// random animals
for(var b=0;b<animaltypes.length;b++){
  text="";

    if(animaltypes[b]=="fox"){
      text="Foxes are small to medium-sized, omnivorous mammals belonging to several genera of the family Canidae.";

    }
    if(animaltypes[b]=="gazelle"){
      text="Hello, this is a gazelle. A gazelle is any of many antelope species in the genus Gazella.";
    }
    if(animaltypes[b]=="bear"){
      text="Bears are carnivoran mammals of the family Ursidae. They are classified as caniforms, or doglike carnivorans. ";
    }
    if(animaltypes[b]=="lion"){
      text="Hello, this is a Lion. The lion is a large cat of the genus Panthera native to Africa and India. ";
    }
    if(animaltypes[b]=="wolf"){
      text="The wolf, also known as the gray wolf or grey wolf, is a large canine native to Eurasia and North America.";


    }
  for(var c=0;c<6;c++){

    let thing=new Animal(animaltypes[b],text);
    tubesAndBalls.push(thing);

  }





}




text2 = new Text({
  text: 'Are You Ready for the adventure?\n If you are, click on the Box!',
  red: 255, green: 255, blue: 255,
  side: 'double',
  x: 332, y: 96, z: 12,
  scaleX: 50, scaleY: 50, scaleZ: 50,
  rotationY:90
});


//world.add(startsphere);
world.add(text2);


//bird 2d panel
birdPanel = new Plane({
  x: 0, y: 600, z: 60,
  width: 1000, height: 1000,
  rotationX: 90,
  asset: canvasName,
  dynamicTexture: true,
  dynamicTextureWidth: 64,
  dynamicTextureHeight: 64,
  shader: "flat"

});

world.add(birdPanel);



  for(var i=0;i<8;i++){
    var tempcloud=new Cloud(random(-230,500),random(-300,600),random(40,150));
    clouds.push(tempcloud);

  }



  eagle=new GLTF({
      asset:'eagle',
      x:-269,
      y:53,
      z:-133,
       scaleX:1,
       scaleY:1,
       scaleZ:1

  });

  eagle.spinY(90);



  world.add(eagle);

  eaglebox=new Box({
    x:-269,
    y:60,
    z:-133,
    scaleX:13,
    scaleY:13,
    scaleZ:13,
    opacity:0,
    clickFunction: function(entity){
      flyingmode=true;
      eagle.setOpacity(0);

    

     },

  });

  world.add(eaglebox);

  eagletext = new Text({
    text: 'Click on the ealge to Fly!\n Click on the board to land.',
    red: 0, green: 0, blue: 0,
    side: 'double',
    x: -269, y: 100, z: -133,
    scaleX: 70, scaleY: 70, scaleZ: 70,
    rotationY:90
  });

 

  world.add(eagletext);

  

  landing=new Cylinder({
    asset:'fence',
    x:-269,
    y:50,
    z:-133,
    clickFunction: function(entity){
     flyingmode=false;
     eagle.setOpacity(1);

 },
 height:4,
 radius:15

});

world.add(landing);







}

function draw() {

  let pl=bgm.isPlaying();
    if (pl==false){
    bgm.play();
    bgm.setVolume(0.1);
    bgm.loop();

    }



   console.log(world.getUserPosition().x,world.getUserPosition().y,world.getUserPosition().z);
   if(gamestate==1&&particles.length!=0){
     //starting sequence
     for (var i = 0; i < particles.length; i++) {
      var result = particles[i].move();
      if (result == "gone") {
        particles.splice(i, 1);
        i-=1;
      }
     }
   }



  if(gamestate==0.1){
    text2.setText("Here We Go!");

  }

  if(gamestate==1){
    text2.setOpacity(0);
    startsphere.setOpacity(0);
    startbox.setOpacity(0);
  }


  if(gamestate<1){
    world.setUserPosition(350,93,12);

  }else{
    if (mouseIsPressed) {
      var pos = world.getUserPosition();
      var rot=world.getUserRotation();
      console.log(rot.x,rot.y,rot.z);

      let tempx;
      let tempz;
      let tempy;
      if(pos.z<-160){
        tempz=-160;
      }else if(pos.z>412){
        tempz=412;
      }else{
        tempz=pos.z-5*Math.cos(rot.y);
      }

      if(pos.x<-297){
        tempx=-297;
      }else if(pos.x>378){
        tempx=378;
      }else{
        tempx=pos.x-5*Math.sin(rot.y);
      }


      if(flyingmode==false){
       




      world.setUserPosition(tempx,terrainvalues[Math.round((pos.z+230)/10)][Math.round((pos.x+350)/10)]/2+8,tempz);



      }else{


        //add in flying code!!

        if(pos.y<110){
          tempy=110;
        }else if(pos.y>540){
          tempy=540;
        }else{
          tempy=pos.y+5*Math.sin(rot.x);
        }
        console.log(rot.x,rot.y,rot.z);
        //eagle.setPosition(tempx,pos.y-15,tempz);



        world.setUserPosition(tempx,tempy,tempz);
  
       
     

      }






    }

  }



  let s1 = random(5,10);
	buffer1.fill(random(160),0,random(160));
  buffer1.rect(random(0, 256), random(0,256), s1, s1);
  
    // move & collision detection
    for (let i = 0; i <tubesAndBalls.length; i++) {
      tubesAndBalls[i].move();
      for(var j=0;j<trees.length;j++){
        if(dist(trees[j].treetrunk.getX(),trees[j].treetrunk.getZ(),tubesAndBalls[i].container.getX(),tubesAndBalls[i].container.getZ())<5){
          tubesAndBalls[i].container.spinY(180-tubesAndBalls[i].container.getRotationY());
          
        }
  
      }
  
      for(var k=i+1;k<tubesAndBalls.length;k++){
        if(dist(tubesAndBalls[k].container.getX(),tubesAndBalls[k].container.getZ(),tubesAndBalls[i].container.getX(),tubesAndBalls[i].container.getZ())<9){
          tubesAndBalls[i].container.spinY(180-tubesAndBalls[i].container.getRotationY());
          
          
        }
  
      }
  
  
    }
  



  if(framecnt%100==0){
    if(clouds.length<15){
      var tempcloud=new Cloud(-230,random(-300,600),random(40,150));
      clouds.push(tempcloud);

    }

  }

  for(var i=0;i<clouds.length;i++){
    var result1 = clouds[i].move();

    if (result1 == "gone") {
      clouds.splice(i,1);
      i-=1;
    }





  }



background(53, 148, 208);

for (var i = 0; i < boids.length; i++) {
  var b = boids[i];
  b.flock(boids);
  b.update();
  b.checkEdges();
  b.display();
}

  framecnt++;

}


class Animal {

	constructor(asset,text) {

    this.initialX=random(-200,200);
    this.initialZ=random(-200,200);


    this.container = new Container3D({
      x: this.initialX,
      y: terrainvalues[Math.round((this.initialZ+250)/10)][Math.round((this.initialX+350)/10)]/2,
      z: this.initialZ,
      rotationY: random(360),
    });
    world.add(this.container);




    if(asset=='lion'){
      this.mything = new GLTF({
        asset: 'lion',
        x: 0,
        y: 3,
        z: 0,
        scaleX:0.035,
        scaleY:0.035,
        scaleZ:0.035,
        rotationY:270


      });


     }else if(asset=='fox'){
      this.mything = new GLTF({
        asset: 'fox',
        x: 0,
        y: -3,
        z: 0,
        scaleX:0.2*1.3,
        scaleY:0.1*1.3,
        scaleZ:0.1*1.3,
        rotationY:5

      });


     }else if(asset=='gazelle'){
      this.mything = new GLTF({
        asset: 'gazelle',
        x: 3,
        y: -1,
        z: 0,
        scaleX:0.1*0.7,
        scaleY:0.1*0.7,
        scaleZ:0.2*0.7,
        rotationY:270

      });


     }else if(asset=='bear'){
      this.mything = new GLTF({
        asset: 'bear',
        x: 0,
        y: 0,
        z: 0,
        scaleX:5,
        scaleY:5,
        scaleZ:5,
        rotationY:96

      });


     }else{
      this.mything = new GLTF({
        asset: 'elk',
        x: 0,
        y: 0,
        z: 0,
        scaleX:1.4,
        scaleY:1.4,
        scaleZ:1.4,
        rotationY:10

      });


     }



      this.container.addChild(this.mything);




    this.containerbox = new Box({
      x: 0,
      y: 0,
      z: 0,
      opacity:0,
      width: 20,
      height: 20,
      depth: 20,
      asset: texture1,
      dynamicTexture: true,
      dynamicTextureWidth: 512,
      dynamicTextureHeight: 512,
      red: 255,
      green: 255,
      blue: 255,




      enterFunction: function(entity){
          entity.setScale(1.2,1.2,1.2);
          entity.setOpacity(0.9);
          textSize(100);
          buffer1.fill(255,255,255);
          buffer1.text("Click me to make sounds!",10,10,245,512);


          //entity.play(cowSound);
      },

      leaveFunction: function(entity){
          entity.setOpacity(0.0);
          entity.setScale(1,1,1);
          buffer1.clear();
      },

      clickFunction: function(entity){
          console.log("getting clicked");
          if(asset=="lion"){
            lionsound.play();
          }
          if(asset=="fox"){
            foxsound.play();
          }
          if(asset=="bear"){
            bearsound.play();
          }
          if(asset=="wolf"){
            wolfsound.play();
          }
          if(asset=="elk"){
            elksound.play();
          }

      }

   });

    this.container.addChild(this.containerbox);




      this.sensor = new Box({
        x: 0,
        y: 0,
        z: 5,
        opacity: 0
      });
      this.container.addChild(this.sensor);

      // perlin noise offset
      this.noiseOffset = random(200);




  }

  move() {

    // sway a little with perlin noise
    let swayAmount = map(noise(this.noiseOffset), 0, 1, -5, 5);
    this.container.spinY(swayAmount);

    if(Math.abs(this.container.getX())>90||Math.abs(this.container.getZ())>90){
      this.container.spinY(swayAmount);
    }
    this.noiseOffset += 0.01;

    // distance to move
    let d = 0.09;

    // move forward a little bit (this code uses some math that I wrote for the 'moveUserForward' function)

    // compute the world position of our sensor (not the local position inside of our container)
    let sensorPosition = this.sensor.getWorldPosition();

    // now compute how far off we are from this position
    let xDiff = sensorPosition.x - this.container.getX();
    let zDiff = sensorPosition.z - this.container.getZ();

    // nudge the container toward the position
    this.container.nudge(xDiff * d, terrainvalues[Math.round((this.container.getZ()+230)/10)][Math.round((this.container.getX()+350)/10)]/2, zDiff * d);



    this.container.constrainPosition(-273, 120, 0,terrainvalues[Math.round((this.container.getZ()+230)/10)][Math.round((this.container.getX()+350)/10)]/2+0.75, -169, 400);



  }






}


class Tree {
  constructor(x,y,z,size){
    //create tree
this.treecomponent1=new Sphere({
  x: x,
  y: y,
  z: z,
  red: 0, green:random(100,190), blue:0,
  radius: size

});

this.treecomponent2=new Sphere({
  x: x+random(size/2,size),
  y: y-size*0.3,
  z: z+random(size/2,size)*random([1,-1]),
  red: 0, green:random(100,190), blue:0,
  radius: random(size*0.5,size*0.8)

});

this.treecomponent3=new Sphere({
  x: x-random(size/2,size),
  y: y-size*0.3,
  z: z+random(size/2,size)*random([1,-1]),
  red: 0, green:random(100,190), blue:0,
  radius: random(size*0.5,size*0.8)

});

this.treecomponent4=new Sphere({
  x: x,
  y: y-size*0.3,
  z: z+random(size/2,size)*random([1,-1]),
  red: 0, green:random(100,190), blue:0,
  radius: random(size*0.5,size*0.8)

});

this.treecomponent5=new Sphere({
  x: x,
  y: y-size*0.3,
  z: z-random(size/2,size)*random([1,-1]),
  red: 0, green:random(100,190), blue:0,
  radius: random(size*0.5,size*0.8)

});

this.treetrunk=new Cylinder({
  x:x,
  y:y-size*2,
  z:z,
  radius:size*0.3,
  height:size*4,
  red:150,
  green:100,
  blue:0

});

world.add(this.treecomponent1);
world.add(this.treecomponent2);
world.add(this.treecomponent3);
world.add(this.treecomponent4);
world.add(this.treecomponent5);
world.add(this.treetrunk);


  }

}

class Rock {
  constructor(x,y,z,size,height){
    let rockcontainer=new Container3D({
      x:x,y:y,z:z

    });

    let rockcomponent1=new Cone({
      x:0,
      y:0,
      z:0,
      height:height,
      radiusBottom:size,
      radiusTop:size/14,
      asset:"rock"



    });



    let rockcomponent2=new Cone({
      x:5*size/8,
      y:-height/6,
      z:0,
      height:2*height/3,
      radiusBottom:size,
      radiusTop:size/14,
      asset:"rock"



    });

    let rockcomponent3=new Cone({
      x:-5*size/8,
      y:-height/4,
      z:0,
      height:height/2,
      radiusBottom:3*size/4,
      radiusTop:size/14,
      asset:"rock"



    });

    let rockcomponent4=new Cone({
      x:0,
      y:-height/12,
      z:5*size/8,
      height:5*height/6,
      radiusBottom:3*size/4,
      radiusTop:size/14,
      asset:"rock"



    });

    rockcontainer.addChild(rockcomponent1);
    rockcontainer.addChild(rockcomponent2);
    rockcontainer.addChild(rockcomponent3);
    rockcontainer.addChild(rockcomponent4);

    rockcontainer.rotateY(random(360));

    world.add(rockcontainer);


  }

}

class Particle {

	constructor(x,y,z) {

		// construct a new Box that lives at this position
		this.myBox = new Sphere({
								x:x, y:y, z:z,
								red: 0, green:random(0,200), blue:0,
								radius: random(4,8)
		});

		// add the box to the world
		world.add(this.myBox);

		// keep track of an offset in Perlin noise space
    this.xOffset = random(1000);
    this.yOffset= random(1000);
    this.zOffset = random(2000, 3000);
    this.inity=random(20,30);
	}

	// function to move our box
	move() {
		// compute how the particle should move
		// the particle should always move up by a small amount
		var yMovement = map( noise(this.yOffset), 0, 1, 0, this.inity);

		// the particle should randomly move in the x & z directions
		var xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		// update our poistions in perlin noise space
		this.xOffset += 0.01;
    this.yOffset += 0.01;
    this.zOffset += 0.01;

		// set the position of our box (using the 'nudge' method)
		this.myBox.nudge(xMovement, yMovement, zMovement);

		// make the boxes shrink a little bit
		var boxScale = this.myBox.getRadius();


		// if we get too small we need to indicate that this box is now no longer viable
		if (boxScale<= 0) {
			// remove the box from the world
			world.remove(this.myBox);
			return "gone";
		}
		else {
			return "ok";
    }

    this.myBox.setRadius( boxScale-0.05);
	}
}

class smallRock {
  constructor(x,y,z,size){
    let rockcontainer=new Container3D({
      x:x,y:y,z:z

    });

    let rockcomponent1=new Dodecahedron({
      x:0,
      y:0,
      z:0,
      scaleX:size,
      scaleY:size,
      scaleZ:size,
      asset:"rock"



    });



    let rockcomponent2=new Dodecahedron({
      x:5*size/8,
      y:-size*0.15,
      z:0,
      scaleX:size*0.7,
      scaleY:size*0.7,
      scaleZ:size*0.7,
      asset:"rock"



    });

    let rockcomponent3=new Dodecahedron({
      x:-5*size/8,
      y:-size*0.25,
      z:0,
      scaleX:size*0.5,
      scaleY:size*0.5,
      scaleZ:size*0.5,
      asset:"rock"



    });

    let rockcomponent4=new Dodecahedron({
      x:0,
      y:-size*0.35,
      z:5*size/8,
      scaleX:size*0.3,
      scaleY:size*0.3,
      scaleZ:size*0.3,
      asset:"rock"



    });

    rockcontainer.addChild(rockcomponent1);
    rockcontainer.addChild(rockcomponent2);
    rockcontainer.addChild(rockcomponent3);
    rockcontainer.addChild(rockcomponent4);

    rockcontainer.rotateY(random(360));

    world.add(rockcontainer);


  }

}




class Cloud {
  constructor(x,z,size){
    this.speed=random(0.2,1);
    this.x=x;
    this.y=random(300,550);
    this.z=z;
    this.opacity=random(0.5,1);


    this.container=new Container3D({
      x:this.x,y:this.y,z:this.z



    });

    this.cloudcomponent1=new Sphere({
      x:0,
      x:0,
      z:0,
      red: 255, green:255, blue:255,
      radius: size,
      opacity:this.opacity

    });

    this.cloudcomponent2=new Sphere({
      x: random(size/2,size),
      y: -size*0.3,
      z: random(size/2,size)*random([1,-1]),
      red: 255, green:255, blue:255,
      radius: random(size*0.5,size*0.8),
      opacity:this.opacity

    });

    this.cloudcomponent3=new Sphere({
      x: -random(size/2,size),
      y: -size*0.3,
      z: -random(size/2,size)*random([1,-1]),
      red: 255, green:255, blue:255,
      radius: random(size*0.5,size*0.8),
      opacity:this.opacity

    });

    this.cloudcomponent4=new Sphere({
      x: 0,
      y: -size*0.3,
      z: random(size/2,size)*random([1,-1]),
      red: 255, green:255, blue:255,
      radius: random(size*0.5,size*0.8),
      opacity:this.opacity

    });

    this.cloudcomponent5=new Sphere({
      x: 0,
      y: -size*0.3,
      z: -random(size/2,size)*random([1,-1]),
      red: 255, green:255, blue:255,
      radius: random(size*0.5,size*0.8),
      opacity:this.opacity

    });

    this.container.addChild(this.cloudcomponent1);
    this.container.addChild(this.cloudcomponent2);
    this.container.addChild(this.cloudcomponent3);
    this.container.addChild(this.cloudcomponent4);
    this.container.addChild(this.cloudcomponent5);

    this.container.spinY(random(360));

    world.add(this.container);



  }



  move(){
    this.container.nudge(this.speed,0,0);

    if (this.cloudcomponent1.getWorldPosition().x>350) {
			// remove the cloud from the world
			world.remove(this.container);
			return "gone";
		}
		else {
			return "ok";
    }

  }
}
