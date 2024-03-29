import { Projectile } from '../../core';
import { NPC } from '../../../entities/core';

const sprite = require('./sprite');

const width = 10;
const height = 4;
const g = 1;
const damage = 34;

export class LightProjectile extends Projectile {
	constructor(
		x: number,
		y: number,
		angle: number,
		vel: number,
		shooter: InstanceType<typeof NPC>
	){
		super(x, y, sprite, width, height, angle, g, vel, shooter, damage);
	}
}