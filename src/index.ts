import '../main.css';
import { Canvas } from "./engine/canvas";
import { GameEngine } from "./engine/engine";
import { Player } from './assets/entities/player/player';
import { Dummy } from './assets/entities/dummy/dummy';

const c = <HTMLCanvasElement>document.getElementById('canvas');
const canvas = new Canvas(c);

const engine = new GameEngine(canvas);

let dummy  = new Dummy(100, 0, 50, 100);

let player = new Player(0,0, 16, 32, 80, 0, 0, 0);

engine.entities.push(player,dummy);
engine.renderer.camera.lookAt(player);
engine.renderer.config.zeroDot = false;
engine.renderer.config.drawLookDirection = true;


setTimeout(() => {
    // engine.renderer.camera.lookAt(dummy);
}, 3000)


setInterval(() => {
    // player.x += 1;
    engine.loop()
    // console.log(player);
    
}, 1/60*1000);