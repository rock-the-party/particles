import { DrawableSpecs, Renderer } from "@r-t-p/renderer";
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
    direction: RandomRange;
    OnDeath: () => {};
};
export type ParticleGenerator = Particle & ILoopItem & {
    emissionFrequencyInMilliseconds: number;
    isEmitting: boolean;
    GetParticles(): Particle[];
    CreateParticle(): void;
};
export type Particle = {
    particleType: string;
    age: number;
    lifespan: number;
    speed: number;
    direction: number;
    drawableSpec: DrawableSpecs;
};
export declare class ParticleFactory {
    private renderer;
    private configs;
    constructor(renderer: Renderer);
    RegisterParticleType(config: ParticleTypeConfig): void;
    CreateParticleGenerator(particleType: string, drawSpec: DrawableSpecs): ParticleGenerator | null;
}
