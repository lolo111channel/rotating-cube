import * as THREE from "three";
import * as TWEEN from "tween.js";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { PlaySmoothTweenAnim } from './PlaySmoothTweenAnim.js';
import { HexToRGB } from "./HexToRGB.js";



const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0,0,0)");

const camera = new THREE.PerspectiveCamera(75,(window.innerWidth/2)/window.innerHeight,0.1,10000);
camera.position.set(0,0,20);


const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth/2,window.innerHeight);


const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0xffffff});
const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh);

document.getElementById("container").appendChild(renderer.domElement);

let controls = new TrackballControls(camera,renderer.domElement);
controls.noPan = true;
controls.maxDistance = 500;
controls.minDistance = 5;

const handleResize = () => {
    renderer.setSize(window.innerWidth/2,innerHeight);
    
    camera.aspect = (window.innerWidth/2)/window.innerHeight;
    camera.updateProjectionMatrix();
}


renderer.render(scene,camera);
window.addEventListener("resize",handleResize);

const isItInRange = (value,min,max) => {
    if(value <= max && value >= min){
        return true;
    } 

    return false;
}

const setValue = (value,min,max) => {
    if(value < min){
        return min;
    } else if(value > max){
        return max;
    }

    return min;
}

const changeInputEvent = (object,) => {
    let x = parseInt(object.value);

    if(!Number.isInteger(object.value)){
        object.value = x;
    }

    if(isItInRange(x,1,100) == true){

       return x

    } else {
        object.value = setValue(x,1,100);
        return setValue(x,1,100);
    }
}

var meshWidth = 10;
var meshHeigth = 10;
var meshDepth = 10;

const widthInput = document.getElementById("width");
widthInput.value = 10;

const heightInput = document.getElementById("heigth");
heightInput.value = 10;

const depthInput = document.getElementById("depth");
depthInput.value = 10;

widthInput.addEventListener("change",()=>{
    meshWidth = changeInputEvent(widthInput);
})

heightInput.addEventListener("change", ()=>{
    meshHeigth = changeInputEvent(heightInput);
})

depthInput.addEventListener("change",()=>{
    meshDepth = changeInputEvent(depthInput);
})

const scaleXTween = new TWEEN.Tween({amount: mesh.scale.x}).to({amount: meshWidth},1000).onUpdate(function(){
    mesh.scale.x = this.amount;
}).start();

const scaleYTween = new TWEEN.Tween({amount: mesh.scale.y}).to({amount: meshHeigth},1000).onUpdate(function(){
    mesh.scale.y = this.amount;
}).start();

const scaleZTween = new TWEEN.Tween({amount: mesh.scale.z}).to({amount:meshDepth},1000).onUpdate(function(){
    mesh.scale.z = this.amount;
}).start();




const animation1 = new PlaySmoothTweenAnim(scaleXTween,mesh.scale.x,1000);
const animation2 = new PlaySmoothTweenAnim(scaleYTween,mesh.scale.y,1000);
const animation3 = new PlaySmoothTweenAnim(scaleZTween,mesh.scale.z,1000);


const backgroundColorInput = document.getElementById("background-color");
backgroundColorInput.value = "#575151"

var backgroundColorRGB = HexToRGB(backgroundColorInput.value);
var newBackgroundColor = {r:backgroundColorRGB.r/255,g:backgroundColorRGB.g/255,b:backgroundColorRGB.b/255}

backgroundColorInput.addEventListener("change",()=>{

    backgroundColorRGB = HexToRGB(backgroundColorInput.value);
    newBackgroundColor = {r:backgroundColorRGB.r/255,g:backgroundColorRGB.g/255,b:backgroundColorRGB.b/255};
});

const backgroundColorAnimation = new TWEEN.Tween({r:scene.background.r,g:scene.background.g,b:scene.background.b})
    .to({r:backgroundColorRGB.r/255,g:backgroundColorRGB.g/255,b:backgroundColorRGB.b/255},1000)
    .onUpdate(function(){
        scene.background.r = this.r;
        scene.background.g = this.g;
        scene.background.b = this.b;
    })
    .start()

var isPlaying1 = false;
var currentBackgroundColor = {r:backgroundColorRGB.r/255,g:backgroundColorRGB.g/255,b:backgroundColorRGB.b/255};


const boxColorInput = document.getElementById("box-color");
boxColorInput.value = "#BA2B2B"

var boxColorRGB = HexToRGB(boxColorInput.value);
var newBoxColor = {r:boxColorRGB.r/255,g:boxColorRGB.g/255,b:boxColorRGB.b/255};

boxColorInput.addEventListener("change",()=>{

    boxColorRGB = HexToRGB(boxColorInput.value);
    newBoxColor = {r:boxColorRGB.r/255,g:boxColorRGB.g/255,b:boxColorRGB.b/255};
});

const boxColorAnimation = new TWEEN.Tween({r:mesh.material.color.r,g:mesh.material.color.g,b:mesh.material.color.b})
    .to({r:boxColorRGB.r/255,g:boxColorRGB.g/255,b:boxColorRGB.b/255},1000)
    .onUpdate(function(){
        mesh.material.color.r = this.r;
        mesh.material.color.g = this.g;
        mesh.material.color.b = this.b;
    })
    .start()


var isPlaying2 = false;
var currentBoxColor = {r:boxColorRGB.r/255,g:boxColorRGB.g/255,b:boxColorRGB.b/255};


const animation = () => {
    requestAnimationFrame(animation)
    
    animation1.play(meshWidth);
    animation2.play(meshHeigth);
    animation3.play(meshDepth);

    const _ = require("lodash");

   

    if(!_.isEqual({r:scene.background.r,g:scene.background.g,b:scene.background.b},newBackgroundColor)){
        
        if(!isPlaying1 || !_.isEqual(currentBackgroundColor,newBackgroundColor)){
            backgroundColorAnimation.to(newBackgroundColor,1000).start();

            isPlaying1 = true;
            currentBackgroundColor = newBackgroundColor;
        }


    } else {
        isPlaying1 = false;
    }


    if(!_.isEqual({r:mesh.material.color.r,g:mesh.material.color.g,b:mesh.material.color.b},newBoxColor)){
        
        if(!isPlaying2 || !_.isEqual(currentBoxColor,newBoxColor)){
            boxColorAnimation.to(newBoxColor,1000).start();

            isPlaying2 = true;
            currentBoxColor = newBoxColor;
        }


    } else {
        isPlaying2 = false;
    }



    controls.update();
    TWEEN.update();


    renderer.render(scene,camera);
}


animation();