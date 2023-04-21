import { DrawableSpecs, Renderer, RendererSpecType } from "@r-t-p/renderer"
import { NextGaussian, generateUUID } from "@r-t-p/utilities";
import { ILoopItem } from "@r-t-p/game-loop";

export type RandomRange = {
  Mean: number;
  StdDev: number;
}


export type ParticleTypeConfig = {
  ParticleType: string;
  drawableSpec: DrawableSpecs;
  sizeRange: RandomRange;
  lifeRange: RandomRange;
  speedRange: RandomRange;
  direction: RandomRange;
  OnDeath: () => {};
}

export type ParticleGenerator = Particle & ILoopItem & {
  emissionFrequencyInMilliseconds: number;
  isEmitting: boolean;
  GetParticles(): Particle[];
  CreateParticle(): void;
}

export type Particle = {
  particleType: string;
  age: number;
  lifespan: number;
  speed: number;
  direction: number;
  drawableSpec: DrawableSpecs;
}

export class ParticleFactory {
  private configs: Map<string, ParticleTypeConfig>;

  constructor(private renderer: Renderer) {
    this.configs = new Map<string, ParticleTypeConfig>();
  }

  public RegisterParticleType(config: ParticleTypeConfig): void {
    this.configs.set(config.ParticleType, config);
  }

  public CreateParticleGenerator(particleType: string, drawSpec: DrawableSpecs): ParticleGenerator | null {
    let config = this.configs.get(particleType);
    if (config) {
      return new GenericParticleGenerator(config, this.renderer, drawSpec);
    }
    return null;
  }
}

class GenericParticleGenerator implements ParticleGenerator {
  public id: string;
  public emissionFrequencyInMilliseconds: number = 100;
  public age: number = 0;
  public particleType: string;
  public lifespan: number;
  public speed: number;
  public direction: number;
  public isEmitting: boolean;
  private particles: Particle[] = [];
  private timeSinceEmission: number = 0;

  constructor(public config: ParticleTypeConfig, private renderer: Renderer, public drawableSpec: DrawableSpecs) {
    this.id = generateUUID();
    this.speed = 0;
    this.direction = 0;
    this.particleType = config.ParticleType;
    this.lifespan = Infinity;
    this.isEmitting = false;
  }

  handleInput(): void {
  }

  update(elapsedMilliseconds: number): void {
    this.emitParticles(elapsedMilliseconds);
    updateParticle(elapsedMilliseconds, this);
    for (let particle of this.particles) {
      updateParticle(elapsedMilliseconds, particle);
    }
  }

  render(): void {
    renderParticle(this.renderer, this);
    for (let particle of this.particles) {
      renderParticle(this.renderer, particle);
    }
  }

  isFinished(): boolean {
    return this.lifespan < this.age;
  }

  GetParticles(): Particle[] {
    return this.particles;
  }

  public CreateParticle() {
    let particle: Particle = {
      age: 0,
      direction: NextGaussian(this.config.direction.Mean, this.config.direction.StdDev),
      drawableSpec: Object.assign(this.config.drawableSpec),
      lifespan: NextGaussian(this.config.lifeRange.Mean, this.config.lifeRange.StdDev),
      particleType: this.config.ParticleType,
      speed: NextGaussian(this.config.speedRange.Mean, this.config.speedRange.StdDev),
    }
    this.particles.push(particle);
  }

  private emitParticles(elapsedMilliseconds: number): void {
    if (!this.isEmitting || this.emissionFrequencyInMilliseconds <= 0) return;
    this.timeSinceEmission += elapsedMilliseconds;
    let particlesNeeded = Math.floor(this.timeSinceEmission / this.emissionFrequencyInMilliseconds);
    let remainder = this.timeSinceEmission % this.emissionFrequencyInMilliseconds
    for (let i = 0; i < particlesNeeded ; ++i) {
      this.CreateParticle();
    }
    this.timeSinceEmission = remainder;
  }
}

function updateParticle(elapsedMilliseconds: number, particle: Particle) {
  particle.age += elapsedMilliseconds;
  switch (particle.drawableSpec.spec) {
    case RendererSpecType.CircleSpec:
      particle.drawableSpec.center.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.drawableSpec.center.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.age += elapsedMilliseconds;  
      break;
    case RendererSpecType.ImageSpec:
      particle.drawableSpec.center.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.drawableSpec.center.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.age += elapsedMilliseconds;  
      break;
    case RendererSpecType.RectSpec:
      particle.drawableSpec.startPoint.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.drawableSpec.startPoint.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.age += elapsedMilliseconds;  
      break;
    case RendererSpecType.TextSpec:
      particle.drawableSpec.startPoint.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.drawableSpec.startPoint.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
      particle.age += elapsedMilliseconds;  
      break;
  }
}

function renderParticle(renderer: Renderer, particle: Particle) {
  renderer.Draw(particle.drawableSpec);
}