import { Canvas } from "./canvas";
import { Sprite, GameObject, PhysicsBody } from "../assets/core";
import { Renderer } from "./renderer";
import { PhysicsEngine } from './physics-engine';


export class GameEngine {


    //holde styr på muskordinater
    public mouseX: number = 0;
    public mouseY: number = 0;

    public renderer: Renderer;
    public physics: PhysicsEngine;
    /**
     * liste som inneholder alle objekter i spillet
     */
    entities: InstanceType<typeof GameObject>[] = [];
    /**
     * tick som brukes til forskjellige ting, som f.eks aminasjoner
     */
    public tick: number = 0;

    constructor(private canvas: Canvas) {
        
        // gjør klar canvas
        canvas.resizeCanvas();
        canvas.clear();
        // start renderer
        this.renderer = new Renderer(canvas);
        // start physics-engine
        this.physics = new PhysicsEngine();
        window.onresize  = (event: UIEvent) => {
            // må ta hensyn til at objektet "forsvinner" når nettleseren
            // skal tegne en ny frame
            if (event.eventPhase === 2) canvas.resizeCanvas();
        }
    }

    

    public loop(): void{
        // gjør utregninger
        this.physics.update(this.entities)
        // tegn
        this.canvas.clear();
        this.renderer.camera.update();
        this.renderer.render(this.entities);
    }

}