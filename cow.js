let state = 0;
class Cow{
    constructor(x,y,z){
        this.startX = 0,
        this.startY = 1; 
        this.startZ = -5,

        this.container = new Box({
                        x: this.startX,
                        y: this.startY,
                        z: this.startZ,
                        // opacity:0.9,
                        width: 2.5,
                        height: 2, 
                        depth: 2.5,
                        opacity: 0.7,
                        asset: texture1,
                        dynamicTexture: true,
                        dynamicTextureWidth: 512,
                        dynamicTextureHeight: 512,
                        red: 255,
                        green: 255, 
                        blue: 255,


                        // overFunction: function(theBox) {
                          
                        //     // runs 1 time whenever the cube is clicked

                        //     // update this cube's color to something random!
                          
                        //     // if (theBox.opacity == 0.9){
                        //     //     theBox.opacity = 0.1;

                        //     // }

                        //     // else if (theBox.opacity == 0.1){
                        //     //     theBox.opacity = 0.9;

                        //     // }
                            // console.log("over the cow");
                            // let s = 'cow, an incredible animal';
                            // buffer1.fill(50);
                            // buffer1.textSize(55);
                            // buffer1.text(s, 10, 10, 512, 512);
                        // },

                        enterFunction: function(entity){
                            entity.setScale(1.2,1.2,1.2);
                            entity.setOpacity(0.9);
                            textSize(50);
                            buffer1.fill(255,255,255);
			                buffer1.text("Hello, this is a cow. A cow is a a fully grown female animal of a domesticated breed of ox, kept to produce milk or beef.",10,10,245,245);
                            entity.play(cowSound);
                        },

                        leaveFunction: function(entity){
                            entity.setOpacity(0.0);
                            entity.setScale(1,1,1);
                        },

                        clickFunction: function(entity){
                            console.log("getting clicked");
                            cowSound.play();

                        }

                });

        world.add(this.container);

        let cow = new GLTF({
            asset: 'cow',
            x: 0,
            y: -1,
            z: 0,
            scaleX:0.3,
            scaleY:0.3,
            scaleZ:0.3
          });
        this.container.addChild(cow);

        // perlin noise offset
        this.noiseOffset = random(200);


    }

    move() {

        // sway a little with perlin noise
        let swayAmount = map(noise(this.noiseOffset), 0, 1, -1, 1);
        this.container.spinY(swayAmount);
    
        if(Math.abs(this.container.getX())>6||Math.abs(this.container.getZ())>6){
          this.container.spinY(swayAmount);
        }
        this.noiseOffset += 0.0001;
    
        // distance to move
        let d = 0.01;
    
        // move forward a little bit (this code uses some math that I wrote for the 'moveUserForward' function)
    
        // compute the world position of our sensor (not the local position inside of our container)
        let sensorPosition = this.sensor.getWorldPosition();
    
        // now compute how far off we are from this position
        let xDiff = sensorPosition.x - this.container.getX();
        let zDiff = sensorPosition.z - this.container.getZ();
    
        // nudge the container toward the position
        this.container.nudge(xDiff * d, 0, zDiff * d);
    
        this.container.constrainPosition(-10, 10, 0, 0, -10, 10);

        for (let i = 0; i<myTrees.length; i++){
            let d = dist(this.x, this.y, myTrees[i].x, myTrees[i].y);
            if (d<100){
                console.log("too close");
                sensorPosition.x *= -1; 
                sensorPosition.z *= -1; 

            }
        }
        // for (let i = 0; i<myElephants.length; i++){
        //     let d = dist(this.x, this.y, myElephants[i].x, myElephants[i].y);
        // }
        for (let i = 0; i<myCows.length; i++){
            let d = dist(this.x, this.y, myCows[i].x, myCows[i].y);
            if (d<30){
                console.log("too close");
                sensorPosition.x *= -1; 
                sensorPosition.z *= -1; 
            }
        }
        // for (let i = 0; i<myFoxes.length; i++){
        //     let d = dist(this.x, this.y, myFoxes[i].x, myFoxes[i].y);
        // }
        // for (let i = 0; i<myTigers.length; i++){
        //     let d = dist(this.x, this.y, myTigers[i].x, myTigers[i].y);
        // }
        // for (let i = 0; i<myWolves.length; i++){
        //     let d = dist(this.x, this.y, myWolves[i].x, myWolves[i].y);
        // }
    
      }


    
}