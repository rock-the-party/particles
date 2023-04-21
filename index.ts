import { BuildCircleSpec, DrawableSpecs, Point, RadianAngle, Renderer, RendererSpecType } from "@r-t-p/renderer"
import { generateUUID } from "@r-t-p/utilities";
import { ILoopItem } from "@r-t-p/game-loop";
import { NextGaussian, PointOnCircle } from "@r-t-p/random";
import { Vector } from "@r-t-p/utilities";

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
  directionRange: RadianAngle;

  OnDeath: () => {};
}

export type ParticleGenerator = Particle & {
  emissionFrequencyInMilliseconds: number;
  GetParticles(): Particle[];
}

export type Particle = ILoopItem & {
  particleType: string;
  age: number;
  lifespan: number;
  speed: number;
  direction: number;
  drawableSpec: DrawableSpecs;
}

export class ParticleFactory {
  private configs: Map<string, ParticleTypeConfig>;

  constructor(private renderer: Renderer, public drawSpec: DrawableSpecs) {
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
  private particles: Particle[] = [];

  constructor(public config: ParticleTypeConfig, private renderer: Renderer, public drawableSpec: DrawableSpecs) {
    this.id = generateUUID();
    this.speed = 0;
    this.direction = 0;
    this.particleType = config.ParticleType;
    this.lifespan = Infinity;
  }

  handleInput(): void {
    for (let particle of this.particles) {
      particle.handleInput();
    }
  }

  update(elapsedMilliseconds: number): void {
    updateParticle(elapsedMilliseconds, this);
    for (let particle of this.particles) {
      particle.update(elapsedMilliseconds);
    }
  }

  render(): void {
    renderParticle(this.renderer, this);
    for (let particle of this.particles) {
      particle.render();
    }
  }

  isFinished(): boolean {
    return this.lifespan < this.age;
  }

  GetParticles(): Particle[] {
    return this.particles;
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