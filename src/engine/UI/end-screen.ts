import { UIElement } from "./UI-engine";
import { kills } from "../../assets/entities/player/player";
import { score } from "../../assets/entities/player/player";

export class EndScreen extends UIElement{

    drawBox(ctx: CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
        ctx.closePath();
    }

    drawOutline(ctx: CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = '#000';
        ctx.strokeRect(1, 1, this.width, this.height)
        ctx.restore();
        ctx.closePath();
    }

    drawDesc(ctx: CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.save();
        ctx.font = '26px gamefont';
        let text = 'LEVEL CLEARED';
        ctx.fillText(text, 0.5 * (this.width - ctx.measureText(text).width), 50);
        
        ctx.font = '18px gamefont';
        text = "Press 'space' to continue.";
        ctx.fillText(text, 0.5 * (this.width - ctx.measureText(text).width), this.height - 10);
        ctx.restore();
        ctx.closePath();
    }

    drawKills(ctx: CanvasRenderingContext2D):void {
        ctx.beginPath();
        ctx.save();
        ctx.font = '20px gamefont';
        let text = `Kills: ${kills}`;
        ctx.fillText(text, 0.5 * (this.width - ctx.measureText(text).width), this.height / 2);
        ctx.restore();
        ctx.closePath();
    }

    drawScore(ctx: CanvasRenderingContext2D):void {
        ctx.beginPath();
        ctx.save();
        ctx.font = '30px gamefont';
        let text = `Total score: ${score}`;
        ctx.fillText(text, 0.5 * (this.width - ctx.measureText(text).width), this.height / 2 + 40);
        ctx.restore();
        ctx.closePath();
    }

    _draw(ctx: CanvasRenderingContext2D): void {
        // console.log(this.x);
        this.drawBox(ctx);
        this.drawDesc(ctx);
        this.drawKills(ctx);
        this.drawScore(ctx);
        this.drawOutline(ctx);
    }

    constructor(){
        super(350, 250, 'middle', 'middle');
        super.draw = this._draw;
        
    }
}