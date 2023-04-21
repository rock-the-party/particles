import { DrawableSpecs, RadianAngle, Renderer } from "@r-t-p/renderer";
import { ILoopItem } from "@r-t-p/game-loop";
export type RandomRange = {
    Mean: number;
    StdDev: number;
};
export type ParticleTypeConfig = {
    ParticleType: string;
    drawableSpec: DrawableSpecs;
    sizeRange: RandomRange;
    lifeRange: RandomRange;
    speedRange: RandomRange;
    directionRange: RadianAngle;
    OnDeath: () => {};
};
export type ParticleGenerator = Particle & {
    emissionFrequencyInMilliseconds: number;
    GetParticles(): Particle[];
};
export type Particle = ILoopItem & {
    particleType: string;
    age: number;
    lifespan: number;
    speed: number;
    direction: number;
    drawableSpec: DrawableSpecs;
};
export declare class ParticleFactory {
    private renderer;
    drawSpec: DrawableSpecs;
    private configs;
    constructor(renderer: Renderer, drawSpec: DrawableSpecs);
    RegisterParticleType(config: ParticleTypeConfig): void;
    CreateParticleGenerator(particleType: string, drawSpec: DrawableSpecs): ParticleGenerator | null;
}
