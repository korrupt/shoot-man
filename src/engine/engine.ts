import { Canvas } from "./canvas";
import { Sprite, GameObject, PhysicsBody } from "../assets/entities/core";
import { Renderer } from "./renderer";
import { PhysicsEngine } from './physics-engine';
import { Biome, BiomeList } from "../assets/levels/biomes/biome";
import { Player } from "../assets/entities/player/player";
import { EnemyBehaviour } from "./enemy-behaviour";
import { Enemy } from "../assets/entities/enemy/enemy";


export const BLOCKSIZE: number = 32;


export class GameEngine {

    level: Biome[] = [];

    //holde styr på muskordinater
    public mouseX: number = 0;
    public mouseY: number = 0;

    public player: Player;
    public enemy: Enemy;
    public renderer: Renderer;
    public physics: PhysicsEngine;
    public enemyBehaviour: EnemyBehaviour;
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
        // start physics-engine
        this.physics = new PhysicsEngine();
        // start renderer
        this.renderer = new Renderer(canvas);
        this.runRenderer();
        // Start enemy-behaviour
        this.enemyBehaviour = new EnemyBehaviour();
        // legg til spiller
        this.player = new Player(32, 300, 32, 64);
        this.entities.push(this.player);

        // FOR TESTING
        this.enemy = new Enemy(500, 300, 32, 64);
        this.enemy.d = true;
        this.entities.push(this.enemy);

        this.renderer.camera.lookAt(this.player);

        this.canvas.onmousemove = (ev: MouseEvent) => {
            this.mouseX = ev.offsetX;
            this.mouseY = ev.offsetY;            
        }

        window.onresize  = (event: UIEvent) => {
            // må ta hensyn til at objektet "forsvinner" når nettleseren
            // skal tegne en ny frame
            if (event.eventPhase === 2) canvas.resizeCanvas();
        }
    }

    private runRenderer(): void {
        // tegn
        const that = this;
        that.canvas.clear();
        that.renderer.renderLevel(this.level);        
        that.renderer.renderEntities(this.entities);
        window.requestAnimationFrame(this.runRenderer.bind(that));
    }
    
    public loop(): void{
        // gjør utregninger
        this.updatePlayerAngle();
        this.physics.update(this.entities, this.level[0]);
        this.enemyBehaviour.update(this.entities, this.level[0], this.player);
        this.renderer.camera.update();
    }

    private updatePlayerAngle(){
        let x = this.player.x + this.renderer.camera.x;
        let y = this.player.y + this.renderer.camera.y;
        
        let angle = Math.atan2(this.mouseY - y, this.mouseX - x);
        this.player._angle = angle;
    }

    // legg til 
    public addBiome(biome: Biome, side: 'left' | 'right'){
        // vurder om biomen skal legges til på venstre eller høyre side
        if (side === 'left'){
            this.level.unshift(biome);
        } else {
            this.level.push(biome);
        }
    }

}